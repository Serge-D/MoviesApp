import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import grey from '@mui/material/colors/grey'

import Header from './components/Header'
import Films from './components/Films'

const sxPaper = { backgroundColor: grey[200], minHeight: "100vh", pt: 5 }

const App = () => {
	return (
		<>
			<CssBaseline />
			<Paper sx={sxPaper}>
				<Container maxWidth="xl">
					<Header />
					<Films />
				</Container>
			</Paper>
		</>
	)
}

export default App
