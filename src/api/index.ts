export { GetTokensQuery } from "./mixins/fucine-paths.js";
export { GetElementsQueryOptions } from "./mixins/compendium.js";

import { SHAPI } from "./SHAPI.js";
import { BookOfHoursMixin } from "./BookOfHoursMixin.js";
import { CultistSimulatorMixin } from "./CultistSimulatorMixin.js";

export type BookOfHoursAPI = SHAPI & BookOfHoursMixin;
export const BookOfHoursAPI = BookOfHoursMixin(SHAPI);

export type CultistSimulatorAPI = SHAPI & CultistSimulatorMixin;
export const CultistSimulatorAPI = CultistSimulatorMixin(SHAPI);

export type SecretHistoriesAPI = SHAPI;
export const SecretHistoriesAPI = SHAPI;

export type CombinedGamesAPI = SHAPI & BookOfHoursMixin & CultistSimulatorMixin;
export const CombinedGamesAPI = CultistSimulatorMixin(BookOfHoursMixin(SHAPI));
