import {Dispatch, SetStateAction} from 'react'
import {Cell} from '../../types/sudoku'

export type SudokuCellProps = {
	row: number
	col: number
	focusedCell: Cell | null
	setFocusedCell: Dispatch<SetStateAction<Cell | null>>
}
