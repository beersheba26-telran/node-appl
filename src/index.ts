import "dotenv/config"
import logger from "./logger.js"
function getParameters(): number[] {
    const firstNumberStr = process.argv[2];
    const firstNumber = processArgument(firstNumberStr, "first")
    logger.debug(`firstNumber is ${firstNumber}`)
    const secondNumberStr = process.argv[3];
    const secondNumber = processArgument(secondNumberStr, "second")
    logger.debug(`secondNumber is ${secondNumber}`)
   
    return [firstNumber, secondNumber]
} 
function sum(firstNumber: number, secondNumber: number): number {
    logger.debug(`function sum arguments : ${firstNumber} and ${secondNumber}`)
    return firstNumber + secondNumber
}
function main() {
   try {
     const numbers: number[] = getParameters()
     logger.debug(`parameters of main are ${numbers}`)
     const result: number = sum(numbers[0] || 0, numbers[1] || 0)
     console.log(`sum of ${numbers[0]} and ${numbers[1]} is ${result}`)
 }
    catch (error) {
        const errorMessage = error as Error
        logger.error(errorMessage.message)
   }
}
function processArgument(param: string | undefined, seqNum: string): number {
    if(!param) {
        throw Error(seqNum +  " number must be provided in arguments")
    }
    const num = Number(param);
    
    if (isNaN(num)) {
        throw Error(seqNum + " argument must be number")
    }
    return num
}
main();
