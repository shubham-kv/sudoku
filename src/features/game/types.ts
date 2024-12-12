import {Dispatch, SetStateAction} from 'react'

/*
Initial: The stage where initial setup needs to be done.
Pre-start: The stage just before starting the game which can also be used to restart the game.
Running: The game's running/playing stage.
Paused: Paused stage of the game.
Completed: The game was successfully completed by the player at this stage.
*/

export type GameState =
	| 'initial'
	| 'pre-start'
	| 'running'
	| 'paused'
	| 'completed'

export type GameData = {
	gameState: GameState
	setGameState: Dispatch<SetStateAction<GameState>>
	time: number
	setTime: Dispatch<SetStateAction<number>>
	newGame: () => void
	play: () => void
	pause: () => void
	restart: () => void
}
