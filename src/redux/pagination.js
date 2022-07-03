import { createSlice } from '@reduxjs/toolkit'
import calculateTotalPages from '../tools/calculateTotalPages'

const getPaginationFilms = (filmsData) => {
	const { currentPage, filmsPerPage, films } = filmsData
	const firstIndex = (currentPage - 1) * filmsPerPage
	const lastIndex = currentPage * filmsPerPage
	return films.slice(firstIndex, lastIndex)
}

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState: {
		currentPage: 0,
		filmsPerPage: 0,
		totalPages: 0,
		currentFilmsPage: [],
	},
	reducers: {
		updatePagination: (state, { payload }) => {
			console.log("payload", payload)
			const { currentPage, filmsPerPage, films, totalFilms} = payload
			if (filmsPerPage) state.filmsPerPage = filmsPerPage
			if (currentPage) state.currentPage = currentPage
			if (totalFilms || filmsPerPage) state.totalPages = calculateTotalPages(totalFilms, state.filmsPerPage)
			if (currentPage && currentPage > state.totalPages) {
				state.currentPage = 1
			} else {
				state.currentPage = currentPage
			}
			// if (currentPage || filmsPerPage)
			state.currentFilmsPage = getPaginationFilms({ 
				films, 
				currentPage: state.currentPage, 
				filmsPerPage: state.filmsPerPage })
		},
	},
})

export const { updatePagination } = paginationSlice.actions

export const paginationSelector = (state) => state.pagination