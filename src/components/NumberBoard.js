import React, {useCallback, useEffect, useState, forwardRef} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {useSudokuContext} from 'contexts/SudokuContext'
import 'styles/number_board.scss'


const NumberBoard = forwardRef((props, ref) => {
	const [toggle, setToggle] = useState(false)

	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
		workingMatrix
	} = sudokuContextValue

	useEffect(() => {
		setToggle(true)
	}, [setToggle])

	useEffect(() => {
		const activeEl = document.querySelector('.input_btn.active')
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


	const getCountOfNumber = useCallback((number) => {
		let count = 0;

		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				if(number !== 0 && (workingMatrix[i][j] === number)) {
					count++;
				}
			}
		}
		
		return (9 - count)
	}, [workingMatrix])


	const springs = useSprings(
		10,
		[...Array(10).keys()].map((_, i) => ({
			opacity: toggle ? 1 : 0,			
			transform: toggle ? 'scale(1)' : 'scale(0)',
			delay: i * 10,
			config: {duration: 200}
		}))
	)

	const animatedButtons = springs.map((animatedStyles, i) => {
		const number = i + 1
		const count = getCountOfNumber(number)
		const classList = ['input_btn']

		if(count === 0) {
			classList.push('all_filled')
		}

		if(selectedValue === number) {
			classList.push('active')
		}

		const clickHandler = (number === 10)
			? (() => {setSelectedValue(0)})
			: (e => handleClick(e, number))

		return (
			<animated.button key={i}
				style={animatedStyles}
				className={classList.join(' ')}
				onClick={clickHandler}>
				
				{(i === 9) ? 'x' : number}
			</animated.button>
		)
	})

	return (
		<animated.div ref={ref} style={props.style} className='number_board'>
			{animatedButtons}
		</animated.div>
	)
})

export default NumberBoard
