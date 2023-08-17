import {forwardRef} from 'react'
import {animated} from '@react-spring/web'

import {useSudokuContext} from '../../hooks'
import {formatTime} from '../../utils'
import {WinGreetProps} from './types'

import styles from './win-greet.module.scss'

export const WinGreet = forwardRef<HTMLDivElement, WinGreetProps>(
	(props, ref) => {
		const {elapsedTime, genNewGame} = useSudokuContext()

		return (
			<animated.div
				ref={ref}
				style={props.styles}
				className={styles.winGreet}
			>
				<h1>You Won!</h1>
				<p>Elapsed time: {`'${formatTime(elapsedTime)}'`}.</p>

				<div>
					<button onClick={() => genNewGame()}>New Game</button>
				</div>
			</animated.div>
		)
	}
)
