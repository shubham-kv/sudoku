const {
	getEmptyCell,
	isValidCellValue, randomlyFillSquares,
	solveMatrix, randomlyRemoveCells,
	genSudokuMatrix, validateSudokuMatrix
} = require('../src/sudokuHelpers')

const {range} = require('lodash')


describe('First empty cell', () => {
	const emptyMatrix = Array(9).fill(Array(9).fill(0))

	test('is [0, 0] in empty matrix.', () => {
		expect(getEmptyCell(emptyMatrix)).not.toBeNull()
		expect(getEmptyCell(emptyMatrix)).toStrictEqual({row: 0, col: 0})
	})

	const filledMatrix = Array(9).fill(Array(9).fill(1))

	test('is null in filled matrix.', () => {
		expect(getEmptyCell(filledMatrix)).toBeNull()
	})
})



describe('Is valid cell value ?', () => {
	const matrix = [
		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 7,  0, 0, 0],

		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 0,  0, 0, 0],

		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 0,  0, 0, 0],
		[0, 0, 0,  0, 0, 0,  0, 0, 0]
	]

	// the concerned cell
	const cell = {row: 2, col: 5}
	const value = matrix[cell.row][cell.col]

	test(`${value} is incorrect anywhere in row ${cell.row}.`, () => {
		for(let i = 0; i < 9; i++) {
			if(i === cell.col) continue;
			expect(isValidCellValue(matrix, {...cell, col: i}, value)).toBe(false)
		}
	})

	test(`${value} is incorrect anywhere in col ${cell.col}.`, () => {
		for(let i = 0; i < 9; i++) {
			if(i === cell.row) continue;
			expect(isValidCellValue(matrix, {...cell, row: i}, value)).toBe(false)
		}
	})


	test(`Another ${value} is incorrect in it's square.`, () => {
		const squareRowStart = parseInt(cell.row / 3) * 3
		const squareColStart = parseInt(cell.col / 3) * 3

		for(let i = squareRowStart; i < (squareRowStart + 3); i++) {
			for(let j = squareColStart; j < (squareColStart + 3); j++) {
				if(i === cell.row && j === cell.col) {
					// skip check for itself
					continue;
				}
				expect(isValidCellValue(matrix, {row: i, col: j}, value)).toBe(false)
			}
		}
	})

	const testCellValue = 9

	test(`${testCellValue} is correct anywhere in 8 cells in row ${cell.row}.`, () => {
		expect(
			isValidCellValue(
				matrix,
				{row: cell.row, col: 0},
				testCellValue
			)
		).toBe(true)
	})

	test(`${testCellValue} is correct anywhere in 8 cells in col ${cell.col}.`, () => {
		expect(
			isValidCellValue(
				matrix, {row: 0, col: cell.col}, testCellValue
			)
		).toBe(true)
	})

	test(`A ${testCellValue} is correct in top middle square.`, () => {
		const squareRowStart = parseInt(cell.row / 3) * 3
		const squareColStart = parseInt(cell.col / 3) * 3

		for(let i = squareRowStart; i < (squareRowStart + 3); i++) {
			for(let j = squareColStart; j < (squareColStart + 3); j++) {
				expect(isValidCellValue(matrix, {row: i, col: j}, testCellValue)).toBe(true)
			}
		}
	})
})


describe(`Randomly Fill Squares.`, () => {
	const originalMatrix = Array(9).fill(Array(9).fill(0))
	const filledMatrix = randomlyFillSquares(originalMatrix)

	test(`Doesn't modify original matrix.`, () => {
		expect(filledMatrix).not.toBe(originalMatrix)
	})

	test('Randomly fills top-left, middle, bottom-left square.', () => {
		for(let i = 0; i < 3; i++) {
			const squareRow = i * 3
			const squareCol = i * 3
	
			for(let row = squareRow; row < squareRow + 3; row++) {
				for(let col = squareCol; col < squareCol + 3; col++) {
					const cellValue = filledMatrix[row][col]
					expect(cellValue).toBeGreaterThanOrEqual(1)
					expect(cellValue).toBeLessThanOrEqual(9)
					expect(isValidCellValue(filledMatrix, {row, col}, cellValue)).toBe(true)
				}
			}
		}
	})

	test(`Other squares aren't modified.`, () => {
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				const squareRow = parseInt(i / 3)
				const squareCol = parseInt(j / 3)

				if(squareRow === squareCol) {
					continue
				}

				const cellValue = filledMatrix[i][j]
				expect(cellValue).toBe(0)
			}
		}
	})
})


