import { createSlice } from '@reduxjs/toolkit'
import calculateTotalPages from '../tools/calculateTotalPages'
import getPaginationFilms from '../tools/getPaginationFilms'
import getCategoriesList from '../tools/getCategoriesList'

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState: {
		currentPage: 1,
		filmsPerPage: 8,
		totalPages: 0,
		currentFilmsPage: [],
		categories: [],
		filteredFilms: [],
		categoriesList: []
	},
	reducers: {
		updateCurrentFilms: (state, { payload }) => {
			const { filteredFilms } = payload

			state.totalPages = calculateTotalPages(filteredFilms.length, state.filmsPerPage)

			if (state.currentPage > state.totalPages) state.currentPage = 1

			state.currentFilmsPage = getPaginationFilms({
				filteredFilms,
				currentPage: state.currentPage,
				filmsPerPage: state.filmsPerPage,
			})
		},

		updateCurrentPage: (state, { payload }) => {
			const { currentPage, filteredFilms } = payload
			state.currentPage = currentPage
			if (state.currentPage > state.totalPages) state.currentPage = 1

			state.currentFilmsPage = getPaginationFilms({
				filteredFilms,
				currentPage: state.currentPage,
				filmsPerPage: state.filmsPerPage,
			})
		},

		updateFilmsPerPage: (state, { payload }) => {
			const { filmsPerPage, filteredFilms } = payload
			state.filmsPerPage = filmsPerPage
			state.totalPages = calculateTotalPages(filteredFilms.length, state.filmsPerPage)

			if (state.currentPage > state.totalPages) state.currentPage = 1

			state.currentFilmsPage = getPaginationFilms({
				filteredFilms,
				currentPage: state.currentPage,
				filmsPerPage: state.filmsPerPage,
			})
		},
		updateCategories: (state, { payload }) => {
			const { categories, films } = payload
			if (categories) state.categories = categories
			if (state.categories.length === 0) {
				state.filteredFilms = [...films]
			} else {
				state.filteredFilms = films.filter((film) => state.categories.includes(film.category))
			}
			state.categoriesList = getCategoriesList(films)
		},
	},
})

export const { updateCurrentFilms, updateCurrentPage, updateFilmsPerPage, updateCategories} = paginationSlice.actions

export default paginationSlice.reducer

export const paginationSelector = (state) => state.pagination