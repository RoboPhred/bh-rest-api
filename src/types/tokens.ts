import { Aspects } from "./aspects";
import { SphereSpec } from "./entities";

export type SpaceOccupation =
  | "Terrain"
  | "PhysicalObject"
  | "Someone"
  | "Intangible"
  | "Meta"
  | "Unknown";

export interface TokenBase {
  id: string;
  path: string;
  spherePath: string;
  inExteriorSphere: boolean;
  payloadType: string;
  occupiesSpaceAs: SpaceOccupation;
}

export type WritableTokenBase = Partial<Pick<Token, "spherePath">>;

export type Token =
  | ElementStack
  | Situation
  | WorkstationSituation
  | ConnectedTerrain;

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
  illuminations: Record<string, string>;
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
  payloadType: "Situation" | "WorkstationSituation" | "RoomWorkSituation";
  verbId: string;
  spontaneous: boolean;
  timeRemaining: number;
  aspects: Aspects;
  hints: string[];
  thresholds: SphereSpec[];
  recipeId: string | null;
  recipeLabel: string | null;
  currentRecipeId: string | null;
  currentRecipeLabel: string | null;
  state: SituationState;
  icon: string;
  label: string;
  description: string;
  verbLabel: string;
  verbDescription: string;
  open: boolean;
}

export interface WorkstationSituation extends Omit<Situation, "payloadType"> {
  payloadType: "WorkstationSituation";
}

export type WritableSituation = Partial<
  Pick<Situation, "spherePath" | "recipeId" | "currentRecipeId" | "open">
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
  infoRecipeId: string;
}

export type WritableTerrainFeature = Partial<
  Pick<TerrainFeature, "sealed" | "shrouded">
>;

export interface ConnectedTerrain extends TerrainFeature {
  payloadType: "ConnectedTerrain";
  unlockRequirements: Record<string, number>;
  unlockForbiddens: Record<string, number>;
  unlockEssentials: Record<string, number>;
}

export function isElementStack(x: Token): x is ElementStack {
  return x.payloadType === "ElementStack";
}

const situationPayloadTypes = [
  "Situation",
  "WorkstationSituation",
  "RoomWorkSituation",
];
export function isSituation(x: Token): x is Situation {
  return situationPayloadTypes.includes(x.payloadType);
}

export function isConnectedTerrain(x: Token): x is ConnectedTerrain {
  return x.payloadType === "ConnectedTerrain";
}
