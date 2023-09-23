import { Legacy } from "../../types/legacies.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface SharedCharacterSHMixin {
  getUniqueManifestedElements(): Promise<string[]>;
  getLegacy(): Promise<Legacy | null>;
  pollLegacy(onLegacyChanged: (legacy: Legacy) => void): () => void;
}

export function SharedCharacterSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements SharedCharacterSHMixin {
    getUniqueManifestedElements(): Promise<string[]> {
      return this.request("GET", `/character/elements-manifested`);
    }

    getLegacy(): Promise<Legacy | null> {
      return this.request("GET", `/character/legacy`);
    }

    pollLegacy(onLegacyChanged: (legacy: Legacy) => void): () => void {
      let isRunning = true;
      let lastHash: number | null = null;
      let timer: NodeJS.Timeout | null = null;

      const poll = () => {
        timer = setTimeout(async () => {
          const { hash, legacy } = await this.request(
            "GET",
            `/character/legacy/poll`
          );
          if (!isRunning) {
            return;
          }
          if (hash !== lastHash) {
            lastHash = hash;
            onLegacyChanged(legacy);
          }

          if (isRunning) {
            poll();
          }
        }, 1);
      };

      return () => {
        isRunning = false;
        if (timer !== null) {
          clearTimeout(timer);
        }
      };
    }
  };
}
