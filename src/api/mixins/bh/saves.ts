import { APINetworkError } from "../../../errors";
import { SaveInfo } from "../../../types";
import { RESTApiBase } from "../../RESTApiBase";

import { ConstructorOf } from "../../types-internal";

export interface BHSavesMixin {
  getSaves(): Promise<SaveInfo[]>;
  autosave(): Promise<boolean>;
  createSave(saveName: string): Promise<boolean>;
  loadSave(saveName: string): Promise<void>;
}

export function BHSavesMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements BHSavesMixin {
    async getSaves(): Promise<SaveInfo[]> {
      return this.request("GET", "/saves") as Promise<SaveInfo[]>;
    }

    async autosave(): Promise<boolean> {
      try {
        await this.request("POST", "/saves", {});
        return true;
      } catch (e) {
        if (e instanceof APINetworkError && e.statusCode === 409) {
          return false;
        }

        throw e;
      }
    }

    async createSave(saveName: string): Promise<boolean> {
      try {
        await this.request("POST", "/saves", {
          saveName,
        });
        return true;
      } catch (e) {
        if (e instanceof APINetworkError && e.statusCode === 409) {
          return false;
        }

        throw e;
      }
    }

    async loadSave(saveName: string): Promise<void> {
      return this.request("POST", `/saves/current-save`, {
        saveName,
      });
    }
  };
}
