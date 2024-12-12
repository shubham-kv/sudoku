import {Game, SudokuGame} from './features'

export function App() {
	return (
		<div className='app'>
			<Game>
				<Game.Timer />

				<SudokuGame>
					<SudokuGame.EventListener />
					<SudokuGame.KeyboardEventListener />
					<SudokuGame.Root />
				</SudokuGame>
			</Game>
		</div>
	)
}
