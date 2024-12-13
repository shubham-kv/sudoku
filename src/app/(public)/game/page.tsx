'use client'
import {Game, SudokuGame} from '@/features'

export default function GamePage() {
	return (
		<Game>
			<Game.Timer />
			<Game.KeyEventsListener />

			<SudokuGame>
				<SudokuGame.EventListener />
				<SudokuGame.KeyEventsListener />
				<SudokuGame.Root />
			</SudokuGame>
		</Game>
	)
}
