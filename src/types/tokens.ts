import { Aspects } from "./aspects";

export interface TokenBase {
  id: string;

  path: string;

  spherePath: string;

  payloadType: string;
}

export type WritableTokenBase = Partial<Pick<Token, "spherePath">>;

export type Token = ElementStack | Situation | ConnectedTerrain;

export type CreatableToken = CreatableElementStack | CreatableSituation;

export type WritableToken =
  | WritableElementStack
  | WritableSituation
  | WritableTerrainFeature;

export interface ElementStack extends TokenBase {
  payloadType: "ElementStack";
  elementId: string;
  quantity: number;
  lifetimeRemaining: number;
  elementAspects: Aspects;
  mutations: Aspects;
  shrouded: boolean;
  label: string;
  description: string;
  icon: string;
  uniquenessGroup: string | null;
  decays: boolean;
  metafictional: boolean;
  unique: boolean;
}

export type WritableElementStack = Partial<
  Pick<ElementStack, "spherePath" | "quantity" | "mutations" | "shrouded">
>;

export interface CreatableElementStack {
  elementId: string;
  quantity: number;
  mutations?: Aspects;
}

export type SituationState =
  | "Inchoate"
  | "Unstarted"
  | "Halting"
  | "Ongoing"
  | "RequiringExecution"
  | "Complete"
  | "Starting";

export interface Situation extends TokenBase {
  payloadType: "Situation";
  verbId: string;
  spontaneous: boolean;
  timeRemaining: number;
  aspects: Aspects;
  recipeId: string | null;
  recipeLabel: string | null;
  currentRecipeId: string | null;
  currentRecipeLabel: string | null;
  state: SituationState;
  icon: string;
  label: string;
  description: string;
  open: boolean;
}

export type WritableSituation = Partial<
  Pick<Situation, "spherePath" | "recipeId" | "open">
>;

export type CreatableSituation =
  | {
      verbId: string;
    }
  | {
      recipeId: string;
    }
  | {
      verbId: string;
      recipeId: string;
    };

export interface TokenExecutionResult {
  executedRecipeId: string;
  executedRecipeLabel: string;
  timeRemaining: number;
}

export interface TerrainFeature extends TokenBase {
  label: string;
  description: string;
  sealed: boolean;
  shrouded: boolean;
}

export type WritableTerrainFeature = Partial<
  Pick<TerrainFeature, "sealed" | "shrouded">
>;

export interface ConnectedTerrain extends TerrainFeature {
  payloadType: "ConnectedTerrain";
}
