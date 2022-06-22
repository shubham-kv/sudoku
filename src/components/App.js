import React from 'react'

import SudokuBgBars from 'components/SudokuBgBars'
import Sudoku from 'components/Sudoku'
import Input from 'components/Input'

export default function App() {
	return (
		<div className='app'>
			<main>
				<SudokuBgBars />
				<Sudoku />
				<Input />
			</main>
		</div>
	)
}
