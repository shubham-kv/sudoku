import _, {random, range, shuffle} from 'lodash'
import {Cell} from '../types/sudoku'

export const genEmptySudokuMatrix = (): number[][] =>
	Array(9).fill(Array(9).fill(0))

// Returns the first empty cell (or null otherwise) in the sudoku matrix
// as an object with 'row' and 'col' keys.
export const getFirstEmptyCell = (matrix: number[][]): Cell | null => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] === 0) {
				return {row: i, col: j}
			}
		}
	}

	return null
}

export const getAllEmptyCells = (matrix: number[][]): Cell[] => {
	const emptyCells = []

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] === 0) {
				emptyCells.push({row: i, col: j})
			}
		}
	}
	return emptyCells
}

// Checks whether it is correct to put the value in the given cell
export const isValidCellValue = (
	matrix: number[][],
	cell: Cell,
	value: number
) => {
	const rowIndex = cell.row
	const colIndex = cell.col

	// check in row
	for (let i = 0; i < 9; i++) {
		if (i === colIndex) {
			// skip iteration for that cell
			continue
		}

		if (matrix[rowIndex][i] === value) {
			return false
		}
	}

	// check in col
	for (let i = 0; i < 9; i++) {
		if (i === rowIndex) {
			// skip iteration for that cell
			continue
		}

		if (matrix[i][colIndex] === value) {
			return false
		}
	}

	// check in the square
	const square = []
	const squareRowStart = Math.floor(rowIndex / 3) * 3
	const squareColStart = Math.floor(colIndex / 3) * 3

	for (let i = squareRowStart; i < squareRowStart + 3; i++) {
		for (let j = squareColStart; j < squareColStart + 3; j++) {
			if (i === rowIndex && j === colIndex) {
				// again skip iteration for itself
				continue
			}
			square.push(matrix[i][j])
		}
	}

	if (square.includes(value)) {
		return false
	}

	return true
}

// Randomly fills the top-left, middle and bottom-left square of the sudoku matrix.
export const randomlyFillSquares = (matrix: number[][]): number[][] => {
	const newMatrix: number[][] = JSON.parse(JSON.stringify(matrix))

	for (let i = 0; i < 3; i++) {
		const squareRow = i * 3
		const squareCol = i * 3
		const random1to9 = shuffle(range(1, 9 + 1))
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const wrapped = _(random1to9) as unknown as any

		for (let row = squareRow; row < squareRow + 3; row++) {
			for (let col = squareCol; col < squareCol + 3; col++) {
				newMatrix[row][col] = wrapped.next().value
			}
		}
	}

	return newMatrix
}

// Does what it says it does and fills the whole matrix with correct values.
export const solveMatrix = async (matrix: number[][]): Promise<number[][]> => {
	const newMatrix: number[][] = JSON.parse(JSON.stringify(matrix))

	const solver = async (): Promise<boolean> => {
		const cell = getFirstEmptyCell(newMatrix)

		if (cell === null) {
			return true
		}

		const {row, col} = cell

		for (let v = 1; v <= 9; v++) {
			if (isValidCellValue(newMatrix, cell, v)) {
				newMatrix[row][col] = v

				if (await solver()) {
					return true
				}

				newMatrix[row][col] = 0
			}
		}

		return false
	}

	await solver()

	return newMatrix
}

// Randomly removes count cells from the given sudoku matrix.
export const randomlyRemoveCells = (matrix: number[][], count: number) => {
	const filledCells = []

	// get all filled cells into the filledCells array
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] !== 0) {
				filledCells.push({row: i, col: j})
			}
		}
	}

	// remove cells from the matrix
	for (let i = 0; i < count; i++) {
		if (filledCells.length === 0) {
			break
		}

		const cellIndex = random(0, filledCells.length - 1)
		const {row, col} = filledCells[cellIndex]

		matrix[row][col] = 0
		filledCells.splice(cellIndex, 1)
	}
}

// Generates a sudoku matrix with emptyCellCount empty cells
export const genSudokuMatrix = async (emptyCellCount: number) => {
	const randomized = randomlyFillSquares(genEmptySudokuMatrix())

	const matrix = await solveMatrix(randomized)
	randomlyRemoveCells(matrix, emptyCellCount)
	return matrix
}

// Validates the whole sudoku matrix for any incorrect cells
// and return true of false accordingly.
export const validateSudokuMatrix = (matrix: number[][]) => {
	// Validates the array of length 9
	// containing the elements of sudoku from 1 - 9 in any order
	const validator = (array: number[]) => {
		// unique elements of the array
		const uniqueElArr = array.filter((v, i, arr) => arr.indexOf(v) === i)

		// repeated elements will be caught
		if (uniqueElArr.length !== 9) {
			return false
		}

		// value must be through 1 - 9
		const filter = uniqueElArr.filter((v) => v < 1 || v > 9)

		if (filter.length > 0) {
			return false
		}

		return true
	}

	// validate all the rows
	for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
		const row = matrix[rowIndex]

		if (!validator(row)) {
			return false
		}
	}

	// validate all the cols
	for (let colIndex = 0; colIndex < 9; colIndex++) {
		const col = []

		for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
			col.push(matrix[rowIndex][colIndex])
		}

		if (!validator(col)) {
			return false
		}
	}

	// validate all the squares
	for (let squareRowIndex = 0; squareRowIndex < 3; squareRowIndex++) {
		for (let squareColIndex = 0; squareColIndex < 3; squareColIndex++) {
			const square = []

			const rowStart = squareRowIndex * 3
			const rowEnd = squareRowIndex * 3 + 3
			const colStart = squareColIndex * 3
			const colEnd = squareColIndex * 3 + 3

			for (let i = rowStart; i < rowEnd; i++) {
				for (let j = colStart; j < colEnd; j++) {
					square.push(matrix[i][j])
				}
			}

			if (!validator(square)) {
				return false
			}
		}
	}

	return true
}
