import { createSlice } from '@reduxjs/toolkit'
import { movies$ } from '../data/movies'
import { updateCurrentFilms, updateCategories } from './pagination'

export const filmsSlice = createSlice({
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
			const { id, likes, dislikes, isLiked, isDisliked } = payload

			const updFilm = state.films.find((film) => film.id === id)
			updFilm.likes = likes
			updFilm.dislikes = dislikes
			updFilm.isLiked = isLiked
			updFilm.isDisliked = isDisliked
		},
	},
})

export const { getFilms, deleteFilm, updateFilm } = filmsSlice.actions

export const filmsSelector = (state) => state.films

export default filmsSlice.reducer
export const fetchFilms = () => {
	return async (dispatch) => {
		movies$.then((data) => {
			dispatch(getFilms(data))
			const payloadCategories = { categories: [], films: data }
			dispatch(updateCategories(payloadCategories))
			const payload = {
				filteredFilms: data
			}
			dispatch(updateCurrentFilms(payload))
		})
	}
}