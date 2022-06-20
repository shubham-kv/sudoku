import React, {createContext, useState} from 'react'

const AppContext = createContext()

const AppContextProvider = ({children}) => {
	const [selectedValue, setSelectedValue] = useState(null)
	const [selectedRow, setSelectedRow] = useState(null)
	const [selectedCol, setSelectedCol] = useState(null)

	const value = {
		sValue: [selectedValue, setSelectedValue],
		sRow: [selectedRow, setSelectedRow],
		sCol: [selectedCol, setSelectedCol],
	}

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}

export {AppContext, AppContextProvider}
