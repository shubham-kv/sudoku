import React, {useEffect, useState} from 'react'
import {Globals, useSpring, animated} from '@react-spring/web'

import SudokuBgBars from 'components/SudokuBgBars'
import Sudoku from 'components/Sudoku'
import Input from 'components/Input'

import {useSudokuContext} from 'contexts/SudokuContext'


export default function App() {
	const {gameComplete} = useSudokuContext()
	const [isWideScreen, setIsWideScreen] = useState(null)

	useEffect(() => {
		const resizeListener = () => {
			setIsWideScreen(window.screen.width > 480)
		}
		resizeListener()
		window.addEventListener('resize', resizeListener)

		return () => window.removeEventListener('resize', resizeListener)
	})

	useEffect(() => {
		Globals.assign({
			skipAnimation: !isWideScreen
		})
	}, [isWideScreen])

	const animatedStyles = useSpring({
		opacity: (gameComplete) ? 0 : 1,
		transform: (gameComplete) ? 'scale(0)' : 'scale(1)'
	})

	return (
		<div className='app'>
			<main>
				{
					isWideScreen
					? <SudokuBgBars />
					: null
				}

				<Sudoku />

				<animated.div
					style={animatedStyles}>
					<Input />
				</animated.div>
			</main>
		</div>
	)
}
