const calculateTotalPages = (totalFilms, filmsPerPage) => {
	if (totalFilms === 0) return 0
	let result = Math.ceil(totalFilms / filmsPerPage)
	if (result < 1) return 1
	return result
}
export default calculateTotalPages;