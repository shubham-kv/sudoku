import React from 'react'
// import React, {useEffect, useState} from 'react'

import Sudoku from 'components/Sudoku'
import NumberBoard from 'components/NumberBoard'


export default function App() {
	// const [isWideScreen, setIsWideScreen] = useState(null)

	// useEffect(() => {
	// 	const resizeListener = () => {
	// 		setIsWideScreen(window.screen.width > 480)
	// 	}
	// 	resizeListener()
	// 	window.addEventListener('resize', resizeListener)

	// 	return () => window.removeEventListener('resize', resizeListener)
	// })

	return (
		<div className='app'>
			<main>
				<Sudoku />
				<NumberBoard />
			</main>
		</div>
	)
}
