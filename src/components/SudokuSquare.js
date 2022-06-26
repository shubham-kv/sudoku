import React, {useEffect, useState} from 'react'
import {useSprings, animated} from '@react-spring/web'

import SudokuCell from 'components/SudokuCell'


export default function SudokuSquare(props) {
	const {
		squareRow, squareCol,
		focusedCell, setFocusedCell
	} = props
	const [toggle, setToggle] = useState(false)

	const rowStart = squareRow * 3
	const rowEnd = squareRow * 3 + 3
	const colStart = squareCol * 3
	const colEnd = squareCol * 3 + 3

	useEffect(() => {
		setToggle(true)
	}, [setToggle])

	const cellPositions = []

	for(let i = rowStart; i < rowEnd; i++) {
		for(let j = colStart; j < colEnd; j++) {
			cellPositions.push([i, j])
		}
	}

	const cells = cellPositions.map(([row, col], i) => (
		<SudokuCell
			key={`sudoku_cell_${row}${col}`}
			row={row}
			col={col}
			focusedCell={focusedCell}
			setFocusedCell={setFocusedCell}
			/>
	))

	const springs = useSprings(
		cells.length,
		cells.map((_, i) => ({
			opacity: toggle ? 1 : 0,
			transform: toggle ? 'scale(1)' : 'scale(0)',
			delay: i * 50
		}))
	)

	const animatedCells = springs.map((animatedStyle, i) => (
		<animated.div key={i} style={animatedStyle}>
			{cells[i]}
		</animated.div>
	))

	return (
		<div className='sudoku_square'>
			{animatedCells}
		</div>
	)
}
