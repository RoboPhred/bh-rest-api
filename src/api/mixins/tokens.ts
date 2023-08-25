import { GameEventTiming } from "../../types/events.js";
import { GameSpeed } from "../../types/time.js";
import { Token } from "../../types/tokens.js";
import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetAllTokensQuery {
  spherePrefix?: string | readonly string[];
  payloadType?: string | readonly string[];
  elementId?: string | readonly string[];
}
export interface TokensSHMixin {
  getAllTokens(query?: GetAllTokensQuery): Promise<Token[]>;
}

export function TokensSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements TokensSHMixin {
    getAllTokens({
      spherePrefix,
      payloadType,
      elementId,
    }: GetAllTokensQuery = {}): Promise<Token[]> {
      const spheresAsArray = nullableAsArray(spherePrefix);
      const payloadTypesAsArray = nullableAsArray(payloadType);
      const elementIdsAsArray = nullableAsArray(elementId);
      const qs = new URLSearchParams({
        spherePrefix: spheresAsArray.join(","),
        payloadType: payloadTypesAsArray.join(","),
        elementId: elementIdsAsArray.join(","),
      });

      return this.request("GET", `/tokens?${qs}`);
    }
  };
}

function nullableAsArray<T>(x: T | readonly T[] | null | undefined): T[] {
  if (x === null || x === undefined) {
    return [];
  }
  if (Array.isArray(x)) {
    return x;
  }
  return [x];
}
