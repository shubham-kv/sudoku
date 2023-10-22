import {SudokuContextProvider} from './contexts'
import {SudokuRoot} from './components/index'

export function App() {
	return (
		<div className='app'>
			<main>
				<SudokuContextProvider>
					<SudokuRoot />
				</SudokuContextProvider>
			</main>
		</div>
	)
}
