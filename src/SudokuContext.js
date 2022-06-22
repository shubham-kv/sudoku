import React, {createContext, useContext, useEffect, useState} from 'react'
import {randomize, solveMatrix, removeCells} from 'sudokuMethods'
import {deepCopy, genEmptySudokuMatrix} from 'utils'


const useSudokuMatrix = () => {
	const [inputMatrix, setInputMatrix] = useState(genEmptySudokuMatrix())
	const [workingMatrix, setWorkingMatrix] = useState(genEmptySudokuMatrix())

	useEffect(() => {
		const loadMatrix = async () => {
			const randomized = randomize(genEmptySudokuMatrix())
			const newMatrix = await solveMatrix(randomized)
			removeCells(newMatrix, 40)
			setInputMatrix(deepCopy(newMatrix))
			setWorkingMatrix(deepCopy(newMatrix))
		}
		loadMatrix()
	}, [])

	return {inputMatrix, workingMatrix, setWorkingMatrix}
}

export const SudokuContext = createContext({
	selectedValue:		undefined,
	setSelectedValue:	undefined,
	inputMatrix:		undefined,
	workingMatrix:		undefined,
	setWorkingMatrix:	undefined
})

export const SudokuContextProvider = ({children}) => {
	const [selectedValue, setSelectedValue] = useState(null)
	const {inputMatrix, workingMatrix, setWorkingMatrix} = useSudokuMatrix()

	const value = {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix
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
		inputMatrix, workingMatrix, setWorkingMatrix
	} = useContext(SudokuContext)

	useEffect(() => {
		if(selectedValue === undefined) {
			throw new Error(`The Component using 'useSudokuContext' hook must be a descendant of 'SudokuContextProvider'.`)
		}
	});

	return {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix
	}
}
