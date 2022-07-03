import React from 'react'
import { Provider } from 'react-redux'
import { store } from "./redux/redux"
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import grey from '@mui/material/colors/grey'

import Header from './components/Header'
import Films from './components/Films'


const sxPaper = { backgroundColor: grey[200], minHeight: "100vh", pt: 5 }

const App = () => {
	return (
		<Provider store={store}>

				<CssBaseline />
				<Paper sx={sxPaper}>
					<Container maxWidth="xl">
						<Header />
						<Films />
					</Container>
				</Paper>

		</Provider>
	)
}

export default App
