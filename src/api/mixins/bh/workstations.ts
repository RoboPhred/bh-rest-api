import { Situation } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { FucinePathSHMixin } from "../fucine-paths.js";
import { TokensSHMixin } from "../tokens.js";

export interface BHWorkstationsMixin {
  getAllWorkstations(): Promise<Situation[]>;
}

export function BHWorkstationsMixin<
  C extends ConstructorOf<TokensSHMixin & FucinePathSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements BHWorkstationsMixin {
    async getAllWorkstations(): Promise<Situation[]> {
      const result = await this.getAllTokens({
        payloadType: "WorkstationSituation",
        spherePrefix: "~/library",
      });

      return result as Situation[];
    }
  };
}
