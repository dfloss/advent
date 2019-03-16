function getAdjustmentValue(adjustment: string){
    if(adjustment.length < 2){
        throw new Error(`invalid adjustment: ${adjustment}`)
    }
    const sign: string = adjustment.split("")[0]
    const valueString: string = adjustment.substr(1);
    switch (sign){
        case '+':
            return 0 + (parseInt(valueString));
        case '-':
            return 0 - (parseInt(valueString));
        default:
            throw new Error("invalid adjustment, must start with + or -")
    }
}
function getNextFrequency(currentFrequency: number, adjustment: string) {
    return currentFrequency + getAdjustmentValue(adjustment);
}

function getFinalFrequency(adjustments: string[]){
    return adjustments.reduce((frequency: number, adjustment: string) => {
        return frequency + getAdjustmentValue(adjustment);
    }, 0);
}

function findFirstDuplicateFrequency(adjustments: string[]) {
    let frequencyTable: object = {}
    let currentFrequency: number = 0
    let isDuplicateFound: boolean = false;
    while (true) {
        for(let adjustment of adjustments){
            if (frequencyTable[currentFrequency]){
                isDuplicateFound = true
                break
            }
            else {
                frequencyTable[currentFrequency] = true;
                currentFrequency = getNextFrequency(currentFrequency, adjustment);
            }
        }
        if (isDuplicateFound){
            return currentFrequency
        }
    }

}

const input: string[] = require('./input.json');
const output = findFirstDuplicateFrequency(input);
console.log(output);
//console.log(getFinalFrequency(input));
//console.log(getFrequency(process.argv[2]))