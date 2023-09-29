import { Aspects } from "./types";

export function aspectsMatch(source: Aspects, target: Aspects, exact = false) {
  for (const aspectName of Object.keys(source)) {
    const aspectAmount = source[aspectName] ?? 0;

    const targetAspectAmount = target[aspectName];

    if (exact || targetAspectAmount == 0) {
      if (targetAspectAmount !== aspectAmount) {
        return false;
      }
    } else if (targetAspectAmount > 0) {
      if (aspectAmount < targetAspectAmount) {
        return false;
      }
    } else if (targetAspectAmount < 0) {
      if (aspectAmount >= -targetAspectAmount) {
        return false;
      }
    }
  }

  return true;
}

export function combineAspects(a: Aspects, b: Aspects): Aspects {
  const result: Aspects = {};

  for (const aspectName of Object.keys(a)) {
    result[aspectName] = (result[aspectName] ?? 0) + a[aspectName];
  }

  for (const aspectName of Object.keys(b)) {
    result[aspectName] = (result[aspectName] ?? 0) + b[aspectName];
  }

  return result;
}
