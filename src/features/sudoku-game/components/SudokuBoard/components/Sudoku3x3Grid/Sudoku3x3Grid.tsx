'use client'

import {useEffect, useState} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {SudokuCell} from '../SudokuCell'
import {SudokuSquareProps} from './types'

import styles from './sudoku-grid.module.scss'

export function Sudoku3x3Grid(props: SudokuSquareProps) {
	const {squareRow, squareCol, focusedCell, setFocusedCell} = props
	const [toggle, setToggle] = useState(false)

	const [cellPositions] = useState<[number, number][]>(() => {
		const rowStart = squareRow * 3
		const rowEnd = squareRow * 3 + 3
		const colStart = squareCol * 3
		const colEnd = squareCol * 3 + 3
		const cellPositions: [number, number][] = []

		for (let i = rowStart; i < rowEnd; i++) {
			for (let j = colStart; j < colEnd; j++) {
				cellPositions.push([i, j])
			}
		}

		return cellPositions
	})

	useEffect(() => {
		setToggle(true)
	}, [])

	const numberOfCells = 9
	const cellSprings = useSprings(
		numberOfCells,
		[...Array(numberOfCells).fill(0)].map((_, i) => ({
			opacity: toggle ? 1 : 0,
			transform: toggle ? 'scale(1)' : 'scale(0)',
			delay: i * numberOfCells * 5
		}))
	)

	return (
		<div className={styles.sudokuSquare}>
			{cellSprings.map((style, i) => (
				<animated.div key={i} style={style}>
					<SudokuCell
						row={cellPositions[i][0]}
						col={cellPositions[i][1]}
						focusedCell={focusedCell}
						setFocusedCell={setFocusedCell}
					/>
				</animated.div>
			))}
		</div>
	)
}
