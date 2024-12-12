import {useCallback, useEffect, useRef} from 'react'
import {useGame} from '../hooks/useGame'

export function GameTimer() {
	const {gameState, setTime: setElapsedTime} = useGame()!
	const timerId = useRef<NodeJS.Timeout>()

	const startTimer = useCallback(() => {
		clearInterval(timerId.current)

		timerId.current = setInterval(() => {
			setElapsedTime((prev) => prev + 1)
		}, 1000)
	}, [setElapsedTime])

	const stopTimer = useCallback(() => {
		clearInterval(timerId.current)
	}, [])

	useEffect(() => {
		switch (gameState) {
			case 'started': {
				setElapsedTime(0)
				startTimer()
				break
			}
			case 'playing': {
				startTimer()
				break
			}
			case 'paused':
			case 'completed': {
				stopTimer()
				break
			}
		}
	}, [gameState, setElapsedTime, startTimer, stopTimer])

	return null
}
