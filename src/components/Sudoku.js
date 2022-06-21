import React from 'react'
import {range} from 'lodash'

import SudokuSquare from './SudokuSquare'
import {useSudokuMatrix} from '../CustomHooks'

export default function Sudoku() {
	const [inputMatrix, workingMatrix, setWorkingMatrix] = useSudokuMatrix()

	return (
		<div className='sudoku_board'>
			{
				range(3).map(i => (
					range(3).map(j => (
						<SudokuSquare
							key={`sudoke_square_${i}${j}`}
							squareRowIndex={i * 3}
							squareColIndex={j * 3}
							matrixArr={[inputMatrix, workingMatrix, setWorkingMatrix]}
							/>
					))
				))
			}
		</div>
	)
}
