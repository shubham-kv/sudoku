'use client'

import {useCallback, useEffect, useRef} from 'react'
import {useGame} from '../hooks/useGame'

export function GameTimer() {
	const {gameState, setTime: setElapsedTime} = useGame()!
	const timerId = useRef<NodeJS.Timeout | undefined>(undefined)

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
			case 'initial': {
				setElapsedTime(0)
				break
			}
			case 'pre-start':
			case 'running': {
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
