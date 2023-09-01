import { APIError, APINetworkError } from "../../errors.js";
import { Element } from "../../types/entities.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetElementsQueryOptions {
  hidden?: boolean;
}

export interface CompendiumSHMixin {
  getElement(id: string): Promise<Element | null>;
  getElements(query?: GetElementsQueryOptions): Promise<Element[]>;
  getAspects(query?: GetElementsQueryOptions): Promise<Element[]>;
  getCards(query?: GetElementsQueryOptions): Promise<Element[]>;
}

export function CompendiumSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements CompendiumSHMixin {
    async getElement(id: string): Promise<Element | null> {
      try {
        return await this.request("GET", `/compendium/elements/${id}`);
      } catch (e: any) {
        if (e instanceof APINetworkError && e.statusCode === 404) {
          return null;
        }

        throw e;
      }
    }
    getElements(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams();

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }

    getAspects(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "true" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }

    getCards(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "false" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }
  };
}
