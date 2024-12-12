import {useCallback, useEffect} from 'react'

import {useGame} from '@/features/game'
import {useSudokuGame} from '../hooks'
import {
	genSudokuMatrix,
	deepCopy,
	getFirstEmptyCell,
	validateSudokuMatrix
} from '@/utils'
import {initialSudokuGameData} from '../constants'

export function SudokuGameEventListener() {
	const {gameState, setGameState} = useGame()!
	const {
		setSelectedValue,
		setFocusedCell,
		inputMatrix,
		setInputMatrix,
		workingMatrix,
		setWorkingMatrix
	} = useSudokuGame()!

	const performInitialSetup = useCallback(async () => {
		const count = 45
		const matrix = await genSudokuMatrix(count)
		setInputMatrix(matrix)
		setWorkingMatrix(initialSudokuGameData.workingMatrix)
	}, [setInputMatrix, setWorkingMatrix])

	const setupWorkingMatrix = useCallback(async () => {
		setWorkingMatrix(deepCopy(inputMatrix))
	}, [inputMatrix, setWorkingMatrix])

	const isWorkingMatrixComplete = useCallback(() => {
		return (
			getFirstEmptyCell(workingMatrix) === null &&
			validateSudokuMatrix(workingMatrix)
		)
	}, [workingMatrix])

	useEffect(() => {
		const handleGameStateChange = async () => {
			switch (gameState) {
				case 'initial': {
					await performInitialSetup()
					setSelectedValue(initialSudokuGameData.selectedValue)
					setFocusedCell(initialSudokuGameData.focusedCell)
					setGameState('pre-start')
					break
				}
				case 'pre-start': {
					setupWorkingMatrix()
					setGameState('running')
					break
				}
				case 'running': {
					if (isWorkingMatrixComplete()) {
						setSelectedValue(null)
						setFocusedCell(null)
						setGameState('completed')
					}
					break
				}
				case 'paused': {
					setSelectedValue(null)
					setFocusedCell(null)
					break
				}
			}
		}

		handleGameStateChange()
	}, [
		gameState,
		isWorkingMatrixComplete,
		performInitialSetup,
		setFocusedCell,
		setGameState,
		setSelectedValue,
		setupWorkingMatrix
	])

	return null
}
