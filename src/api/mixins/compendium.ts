import { Element } from "../../types/entities.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetElementsQueryOptions {
  hidden?: boolean;
}

export interface CompendiumSHMixin {
  getElements(query?: GetElementsQueryOptions): Promise<Element[]>;
  getAspects(query?: GetElementsQueryOptions): Promise<Element[]>;
  getCards(query?: GetElementsQueryOptions): Promise<Element[]>;
}

export function CompendiumSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements CompendiumSHMixin {
    getElements(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams();

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`, { query });
    }

    getAspects(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "true" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`, { query });
    }

    getCards(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "false" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }

      return this.request("GET", `/compendium/elements?${qs}`, { query });
    }
  };
}
