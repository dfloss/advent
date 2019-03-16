import { expect, assert } from 'chai'
import 'mocha'

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
} from './part1'

const claimString = '#1 @ 1,3: 3x3'
const overlapClaimString = '#2 @ 0,2: 2x2'
const expectedClaimDefinition: ClaimDefintion = {
    id: 1,
    start: {x: 1, y: 3},
    columns: 3,
    rows: 3
}
const expectedPoints = [
            {x: 1, y: 3},
            {x: 2, y: 3},
            {x: 3, y: 3},
            {x: 1, y: 4},
            {x: 2, y: 4},
            {x: 3, y: 4},
            {x: 1, y: 5},
            {x: 2, y: 5},
            {x: 3, y: 5}
        ]
const expectedClaim = {
    id: 1,
    points: expectedPoints
}
const overlapClaim = {
    id: 2,
    points: [
        {x: 0, y: 2},
        {x: 0, y: 3},
        {x: 1, y: 2},
        {x: 1, y: 3}
    ]
}

const expectedClaimPoints = [ 
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
    { x: 3, y: 5 } 
]

describe("part1 - Overlap", () => {
    describe('Parses claim string', () => {
        const resultClaimDefinition = getClaimDefinition(claimString)
        it('is able to parse the claim string', () => {
            assert(resultClaimDefinition != null, 'able to parse string')
        })
        it('gets the correct information', () => {
            expect(resultClaimDefinition, 'has correct information')
              .to.deep.equal(expectedClaimDefinition);
        })
        
    })
    describe('Calculate Claim area as points', () => {
        
        it('gets the correct points for the claim', () => {
            expect(getClaim(expectedClaimDefinition).points)
              .to.have.deep.members(expectedPoints)
        })
    })
    describe('Aggregate Claims', () => {
        it('gets all points for multiple claims sorted', () => {
            const resultPoints = getSortedClaimPoints([expectedClaim, overlapClaim])
            expect(resultPoints).to.have.deep.ordered.members(expectedClaimPoints)
        })
        it('counts overlap', () => {
            const overlapPoints = [
                {x: 0, y:0},
                {x: 1, y:1},
                {x: 1, y:1},
                {x: 1, y:2},
                {x: 2, y:2},
                {x: 2, y:2}
            ]
            expect(getOverlap(overlapPoints)).to.equal(2);
        })
        it('does not double count a multiple overlap', () => {
            const overlapPoints = [
                {x: 0, y:0},
                {x: 1, y:1},
                {x: 1, y:1},
                {x: 1, y:1},
                {x: 1, y:1},
                {x: 1, y:2},
                {x: 2, y:2}
            ]
            expect(getOverlap(overlapPoints)).to.equal(1)
        })
    })
})