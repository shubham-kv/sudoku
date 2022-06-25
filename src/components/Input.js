import React, {useCallback, useEffect} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {range} from 'lodash'

import {useSudokuContext} from 'contexts/SudokuContext'


export default function Input() {
	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
	} = sudokuContextValue


	useEffect(() => {
		const activeEl = document.querySelector('.input_cell.active')
		document.activeElement.blur()

		if(selectedValue) {
			activeEl && activeEl.focus()
		}
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


	const animatedStyle = useSpring({
		from: {opacity: 0},
		to: {opacity: 1},
		delay: 200
	})

	return (
		<animated.div style={animatedStyle} className='number_input'>
			{
				range(1, 9 + 1).map(number => (
					<button
						key={number}
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
		</animated.div>
	)
}
