import { APINetworkError } from "../../errors.js";
import { Element, Recipe, Verb } from "../../types/entities.js";

import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetElementsQueryOptions {
  hidden?: boolean;
  labelContains?: string;
}

export interface CompendiumSHMixin {
  getElement(id: string): Promise<Element | null>;
  getElements(query?: GetElementsQueryOptions): Promise<Element[]>;
  getAspects(query?: GetElementsQueryOptions): Promise<Element[]>;
  getCards(query?: GetElementsQueryOptions): Promise<Element[]>;

  getRecipes(): Promise<Recipe[]>;
  getRecipeById(recipeId: string): Promise<Recipe | null>;

  getVerbs(): Promise<Verb[]>;
  getVerbById(verbId: string): Promise<Verb | null>;
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
      if (query?.labelContains !== undefined) {
        qs.set("labelContains", query.labelContains);
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }

    getAspects(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "true" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }
      if (query?.labelContains !== undefined) {
        qs.set("labelContains", query.labelContains);
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }

    getCards(query?: GetElementsQueryOptions): Promise<Element[]> {
      const qs = new URLSearchParams({ isAspect: "false" });

      if (query?.hidden !== undefined) {
        qs.set("isHidden", String(query.hidden));
      }
      if (query?.labelContains !== undefined) {
        qs.set("labelContains", query.labelContains);
      }

      return this.request("GET", `/compendium/elements?${qs}`);
    }

    getRecipes(): Promise<Recipe[]> {
      return this.request("GET", `/compendium/recipes`);
    }

    getRecipeById(recipeId: string): Promise<Recipe | null> {
      return this.request("GET", `/compendium/recipes/${recipeId}`).catch(
        (e: any) => {
          if (e instanceof APINetworkError && e.statusCode === 404) {
            return null;
          }

          throw e;
        }
      );
    }

    getVerbs(): Promise<Verb[]> {
      return this.request("GET", `/compendium/verbs`);
    }

    getVerbById(verbId: string): Promise<Verb | null> {
      return this.request("GET", `/compendium/verbs/${verbId}`).catch(
        (e: any) => {
          if (e instanceof APINetworkError && e.statusCode === 404) {
            return null;
          }

          throw e;
        }
      );
    }
  };
}
