import React, {useEffect, useState} from 'react'
import {useSprings, animated} from '@react-spring/web'

import SudokuFgBars from 'components/SudokuFgBars'
import SudokuCell from 'components/SudokuCell'
import {useSudokuContext} from 'contexts/SudokuContext'
import {getEmptyCell, validateSudokuMatrix} from 'sudokuHelpers'

import 'styles/sudoku.scss'


export default function Sudoku() {
	const [toggle, setToggle] = useState(false)

	const sudokuContextValue = useSudokuContext()
    const {
		selectedValue, setSelectedValue,
		setInputMatrix,
		workingMatrix,
		gameComplete, setGameComplete
	} = sudokuContextValue

	useEffect(() => {
		setToggle(true)
	}, [])

	useEffect(() => {
		if(getEmptyCell(workingMatrix) === null) {
			if(validateSudokuMatrix(workingMatrix)) {
				setGameComplete(true)
			}
		}
	}, [setSelectedValue, setInputMatrix, workingMatrix, setGameComplete])

	useEffect(() => {
		if(gameComplete) {
			(() => {
				let intervalId, value = 1
	
				intervalId = setInterval(() => {
					if(value < 10) {
						setSelectedValue(value)
						value++
					}
					else {
						setSelectedValue(null)
						clearInterval(intervalId)
					}
				}, 800)
			})()
		}
	}, [gameComplete, setSelectedValue])


	const svgWidth = 300
    const svgHeight = 300
	const margin = 10
	const innerWidth = svgWidth - (2 * margin)
	const innerHeight = svgHeight - (2 * margin)
	const isActive = (selectedValue) && (selectedValue !== 0)


	const cellPositions = []

	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 9; j++) {
			cellPositions.push([i, j])
		}
	}

	const cells = cellPositions.map(([row, col]) => (
		<SudokuCell
			key={`sudoku_cell_${row}${col}`}
			row={row}
			col={col}
			innerWidth={innerWidth}
			innerHeight={innerHeight}
			gridGap={10}
			/>
	))
	
	const springs = useSprings(
		cells.length,
		cells.map((_, i) => ({
			opacity: toggle ? 1 : 0,
			transform: toggle ? 'scale(1)' : 'scale(0)',
			delay: i * 5
		}))
	)

	const animatedCells = springs.map((animatedStyle, i) => (
		<animated.g
			key={i}
			style={{
				transformOrigin: 'center',
				// transformBox: 'fill-box',
				...animatedStyle
			}}
			>
			{cells[i]}
		</animated.g>
	))

    return (
		<svg className={`sudoku_svg ${isActive ? 'active' : ''}`}
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}>

			<g transform={`translate(${margin}, ${margin})`}>

				<SudokuFgBars
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					/>

				{animatedCells}
			</g>
		</svg>
    )
}
