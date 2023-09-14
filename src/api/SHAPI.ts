import { SharedCharacterSHMixin } from "./mixins/character.js";
import { FucinePathSHMixin } from "./mixins/fucine-paths.js";
import { GameStateSHMixin } from "./mixins/game-state.js";
import { SituationsSHMixin } from "./mixins/situations.js";
import { TimeSHMixin } from "./mixins/time.js";
import { CompendiumSHMixin } from "./mixins/compendium.js";
import { TokensSHMixin } from "./mixins/tokens.js";

import { RESTApiBase } from "./RESTApiBase.js";

export type SHAPI = SituationsSHMixin &
  FucinePathSHMixin &
  GameStateSHMixin &
  TimeSHMixin &
  TokensSHMixin &
  CompendiumSHMixin &
  SharedCharacterSHMixin &
  RESTApiBase;

const SHAPI = SituationsSHMixin(
  FucinePathSHMixin(
    GameStateSHMixin(
      TimeSHMixin(
        TokensSHMixin(CompendiumSHMixin(SharedCharacterSHMixin(RESTApiBase)))
      )
    )
  )
);

export { SHAPI };
