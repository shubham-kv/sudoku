import React, {createContext, useState} from 'react'

const SudokuContext = createContext([null, null])

const SudokuContextProvider = ({children}) => {
	const [selectedValue, setSelectedValue] = useState(null)

	return (
		<SudokuContext.Provider value={[selectedValue, setSelectedValue]}>
			{children}
		</SudokuContext.Provider>
	)
}

export {SudokuContext, SudokuContextProvider}
