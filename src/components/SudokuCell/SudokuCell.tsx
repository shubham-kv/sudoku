import {useCallback} from 'react'

import {useSudokuContext} from '../../hooks'
import {deepCopy, isValidCellValue} from '../../utils'

import {SudokuCellProps} from './types'

import styles from './sudoku-cell.module.scss'

export function SudokuCell(props: SudokuCellProps) {
	const {row, col, focusedCell, setFocusedCell} = props

	const {
		selectedValue,
		setSelectedValue,
		inputMatrix,
		workingMatrix,
		setWorkingMatrix,
		gameComplete
	} = useSudokuContext()

	const handleCellClick = useCallback(
		(row: number, col: number) => {
			// if selected value is not null or 0
			if (selectedValue || selectedValue === 0) {
				// if clicked on a modifiable cell
				if (inputMatrix[row][col] === 0) {
					const newMatrix = deepCopy(workingMatrix)

					newMatrix[row][col] =
						workingMatrix[row][col] === selectedValue ? 0 : selectedValue

					setWorkingMatrix(newMatrix)
				} else {
					// select the value of the clicked cell
					setSelectedValue(inputMatrix[row][col])
				}
				setFocusedCell(null)
			} else {
				// select the value of the clicked cell
				setSelectedValue(workingMatrix[row][col])
			}
		},
		[
			selectedValue,
			setSelectedValue,
			inputMatrix,
			workingMatrix,
			setWorkingMatrix,
			setFocusedCell
		]
	)

	const inputMatrixVal = inputMatrix[row][col]
	const value = workingMatrix[row][col]
	const classNames = [styles.sudokuCell]

	if (inputMatrixVal !== 0 || gameComplete) {
		classNames.push(styles.unmodifiable)
	} else {
		if (value !== 0 && !isValidCellValue(workingMatrix, {row, col}, value)) {
			classNames.push(styles.incorrect)
		}
	}

	// focusedCell
	// the cell in focus while using arrow keys for interaction
	if (focusedCell && focusedCell.row === row && focusedCell.col === col) {
		classNames.push(styles.focused)
	}

	if (selectedValue && selectedValue === value) {
		classNames.push(styles.highlighted)
	}

	if (gameComplete) {
		classNames.push(styles.gameComplete)
	}

	const className = classNames.join(' ')

	return (
		<div
			className={className}
			onMouseDown={(e) => e.preventDefault()}
			onClick={() => handleCellClick(row, col)}
		>
			{value ? value : ''}
		</div>
	)
}
