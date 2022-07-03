const calculateTotalPages = (totalFilms, filmsPerPage) => {
	if (totalFilms === 0) return 0
	return Math.ceil(totalFilms / filmsPerPage)
}
export default calculateTotalPages;