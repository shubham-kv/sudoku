import React, {useCallback, useContext, useEffect} from 'react'
import {range} from 'lodash'

import {SudokuContext} from '../SudokuContext'

export default function Input() {
	const [selectedValue, setSelectedValue] = useContext(SudokuContext)

	useEffect(() => {
		selectedValue && document.querySelector('.input_cell.active').focus()
	}, [selectedValue])

	
	const handleClick = useCallback((e, number) => {
		if(selectedValue === number) {
			setSelectedValue(null)
			e.target.blur()
		}
		else {
			setSelectedValue(number)
		}
	}, [selectedValue, setSelectedValue])


	return (
		<div className='number_input'>
			{
				range(1, 9 + 1).map(number => (
					<button key={number}
						className={(selectedValue === number) ? 'input_cell active' : 'input_cell'}
						onClick={(e) => handleClick(e, number)}
						>
						{number}
					</button>
				))
			}
			<button className='input_cell' onClick={() => setSelectedValue(0)}>
				x
			</button>
		</div>
	)
}
