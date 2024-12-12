import {useContext, useEffect} from 'react'
import {SudokuGameContext} from '../SudokuGameContext'

export function useSudokuGame() {
	const gameData = useContext(SudokuGameContext)

	useEffect(() => {
		if (!gameData) {
			throw new Error("useSudokuGame hook must be used within it's provider")
		}
	}, [gameData])

	return gameData
}
