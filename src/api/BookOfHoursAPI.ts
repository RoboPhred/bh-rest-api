import { BHBrancrugMixin } from "./mixins/bh/brancrug.js";
import { BHFixedVerbsMixin } from "./mixins/bh/fixed-verbs.js";
import { BHHandMixin } from "./mixins/bh/hand.js";
import { FucinePathSHMixin } from "./mixins/fucine-paths.js";
import { GameStateSHMixin } from "./mixins/game-state.js";
import { SituationsSHMixin } from "./mixins/situations.js";
import { TimeSHMixin } from "./mixins/time.js";

import { RESTApiBase } from "./RESTApiBase.js";

const BookOfHoursAPI = BHHandMixin(
  BHFixedVerbsMixin(
    BHBrancrugMixin(
      SituationsSHMixin(
        FucinePathSHMixin(GameStateSHMixin(TimeSHMixin(RESTApiBase)))
      )
    )
  )
);

export { BookOfHoursAPI };
