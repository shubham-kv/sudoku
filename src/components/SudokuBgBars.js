import React, {useEffect, useState} from 'react'

import {useSudokuContext} from 'contexts/SudokuContext'

import 'styles/sudoku_bg_bars.scss'


export default function SudokuBgBars() {
	const {selectedValue} = useSudokuContext()
	const [svgRect, setSvgRect] = useState(null)
	
	let timeoutId;
	
	const svgRectChangeListener = () => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			const svg = document.querySelector('svg.sudoku_svg')
			setSvgRect(svg.getBoundingClientRect())
		}, 30)
	}

	useEffect(() => {
		svgRectChangeListener()
		window.addEventListener('resize', svgRectChangeListener)
		window.addEventListener('scroll', svgRectChangeListener)

		return () => {
			window.removeEventListener('resize', svgRectChangeListener)
			window.removeEventListener('scroll', svgRectChangeListener)
		}
	}, [])

	if(svgRect === null) {
		return null
	}

	const isActive = (selectedValue) && (selectedValue !== 0)

	return (
		<div className={`sudoku_bg_bar ${(isActive) ? 'active' : ''}`}
			style={{
				width: svgRect.width,
				height: svgRect.height,
				top: svgRect.top,
				left: svgRect.left
			}} >
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}
