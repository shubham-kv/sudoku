import React, {useCallback, useEffect, useState} from 'react'
import {useSprings, animated} from '@react-spring/web'
import {range} from 'lodash'

import SudokuFgBars from 'components/SudokuFgBars'
import SudokuCell from 'components/SudokuCell'
import {useSudokuContext} from 'contexts/SudokuContext'

import {getAllEmptyCells, getFirstEmptyCell, validateSudokuMatrix} from 'sudokuHelpers'
import {deepCopy} from 'myUtils'

import 'styles/sudoku.scss'


export default function Sudoku() {
	const [toggle, setToggle] = useState(false)

	const sudokuContextValue = useSudokuContext()
    const {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete
	} = sudokuContextValue

	const [focusedCell, setFocusedCell] = useState(null)
	const [emptyCells, setEmptyCells] = useState([])

	useEffect(() => {
		setToggle(true)
		setEmptyCells(getAllEmptyCells(inputMatrix))

		// create a timer
	}, [inputMatrix])


	const keyupListener = useCallback((e) => {
		if(range(1, 10).includes(Number(e.key))) {
			const pressedNumber = Number(e.key)

			if(focusedCell !== null) {
				const {row, col} = focusedCell
				const newWorkingMatrix = deepCopy(workingMatrix)
				newWorkingMatrix[row][col] =
					(workingMatrix[row][col] === pressedNumber)
					? 0
					: pressedNumber
				setWorkingMatrix(newWorkingMatrix)
				setSelectedValue(pressedNumber)
			}
			else {
				setSelectedValue((selectedValue === pressedNumber) ? null : pressedNumber)
			}	
		}

	}, [selectedValue, setSelectedValue, workingMatrix, setWorkingMatrix, focusedCell])



	const keydownListener = useCallback((e) => {
		switch(e.key) {
			case 'ArrowLeft': {
				if(focusedCell === null) {
					// set focused cell to the last empty cell
					if(emptyCells.length > 0) {
						setFocusedCell(emptyCells[emptyCells.length - 1])
					}
				}
				else {
					// set focused cell to the empty cell just before focused cell
					const {row, col} = focusedCell
					const index = emptyCells.findIndex(v => v.row === row && v.col === col)

					if(index !== -1) {
						const newIndex = (index - 1 < 0) ? (emptyCells.length - 1) : (index - 1)
						setFocusedCell(emptyCells[newIndex])
					}
				}
				break
			}

			case 'ArrowRight': {
				if(focusedCell === null) {
					// set focused cell to the first empty cell
					if(emptyCells.length > 0) {
						setFocusedCell(emptyCells[0])
					}
				}
				else {
					// set focused cell to the empty cell just after focused cell
					const {row, col} = focusedCell
					const index = emptyCells.findIndex(v => v.row === row && v.col === col)

					if(index !== -1) {
						const newIndex = (index + 1 >= emptyCells.length) ? 0 : (index + 1)
						setFocusedCell(emptyCells[newIndex])
					}
				}
				break
			}
			case 'ArrowUp': {
				if(focusedCell === null) {
					// set focused cell to the last empty cell
					if(emptyCells.length > 0) {
						setFocusedCell(emptyCells[emptyCells.length - 1])
					}
				}
				else {
					// set focused cell to the empty cell just above the focused cell
					// or the last empty cell
					const {row, col} = focusedCell
					
					// sort cells in asc order acc. to col
					const sortedEmptyCells = deepCopy(emptyCells).sort((a, b) => a.col - b.col)

					const focusedCellIndex = sortedEmptyCells.findIndex(v => v.row === row && v.col === col)

					if(focusedCellIndex === 0) {
						setFocusedCell(sortedEmptyCells[sortedEmptyCells.length - 1])
					}
					else {
						// find index of the prev empty cell in current col or the last in prev col
						let index = sortedEmptyCells.findLastIndex(
							v => ((v.row < row && v.col === col) || (v.col < col))
						)
						
						if(index !== -1) {
							setFocusedCell(sortedEmptyCells[index])
						}
					}
				}

				break
			}
			case 'ArrowDown': {
				if(focusedCell === null) {
					// set focused cell to the first empty cell
					if(emptyCells.length > 0) {
						setFocusedCell(emptyCells[0])
					}
				}
				else {
					// set focused cell to the empty cell just below the focused cell
					// or the first one
					const {row, col} = focusedCell
					
					// sort cells in asc order acc. to col
					const sortedEmptyCells = deepCopy(emptyCells).sort((a, b) => a.col - b.col)

					const focusedCellIndex = sortedEmptyCells.findIndex(v => v.row === row && v.col === col)

					if(focusedCellIndex === sortedEmptyCells.length - 1) {
						setFocusedCell(sortedEmptyCells[0])
						return
					}
					else {
						// find index of next empty cell in current col or the first in next col
						const newFocusedCellIndex = sortedEmptyCells.findIndex(
							v => ((v.row > row && v.col === col) || (v.col > col))
						)

						if(newFocusedCellIndex !== -1) {
							setFocusedCell(sortedEmptyCells[newFocusedCellIndex])
						}
					}
				}
				break
			}

			default:
				break
		}

	}, [emptyCells, focusedCell, setFocusedCell])

	useEffect(() => {
		document.addEventListener('keydown', keydownListener)
		document.addEventListener('keyup', keyupListener)
		return () => {
			document.removeEventListener('keydown', keydownListener)
			document.removeEventListener('keyup', keyupListener)
		}
	}, [keydownListener, keyupListener])


	useEffect(() => {
		if(getFirstEmptyCell(workingMatrix) === null) {
			if(validateSudokuMatrix(workingMatrix)) {
				setGameComplete(true)
				setSelectedValue(null)
				setFocusedCell(null)
			}
		}
	}, [workingMatrix, setGameComplete, setSelectedValue])

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
				}, 1000)
			})()
		}
	}, [gameComplete, setSelectedValue])


	const svgWidth = 300
    const svgHeight = 300
	const margin = 4
	const innerWidth = svgWidth - (2 * margin)
	const innerHeight = svgHeight - (2 * margin)
	const gridGap = 8

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
			gridGap={gridGap}
			focusedCell={focusedCell}
			setFocusedCell={setFocusedCell}
			/>
	))
	
	const springs = useSprings(
		cells.length,
		cells.map((_, i) => ({
			opacity: toggle ? 1 : 0,
			transform: toggle ? 'scale(1)' : 'scale(0)',
			delay: i * 4,
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

	// const animatedStyle = useSpring({
	// 	transform: (gameComplete) ? 'scale(0.5) rotate(360deg)' : 'scale(1) rotate(0deg)',
	// 	immediate: true
	// })

    return (
		<svg className={`sudoku_svg ${isActive ? 'active' : ''}`}
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}>

			<g transform={`translate(${margin}, ${margin})`}>
				<SudokuFgBars
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					margin={margin}
					/>

				{animatedCells}
			</g>
		</svg>
    )
}
