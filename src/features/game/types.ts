import {Dispatch, SetStateAction} from 'react'

export type GameState =
	| 'initial'
	| 'started'
	| 'playing'
	| 'paused'
	| 'completed'

export type GameData = {
	gameState: GameState
	time: number
	setTime: Dispatch<SetStateAction<number>>
	new: () => void
	play: () => void
	pause: () => void
	restart: () => void
}
