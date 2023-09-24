import { ElementStack } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { TokensSHMixin } from "../tokens.js";

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
  C extends ConstructorOf<TokensSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements BHHandMixin {
    async getElementStacksInHand(): Promise<ElementStack[]> {
      return this.getAllTokens({
        payloadType: "ElementStack",
        spherePrefix: playerSpherePaths,
      }) as Promise<ElementStack[]>;
    }
  };
}
