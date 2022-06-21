
export const genEmptySudokuMatrix = () => Array(9).fill(Array(9).fill(0))

export const deepCopy = (arr) => JSON.parse(JSON.stringify(arr))
