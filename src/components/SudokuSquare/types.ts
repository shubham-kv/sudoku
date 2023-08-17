import {Dispatch, SetStateAction} from 'react'
import {Cell} from '../../types/sudoku'

export type SudokuSquareProps = {
	squareRow: number
	squareCol: number
	focusedCell: Cell | null
	setFocusedCell: Dispatch<SetStateAction<Cell | null>>
}
