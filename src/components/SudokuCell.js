import React from 'react'

import {isInvalidCell} from '../sudokuMethods'


export default function SudokuCell(props) {
	const {
		cellI, cellJ,
		row, col,
		inputMatrix, workingMatrix,
		selectedValue,
		clickHandler
	} = props

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

	const cellOuterWidth = 100/3, cellOuterHeight = 100/3
	const halfCellOuterWidth = cellOuterWidth/2, HalfCellOuterHeight = cellOuterHeight/2
	const circleMargin = 2
	const radius = cellOuterWidth/2 - circleMargin
	
	return (
		<g className={sudokuCellClassName}
			transform={`translate(${cellJ * cellOuterWidth}, ${cellI * cellOuterHeight})`}>

			{
				((inputMatrix[row][col] !== 0) || cellClassArr.includes('highlighted')) &&
					<circle 
						cx={halfCellOuterWidth}
						cy={HalfCellOuterHeight}
						r={radius}
						/>
			}
			
			{
				value &&
					<text x={halfCellOuterWidth} y={HalfCellOuterHeight}>
						{value}
					</text>
			}

			<rect
				fill='transparent'
				width={cellOuterWidth} height={cellOuterHeight}
				onClick={clickHandler}
				/>
		</g>
	)
}
