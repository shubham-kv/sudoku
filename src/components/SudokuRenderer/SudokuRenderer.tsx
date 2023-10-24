import {SudokuWrapper} from '..'
import {SudokuContextProvider} from '../../contexts'

export function SudokuRenderer() {
	return (
		<SudokuContextProvider>
			<SudokuWrapper />
		</SudokuContextProvider>
	)
}
