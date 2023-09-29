import { Aspects, AspectsExpression } from "./types";

export function aspectsMatch(value: Aspects, match: Aspects, exact = false) {
  for (const aspectName of Object.keys(match)) {
    const aspectAmount = value[aspectName] ?? 0;

    const matchAspectAmount = match[aspectName];

    if (exact || matchAspectAmount == 0) {
      if (matchAspectAmount !== aspectAmount) {
        return false;
      }
    } else if (matchAspectAmount > 0) {
      if (aspectAmount < matchAspectAmount) {
        return false;
      }
    } else if (matchAspectAmount < 0) {
      if (aspectAmount >= -matchAspectAmount) {
        return false;
      }
    }
  }

  return true;
}

export function aspectsMatchExpression(
  value: Aspects,
  match: AspectsExpression
) {
  for (const aspectName of Object.keys(match)) {
    const matchAspectExpression = match[aspectName] ?? 0;
    let matchAspectAmount = Number(matchAspectExpression);
    if (Number.isNaN(matchAspectAmount)) {
      matchAspectAmount = value[matchAspectExpression] ?? 0;
    }

    const valueAspectAmount = value[aspectName];

    if (matchAspectAmount == 0) {
      if (matchAspectAmount !== valueAspectAmount) {
        return false;
      }
    } else if (matchAspectAmount > 0) {
      if (valueAspectAmount < matchAspectAmount) {
        return false;
      }
    } else if (matchAspectAmount < 0) {
      if (valueAspectAmount >= -matchAspectAmount) {
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
