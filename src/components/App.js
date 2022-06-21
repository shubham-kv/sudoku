import React from 'react'

import Sudoku from './Sudoku'
import Input from './Input'

export default function App() {
	return (
		<div className='app'>
			<main>
				<Sudoku />
				<Input />
			</main>
		</div>
	)
}
