import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'

import {genSudokuMatrix} from 'sudokuHelpers'
import {deepCopy, genEmptySudokuMatrix} from 'myUtils'


export const SudokuContext = createContext({
	selectedValue: undefined
})

export const SudokuContextProvider = ({children}) => {
	const [elapsedTime, setElapsedTime] = useState(0)
	const [selectedValue, setSelectedValue]	= useState(null)
	const [inputMatrix,	setInputMatrix]		= useState(genEmptySudokuMatrix())
	const [workingMatrix, setWorkingMatrix]	= useState(genEmptySudokuMatrix())
	const [gameComplete, setGameComplete]	= useState(false)

	const genNewMatrix = useCallback(async () => {
		const count = 45
		const matrix = await genSudokuMatrix(count)
		setInputMatrix(deepCopy(matrix))
		setWorkingMatrix(deepCopy(matrix))

	}, [setInputMatrix, setWorkingMatrix])


	const resetState = useCallback(() => {
		setElapsedTime(0)
		setSelectedValue(null)
		setInputMatrix(genEmptySudokuMatrix())
		setWorkingMatrix(genEmptySudokuMatrix())
		setGameComplete(false)

	}, [setSelectedValue, setInputMatrix, setWorkingMatrix, setGameComplete])


	const genNewGame = useCallback(() => {
		resetState()
		genNewMatrix()
	}, [resetState, genNewMatrix])

	useEffect(() => {
		genNewMatrix()
	}, [genNewMatrix])

	const value = {
		elapsedTime, setElapsedTime,
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete,
		genNewGame
	}

	return (
		<SudokuContext.Provider value={value}>
			{children}
		</SudokuContext.Provider>
	)
}

export const useSudokuContext = () => {
	const {
		elapsedTime, setElapsedTime,
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete,
		genNewGame
	} = useContext(SudokuContext)

	useEffect(() => {
		if(selectedValue === undefined) {
			throw new Error(`The Component using 'useSudokuContext' hook must be a descendant of 'SudokuContextProvider'.`)
		}
	});

	return {
		elapsedTime, setElapsedTime,
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete,
		genNewGame
	}
}
