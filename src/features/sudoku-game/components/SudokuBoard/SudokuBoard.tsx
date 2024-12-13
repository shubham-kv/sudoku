'use client'

import {useEffect, useState, forwardRef, CSSProperties} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {useSudokuGame} from '@/features/sudoku-game'
import {useGame} from '@/features/game'
import {Sudoku3x3Grid} from './components'
import {PropsWithStyle} from '@/types'

import styles from './sudoku-board.module.scss'

type SudokuBoardProps = PropsWithStyle & {
	backgroundBarStyles?: CSSProperties | undefined
}

export const SudokuBoard = forwardRef<HTMLDivElement, SudokuBoardProps>(
	(props, ref) => {
		const [toggle, setToggle] = useState(false)
		const {gameState} = useGame()!

		const {selectedValue, focusedCell, setFocusedCell, inputMatrix} =
			useSudokuGame()!
		const gameComplete = gameState === 'completed'

		const isActive = (selectedValue && selectedValue !== 0) || gameComplete
		const cellPositions: [number, number][] = []

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				cellPositions.push([i, j])
			}
		}

		const numberOfGrids = 9
		const gridSprings = useSprings(
			numberOfGrids,
			[...Array(numberOfGrids).fill(0)].map((_, i) => ({
				opacity: toggle ? '1' : '0',
				delay: i * numberOfGrids * 5
			}))
		)

		useEffect(() => {
			setToggle(true)
		}, [])

		return (
			<animated.div ref={ref} style={props.style} className={styles.container}>
				<animated.div
					style={props.backgroundBarStyles}
					className={`${styles.backgroundBar} ${isActive ? styles.active : ''}`}
				/>

				<animated.div
					style={props.backgroundBarStyles}
					className={`${styles.backgroundBar} ${isActive ? styles.active : ''}`}
				/>

				<div className={`${styles.board} ${isActive ? styles.active : ''}`}>
					{gridSprings.map((style, i) => (
						<animated.div key={i} style={style}>
							<Sudoku3x3Grid
								key={`sudoku_square_${cellPositions[i][0]}${cellPositions[i][1]}`}
								squareRow={cellPositions[i][0]}
								squareCol={cellPositions[i][1]}
								focusedCell={focusedCell}
								setFocusedCell={setFocusedCell}
							/>
						</animated.div>
					))}
				</div>

				<div className={styles.foregroundBar} />
				<div className={styles.foregroundBar} />
			</animated.div>
		)
	}
)

SudokuBoard.displayName = 'SudokuBoard'
