import {range} from 'lodash'
import {useCallback, useEffect, useState, useRef, forwardRef} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {SudokuSquare} from './SudokuSquare'
import {useSudokuContext} from '../hooks'

import {
	getAllEmptyCells,
	getFirstEmptyCell,
	validateSudokuMatrix
} from '../sudokuHelpers'

import {deepCopy} from '../myUtils'

import '../styles/sudoku.scss'

export const Sudoku = forwardRef((props, ref) => {
	const [toggle, setToggle] = useState(false)

	const {
		setElapsedTime,
		selectedValue,
		setSelectedValue,
		inputMatrix,
		workingMatrix,
		setWorkingMatrix,
		gameComplete,
		setGameComplete
	} = useSudokuContext()

	const [focusedCell, setFocusedCell] = useState(null)
	const [emptyCells, setEmptyCells] = useState([])

	const timerId = useRef<NodeJS.Timeout>()

	const startTimer = useCallback(() => {
		clearInterval(timerId.current)

		timerId.current = setInterval(() => {
			setElapsedTime((prev) => prev + 1)
		}, 1000)
	}, [setElapsedTime])

	const stopTimer = useCallback(() => {
		clearInterval(timerId.current)
	}, [])

	useEffect(() => {
		startTimer()
	}, [startTimer])

	useEffect(() => {
		setToggle(true)
		setEmptyCells(getAllEmptyCells(inputMatrix))
	}, [inputMatrix])

	useEffect(() => {
		if (gameComplete) {
			stopTimer()
		}
	}, [gameComplete, stopTimer])

	const keyupListener = useCallback(
		(e: KeyboardEvent) => {
			if (range(1, 10).includes(Number(e.key))) {
				const pressedNumber = Number(e.key)

				if (focusedCell !== null) {
					const {row, col} = focusedCell
					const newWorkingMatrix = deepCopy(workingMatrix)

					newWorkingMatrix[row][col] =
						workingMatrix[row][col] === pressedNumber ? 0 : pressedNumber

					setWorkingMatrix(newWorkingMatrix)
					setSelectedValue(pressedNumber)
				} else {
					setSelectedValue(
						selectedValue === pressedNumber ? null : pressedNumber
					)
				}
			}
		},
		[
			selectedValue,
			setSelectedValue,
			workingMatrix,
			setWorkingMatrix,
			focusedCell
		]
	)

	const keydownListener = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft': {
					if (focusedCell === null) {
						// set focused cell to the last empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[emptyCells.length - 1])
						}
					} else {
						// set focused cell to the empty cell just before focused cell
						const {row, col} = focusedCell
						const index = emptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (index !== -1) {
							const newIndex = index - 1 < 0 ? emptyCells.length - 1 : index - 1
							setFocusedCell(emptyCells[newIndex])
						}
					}
					break
				}

				case 'ArrowRight': {
					if (focusedCell === null) {
						// set focused cell to the first empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[0])
						}
					} else {
						// set focused cell to the empty cell just after focused cell
						const {row, col} = focusedCell
						const index = emptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (index !== -1) {
							const newIndex = index + 1 >= emptyCells.length ? 0 : index + 1
							setFocusedCell(emptyCells[newIndex])
						}
					}
					break
				}

				case 'ArrowUp': {
					if (focusedCell === null) {
						// set focused cell to the last empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[emptyCells.length - 1])
						}
					} else {
						// set focused cell to the empty cell just above the focused cell
						// or the last empty cell
						const {row, col} = focusedCell

						// sort cells in asc order acc. to col
						const sortedEmptyCells = deepCopy(emptyCells).sort(
							(a, b) => a.col - b.col
						)

						const focusedCellIndex = sortedEmptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (focusedCellIndex === 0) {
							setFocusedCell(sortedEmptyCells[sortedEmptyCells.length - 1])
						} else {
							// find index of the prev empty cell in current col or the last in prev col
							let index = sortedEmptyCells.findLastIndex(
								(v) => (v.row < row && v.col === col) || v.col < col
							)

							if (index !== -1) {
								setFocusedCell(sortedEmptyCells[index])
							}
						}
					}

					break
				}

				case 'ArrowDown': {
					if (focusedCell === null) {
						// set focused cell to the first empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[0])
						}
					} else {
						// set focused cell to the empty cell just below the focused cell
						// or the first empty cell
						const {row, col} = focusedCell

						// sort cells in asc order acc. to col
						const sortedEmptyCells = deepCopy(emptyCells).sort(
							(a, b) => a.col - b.col
						)

						const focusedCellIndex = sortedEmptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (focusedCellIndex === sortedEmptyCells.length - 1) {
							setFocusedCell(sortedEmptyCells[0])
							return
						} else {
							// find index of next empty cell in current col or the first in next col
							const newFocusedCellIndex = sortedEmptyCells.findIndex(
								(v) => (v.row > row && v.col === col) || v.col > col
							)

							if (newFocusedCellIndex !== -1) {
								setFocusedCell(sortedEmptyCells[newFocusedCellIndex])
							}
						}
					}
					break
				}

				default:
					break
			}
		},
		[emptyCells, focusedCell, setFocusedCell]
	)

	useEffect(() => {
		document.addEventListener('keydown', keyupListener)
		document.addEventListener('keyup', keyupListener)

		return () => {
			document.removeEventListener('keydown', keydownListener)
			document.removeEventListener('keyup', keyupListener)
		}
	}, [keydownListener, keyupListener])

	useEffect(() => {
		if (getFirstEmptyCell(workingMatrix) === null) {
			if (validateSudokuMatrix(workingMatrix)) {
				setGameComplete(true)
				setSelectedValue(null)
				setFocusedCell(null)
			}
		}
	}, [workingMatrix, setGameComplete, setSelectedValue])

	const isActive = (selectedValue && selectedValue !== 0) || gameComplete
	const cellPositions = []

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			cellPositions.push([i, j])
		}
	}

	const squares = cellPositions.map(([row, col]) => (
		<SudokuSquare
			key={`sudoku_square_${row}${col}`}
			squareRow={row}
			squareCol={col}
			focusedCell={focusedCell}
			setFocusedCell={setFocusedCell}
		/>
	))

	const springs = useSprings(
		squares.length,
		squares.map((_, i) => ({
			opacity: toggle ? '1' : '0',
			delay: i * 50
		}))
	)

	const animatedSquares = springs.map((animatedStyle, i) => (
		<animated.div
			key={i}
			style={animatedStyle}
		>
			{squares[i]}
		</animated.div>
	))

	return (
		<animated.div
			ref={ref}
			style={props.containerStyle}
			className='sudoku_wrapper'
		>
			<animated.div
				style={props.bgBarStyle}
				className={`bg_bar ${isActive ? 'active' : ''}`}
			/>
			<animated.div
				style={props.bgBarStyle}
				className={`bg_bar ${isActive ? 'active' : ''}`}
			/>

			<div className={`sudoku ${isActive ? 'active' : ''}`}>
				{animatedSquares}
			</div>

			<div className='fg_bar'></div>
			<div className='fg_bar'></div>
		</animated.div>
	)
})
