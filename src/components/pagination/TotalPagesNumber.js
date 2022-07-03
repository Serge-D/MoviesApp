/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filmsSelector, updateCurrentPage } from '../../redux/redux'
import calculateTotalPages from '../../tools/calculateTotalPages'

import { Pagination } from '@mui/material'

const TotalPagesNumber = () => {
	const dispatch = useDispatch()

	const { currentPage, totalPages, filmsPerPage, films, totalFilms } = useSelector(filmsSelector)

	const handleChangePage = (e, newPage) => {
        const newTotalPages = calculateTotalPages(totalFilms, filmsPerPage)
		const firstIndex = (newPage - 1) * filmsPerPage
		const lastIndex = newPage * filmsPerPage
		const data = films.slice(firstIndex, lastIndex)
		const payload = {totalPages: newTotalPages, currentPage: newPage, currentFilmsPage: [...data] }
		dispatch(updateCurrentPage(payload))
	}

	return (
		<Pagination
			count={totalPages}
			page={currentPage}
			showFirstButton
			showLastButton
			size="small"
			color="secondary"
			onChange={handleChangePage}
			style={{ p: 2 }}
		/>
	)
}

export default TotalPagesNumber
