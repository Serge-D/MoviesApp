const sortFilms = (films) => {
	return films.sort((a, b) => (a.title > b.title ? 1 : -1))
}

export default sortFilms