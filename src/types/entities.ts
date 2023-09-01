import { Aspects } from "./aspects";

export interface Element {
  id: string;
  aspects: Aspects;
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

export interface XTrigger {
  id: string;
  morpheffect: string;
  level: number;
  chance: number;
  lever: string;
}
