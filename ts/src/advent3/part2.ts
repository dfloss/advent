import { isSamePoint, Claim } from "./part1";

export type ClaimPoint = {
    x: number,
    y: number,
    id: number
}
export function getClaimIdList(claims: Claim[]) {
    return claims.map(claim => {
        return claim.id
    })
}
export function getUniqueClaims(sortedClaimPoints: ClaimPoint[], claimIdList: number[]) {
  let remainingIds = claimIdList
  for (let i = 0; i < sortedClaimPoints.length - 1; i++) {
    const currentPoint = sortedClaimPoints[i];
    const nextPoint = sortedClaimPoints[i + 1];

    if (isSamePoint(currentPoint, nextPoint)) {
      //if there is a match remove both points and skip ahead
      const indexCurrent = remainingIds.indexOf(currentPoint.id)
      const indexNext = remainingIds.indexOf(nextPoint.id)
      if (indexCurrent >= 0){
        remainingIds.splice(indexCurrent, 1);
        //not sure of a more elegent way to do this
        //top level && would look better but less efficient
        if (indexNext >= 0) {
            i++
        }
      }
      if (indexNext >= 0){
        remainingIds.splice(indexNext, 1)
      }
    }
  }
  return remainingIds
}
