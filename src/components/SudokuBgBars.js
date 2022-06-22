import React, {useEffect, useState} from 'react'
import {useSudokuContext} from 'SudokuContext'

import 'styles/sudoku_bg_bars.scss'

export default function SudokuBgBars() {
	const [svgRect, setSvgRect] = useState(null)
	const {selectedValue} = useSudokuContext()
	const isActive = (selectedValue) && (selectedValue !== 0)

	useEffect(() => {
		const resizeListener = () => {
			const svg = document.querySelector('svg.sudoku_svg')
			setSvgRect(svg.getBoundingClientRect())
		}
		resizeListener()
		window.addEventListener('resize', resizeListener)

		return () => window.removeEventListener('resize', resizeListener)
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
