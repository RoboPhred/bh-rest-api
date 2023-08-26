import { SHAPI } from "./SHAPI.js";

import { ConstructorOf } from "./types-internal.js";

import { CSTabletopMixin } from "./mixins/cs/tabletop.js";

export type CultistSimulatorMixin = CSTabletopMixin & SHAPI;

export const CultistSimulatorMixin = <T extends ConstructorOf<SHAPI>>(
  superclass: T
) => CSTabletopMixin(superclass);
