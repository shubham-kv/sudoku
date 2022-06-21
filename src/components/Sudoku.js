import React, {useContext} from 'react'
import {range} from 'lodash'

import SudokuLines from './SudokuLines'
import SudokuSquare from './SudokuSquare'
import {SudokuContext} from '../SudokuContext'
import {useSudokuMatrix} from '../customHooks'

import 'styles/sudoku.scss'


export default function Sudoku() {
	const [inputMatrix, workingMatrix, setWorkingMatrix] = useSudokuMatrix()
	const [selectedValue] = useContext(SudokuContext)

	const svgWidth = 300
	const svgHeight = 300

	return (
		<svg className={(selectedValue && (selectedValue !== 0)) ? 'sudoku_svg active' : 'sudoku_svg'}
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}>

			<SudokuLines />

			{
				range(3).map(i => (
					range(3).map(j => (
						<SudokuSquare
							key={`sudoke_square_${i}${j}`}
							svgWidth={svgWidth}
							svgHeight={svgHeight}
							squareI={i}
							squareJ={j}
							matrixArr={[inputMatrix, workingMatrix, setWorkingMatrix]}
							/>
					))
				))
			}
		</svg>
	)
}
