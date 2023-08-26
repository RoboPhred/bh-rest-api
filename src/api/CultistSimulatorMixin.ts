import { SHAPI } from "./SHAPI.js";

import { ConstructorOf } from "./types-internal.js";

import { CSTabletopMixin } from "./mixins/cs/tabletop.js";

export type CultistSimulatorMixin = CSTabletopMixin & SHAPI;

export const CultistSimulatorMixin = (superclass: ConstructorOf<SHAPI>) =>
  CSTabletopMixin(superclass);
