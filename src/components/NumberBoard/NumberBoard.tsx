import {useCallback, useEffect, useState, forwardRef} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {useSudokuContext} from '../../hooks'
import {NumberBoardProps} from './types'

import styles from './number-board.module.scss'

export const NumberBoard = forwardRef<HTMLDivElement, NumberBoardProps>(
	(props, ref) => {
		const [toggle, setToggle] = useState(false)
		const {selectedValue, setSelectedValue, workingMatrix} = useSudokuContext()

		useEffect(() => {
			setToggle(true)
		}, [setToggle])

		const handleClick = useCallback(
			(_: React.MouseEvent<HTMLButtonElement, MouseEvent>, number: number) => {
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
			10,
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
			const classNames = [styles.numberInput]

			if (count === 0) {
				classNames.push(styles.numberInputFilled)
			}

			if (selectedValue === number) {
				classNames.push(styles.numberInputActive)
			}

			const className = classNames.join(' ')

			return (
				<animated.button
					key={i}
					style={animatedStyles}
					className={className}
					onClick={(e) => {
						if (number === 10) {
							setSelectedValue(0)
						} else {
							handleClick(e, number)
						}
					}}
				>
					{i === 9 ? 'x' : number}
				</animated.button>
			)
		})

		return (
			<animated.div
				ref={ref}
				style={props.styles}
				className={styles.numberBoardRoot}
			>
				{animatedButtons}
			</animated.div>
		)
	}
)
