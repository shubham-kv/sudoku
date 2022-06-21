import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import {AppContextProvider} from './AppContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>
)
