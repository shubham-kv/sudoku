import {forwardRef} from 'react'
import {animated} from '@react-spring/web'

import {useSudokuContext} from 'contexts/SudokuContext'
import {formatTime} from 'myUtils'

import 'styles/win_greet.scss'

const WinGreet = forwardRef((props, ref) => {
	const {elapsedTime, genNewGame} = useSudokuContext()

	return (
		<animated.div ref={ref} style={props.style} className='win_greet'>
			<h1>You Won!</h1>
			<p>
				Elapsed time: {`'${formatTime(elapsedTime)}'`}.
			</p>

			<div>
				<button onClick={() => genNewGame()}>
					New Game
				</button>
			</div>
		</animated.div>
	)
})

export default WinGreet
