import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface SharedCharacterSHMixin {
  getUniqueManifestedElements(): Promise<string[]>;
}

export function SharedCharacterSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements SharedCharacterSHMixin {
    getUniqueManifestedElements(): Promise<string[]> {
      return this.request("GET", `/character/elements-manifested`);
    }
  };
}
