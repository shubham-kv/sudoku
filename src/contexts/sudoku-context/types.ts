import {Dispatch, SetStateAction} from 'react'

export type SudokuContextValue = {
	elapsedTime: number
	setElapsedTime: Dispatch<SetStateAction<number>>
	selectedValue: number | null
	setSelectedValue: Dispatch<SetStateAction<number | null>>

	inputMatrix: number[][]
	setInputMatrix: Dispatch<SetStateAction<number[][]>>
	workingMatrix: number[][]
	setWorkingMatrix: Dispatch<SetStateAction<number[][]>>

	gameComplete: boolean
	setGameComplete: Dispatch<SetStateAction<boolean>>

	genNewGame: () => void
}
