import _, {random, range, shuffle} from 'lodash'

const getEmptyCell = (matrix) => {
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 9; j++) {
			if(matrix[i][j] === 0) {
				return {row: i, col: j}
			}
		}
	}
	return null
}

// Checks whether it is valid to put the value in the given cell
const isValidCellValue = (matrix, cell, value) => {
	const rowIndex = cell.row
	const colIndex = cell.col

	// check in row
	for(let i = 0; i < 9; i++) {
		if(matrix[rowIndex][i] === value) {
			return false
		}
	}

	// check in col
	for(let i = 0; i < 9; i++) {
		if(matrix[i][colIndex] === value) {
			return false
		}
	}
	
	// check in the square
	const square = []
	const squareRow = parseInt(rowIndex / 3) * 3
	const squareCol = parseInt(colIndex / 3) * 3

	range(squareRow, squareRow + 3).forEach(row => {
		range(squareCol, squareCol + 3).forEach(col => {
			square.push(matrix[row][col])
		})
	})

	if(square.includes(value)) {
		return false
	}

	return true
}

// Checks whether the cell value in the matrix is invalid
export const isInvalidCell = (inputMatrix, workingMatrix, cell) => {
	const {row, col} = cell
	const cellValue = workingMatrix[row][col]

	const rowArr = workingMatrix[row]
	const rowFilter = rowArr.filter(v => v === cellValue)
	if((inputMatrix[row][col] === 0) && rowFilter.length > 1) {
		return true
	}

	const colArr = range(9).map(i => workingMatrix[i][col])
	const colFilter = colArr.filter(v => v === cellValue)
	if((inputMatrix[row][col] === 0) && colFilter.length > 1) {
		return true
	}

	const squareArr = []
	const squareRow = parseInt(row / 3) * 3
	const squareCol = parseInt(col / 3) * 3

	range(squareRow, squareRow + 3).forEach(row => {
		range(squareCol, squareCol + 3).forEach(col => {
			squareArr.push(workingMatrix[row][col])
		})
	})

	const squareFilter = squareArr.filter(v => v === cellValue)
	if((inputMatrix[row][col] === 0) && squareFilter.length > 1) {
		return true
	}

	return false
}

export const randomize = (matrix) => {
	const newMatrix = JSON.parse(JSON.stringify(matrix))

	for(let i = 0; i < 3; i++) {
		const squareRow = i * 3
		const squareCol = i * 3
		const random1to9 = shuffle(range(1, 9 + 1))
		const wrapped = _(random1to9)

		for(let row = squareRow; row < squareRow + 3; row++) {
			for(let col = squareCol; col < squareCol + 3; col++) {
				newMatrix[row][col] = wrapped.next().value
			}
		}
	}

	return newMatrix
}

export const solveMatrix = (matrix) => {
	const newMatrix = JSON.parse(JSON.stringify(matrix))

	const solver = () => {
		const cell = getEmptyCell(newMatrix)

		if(cell === null) {
			return true;
		}

		const {row, col} = cell

		for(let v = 1; v <= 9; v++) {
			if(isValidCellValue(newMatrix, cell, v)) {
				newMatrix[row][col] = v

				if(solver()) {
					return true
				}

				newMatrix[row][col] = 0
			}
		}

		return false
	}

	return new Promise(resolve => {
		solver()
		resolve(newMatrix)
	})
}

export const removeCells = (matrix, totalCellsToRemove) => {
	let deletedCellCount = 0, iterationCount = 0;

	while((deletedCellCount < totalCellsToRemove)) {
		// console.log('removeCells')
		iterationCount++;

		if(deletedCellCount === 0 && iterationCount > totalCellsToRemove) {
			break
		}

		const row = random(0, 8)
		const col = random(0, 8)

		if(matrix[row][col] === 0) {
			continue
		}
		else {
			matrix[row][col] = 0
			deletedCellCount++
		}
	}
}