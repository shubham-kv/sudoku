import React from 'react'

import Sudoku from 'components/Sudoku'
import NumberBoard from 'components/NumberBoard'

export default function App() {
	return (
		<div className='app'>
			<main>
				<Sudoku />
				<NumberBoard />
			</main>
		</div>
	)
}
