import { Token } from "../../types/tokens.js";

import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetAllTokensQuery {
  spherePrefix?: string | readonly string[];
  payloadType?: string | readonly string[];
  elementId?: string | readonly string[];
  verbId?: string | readonly string[];
  skip?: number;
  limit?: number;
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
      verbId,
      skip,
      limit,
    }: GetAllTokensQuery = {}): Promise<Token[]> {
      const spheresAsArray = nullableAsArray(spherePrefix);
      const payloadTypesAsArray = nullableAsArray(payloadType);
      const elementIdsAsArray = nullableAsArray(elementId);
      const verbIdsAsArray = nullableAsArray(verbId);
      const qs = new URLSearchParams({
        spherePrefix: spheresAsArray.join(","),
        payloadType: payloadTypesAsArray.join(","),
        elementId: elementIdsAsArray.join(","),
        verbId: verbIdsAsArray.join(","),
      });

      if (skip !== undefined) {
        qs.set("skip", skip.toString());
      }

      if (limit !== undefined) {
        qs.set("limit", limit.toString());
      }

      return this.request("GET", `/tokens?${qs}`);
    }
  };
}

function nullableAsArray<T>(
  x: T | readonly T[] | null | undefined
): readonly T[] {
  if (x === null || x === undefined) {
    return [];
  }

  if (Array.isArray(x)) {
    return x;
  }

  // I don't know why x is typed so weirdly here.
  return [x as any];
}
