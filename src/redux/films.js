import { createSlice } from '@reduxjs/toolkit'
import { movies$ } from '../data/movies'
import { updatePagination } from './pagination'


export const filmSlice = createSlice({
	name: 'films',
	initialState: {
		films: [],
		totalFilms: 0,
	},
	reducers: {
		getFilms: (state, { payload }) => {
			state.films = payload
			state.totalFilms = payload.length
		},

		deleteFilm: (state, { payload }) => {
			const data = state.films.filter((film) => film.id !== payload)
			state.films = data
			state.totalFilms = data.length
		},
		updateFilm: (state, { payload }) => {
			const { id, likes, dislikes, isLike, isDislike } = payload
			console.log('payload', payload)
			const updFilm = state.films.find((film) => film.id === id)
			console.log('updated film', updFilm)
			updFilm.likes = likes
			updFilm.dislikes = dislikes
			updFilm.isLike = isLike
			updFilm.isDislike = isDislike
		},
	},
})

export const fetchFilms = () => {
	return async (dispatch) => {
		movies$.then((data) => {
			dispatch(getFilms(data))
			const payload = {
				films: data,
				currentPage: 1,
				filmsPerPage: 8,
				totalFilms: data.length,
			}
			dispatch(updatePagination(payload))
		})
	}
}

export const { getFilms, deleteFilm, updateFilm } = filmSlice.actions

export const filmsSelector = (state) => state.films
