import React, {useCallback, useContext} from 'react'
import {range} from 'lodash'

import {AppContext} from '../AppContext'


export default function Input() {
	const appContextValue = useContext(AppContext)
	const [selectedValue, setSelectedValue] = appContextValue.sValue

	const handleClick = useCallback((e, number) => {
		if(selectedValue === number) {
			setSelectedValue(null)
			e.target.blur()
		}
		else {
			setSelectedValue(number)
		}
	}, [selectedValue, setSelectedValue])

	// set value to null on losing focus
	const handleBlur = useCallback((e) => {
		if(document.activeElement.classList.contains('input__cell')) {
			setSelectedValue(null)
		}
	}, [setSelectedValue])

	document.querySelectorAll('.input__cell').forEach(el => {
		if(Number(el.innerText) === selectedValue) {
			el.focus()
		}
	})

	return (
		<div className='number_input'>
			{
				range(1, 9 + 1).map(number => (
					<button
						key={number}
						className='input__cell'
						onClick={(e) => handleClick(e, number)}
						onBlur={handleBlur}
						>
						{number}
					</button>
				))
			}
			<button className='input__cell' onClick={() => setSelectedValue(0)}>
				x
			</button>
		</div>
	)
}
