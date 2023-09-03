import { Situation } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { FucinePathSHMixin } from "../fucine-paths.js";
import { TokensSHMixin } from "../tokens.js";

export interface BHBrancrugMixin {
  getBrancrugSituations(): Promise<Situation[]>;
  getBrancrugSituation(buildingSlot: string): Promise<Situation | null>;
}

export function BHBrancrugMixin<
  C extends ConstructorOf<TokensSHMixin & FucinePathSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements BHBrancrugMixin {
    async getBrancrugSituations(): Promise<Situation[]> {
      const tokens = await this.getAllTokens({
        spherePrefix: "~/library!brancrug",
        payloadType: "WorkstationSituation",
      });
      return tokens as Situation[];
    }

    async getBrancrugSituation(
      buildingSlot: string
    ): Promise<Situation | null> {
      if (!buildingSlot.startsWith("buildingslot")) {
        buildingSlot = `buildingslot${buildingSlot}`;
      }

      const tokens = await this.getTokensAtPath(
        `~/library!brancrug/${buildingSlot}`,
        {
          payloadType: "WorkstationSituation",
        }
      );

      if (tokens.length === 0) {
        return null;
      }

      if (tokens.length > 1) {
        throw new Error(
          `Expected 1 token at ~/library!brancrug/${buildingSlot}, but found ${tokens.length}`
        );
      }

      return tokens[0] as Situation;
    }
  };
}
