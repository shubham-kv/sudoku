import {createContext} from 'react'
import {GameData} from './types'

export const GameContext = createContext<GameData | undefined>(undefined)
