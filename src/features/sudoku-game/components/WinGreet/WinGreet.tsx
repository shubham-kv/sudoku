import {forwardRef} from 'react'
import {animated} from '@react-spring/web'

import {useGame} from '@/features/game'
import {formatTime} from '@/utils'
import {PropsWithStyle} from '@/types'

import styles from './win-greet.module.scss'

export const WinGreet = forwardRef<HTMLDivElement, PropsWithStyle>(
	(props, ref) => {
		const {time: elapsedTime, newGame: newGame} = useGame()!

		return (
			<animated.div ref={ref} style={props.style} className={styles.winGreet}>
				<h1>You Won!</h1>
				<p>Elapsed time: {`'${formatTime(elapsedTime)}'`}.</p>

				<div>
					<button onClick={newGame}>New Game</button>
				</div>
			</animated.div>
		)
	}
)

WinGreet.displayName = 'WinGreet'
