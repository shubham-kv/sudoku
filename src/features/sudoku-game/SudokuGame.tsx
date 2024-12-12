import {PropsWithChildren, useState} from 'react'

import {SudokuGameEventListener, SudokuKeyboardEventListener, SudokuWrapper} from './components'
import {SudokuGameContext} from './SudokuGameContext'

import {initialSudokuGameData} from './constants'
import {Cell} from '@/types/sudoku'
import {SudokuGameData} from './types'

export function SudokuGame(props: PropsWithChildren) {
	const [selectedValue, setSelectedValue] = useState<number | null>(
		initialSudokuGameData.selectedValue
	)
	const [focusedCell, setFocusedCell] = useState<Cell | null>(null)

	const [inputMatrix, setInputMatrix] = useState<number[][]>(
		initialSudokuGameData.inputMatrix
	)
	const [workingMatrix, setWorkingMatrix] = useState<number[][]>(
		initialSudokuGameData.workingMatrix
	)

	const value: SudokuGameData = {
		selectedValue,
		setSelectedValue,
		focusedCell,
		setFocusedCell,
		inputMatrix,
		setInputMatrix,
		workingMatrix,
		setWorkingMatrix
	}

	return (
		<SudokuGameContext.Provider value={value}>
			{props.children}
		</SudokuGameContext.Provider>
	)
}

SudokuGame.Root = SudokuWrapper
SudokuGame.EventListener = SudokuGameEventListener
SudokuGame.KeyboardEventListener = SudokuKeyboardEventListener
