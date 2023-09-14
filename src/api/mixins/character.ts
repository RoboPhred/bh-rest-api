import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface SharedCharacterSHMixin {
  getUniqueManifestedElements(): Promise<string[]>;
  getRecipeExecutions(): Promise<Record<string, number>>;
}

export function SharedCharacterSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements SharedCharacterSHMixin {
    getUniqueManifestedElements(): Promise<string[]> {
      return this.request("GET", `/character/elements-manifested`);
    }

    getRecipeExecutions(): Promise<Record<string, number>> {
      return this.request("GET", `/character/recipes-executed`);
    }
  };
}
