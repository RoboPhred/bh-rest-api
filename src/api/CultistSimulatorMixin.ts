import { SHAPI } from "./SHAPI.js";

import { ConstructorOf } from "./types-internal.js";

import { CSTabletopMixin } from "./mixins/cs/tabletop.js";
import { CSCharacterSHMixin } from "./mixins/cs/character.js";
import { SharedCharacterSHMixin } from "./mixins/character.js";

export type CultistSimulatorMixin = CSTabletopMixin &
  CSCharacterSHMixin &
  SharedCharacterSHMixin &
  SHAPI;

export const CultistSimulatorMixin = <T extends ConstructorOf<SHAPI>>(
  superclass: T
) => CSTabletopMixin(CSCharacterSHMixin(SharedCharacterSHMixin(superclass)));
