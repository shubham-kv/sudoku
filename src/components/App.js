import React, {useContext, useRef} from 'react'

import Sudoku from './Sudoku'
import Input from './Input'
import {SudokuContext} from '../SudokuContext'
import {useOutsideClickHandler} from '../customHooks'

export default function App() {
	const sudokuContextValue = useContext(SudokuContext)
	const [, setSelectedValue] = sudokuContextValue.sValue

	const mainRef = useRef(null)
	const outsideClickHandler = () => setSelectedValue(null)
	useOutsideClickHandler(mainRef, outsideClickHandler)

	return (
		<div className='app'>
			<main ref={mainRef}>
				<Sudoku />
				<Input />
			</main>
		</div>
	)
}
