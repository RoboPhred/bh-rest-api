import { FucinePathSHMixin } from "./mixins/fucine-paths.js";
import { GameStateSHMixin } from "./mixins/game-state.js";
import { SituationsSHMixin } from "./mixins/situations.js";
import { CSTabletopMixin } from "./mixins/cs/tabletop.js";
import { TimeSHMixin } from "./mixins/time.js";

import { RESTApiBase } from "./RESTApiBase.js";

const CultistSimulatorAPI = CSTabletopMixin(
  SituationsSHMixin(
    FucinePathSHMixin(GameStateSHMixin(TimeSHMixin(RESTApiBase)))
  )
);

export { CultistSimulatorAPI as BookOfHoursAPI };
