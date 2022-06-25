import React, {createContext, useContext, useEffect, useState} from 'react'

import {genSudokuMatrix} from 'sudokuHelpers'
import {deepCopy, genEmptySudokuMatrix} from 'myUtils'


const useSudokuMatrix = () => {
	const [inputMatrix, setInputMatrix] = useState(genEmptySudokuMatrix())
	const [workingMatrix, setWorkingMatrix] = useState(genEmptySudokuMatrix())

	useEffect(() => {
		const loadMatrix = async () => {
			const emptyCellCount = 40
			const matrix = await genSudokuMatrix(emptyCellCount)
			setInputMatrix(deepCopy(matrix))
			setWorkingMatrix(deepCopy(matrix))
		}
		loadMatrix()
	}, [])

	return {inputMatrix, setInputMatrix, workingMatrix, setWorkingMatrix}
}

export const SudokuContext = createContext({
	selectedValue: undefined
})

export const SudokuContextProvider = ({children}) => {
	const [selectedValue, setSelectedValue] = useState(null)
	const {inputMatrix, setInputMatrix, workingMatrix, setWorkingMatrix} = useSudokuMatrix()

	// true when the game is won
	const [gameComplete, setGameComplete] = useState(false)

	const value = {
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete
	}

	return (
		<SudokuContext.Provider value={value}>
			{children}
		</SudokuContext.Provider>
	)
}

export const useSudokuContext = () => {
	const {
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete
	} = useContext(SudokuContext)

	useEffect(() => {
		if(selectedValue === undefined) {
			throw new Error(`The Component using 'useSudokuContext' hook must be a descendant of 'SudokuContextProvider'.`)
		}
	});

	return {
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete
	}
}
