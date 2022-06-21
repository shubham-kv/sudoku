import {useEffect, useState} from 'react'
import {randomize, solveMatrix, removeCells} from './sudokuMethods'
import {deepCopy, genEmptySudokuMatrix} from './utils'

export const useSudokuMatrix = () => {
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

	return [inputMatrix, workingMatrix, setWorkingMatrix]
}
