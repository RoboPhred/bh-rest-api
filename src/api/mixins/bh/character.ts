import { RESTApiBase } from "../../RESTApiBase.js";

import { ConstructorOf } from "../../types-internal.js";

export interface BHCharacterSHMixin {
  getAmbittableRecipesUnlocked(): Promise<string[]>;
}

export function BHCharacterSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements BHCharacterSHMixin {
    getAmbittableRecipesUnlocked(): Promise<string[]> {
      return this.request("GET", `/character/ambittable-recipes-unlocked`);
    }
  };
}
