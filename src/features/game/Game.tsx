import {PropsWithChildren, useState} from 'react'

import {GameContext} from './GameContext'
import {GameTimer} from './components'
import {GameState, GameData} from './types'

export function Game(props: PropsWithChildren) {
	const [gameState, setGameState] = useState<GameState>('initial')
	const [time, setTime] = useState<number>(0)

	const value: GameData = {
		gameState,
		setGameState,
		time,
		setTime,
		play() {
			setGameState('running')
		},
		pause() {
			setGameState('paused')
		},
		newGame() {
			setGameState('initial')
		},
		restart() {
			setGameState('pre-start')
		}
	}

	return (
		<GameContext.Provider value={value}>{props.children}</GameContext.Provider>
	)
}

Game.Timer = GameTimer
