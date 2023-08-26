import { ConstructorOf } from "./types-internal.js";

import { SHAPI } from "./SHAPI.js";

import { BHBrancrugMixin } from "./mixins/bh/brancrug.js";
import { BHFixedVerbsMixin } from "./mixins/bh/fixed-verbs.js";
import { BHHandMixin } from "./mixins/bh/hand.js";

export type BookOfHoursMixin = BHFixedVerbsMixin &
  BHHandMixin &
  BHBrancrugMixin;

export const BookOfHoursMixin = (superclass: ConstructorOf<SHAPI>) =>
  BHHandMixin(BHFixedVerbsMixin(BHBrancrugMixin(superclass)));
