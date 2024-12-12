import {useCallback, useEffect, useState, forwardRef, CSSProperties} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {useSudokuGame} from '@/features/sudoku-game'
import styles from './number-board.module.scss'

type NumberBoardProps = {
	styles?: CSSProperties | undefined
}

export const NumberBoard = forwardRef<HTMLDivElement, NumberBoardProps>(
	(props, ref) => {
		const [toggle, setToggle] = useState(false)
		const {selectedValue, setSelectedValue, workingMatrix} = useSudokuGame()

		useEffect(() => {
			setToggle(true)
		}, [setToggle])

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

		const springs = useSprings(
			9,
			[...Array(10).fill(0)].map((_, i) => ({
				opacity: toggle ? 1 : 0,
				transform: toggle ? 'scale(1)' : 'scale(0)',
				delay: i * 10,
				config: {duration: 200}
			}))
		)

		const animatedButtons = springs.map((animatedStyles, i) => {
			const number = i + 1
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
					key={i}
					style={animatedStyles}
					className={classNames.join(' ')}
					onClick={() => {
						handleClick(number)
					}}
				>
					{number}
				</animated.button>
			)
		})

		return (
			<animated.div
				ref={ref}
				style={props.styles}
				className={styles.container}
			>
				{animatedButtons}
			</animated.div>
		)
	}
)