describe(`Matrix solver`, () => {
	const originalMatrix = Array(9).fill(Array(9).fill(0))
	const randomizedMatrix = randomlyFillSquares(originalMatrix)

	test(`Every cell is filled and correct.`, async () => {
		const solvedMatrix = await solveMatrix(randomizedMatrix)

		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				const cellValue = solvedMatrix[i][j]

				expect(cellValue).toBeGreaterThanOrEqual(1)
				expect(cellValue).toBeLessThanOrEqual(9)
				expect(
					isValidCellValue(solvedMatrix, {row: i, col: j}, cellValue)
				).toBe(true)
			}
		}
	})
})


describe('Cell remover', () => {
	const n = 10

	test(`Removes ${n} and only ${n} cells.`, () => {
		const matrix = range(9).map(_ => range(1, 10))
		randomlyRemoveCells(matrix, n)

		let removedCount = 0;
		
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				if(matrix[i][j] === 0) {
					removedCount++
				}
			}
		}

		expect(removedCount).toBe(n)
	})

	test(`Doesn't go in an infinite loop.`, () => {
		const matrix = Array(9).fill(Array(9).fill(0))
		randomlyRemoveCells(matrix, n)
		expect('fine').toBe('fine')
	})
})


describe('Sudoku matrix generator', () => {
	const n = 20
	test(`generates matrix with ${n} and only ${n} empty cells.`, async () => {
		let actualEmptyCells = 0;
		const matrix = await genSudokuMatrix(n)

		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				const cellValue = matrix[i][j]

				if(cellValue === 0) {
					actualEmptyCells++
				}
			}
		}

		expect(n).toBe(actualEmptyCells)
	})

	test(`generates matrix with correct cells.`, async () => {
		const matrix = await genSudokuMatrix(10)

		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				const cellValue = matrix[i][j]

				if(cellValue === 0) {
					continue
				}

				expect(
					isValidCellValue(matrix, {row: i, col: j}, cellValue)
				).toBe(true)
			}
		}
	})
})


describe('Matrix validator', () => {
	const matrix = [
		[7, 1, 4,  3, 2, 5,  6, 8, 9],
		[6, 5, 3,  4, 9, 8,  7, 1, 2],
		[9, 2, 8,  7, 1, 6,  3, 4, 5],

		[1, 8, 2,  6, 4, 7,  9, 5, 3],
		[4, 6, 9,  1, 5, 3,  8, 2, 7],
		[3, 7, 5,  2, 8, 9,  4, 6, 1],

		[5, 4, 7,  9, 6, 1,  2, 3, 8],
		[8, 9, 6,  5, 3, 2,  1, 7, 4],
		[2, 3, 1,  8, 7, 4,  5, 9, 6]
	]

	test('invalidates rows with empty values', () => {
		const temp = matrix[0][4]
		matrix[0][4] = 0
		expect(validateSudokuMatrix(matrix)).toBe(false)
		matrix[0][4] = temp
	})

	test('invalidates rows with repeated values', () => {
		const temp = matrix[0][4]
		matrix[0][4] = 1
		expect(validateSudokuMatrix(matrix)).toBe(false)
		matrix[0][4] = temp
	})

	test('invalidates cols with empty values', () => {
		const temp = matrix[3][8]
		matrix[3][8] = 0
		expect(validateSudokuMatrix(matrix)).toBe(false)
		matrix[3][8] = temp
	})

	test('invalidates cols with repetead values', () => {
		const temp = matrix[3][8]
		matrix[3][8] = 9
		expect(validateSudokuMatrix(matrix)).toBe(false)
		matrix[3][8] = temp
	})
})

