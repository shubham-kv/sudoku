import {
	createContext,
	useCallback, useContext,
	useEffect, useState
} from 'react'

import {genSudokuMatrix} from 'sudokuHelpers'
import {deepCopy, genEmptySudokuMatrix} from 'myUtils'


const SudokuContext = createContext(null)

const SudokuContextProvider = ({children}) => {
	const [elapsedTime, setElapsedTime] = useState(0)

	const [selectedValue, setSelectedValue]	= useState(null)
	const [inputMatrix,	setInputMatrix]		= useState(genEmptySudokuMatrix())
	const [workingMatrix, setWorkingMatrix]	= useState(genEmptySudokuMatrix())

	const [gameComplete, setGameComplete]	= useState(false)


	const genNewMatrix = useCallback(async () => {
		const count = 45
		const matrix = await genSudokuMatrix(count)

		setInputMatrix(matrix)
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

	const ctxValue = {
		elapsedTime, setElapsedTime,
		selectedValue, setSelectedValue,
		inputMatrix, setInputMatrix,
		workingMatrix, setWorkingMatrix,
		gameComplete, setGameComplete,
		genNewGame
	}

	return (
		<SudokuContext.Provider value={ctxValue}>
			{children}
		</SudokuContext.Provider>
	)
}

const useSudokuContext = () => {
	const sudokuCtxValue = useContext(SudokuContext)

	useEffect(() => {
		if(sudokuCtxValue === null) {
			throw new Error(`The Component using 'useSudokuContext' hook must be a descendant of 'SudokuContextProvider'.`)
		}
	}, [sudokuCtxValue])

	return sudokuCtxValue
}

export {
	SudokuContextProvider,
	useSudokuContext
}
