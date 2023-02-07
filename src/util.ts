export const sentenceSplitter = (sentence: string, limit: number) => {
    let firstLine = "";
    let secondLine = "";
    const words = sentence.split(" ");
    for (const word of words) {
        if (firstLine.length + word.length + 1 <= limit) {
            firstLine += (firstLine ? " " : "") + word;
        } else {
            secondLine += (secondLine ? " " : "") + word;
        }
    }
    return { firstLine, secondLine }
}