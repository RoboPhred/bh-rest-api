import { Aspects, AspectsExpression } from "./types";

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

export function aspectsMatchExpression(
  source: AspectsExpression,
  target: Aspects
) {
  for (const aspectName of Object.keys(source)) {
    const aspectExpression = source[aspectName] ?? 0;
    let aspectAmount = Number(aspectExpression);
    if (Number.isNaN(aspectAmount)) {
      aspectAmount = target[aspectExpression] ?? 0;
    }

    const targetAspectAmount = target[aspectName];

    if (targetAspectAmount == 0) {
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

export function actionIdMatches(actionId: string, verbId: string) {
  if (!actionId || actionId === "") {
    return true;
  }

  const comparison = new RegExp(`^${actionId.replace("*", "(?:.*)")}$`);
  return comparison.test(verbId);
}
