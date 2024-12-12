import {createContext} from 'react'
import {initialSudokuGameData} from './constants'
import {SudokuGameData} from './types'

export const SudokuGameContext = createContext<SudokuGameData>(initialSudokuGameData)
