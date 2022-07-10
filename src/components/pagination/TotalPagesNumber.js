import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paginationSelector, updateCurrentPage } from '../../redux/pagination'
import { Pagination } from '@mui/material'

const TotalPagesNumber = () => {
	const dispatch = useDispatch()

	const { currentPage, totalPages, filteredFilms } = useSelector(paginationSelector)

	const handleChangePage = (e, newPage) => {
		const payload = { filteredFilms, currentPage: newPage }
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