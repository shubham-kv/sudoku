import React, {useCallback} from 'react'
import {useSudokuContext} from 'SudokuContext'
import {isInvalidCell} from 'sudokuMethods'


export default function SudokuCell(props) {
	const {
		row, col,
		innerWidth, innerHeight, gridGap
	} = props

	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix
	} = sudokuContextValue

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


	const value = workingMatrix[row][col]
	const cellClassArr = ['sudoku_cell_g']

	if(inputMatrix[row][col] !== 0) {
		cellClassArr.push('unmodifiable')
	}

	if(value !== 0) {
		if(value === selectedValue) {
			cellClassArr.push('highlighted')
		}

		if(isInvalidCell(inputMatrix, workingMatrix, {row, col})) {
			cellClassArr.push('incorrect')
		}
	}

	const sudokuCellClassName = cellClassArr.join(' ')

	const cellOuterWidth = (innerWidth - 2 * gridGap) / 9
	const cellOuterHeight = (innerHeight - 2 * gridGap) / 9
	const circleMargin = 2
	const radius = cellOuterWidth / 2 - circleMargin

	const translateX = col * cellOuterWidth + (parseInt(col / 3) * gridGap)
	const translateY = row * cellOuterHeight + (parseInt(row / 3) * gridGap)
	
	return (
		<g className={sudokuCellClassName}
			transform={`translate(${translateX}, ${translateY})`}>

			{
				((inputMatrix[row][col] !== 0) || cellClassArr.includes('highlighted'))
				? (
					<circle 
						cx={cellOuterWidth/2}
						cy={cellOuterHeight/2}
						r={radius} />
				)
				: null
			}
			
			{
				(value)
				? (
					<text x={cellOuterWidth/2} y={cellOuterHeight/2}>
						{value}
					</text>
				)
				: null
			}

			<rect
				fill='transparent'
				width={cellOuterWidth} height={cellOuterHeight}
				onClick={() => handleCellClick(row, col)}
				/>
		</g>
	)
}
