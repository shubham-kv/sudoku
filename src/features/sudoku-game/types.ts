import {Cell} from '@/types/sudoku'
import {Dispatch, SetStateAction} from 'react'

export type SudokuGameData = {
	selectedValue: number | null
	setSelectedValue: Dispatch<SetStateAction<number | null>>

	focusedCell: Cell | null
	setFocusedCell: Dispatch<SetStateAction<Cell | null>>

	inputMatrix: number[][]
	setInputMatrix: Dispatch<SetStateAction<number[][]>>

	workingMatrix: number[][]
	setWorkingMatrix: Dispatch<SetStateAction<number[][]>>
}
