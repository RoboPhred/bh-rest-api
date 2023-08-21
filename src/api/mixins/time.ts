import { GameEventTiming } from "../../types/events.js";
import { GameSpeed } from "../../types/time.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface TimeSHMixin {
  setSpeed(speed: GameSpeed): Promise<void>;
  passTime(seconds: number): Promise<void>;
  getNextEvents(): Promise<GameEventTiming>;
  passTimeToNextEvent(): Promise<number>;
}

export function TimeSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements TimeSHMixin {
    async getSpeed(): Promise<GameSpeed> {
      const result = await this.request("GET", `time/speed`);
      return result.speed;
    }

    setSpeed(speed: GameSpeed) {
      return this.request("POST", `time/speed`, {
        speed,
      });
    }

    passTime(seconds: number) {
      return this.request("POST", `time/beat`, {
        seconds,
      });
    }

    getNextEvents(): Promise<GameEventTiming> {
      return this.request("GET", `time/events`);
    }

    passTimeToNextEvent(): Promise<number> {
      return this.request("POST", `time/events/beat`);
    }
  };
}
