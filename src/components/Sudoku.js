import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AppContext} from '../AppContext'

import _, {cloneDeep, random, range, shuffle} from 'lodash'


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
const isInvalidCell = (inputMatrix, workingMatrix, cell) => {
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

const solveMatrix = (matrix) => {
	const newMatrix = Array.from(matrix)

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

const randomize = (matrix) => {
	range(3).forEach(i => {
		const squareRow = i * 3
		const squareCol = i * 3
		const random1to9 = shuffle(range(1, 9 + 1))
		const wrapped = _(random1to9)

		range(squareRow, squareRow + 3).forEach(row => {
			range(squareCol, squareCol + 3).forEach(col => {
				matrix[row][col] = wrapped.next().value
			})
		})
	})
	return matrix
}

const removeCells = (matrix, totalCellsToRemove) => {
	let deletedCellCount = 0;

	while(deletedCellCount < totalCellsToRemove) {
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



function SudokuSquare(props) {
	const {
		squareRowIndex, squareColIndex,
		inputMatrixArr, workingMatrixArr
	} = props

	const appContextValue = useContext(AppContext)	
	const [selectedValue, setSelectedValue] = appContextValue.sValue
	const [inputMatrix] = inputMatrixArr
	const [workingMatrix, setWorkingMatrix] = workingMatrixArr

	const handleCellClick = useCallback((row, col) => {
		if(selectedValue || selectedValue === 0) {
			if(inputMatrix[row][col] === 0) {
				const newMatrix = Array.from(workingMatrix)

				newMatrix[row][col] = 
					(workingMatrix[row][col] === selectedValue)
					? 0
					: selectedValue

				setWorkingMatrix(newMatrix)
			}
			else {
				setSelectedValue(inputMatrix[row][col])
			}
		}
		else {
			setSelectedValue(workingMatrix[row][col])
		}

	}, [inputMatrix, workingMatrix, setWorkingMatrix, selectedValue, setSelectedValue])

	return (
		<div className='sudoku__square'>
			{
				range(squareRowIndex, squareRowIndex + 3).map(row => (
					range(squareColIndex, squareColIndex + 3).map(col => {

						const value = workingMatrix[row][col]
						const wrapperClassList = ['sudoku__cell_wrapper']
						const elClassList = ['sudoku__cell']

						if(inputMatrix[row][col] !== 0) {
							elClassList.push('sudoku__cell--unmodifiable')
						}

						if(value !== 0 && value === selectedValue) {
							elClassList.push('sudoku__cell--highlighted')
						}

						if((value !== 0) && isInvalidCell(inputMatrix, workingMatrix, {row, col})) {
							elClassList.push('sudoku__cell--incorrect')
						}

						return (
							<div
								key={`sudoku_cell_wrapper_${row}${col}`}
								className={wrapperClassList.join(' ')}
								onMouseDown={e => e.preventDefault()}
								onClick={() => handleCellClick(row, col)}
								>
								<div className={elClassList.join(' ')}>
									{(value === 0) ? '' : value}
								</div>
							</div>
						)
					})
				))
			}
		</div>
	)
}


const genEmptyMatrix = () => (
	range(9).map(_ => range(9).map(__ => 0))
)

export default function Sudoku() {
	const [inputMatrix, setInputMatrix] = useState(Array(9).fill(Array(9).fill(0)))
	const [workingMatrix, setWorkingMatrix] = useState(genEmptyMatrix())

	useEffect(() => {
		const loadMatrix = async () => {
			const matrix = await solveMatrix(randomize(genEmptyMatrix()))
			removeCells(matrix, 40)
			setInputMatrix(cloneDeep(matrix))
			setWorkingMatrix(cloneDeep(matrix))
		}
		loadMatrix()
	}, [])

	return (
		<div className='sudoku_board'>
			{
				range(3).map(i => (
					range(3).map(j => (
						<SudokuSquare
							key={`sudoke_square_${i}${j}`}
							squareRowIndex={i * 3}
							squareColIndex={j * 3}
							inputMatrixArr={[inputMatrix]}
							workingMatrixArr={[workingMatrix, setWorkingMatrix]}
							/>
					))
				))
			}
		</div>
	)
}
