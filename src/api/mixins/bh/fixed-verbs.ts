import { Situation } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { FucinePathSHMixin } from "../fucine-paths.js";

export interface BHFixedVerbsMixin {
  getFixedVerbs(): Promise<Situation[]>;
  getFixedVerb(verbId: string): Promise<Situation | null>;
}

export function BHFixedVerbsMixin<
  C extends ConstructorOf<FucinePathSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements BHFixedVerbsMixin {
    getFixedVerbs(): Promise<Situation[]> {
      return this.getSituationsAtPath("~/fixedverbs");
    }

    async getFixedVerb(verbId: string): Promise<Situation | null> {
      const items = await this.getSituationsAtPath(`~/fixedverbs`);

      return items.find((item) => item.verbId === verbId) ?? null;
    }
  };
}
