import {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useState
} from 'react'

import {genSudokuMatrix} from '../../sudokuHelpers'
import {deepCopy, genEmptySudokuMatrix} from '../../myUtils'

import {SudokuContextValue} from './types'

const initialValue: SudokuContextValue = {
	elapsedTime: 0,
	setElapsedTime: () => {},
	selectedValue: 0,
	setSelectedValue: () => {},

	inputMatrix: genEmptySudokuMatrix(),
	setInputMatrix: () => {},
	workingMatrix: genEmptySudokuMatrix(),
	setWorkingMatrix: () => {},

	gameComplete: false,
	setGameComplete: () => {},

	genNewGame: () => {}
}

export const SudokuContext = createContext<SudokuContextValue>(initialValue)

export function SudokuContextProvider(props: PropsWithChildren) {
	const [elapsedTime, setElapsedTime] = useState<number>(
		initialValue.elapsedTime
	)
	const [selectedValue, setSelectedValue] = useState<number | null>(
		initialValue.selectedValue
	)

	const [inputMatrix, setInputMatrix] = useState<number[][]>(
		initialValue.inputMatrix
	)
	const [workingMatrix, setWorkingMatrix] = useState<number[][]>(
		initialValue.workingMatrix
	)
	const [gameComplete, setGameComplete] = useState<boolean>(
		initialValue.gameComplete
	)

	const resetState = useCallback(() => {
		setElapsedTime(initialValue.elapsedTime)
		setSelectedValue(initialValue.selectedValue)
		setInputMatrix(initialValue.inputMatrix)
		setWorkingMatrix(initialValue.workingMatrix)
		setGameComplete(initialValue.gameComplete)
	}, [setSelectedValue, setInputMatrix, setWorkingMatrix, setGameComplete])

	const genNewMatrix = useCallback(async () => {
		const count = 45
		const matrix = await genSudokuMatrix(count)
		setInputMatrix(matrix)
		setWorkingMatrix(deepCopy(matrix))
	}, [setInputMatrix, setWorkingMatrix])

	const genNewGame = useCallback(() => {
		resetState()
		genNewMatrix()
	}, [resetState, genNewMatrix])

	useEffect(() => {
		genNewMatrix()
	}, [genNewMatrix])

	const value: SudokuContextValue = {
		elapsedTime,
		setElapsedTime,
		selectedValue,
		setSelectedValue,
		inputMatrix,
		setInputMatrix,
		workingMatrix,
		setWorkingMatrix,
		gameComplete,
		setGameComplete,
		genNewGame
	}

	return (
		<SudokuContext.Provider value={value}>
			{props.children}
		</SudokuContext.Provider>
	)
}
