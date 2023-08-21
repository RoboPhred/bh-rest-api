import { GameState } from "../../types/game-state.js";
import { Legacy, LegacyId } from "../../types/legacies.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GameStateSHMixin {
  getGameState(): Promise<GameState>;
  setGameState(gameState: GameState): Promise<void>;
  getLegacy(): Promise<Legacy | null>;
  startLegacy(legacyId: LegacyId): Promise<void>;
}

export function GameStateSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements GameStateSHMixin {
    async getGameState(): Promise<GameState> {
      const result = await this.request("GET", `game-state`);
      return result.gameState;
    }

    setGameState(gameState: GameState): Promise<void> {
      return this.request("PUT", `game-state`, { gameState });
    }

    async getLegacy(): Promise<Legacy | null> {
      const { legacyId, legacyLabel } = await this.request(
        "GET",
        `game-state/legacy`
      );
      if (legacyId == null) {
        return null;
      }

      return {
        id: legacyId,
        label: legacyLabel ?? legacyId,
      };
    }

    startLegacy(legacyId: LegacyId): Promise<void> {
      return this.request("PUT", `game-state/legacy`, {
        legacyId,
      });
    }
  };
}
