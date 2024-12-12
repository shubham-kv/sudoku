import {genEmptySudokuMatrix} from '@/utils'
import {SudokuGameData} from './types'

export const initialSudokuGameData: SudokuGameData = {
	selectedValue: 0,
	setSelectedValue: () => {},

	focusedCell: null,
	setFocusedCell: () => {},

	inputMatrix: genEmptySudokuMatrix(),
	setInputMatrix: () => {},

	workingMatrix: genEmptySudokuMatrix(),
	setWorkingMatrix: () => {}
}
