import React, {createContext, useState} from 'react'

const SudokuContext = createContext()

const SudokuContextProvider = ({children}) => {
	const [selectedValue, setSelectedValue] = useState(null)
	const [selectedRow, setSelectedRow] = useState(null)
	const [selectedCol, setSelectedCol] = useState(null)

	const value = {
		sValue: [selectedValue, setSelectedValue],
		sRow: [selectedRow, setSelectedRow],
		sCol: [selectedCol, setSelectedCol],
	}

	return (
		<SudokuContext.Provider value={value}>
			{children}
		</SudokuContext.Provider>
	)
}

export {SudokuContext, SudokuContextProvider}
