import { APIError } from "../../errors.js";
import { Sphere } from "../../types/spheres.js";
import {
  ElementStack,
  Situation,
  Token,
  WritableSituation,
} from "../../types/tokens.js";

import { RESTApiBase } from "../RESTApiBase.js";
import { ConstructorOf } from "../types-internal.js";

import { FucinePathSHMixin } from "./fucine-paths.js";

export interface SituationsSHMixin {
  getSituationAtPath(fucinePath: string): Promise<Situation | null>;
  updateSituationAtPath(
    fucinePath: string,
    situation: WritableSituation
  ): Promise<Situation>;
  openSituation(situation: Situation): Promise<Situation>;
  closeSituation(situation: Situation): Promise<Situation>;
  concludeSituation(situation: Situation): Promise<ElementStack[]>;
  getSituationThresholds(situation: Situation): Promise<Sphere[]>;
  getSituationThreshold(
    situation: Situation,
    thresholdId: string
  ): Promise<Sphere | null>;
  putElementInSituationThreshold(
    element: ElementStack,
    situation: Situation,
    thresholdId: string
  ): Promise<void>;
  getSituationStorageSphere(situation: Situation): Promise<Sphere | null>;
  getSituationStorageTokens(situation: Situation): Promise<Token[]>;
  getSituationOutputSphere(situation: Situation): Promise<Sphere | null>;
  getSituationOutputTokens(situation: Situation): Promise<Token[]>;
}

export function SituationsSHMixin<
  C extends ConstructorOf<RESTApiBase & FucinePathSHMixin>
>(constructor: C) {
  return class extends constructor implements SituationsSHMixin {
    async getSituationAtPath(fucinePath: string): Promise<Situation | null> {
      const token = await this.getTokenAtPath(fucinePath);
      if (token == null) {
        return null;
      }

      if (!token.payloadType.endsWith("Situation")) {
        throw new APIError(
          `Token at ${fucinePath} is not a situation, but a ${token.payloadType}`
        );
      }

      return token as Situation;
    }

    async updateSituationAtPath(
      fucinePath: string,
      situation: WritableSituation
    ): Promise<Situation> {
      const result = await this.updateTokenAtPath(fucinePath, situation);
      return result as Situation;
    }

    openSituation(situation: Situation): Promise<Situation> {
      return this.updateSituationAtPath(situation.path, { open: true });
    }

    closeSituation(situation: Situation): Promise<Situation> {
      return this.updateSituationAtPath(situation.path, { open: false });
    }

    async concludeSituation(situation: Situation): Promise<ElementStack[]> {
      const results = await this.concludeTokenAtPath(situation.path);
      return results.filter(
        (x) => x.payloadType === "ElementStack"
      ) as ElementStack[];
    }

    async getSituationThresholds(situation: Situation): Promise<Sphere[]> {
      const spheres = await this.getSpheresAtPath(situation.path);
      return spheres.filter((x) => x.category === "Threshold");
    }

    async getSituationThreshold(
      situation: Situation,
      thresholdId: string
    ): Promise<Sphere | null> {
      const threshholds = await this.getSituationThresholds(situation);
      return (
        threshholds.find(
          (x) => x.id === thresholdId || x.path.endsWith("/" + thresholdId)
        ) ?? null
      );
    }

    async putElementInSituationThreshold(
      element: ElementStack,
      situation: Situation,
      thresholdId: string
    ): Promise<void> {
      const threshhold = await this.getSituationThreshold(
        situation,
        thresholdId
      );
      if (!threshhold) {
        throw new APIError(
          `Threshold ${thresholdId} not found on situation ${situation.path}`
        );
      }
      await this.updateTokenAtPath(element.path, {
        spherePath: threshhold.path,
      });
    }

    getSituationStorageSphere(situation: Situation): Promise<Sphere | null> {
      return this.getSphereAtPath(situation.path + "/situationstoragesphere");
    }

    async getSituationStorageTokens(situation: Situation): Promise<Token[]> {
      const sphere = await this.getSituationStorageSphere(situation);
      if (!sphere) {
        return [];
      }

      return this.getTokensAtPath(sphere.path);
    }

    getSituationOutputSphere(situation: Situation): Promise<Sphere | null> {
      return this.getSphereAtPath(situation.path + "/outputsphere");
    }

    async getSituationOutputTokens(situation: Situation): Promise<Token[]> {
      const sphere = await this.getSituationOutputSphere(situation);
      if (!sphere) {
        return [];
      }

      return this.getTokensAtPath(sphere.path);
    }
  };
}
