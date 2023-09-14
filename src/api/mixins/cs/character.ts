import { RESTApiBase } from "../../RESTApiBase.js";

import { ConstructorOf } from "../../types-internal.js";

export interface CSCharacterSHMixin {
  getRecipeExecutions(): Promise<Record<string, number>>;
}

export function CSCharacterSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements CSCharacterSHMixin {
    getRecipeExecutions(): Promise<Record<string, number>> {
      return this.request("GET", `/character/recipes-executed`);
    }
  };
}
