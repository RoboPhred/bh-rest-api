import { APINetworkError } from "../../errors.js";
import { PayloadType, Token, WritableToken } from "../../types/tokens.js";

import { RESTApiBase } from "../RESTApiBase.js";

import { ConstructorOf } from "../types-internal.js";

export interface GetAllTokensQuery {
  /**
   * Filter by sphere fucine path prefix.
   * @deprecated Use `fucinePath` instead.
   */
  spherePrefix?: string | readonly string[];

  /**
   * Filter by token fucine path.
   */
  fucinePath?: string | readonly string[];

  /**
   * Filter by payload type.
   */
  payloadType?: PayloadType | readonly PayloadType[];

  /**
   * Filter by element ID.
   */
  elementId?: string | readonly string[];

  /**
   * Filter by verb ID.
   */
  verbId?: string | readonly string[];

  /**
   * Number of tokens to skip.
   */
  skip?: number;

  /**
   * Maximum number of tokens to return.
   */
  limit?: number;
}
export interface TokensSHMixin {
  /**
   * Get all game tokens.
   * WARN: This is an expensive operation.  Make use of filters, skip, and take, to limit its impact.
   * @param query Query for filtering the resulting tokens.
   */
  getAllTokens(query?: GetAllTokensQuery): Promise<Token[]>;

  /**
   * Gets a token by its payload id.
   * @param id The payload id.
   */
  getTokenById(id: string): Promise<Token | null>;

  /**
   * Updates a token by its payload id.
   * @param id The payload id of the token to update.
   * @param token The data to write to the token.
   */
  updateTokenById(id: string, token: WritableToken): Promise<Token>;
}

export function TokensSHMixin<C extends ConstructorOf<RESTApiBase>>(
  constructor: C
) {
  return class extends constructor implements TokensSHMixin {
    getAllTokens({
      spherePrefix,
      fucinePath,
      payloadType,
      elementId,
      verbId,
      skip,
      limit,
    }: GetAllTokensQuery = {}): Promise<Token[]> {
      const spheresAsArray = asArrayOrNull(spherePrefix);
      const fucinePathsAsArray = asArrayOrNull(fucinePath);
      const payloadTypesAsArray = asArrayOrNull(payloadType);
      const elementIdsAsArray = asArrayOrNull(elementId);
      const verbIdsAsArray = asArrayOrNull(verbId);

      const qs = new URLSearchParams({});
      if (spheresAsArray) {
        qs.set("spherePrefix", spheresAsArray.join(","));
      }
      if (fucinePathsAsArray) {
        qs.set("fucinePath", fucinePathsAsArray.join(","));
      }
      if (payloadTypesAsArray) {
        qs.set("payloadType", payloadTypesAsArray.join(","));
      }
      if (elementIdsAsArray) {
        qs.set("elementId", elementIdsAsArray.join(","));
      }
      if (verbIdsAsArray) {
        qs.set("verbId", verbIdsAsArray.join(","));
      }
      if (skip != null) {
        qs.set("skip", skip.toString());
      }
      if (limit != null) {
        qs.set("limit", limit.toString());
      }

      return this.request("GET", `/tokens?${qs}`);
    }

    async getTokenById(id: string): Promise<Token | null> {
      try {
        return await this.request("GET", `/tokens/${id}`);
      } catch (e: any) {
        if (e instanceof APINetworkError) {
          if (e.statusCode === 404) {
            return null;
          }
        }

        throw e;
      }
    }

    updateTokenById(id: string, token: WritableToken): Promise<Token> {
      return this.request("PATCH", `/tokens/${id}`, token);
    }
  };
}

function asArrayOrNull<T>(
  x: T | readonly T[] | null | undefined
): readonly T[] | null {
  if (x === null || x === undefined) {
    return null;
  }

  if (Array.isArray(x)) {
    return x;
  }

  // I don't know why x is typed so weirdly here.
  return [x as any];
}
