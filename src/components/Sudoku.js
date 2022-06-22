import React from 'react'
import {range} from 'lodash'

import SudokuFgBars from 'components/SudokuFgBars'
import SudokuCell from 'components/SudokuCell'
import {useSudokuContext} from 'SudokuContext'

import 'styles/sudoku.scss'


export default function Sudoku() {
    const {selectedValue} = useSudokuContext()

	const svgWidth = 300
    const svgHeight = 300
	const margin = 10
	const innerWidth = svgWidth - (2 * margin)
	const innerHeight = svgHeight - (2 * margin)

	const isActive = (selectedValue) && (selectedValue !== 0)

    return (
		<svg className={`sudoku_svg ${isActive ? 'active' : ''}`}
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}>

			<g transform={`translate(${margin}, ${margin})`}>

				<SudokuFgBars
					innerWidth={innerWidth}
					innerHeight={innerHeight}					
					/>

				{
					range(9).map(row => (
						range(9).map(col => (
							<SudokuCell
								key={`sudoku_cell_${row}${col}`}
								row={row}
								col={col}
								innerWidth={innerWidth}
								innerHeight={innerHeight}
								gridGap={10}
								/>
						))
					))
				}
			</g>
		</svg>
    )
}
