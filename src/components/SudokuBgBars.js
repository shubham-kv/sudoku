import React, {useEffect, useState} from 'react'
import {useSudokuContext} from 'SudokuContext'

import 'styles/sudoku_bg_bars.scss'

export default function SudokuBgBars() {
	const [svgRect, setSvgRect] = useState(null)
	const {selectedValue} = useSudokuContext()
	const isActive = (selectedValue) && (selectedValue !== 0)

	useEffect(() => {
		const svgRectChangeListener = () => {
			const svg = document.querySelector('svg.sudoku_svg')
			setSvgRect(svg.getBoundingClientRect())
		}
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
