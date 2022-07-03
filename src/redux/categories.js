import { createSlice } from '@reduxjs/toolkit'



export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
		filteredFilms: [],
	},
	reducers: {
		updateCategories: (state, { payload }) => {
			const { categories, films } = payload
            console.log("redux", payload)
			state.categories = categories
			if(categories.length === 0){
                state.filteredFilms = [...films]
            }else{
                state.filteredFilms = films.filter((film) => categories.includes(film.category))
				const vero = state.filteredFilms
				console.log("je suis derriere le filter", vero)
            }
			console.log("fin du if")
		},
	},
})

export const { updateCategories } = categoriesSlice.actions

export const categoriesSelector = (state) => state.categories

// il y a un bug au niveau de l'affichage du filtre des categories, l'application à un train de retard et l'affichage ne se fait pas malgré que le tableau des films filtré par catégories est mis à jour