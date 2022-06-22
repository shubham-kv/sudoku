import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'components/App'
import {SudokuContextProvider} from 'SudokuContext'

import 'styles/default.scss'
import 'styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<SudokuContextProvider>
			<App />
		</SudokuContextProvider>
	</React.StrictMode>
)
