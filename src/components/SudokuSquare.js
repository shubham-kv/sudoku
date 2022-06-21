import React, {useCallback, useContext} from 'react'
import {range} from 'lodash'

import {SudokuContext} from '../SudokuContext'
import {isInvalidCell} from '../sudokuMethods'


export default function SudokuSquare({squareRowIndex, squareColIndex, matrixArr}) {
	const sudokuContextValue = useContext(SudokuContext)	
	const [selectedValue, setSelectedValue] = sudokuContextValue.sValue

	const [inputMatrix, workingMatrix, setWorkingMatrix] = matrixArr
	
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
		<div className='sudoku_square'>
			{
				range(squareRowIndex, squareRowIndex + 3).map(row => (
					range(squareColIndex, squareColIndex + 3).map(col => {

						const value = workingMatrix[row][col]
						const elClassList = ['sudoku_cell']

						if(inputMatrix[row][col] !== 0) {
							elClassList.push('unmodifiable')
						}

						if(value !== 0) {
							if(value === selectedValue) {
								elClassList.push('highlighted')
							}

							if(isInvalidCell(inputMatrix, workingMatrix, {row, col})) {
								elClassList.push('incorrect')
							}
						}

						return (
							<div
								key={`sudoku_cell_wrapper_${row}${col}`}
								className={'sudoku_cell_wrapper'}
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
