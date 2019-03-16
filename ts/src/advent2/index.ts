const advent2Input = require('./input.json');

interface LetterCount {
    [key: string]: number
}
interface CountResult {
    two: boolean
    three: boolean
}

function getLetterCount(inputString: string){
    let letterCount: LetterCount = {};
    inputString.split('').forEach(letter => {
        if (letterCount[letter]) {
            letterCount[letter] += 1
        }
        else {
            letterCount[letter] = 1;
        }
    });
    return letterCount;
}

function get2and3LetterCount(letterCount: LetterCount){
    let countResult: CountResult = {
        two: false,
        three: false
    }
    for(const letter of Object.keys(letterCount)){
        const count = letterCount[letter]
        if (count === 2){
            countResult.two = true
        }
        if (count === 3) {
            countResult.three = true
        }
        if (countResult.two && countResult.three){
            break
        }
    }
    return countResult
}

function getChecksum(input: string[]) {
    let twoCount: number = 0
    let threeCount: number = 0
    input.forEach(id => {
        const result = get2and3LetterCount(getLetterCount(id));
        if (result.two){
            twoCount+=1
        }
        if (result.three) {
            threeCount+=1
        }
    })
    return twoCount * threeCount
}

//console.log(getChecksum(advent1Input))
type IdWithChecksum = [number, string]
type idMatchResults = {
    id: string,
    matches: string[]
}

function getCharacterValue (character: string){
    return character.charCodeAt(0) - 96;
}

function getIdChecksum(id: string) {
    let checksum: number = id.split('').reduce(
        (agg: number, letter: string) => {
            return agg + getCharacterValue(letter); 
        }
    , 0)
    const returnObject: IdWithChecksum = [checksum, id]
    return returnObject
}

function checkWordLetterMatch(word1: string, word2: string, maxDifference = 1) {
    let difference = 0

    if (word1.length !== word2.length){
        throw new Error("word size mismatch")
    }
    for(let i = 0; i < word1.length; i++){
        if (word1[i] !== word2[i]) {
            if (difference === maxDifference){
                return false
            }
            difference++
        }
    }
    return true
}
function compareIds(idWithChecksum: IdWithChecksum, index: number, ids: IdWithChecksum[]) {
    const id: string = idWithChecksum[1]
    const maxChecksum: number = idWithChecksum[0] + 26
    let lookAheadIndex: number = index + 1;
    let lookAheadChecksum = 0
    let lookAheadId: string;
    let matches: string[] = []
    while (lookAheadChecksum < maxChecksum && lookAheadIndex < ids.length) {
        [lookAheadChecksum, lookAheadId] = ids[lookAheadIndex]
        if (checkWordLetterMatch(id, lookAheadId)){
            matches.push(lookAheadId)
        }
        lookAheadIndex++
    }
    return {id, matches}
}

function getSharedLetters(matchResults: idMatchResults) {
    let sharedLettersResults: string[] = []
    matchResults.matches.forEach( match => {
        let sharedLetters = ""
        match.split('').forEach((letter, index) => {
           if (letter === matchResults.id[index]){
               sharedLetters += letter
           } 
        })
        sharedLettersResults.push(sharedLetters)
    })
    return sharedLettersResults
}

function findMatchingIds(input: string[]) {
    const sorted = input.map(id => {
        return getIdChecksum(id)
    })
    .sort((a,b) => a[0] - b[0])
    .map(compareIds)
    .filter(results => results.matches.length !== 0 )
    .map( match => {
        return getSharedLetters(match)
    })
    
    return sorted
}
console.log(findMatchingIds(advent2Input))
//console.log(checkWordLetterMatch("testo", "testb"))