import {useCallback} from 'react'

import {useSudokuContext} from '../contexts/SudokuContext'
import {isValidCellValue} from '../sudokuHelpers'
import {deepCopy} from '../myUtils'


export default function SudokuCell(props) {
	const {
		row, col,
		focusedCell,
		setFocusedCell
	} = props

	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix,
		gameComplete
	} = sudokuContextValue

	const handleCellClick = useCallback(
		(row, col) => {
			// if selected value is not null or 0
			if(selectedValue || selectedValue === 0) {
				// if clicked on a modifiable cell
				if(inputMatrix[row][col] === 0) {
					const newMatrix = deepCopy(workingMatrix)

					newMatrix[row][col] = (workingMatrix[row][col] === selectedValue)
						? 0
						: selectedValue

					setWorkingMatrix(newMatrix)
				}
				else {
					// select the value of the clicked cell
					setSelectedValue(inputMatrix[row][col])
				}
				setFocusedCell(null)
			}
			else {
				// select the value of the clicked cell
				setSelectedValue(workingMatrix[row][col])
			}
		},
		[
			selectedValue, setSelectedValue,
			inputMatrix, workingMatrix, setWorkingMatrix,
			setFocusedCell
		]
	)

	const inputMatrixVal = inputMatrix[row][col]
	const value = workingMatrix[row][col]
	const cellClassArr = ['sudoku_cell']

	if(inputMatrixVal !== 0 || gameComplete) {
		cellClassArr.push('unmodifiable')
	}
	else {
		if((value !== 0) && !isValidCellValue(workingMatrix, {row, col}, value)) {
			cellClassArr.push('incorrect')
		}
	}

	// focusedCell
	// the cell in focus while using arrow keys for interaction
	if(focusedCell && (focusedCell.row === row) && (focusedCell.col === col)) {
		cellClassArr.push('focused')
	}

	if(selectedValue && (selectedValue === value)) {
		cellClassArr.push('highlighted')
	}

	if(gameComplete) {
		cellClassArr.push('game_complete')
	}

	const cellClassName = cellClassArr.join(' ')

	return (
		<div className={cellClassName}
			onMouseDown={e => e.preventDefault()}
			onClick={() => handleCellClick(row, col)}>
	
			{value ? value : ''}
		</div>
	)
}

