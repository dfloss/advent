var input = require("./input.json");

import {
  getClaimDefinition,
  calculatePoints,
  getClaim,
  Point,
  Claim,
  ClaimDefintion,
  BoardPoint,
  getSortedClaimPoints,
  getOverlap
} from "./part1";

import { getUniqueClaims, getClaimIdList, ClaimPoint } from "./part2";

const claims = input.map(getClaimDefinition).map(getClaim);

const sortedClaimPoints: ClaimPoint[] = getSortedClaimPoints(claims);

console.log("Part1 - Total number of claim points: ");
console.log(getOverlap(sortedClaimPoints));

console.log("Part2 - Unoverlapped Claim((s): ");
///*
console.log(getUniqueClaims(sortedClaimPoints, getClaimIdList(claims)));
//*/
