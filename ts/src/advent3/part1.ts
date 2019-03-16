export type Point = {
    x: number,
    y: number
}

export type ClaimDefintion = {
    id: number
    start: Point,
    columns: number
    rows: number
}
export type Claim = {
    id: number
    points: Point[]
}
export type BoardPoint = {
    claims: number[]
}
export type Board = Array<Array<BoardPoint>>

export function calculatePoints(start: Point, columns: number, rows: number){
    let points: Point[] = []
    for (let i = 0; i < columns; i++) {
        const x = start.x + i
        for (let j = 0; j < rows; j++) {
            const y = start.y + j
            points.push({x, y})
        }
    }
    return points
}

export function getClaimDefinition(claimDefintionString: string) {
    let id: number = 0,start: Point = {x: 0, y: 0}, columns, rows
    claimDefintionString.split(/[#:@x]/).forEach((rawValue, index) => {
        const value = rawValue.trim();
        //console.log(`value: ${value} ; index: ${index}`)
        switch (index) {
            case 0:
            break
            case 1:
                id = parseInt(value)
                break
            case 2:
                let startString = value.split(',')
                start = {
                    x: parseInt(startString[0]),
                    y: parseInt(startString[1])
                }
            break
            case 3:
                columns = parseInt(value)
            case 4:
                rows = parseInt(value)
            break
            default:
                throw new Error('claim parse failed, too many sections in claim definition')
        }
    })
    return {
        id,
        start,
        columns,
        rows
    }
}

export function getClaim(claimDefinition: ClaimDefintion) {
    const {id, start, columns, rows} = claimDefinition
    return {
        id,
        points: calculatePoints(start, columns, rows)
    }
}

export function isSamePoint(firstPoint: Point, secondPoint: Point){
    if (firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y){
        return true
    }
    else {
        return false
    }
}

export function getOverlap(points: Point[]){
    let overlapPointCount: number = 0
    let isOverlapped = false
    for (let i = 0; i < points.length - 1; i++) {
        const point = points[i];
        const nextPoint = points[i+1]
        if (isSamePoint(point, nextPoint)) {
            if (!isOverlapped) {
                overlapPointCount++
                isOverlapped = true
            }
        }
        else {
            isOverlapped = false
        }
    }
    return overlapPointCount
}

export function getSortedClaimPoints(claims: Claim[]) {
    
    return claims.map(value => {
        //return value.points
        return value.points.map(point => {
            return {
                x: point.x,
                y: point.y,
                id: value.id
            }
        })
    })
    .reduce((prev, curr) => {
        return [...prev, ...curr]
    })
    .sort((a,b) => {
        if (a.x < b.x) return -1
        if (a.x > b.x) return 1
        if (a.y < b.y) return -1
        if (a.y > b.y) return 1
        return 0
    })
}
