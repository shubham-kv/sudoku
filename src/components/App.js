import React, {useContext, useRef} from 'react'
import Sudoku from './Sudoku'
import Input from './Input'
import {AppContext} from '../AppContext'
import {useOutsideClickHandler} from '../customHooks'

export default function App() {
	const appContextValue = useContext(AppContext)
	const [, setSelectedValue] = appContextValue.sValue

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
