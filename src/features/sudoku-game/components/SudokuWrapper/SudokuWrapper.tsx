import {
	animated,
	useChain,
	useSpring,
	useSpringRef,
	useTransition
} from '@react-spring/web'

import {useGame} from '@/features/game'
import {NumberBoard} from '../NumberBoard'
import {SudokuBoard} from '../SudokuBoard'
import {WinGreet} from '../WinGreet'

import styles from './sudoku-wrapper.module.scss'

export function SudokuWrapper() {
	const {gameState} = useGame()!
	const gameComplete = gameState === 'completed'

	const AnimatedSudoku = animated(SudokuBoard)
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
			transform: 'translate(0, 50px) scale(0.9)',
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
		<div className={styles.wrapper}>
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
		</div>
	)
}
