import React, {useCallback, useContext} from 'react'
import {range} from 'lodash'

import SudokuCell from './SudokuCell'
import {SudokuContext} from '../SudokuContext'


export default function SudokuSquare(props) {
	const {
		svgWidth, svgHeight,
		squareI, squareJ, matrixArr
	} = props

	const [selectedValue, setSelectedValue] = useContext(SudokuContext)
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

	const rectWidth = svgWidth/3
	const rectHeight = svgHeight/3
	const squareRowIndex = squareI * 3
	const squareColIndex = squareJ * 3

	return (
		<g className='sudoku_square'
			transform={`translate(${squareJ * rectWidth}, ${squareI * rectHeight})`}>

			{
				range(squareRowIndex, squareRowIndex + 3).map((row, i) => (
					range(squareColIndex, squareColIndex + 3).map((col, j) => (
						<SudokuCell
							key={`sudoku_cell_${row}${col}`}
							cellI={i}
							cellJ={j}
							row={row} col={col}
							inputMatrix={inputMatrix}
							workingMatrix={workingMatrix}
							selectedValue={selectedValue}
							clickHandler={() => handleCellClick(row, col)}
							/>
					))
				))
			}
		</g>
	)
}
