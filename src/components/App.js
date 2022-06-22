import React, {useEffect, useState} from 'react'

import SudokuBgBars from 'components/SudokuBgBars'
import Sudoku from 'components/Sudoku'
import Input from 'components/Input'

export default function App() {
	const [isWideScreen, setIsWideScreen] = useState(null)

	useEffect(() => {
		const resizeListener = () => {
			setIsWideScreen(window.screen.width > 480)
		}
		resizeListener()
		window.addEventListener('resize', resizeListener)

		return () => {
			window.removeEventListener('resize', resizeListener)
		}
	}, [])

	return (
		<div className='app'>
			<main>
				{
					(isWideScreen)
					? <SudokuBgBars />
					: null
				}
				<Sudoku />
				<Input />
			</main>
		</div>
	)
}
