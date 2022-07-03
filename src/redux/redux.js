import { createSlice , configureStore } from "@reduxjs/toolkit";
import { movies$ } from "../data/movies";


const calculateTotalPages = (totalFilms, filmsPerPage) => {
	if (totalFilms === 0) return 0
	let result = Math.ceil(totalFilms / filmsPerPage)
	if (result < 1) return 1
	return result
}

const filmSlice = createSlice({
    name: "films",
    initialState: {
        films:[],
        totalFilms: 0,
        currentPage : 0,
        filmsPerPage: 0,
        totalPages: 0,
        currentFilmsPage: []
    },
    reducers: {
        getFilms: (state, {payload}) =>{
            console.log(payload)
            state.films = payload
			state.totalFilms = payload.length
			state.currentPage = 1
			state.filmsPerPage = 8
			state.totalPages = calculateTotalPages(payload.length, state.filmsPerPage)
			const firstIndex = (state.currentPage - 1) * state.filmsPerPage
			const lastIndex = state.currentPage * state.filmsPerPage
			const data = payload.slice(firstIndex, lastIndex)
			state.currentFilmsPage = [...data] || []
        },
        updateCurrentPage: (state, {payload}) => {
            const {currentPage, currentFilmsPage, totalPages} = payload
            state.currentPage = currentPage
            state.currentFilmsPage = currentFilmsPage
            state.totalPages = totalPages
        },
        updateFilmsPerPage: (state, { payload }) => {
            const {filmsPerPage, totalPages, currentFilmsPage} = payload
            state.filmsPerPage = filmsPerPage
            state.totalPages = totalPages
            state.currentFilmsPage= currentFilmsPage
            state.currentPage = 1
		},
        deleteFilm: (state, {payload}) => {
            const {totalPages, id }= payload
            const data = state.films.filter((film) => film.id !== id)
            state.films = data
            state.totalFilms = data.length
            state.totalPages = totalPages
            const firstIndex = (state.currentPage - 1) * state.filmsPerPage
			const lastIndex = state.currentPage * state.filmsPerPage
			const newData = state.films.slice(firstIndex, lastIndex)
			state.currentFilmsPage = [...newData] || []
        },
        updateFilm: (state, {payload}) => {
            const {id, likes, dislikes} = payload
            const updFilm = state.films.find((film) => film.id === id)
            updFilm.likes = likes
            updFilm.dislikes = dislikes
            const firstIndex = (state.currentPage - 1) * state.filmsPerPage
			const lastIndex = state.currentPage * state.filmsPerPage
			const newData = state.films.slice(firstIndex, lastIndex)
			state.currentFilmsPage = [...newData] || []
        }
    }
})

export const fetchFilms = () => {
	return async (dispatch) => {
		movies$.then((data) => {
			dispatch(getFilms(data))
		})
	}
}

export const {getFilms, updateCurrentPage, deleteFilm, updateFilm, updateFilmsPerPage} = filmSlice.actions;

export const filmsSelector = (state) => state.films

export const store = configureStore({
    reducer: {
        films : filmSlice.reducer
    }
})