import lodash from "lodash";

import { ElementStack } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { FucinePathSHMixin } from "../fucine-paths.js";

const playerSpherePaths = [
  "~/portage1",
  "~/portage2",
  "~/portage3",
  "~/portage4",
  "~/portage5",
  "~/hand.abilities",
  "~/hand.skills",
  "~/hand.memories",
  "~/hand.misc",
];

export interface BHHandMixin {
  getElementStacksInHand(): Promise<ElementStack[]>;
}

export function BHHandMixin<
  C extends ConstructorOf<FucinePathSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements BHHandMixin {
    async getElementStacksInHand(): Promise<ElementStack[]> {
      const fetches = playerSpherePaths.map((path) =>
        this.getElementStacksAtPath(path)
      );
      const results = await Promise.all(fetches);
      return lodash.flatten(results);
    }
  };
}
