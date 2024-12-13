'use client'

import {useCallback, useEffect} from 'react'
import {useGame} from '../hooks'

export function GameKeyEventsListener() {
	const {play, pause, newGame, restart} = useGame()!

	const keydownListener = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case 'Escape': {
					pause()
					break
				}
				case 'n': {
					newGame()
					break
				}
				case 'p': {
					play()
					break
				}
				case 'r': {
					restart()
					break
				}
			}
		},
		[play, pause, newGame, restart]
	)

	useEffect(() => {
		document.addEventListener('keydown', keydownListener)

		return () => {
			document.removeEventListener('keydown', keydownListener)
		}
	}, [keydownListener])

	return null
}
