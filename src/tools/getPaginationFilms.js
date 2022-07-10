const getPaginationFilms = (filmsData) => {
	const { currentPage, filmsPerPage, filteredFilms } = filmsData
	const firstIndex = (currentPage - 1) * filmsPerPage
	const lastIndex = currentPage * filmsPerPage
	return filteredFilms.slice(firstIndex, lastIndex) || []
}

export default getPaginationFilms 