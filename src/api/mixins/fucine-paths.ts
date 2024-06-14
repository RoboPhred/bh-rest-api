import { GetSphereResponse } from "../../payloads/sphere.js";
import { Sphere } from "../../types/spheres.js";
import {
  CreatableElementStack,
  CreatableSituation,
  ElementStack,
  Situation,
  Token,
  TokenExecutionResult,
  WritableToken,
} from "../../types/tokens.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetTokensQuery {
  payloadType?: string;
  entityId?: string;
}

export interface FucinePathSHMixin {
  getRootSpheres(): Promise<Sphere[]>;
  getSphereAtPath(fucinePath: string): Promise<Sphere>;
  getTokenAtPath(fucinePath: string): Promise<Token>;
  updateTokenAtPath(fucinePath: string, token: WritableToken): Promise<void>;
  deleteTokenAtPath(fucinePath: string): Promise<void>;
  evictTokenAtPath(fucinePath: string): Promise<void>;
  focusTokenAtPath(fucinePath: string): Promise<void>;
  openTokenAtPath(fucinePath: string): Promise<void>;
  setRecipeAtPath(fucinePath: string, recipeId: string): Promise<void>;
  setCurrentRecipeAtPath(fucinePath: string, recipeId: string): Promise<void>;
  executeTokenAtPath(fucinePath: string): Promise<TokenExecutionResult>;
  concludeTokenAtPath(fucinePath: string): Promise<Token[]>;
  unlockTokenAtPath(fucinePath: string): Promise<void>;
  getSpheresAtPath(fucinePath: string): Promise<Sphere[]>;
  getTokensAtPath(fucinePath: string, query?: GetTokensQuery): Promise<Token[]>;
  getSituationsAtPath(fucinePath: string): Promise<Situation[]>;
  getElementStacksAtPath(fucinePath: string): Promise<ElementStack[]>;
  createElementStackAtPath(
    fucinePath: string,
    token: CreatableElementStack
  ): Promise<ElementStack>;
  createSituationAtPath(
    fucinePath: string,
    token: CreatableSituation
  ): Promise<Situation>;
}

export function FucinePathSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements FucinePathSHMixin {
    async getRootSpheres(): Promise<Sphere[]> {
      const spheres = await this.request("GET", `by-path/~/spheres`);
      return spheres.map((sphere: GetSphereResponse) => ({
        // Provide a default value for Cultist Simulator
        shrouded: false,
        ...sphere,
      }));
    }

    getSphereAtPath(fucinePath: string): Promise<Sphere> {
      return this.request("GET", `by-path/${fucinePath}`);
    }

    getTokenAtPath(fucinePath: string): Promise<Token> {
      return this.request("GET", `by-path/${fucinePath}`);
    }

    updateTokenAtPath(fucinePath: string, token: WritableToken): Promise<void> {
      return this.request("PATCH", `by-path/${fucinePath}`, token);
    }

    deleteTokenAtPath(fucinePath: string): Promise<void> {
      return this.request("DELETE", `by-path/${fucinePath}`);
    }

    evictTokenAtPath(fucinePath: string): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/evict`);
    }

    focusTokenAtPath(fucinePath: string): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/focus`);
    }

    openTokenAtPath(fucinePath: string): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/open`);
    }

    executeTokenAtPath(fucinePath: string): Promise<TokenExecutionResult> {
      return this.request("POST", `by-path/${fucinePath}/execute`);
    }

    concludeTokenAtPath(fucinePath: string): Promise<Token[]> {
      return this.request("POST", `by-path/${fucinePath}/conclude`);
    }

    unlockTokenAtPath(fucinePath: string): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/unlock`, {
        instant: true,
      });
    }

    setRecipeAtPath(fucinePath: string, recipeId: string): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/recipe`, {
        recipeId,
      });
    }

    setCurrentRecipeAtPath(
      fucinePath: string,
      recipeId: string
    ): Promise<void> {
      return this.request("POST", `by-path/${fucinePath}/recipe`, {
        recipeId,
      });
    }

    async getSpheresAtPath(fucinePath: string): Promise<Sphere[]> {
      const spheres = await this.request(
        "GET",
        `by-path/${fucinePath}/spheres`
      );
      return spheres.map((sphere: GetSphereResponse) => ({
        // Provide a default value for Cultist Simulator
        shrouded: false,
        ...sphere,
      }));
    }

    getTokensAtPath(
      fucinePath: string,
      query: GetTokensQuery = {}
    ): Promise<Token[]> {
      const qs = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      return this.request("GET", `by-path/${fucinePath}/tokens?${qs}`);
    }

    getSituationsAtPath(fucinePath: string): Promise<Situation[]> {
      const qs = new URLSearchParams({ payloadType: "Situation" }).toString();
      return this.request("GET", `by-path/${fucinePath}/tokens?${qs}`);
    }

    getElementStacksAtPath(fucinePath: string): Promise<ElementStack[]> {
      const qs = new URLSearchParams({
        payloadType: "ElementStack",
      }).toString();
      return this.request("GET", `by-path/${fucinePath}/tokens?${qs}`);
    }

    createElementStackAtPath(
      fucinePath: string,
      token: CreatableElementStack
    ): Promise<ElementStack> {
      return this.request("POST", `by-path/${fucinePath}/tokens`, {
        payloadType: "ElementStack",
        ...token,
      });
    }

    createSituationAtPath(
      fucinePath: string,
      token: CreatableSituation
    ): Promise<Situation> {
      return this.request("POST", `by-path/${fucinePath}/tokens`, {
        payloadType: "Situation",
        ...token,
      });
    }
  };
}
