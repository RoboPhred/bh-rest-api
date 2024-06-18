import { SaveInfo } from "../../../types";
import { RESTApiBase } from "../../RESTApiBase";

import { ConstructorOf } from "../../types-internal";

export interface BHSavesMixin {
  getSaves(): Promise<SaveInfo[]>;
  loadSave(saveName: string): Promise<void>;
}

export function BHSavesMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements BHSavesMixin {
    async getSaves(): Promise<SaveInfo[]> {
      return this.request("GET", "/saves") as Promise<SaveInfo[]>;
    }

    async loadSave(saveName: string): Promise<void> {
      return this.request("POST", `/saves`, {
        saveName,
      });
    }
  };
}
