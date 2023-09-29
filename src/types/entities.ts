import { Aspects, AspectsExpression } from "./aspects";

export interface Element {
  id: string;
  aspects: Aspects;
  slots: SphereSpec[];
  burnTo: string;
  comments: string;
  commute: string[];
  decays: boolean;
  decaysTo: string;
  description: string;
  drownTo: string;
  icon: string;
  inherits: string;
  isAspect: boolean;
  isHidden: boolean;
  label: string;
  lever: string;
  lifetime: number;
  metafictional: boolean;
  noArtNeeded: boolean;
  resaturate: boolean;
  sort: string;
  unique: boolean;
  uniquenessGroup: string;
  verbIcon: string;
  xtriggers: Record<string, XTrigger[]>;
  xexts: Record<string, string>;
}

export interface Recipe {
  id: string;
  actionId: string;
  label: string;
  description: string;
  aspects: Aspects;
  startLabel: string;
  startDescription: string;
  preSlots: SphereSpec[];
  slots: SphereSpec[];
  warmup: number;
  requirements: AspectsExpression;
  extantRequirements: AspectsExpression;
  effects: Record<string, string>;
}

export interface Verb {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: string;
  multiple: boolean;
  spontaneous: boolean;
  thresholds: SphereSpec[];
  aspets: Aspects;
  hints: string[];
  xtriggers: Record<string, XTrigger[]>;
}

export interface SphereSpec {
  id: string;
  label: string;
  description: string;
  actionId: string;
  ifAspectsPresent: AspectsExpression;
  greedy: boolean;
  essential: Aspects;
  required: Aspects;
  forbidden: Aspects;
}

export interface XTrigger {
  id: string;
  morpheffect: string;
  level: number;
  chance: number;
  lever: string;
}
