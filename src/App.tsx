import {Game, SudokuGame} from './features'

export function App() {
	return (
		<div className='app'>
			<Game>
				<Game.Timer />
				<Game.KeyEventsListener />

				<SudokuGame>
					<SudokuGame.EventListener />
					<SudokuGame.KeyEventsListener />
					<SudokuGame.Root />
				</SudokuGame>
			</Game>
		</div>
	)
}
