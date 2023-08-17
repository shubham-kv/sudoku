import {
	animated,
	useChain,
	useSpring,
	useSpringRef,
	useTransition
} from '@react-spring/web'

import {NumberBoard} from '../NumberBoard'
import {Sudoku} from '../Sudoku'
import {WinGreet} from '../WinGreet'

import {useSudokuContext} from '../../hooks'
import {formatTime} from '../../utils'

export function SudokuRoot() {
	const {elapsedTime, gameComplete} = useSudokuContext()

	const AnimatedSudoku = animated(Sudoku)
	const AnimatedNumberBoard = animated(NumberBoard)
	const AnimatedWinGreet = animated(WinGreet)

	const bgBarAnimRef = useSpringRef()
	const sudokuTransitionRef = useSpringRef()
	const numberBoardTransitionRef = useSpringRef()
	const winTransitionRef = useSpringRef()

	const bgBarAnimatedProps = useSpring({
		ref: bgBarAnimRef,
		transform: gameComplete ? 'scale(0)' : 'scale(1)',
		config: {duration: 100}
	})

	const sudokuTransition = useTransition(gameComplete, {
		ref: sudokuTransitionRef,
		enter: {opacity: 1},
		leave: {opacity: 0}
	})

	const numberBoardTransition = useTransition(gameComplete, {
		ref: numberBoardTransitionRef,
		enter: {opacity: 1},
		leave: {opacity: 0}
	})

	const winTransition = useTransition(gameComplete, {
		ref: winTransitionRef,
		from: {
			opacity: 0,
			transform: 'translate(0, 50px) scale(0)',
			config: {duration: 100}
		},
		enter: {
			opacity: 1,
			transform: 'translate(0, 0) scale(1)',
			config: {duration: 100}
		},
		leave: {opacity: 0, transform: 'translate(0, -50px) scale(0)'}
	})

	useChain(
		gameComplete
			? [
					numberBoardTransitionRef,
					bgBarAnimRef,
					sudokuTransitionRef,
					winTransitionRef
			  ]
			: [
					winTransitionRef,
					bgBarAnimRef,
					sudokuTransitionRef,
					numberBoardTransitionRef
			  ]
	)

	return (
		<>
			{!gameComplete ? (
				<div className='time'>{formatTime(elapsedTime)}</div>
			) : null}

			{sudokuTransition((animatedProps, item) =>
				!item ? (
					<AnimatedSudoku
						wrapperStyles={animatedProps}
						backgroundBarStyles={bgBarAnimatedProps}
					/>
				) : null
			)}

			{numberBoardTransition((animatedProps, item) =>
				!item ? <AnimatedNumberBoard styles={animatedProps} /> : null
			)}

			{winTransition((animatedProps, item) =>
				item ? <AnimatedWinGreet styles={animatedProps} /> : null
			)}
		</>
	)
}
