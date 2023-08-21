import { ElementStack, Situation } from "../../../types/tokens.js";

import { RESTApiBase } from "../../RESTApiBase.js";
import { ConstructorOf } from "../../types-internal.js";

import { FucinePathSHMixin } from "../fucine-paths.js";

export interface CSTabletopMixin {
  getTabletopVerbs(): Promise<Situation[]>;
  getTabletopVerb(verbId: string): Promise<Situation | null>;
  getTabletopElements(): Promise<ElementStack[]>;
}

export function CSTabletopMixin<
  C extends ConstructorOf<FucinePathSHMixin & RESTApiBase>
>(constructor: C) {
  return class extends constructor implements CSTabletopMixin {
    getTabletopVerbs(): Promise<Situation[]> {
      return this.getSituationsAtPath("~/tabletop");
    }

    async getTabletopVerb(verbId: string): Promise<Situation | null> {
      const items = await this.getSituationsAtPath(`~/tabletop`);
      return items.find((item) => item.verbId === verbId) ?? null;
    }

    getTabletopElements(): Promise<ElementStack[]> {
      return this.getElementStacksAtPath("~/tabletop");
    }
  };
}
