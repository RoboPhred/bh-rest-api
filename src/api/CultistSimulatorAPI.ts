import { FucinePathSHMixin } from "./mixins/fucine-paths.js";
import { GameStateSHMixin } from "./mixins/game-state.js";
import { SituationsSHMixin } from "./mixins/situations.js";
import { CSTabletopMixin } from "./mixins/cs/tabletop.js";
import { TimeSHMixin } from "./mixins/time.js";
import { CompendiumSHMixin } from "./mixins/compendium.js";

import { RESTApiBase } from "./RESTApiBase.js";

export type CultistSimulatorAPI = CSTabletopMixin &
  SituationsSHMixin &
  FucinePathSHMixin &
  GameStateSHMixin &
  TimeSHMixin &
  CompendiumSHMixin &
  RESTApiBase;

const CultistSimulatorAPI = CSTabletopMixin(
  SituationsSHMixin(
    FucinePathSHMixin(
      GameStateSHMixin(TimeSHMixin(CompendiumSHMixin(RESTApiBase)))
    )
  )
);

export { CultistSimulatorAPI };
