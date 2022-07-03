/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filmsSelector } from '../../redux/films'
import { paginationSelector, updatePagination } from '../../redux/pagination'
import { Pagination } from '@mui/material'

const TotalPagesNumber = () => {
	const dispatch = useDispatch()

	const { currentPage, totalPages } = useSelector(paginationSelector)
	const { films } = useSelector(filmsSelector)

	const handleChangePage = (e, newPage) => {
        
		const payload = {films, currentPage: newPage}
		dispatch(updatePagination(payload))
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