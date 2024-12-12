import {useContext, useEffect} from 'react'
import {GameContext} from '../GameContext'

export function useGame() {
	const gameData = useContext(GameContext)

	useEffect(() => {
		if (!gameData) {
			throw new Error("useGame hook must be used within it's provider")
		}
	}, [gameData])

	return gameData
}
