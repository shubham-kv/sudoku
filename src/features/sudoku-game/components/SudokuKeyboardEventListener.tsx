import range from 'lodash/range'
import {useCallback, useEffect, useState} from 'react'

import {useSudokuGame} from '@/features/sudoku-game'
import {deepCopy, getAllEmptyCells} from '@/utils'
import {Cell} from '@/types/sudoku'

export function SudokuKeyboardEventListener() {
	const {
		selectedValue,
		setSelectedValue,
		focusedCell,
		setFocusedCell,
		inputMatrix,
		workingMatrix,
		setWorkingMatrix
	} = useSudokuGame()!

	const [emptyCells, setEmptyCells] = useState<Cell[]>([])

	useEffect(() => {
		setEmptyCells(getAllEmptyCells(inputMatrix))
	}, [inputMatrix])

	const keyupListener = useCallback(
		(e: KeyboardEvent) => {
			if (range(1, 10).includes(Number(e.key))) {
				const pressedNumber = Number(e.key)

				if (focusedCell !== null) {
					const {row, col} = focusedCell
					const newWorkingMatrix = deepCopy<number[][]>(workingMatrix)

					newWorkingMatrix[row]![col] =
						workingMatrix[row]![col] === pressedNumber ? 0 : pressedNumber

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
							const lastEmptyCell = emptyCells[emptyCells.length - 1]
							setFocusedCell(lastEmptyCell ?? null)
						}
					} else {
						// set focused cell to the empty cell just before focused cell
						const {row, col} = focusedCell
						const index = emptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (index !== -1) {
							const newIndex = index - 1 < 0 ? emptyCells.length - 1 : index - 1
							const cell = emptyCells[newIndex]
							setFocusedCell(cell ?? null)
						}
					}
					break
				}

				case 'ArrowRight': {
					if (focusedCell === null) {
						// set focused cell to the first empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[0] ?? null)
						}
					} else {
						// set focused cell to the empty cell just after focused cell
						const {row, col} = focusedCell
						const index = emptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (index !== -1) {
							const newIndex = index + 1 >= emptyCells.length ? 0 : index + 1
							const newFocusedCell = emptyCells[newIndex]
							setFocusedCell(newFocusedCell ?? null)
						}
					}
					break
				}

				case 'ArrowUp': {
					if (focusedCell === null) {
						// set focused cell to the last empty cell
						if (emptyCells.length > 0) {
							const lastEmptyCell = emptyCells[emptyCells.length - 1]
							setFocusedCell(lastEmptyCell ?? null)
						}
					} else {
						// set focused cell to the empty cell just above the focused cell
						// or the last empty cell
						const {row, col} = focusedCell
						const emptyCellsCopy: Cell[] = deepCopy(emptyCells)

						// sort cells in asc order acc. to col
						const sortedEmptyCells = emptyCellsCopy.sort(
							(a, b) => a.col - b.col
						)

						const focusedCellIndex = sortedEmptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (focusedCellIndex === 0) {
							const cell = sortedEmptyCells[sortedEmptyCells.length - 1]
							setFocusedCell(cell ?? null)
						} else {
							// find index of the prev empty cell in current col or the last in prev col
							const index = sortedEmptyCells.findLastIndex(
								(v) => (v.row < row && v.col === col) || v.col < col
							)

							if (index !== -1) {
								const cell = sortedEmptyCells[index]
								setFocusedCell(cell ?? null)
							}
						}
					}

					break
				}

				case 'ArrowDown': {
					if (focusedCell === null) {
						// set focused cell to the first empty cell
						if (emptyCells.length > 0) {
							setFocusedCell(emptyCells[0] ?? null)
						}
					} else {
						// set focused cell to the empty cell just below the focused cell
						// or the first empty cell
						const {row, col} = focusedCell
						const emptyCellsCopy: Cell[] = deepCopy(emptyCells)

						// sort cells in asc order acc. to col
						const sortedEmptyCells = emptyCellsCopy.sort(
							(a, b) => a.col - b.col
						)

						const focusedCellIndex = sortedEmptyCells.findIndex(
							(v) => v.row === row && v.col === col
						)

						if (focusedCellIndex === sortedEmptyCells.length - 1) {
							setFocusedCell(sortedEmptyCells[0] ?? null)
							return
						} else {
							// find index of next empty cell in current col or the first in next col
							const newFocusedCellIndex = sortedEmptyCells.findIndex(
								(v) => (v.row > row && v.col === col) || v.col > col
							)

							if (newFocusedCellIndex !== -1) {
								const cell = sortedEmptyCells[newFocusedCellIndex]
								setFocusedCell(cell ?? null)
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
		document.addEventListener('keydown', keydownListener)
		document.addEventListener('keyup', keyupListener)

		return () => {
			document.removeEventListener('keydown', keydownListener)
			document.removeEventListener('keyup', keyupListener)
		}
	}, [keydownListener, keyupListener])

	return null
}
