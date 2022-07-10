import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { fetchFilms } from '../redux/films'
import { paginationSelector } from '../redux/pagination'
import Film from './Film'
import PaginationPagesNumber from './pagination/TotalPagesNumber'
import PaginationFilmsNumber from './pagination/FilmsPerPage'
import PaginationCategories from './pagination/CategoriesFilter'

const sxPaper = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	position: 'sticky',
	top: 0,
	p: 1,
	my: 2,
	zIndex: 1,
}

const Films = () => {
	const dispatch = useDispatch()
	const { currentFilmsPage, filteredFilms } = useSelector(paginationSelector)

	useEffect(() => {
		dispatch(fetchFilms())
	}, [dispatch])

	return (
		<>
			<Paper sx={sxPaper}>
				<Box sx={{ width: 200 }}>
					<PaginationPagesNumber />
				</Box>
				<Box>
					<PaginationCategories />
				</Box>
				<Box>
					<PaginationFilmsNumber />
				</Box>
			</Paper>
			{filteredFilms && filteredFilms.length > 0 && (
				<Grid container spacing={5} justifyContent="space-betwween">
					{currentFilmsPage.map((film) => (
						<Grid item key={film.id}>
							<Film film={film} />
						</Grid>
					))}
				</Grid>
			)}
		</>
	)
}

export default Films