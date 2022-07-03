import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { fetchFilms, filmsSelector } from '../redux/films'
import { paginationSelector } from '../redux/pagination'
import Film from './Film'
import PaginationPagesNumber from './pagination/TotalPagesNumber'
import PaginationFilmsNumber from './pagination/FilmsPerPage'
import PaginationCategory from './pagination/CategoryFilter'

const sxPaper = {
	display: 'flex',
	justifyContent: 'space-between',
	p: 1,
	my: 2,
}

const Films = () => {
	const dispatch = useDispatch()

	const { totalFilms } = useSelector(filmsSelector)
	const { currentFilmsPage } = useSelector(paginationSelector)

	useEffect(() => {
		dispatch(fetchFilms())
	}, [dispatch])

	return (
		<>
			{totalFilms > 0 && (
				<>
					<Paper sx={sxPaper}>
						<Box sx={{ width: 200 }}>
							<PaginationPagesNumber />
						</Box>
						<Box>
							<PaginationCategory />
						</Box>
						<Box>
							<PaginationFilmsNumber />
						</Box>
					</Paper>

					<Grid container spacing={10}>
						{currentFilmsPage.map((film) => (
							<Grid item key={film.id}>
								<Film film={film} />
							</Grid>
						))}
					</Grid>
				</>
			)}
		</>
	)
}

export default Films