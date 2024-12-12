import {useEffect, useState, forwardRef, CSSProperties} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {useSudokuGame} from '@/features/sudoku-game'
import {useGame} from '@/features/game'
import {SudokuSquare} from './components'

import styles from './sudoku-board.module.scss'

type SudokuProps = {
	wrapperStyles?: CSSProperties | undefined
	backgroundBarStyles?: CSSProperties | undefined
}

export const SudokuBoard = forwardRef<HTMLDivElement, SudokuProps>(
	(props, ref) => {
		const [toggle, setToggle] = useState(false)
		const {gameState} = useGame()!

		const {selectedValue, focusedCell, setFocusedCell, inputMatrix} =
			useSudokuGame()!
		const gameComplete = gameState === 'completed'

		const isActive = (selectedValue && selectedValue !== 0) || gameComplete
		const cellPositions: [number, number][] = []

		useEffect(() => {
			setToggle(true)
		}, [inputMatrix])

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				cellPositions.push([i, j])
			}
		}

		const squares = cellPositions.map(([row, col]) => (
			<SudokuSquare
				key={`sudoku_square_${row}${col}`}
				squareRow={row}
				squareCol={col}
				focusedCell={focusedCell}
				setFocusedCell={setFocusedCell}
			/>
		))

		const springs = useSprings(
			squares.length,
			squares.map((_, i) => ({
				opacity: toggle ? '1' : '0',
				delay: i * 50
			}))
		)

		const animatedSquares = springs.map((animatedStyle, i) => (
			<animated.div
				key={i}
				style={animatedStyle}
			>
				{squares[i]}
			</animated.div>
		))

		return (
			<animated.div
				ref={ref}
				style={props.wrapperStyles}
				className={styles.container}
			>
				<animated.div
					style={props.backgroundBarStyles}
					className={`${styles.backgroundBar} ${isActive ? styles.active : ''}`}
				/>

				<animated.div
					style={props.backgroundBarStyles}
					className={`${styles.backgroundBar} ${isActive ? styles.active : ''}`}
				/>

				<div className={`${styles.board} ${isActive ? styles.active : ''}`}>
					{animatedSquares}
				</div>

				<div className={styles.foregroundBar} />
				<div className={styles.foregroundBar} />
			</animated.div>
		)
	}
)
