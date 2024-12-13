import {useCallback, forwardRef} from 'react'
import {animated} from '@react-spring/web'

import {useGame} from '@/features/game'
import {useSudokuGame} from '@/features/sudoku-game'
import {PropsWithStyle} from '@/types'

import styles from './number-board.module.scss'

type NumberButtonProps = PropsWithStyle & {
	number: number
}

export const NumberButton = forwardRef<HTMLButtonElement, NumberButtonProps>(
	(props, ref) => {
		const {number} = props
		const {gameState} = useGame()!
		const {selectedValue, setSelectedValue, workingMatrix} = useSudokuGame()
		const gameRunning = gameState === 'running'

		const handleClick = useCallback(
			(number: number) => {
				if (selectedValue === number) {
					setSelectedValue(null)
				} else {
					setSelectedValue(number)
				}
			},
			[selectedValue, setSelectedValue]
		)

		const getCountOfNumber = useCallback(
			(number: number) => {
				let count = 0

				for (let i = 0; i < 9; i++) {
					for (let j = 0; j < 9; j++) {
						if (number !== 0 && workingMatrix[i][j] === number) {
							count++
						}
					}
				}

				return 9 - count
			},
			[workingMatrix]
		)

		const count = getCountOfNumber(number)
		const classNames = [styles.button]

		if (count === 0) {
			classNames.push(styles.filled)
		}

		if (selectedValue === number) {
			classNames.push(styles.active)
		}

		return (
			<animated.button
				ref={ref}
				style={props.style}
				className={classNames.join(' ')}
				{...(gameRunning ? {onClick: () => handleClick(number)} : {})}
			>
				{number}
			</animated.button>
		)
	}
)

NumberButton.displayName = 'NumberButton'
