const getCategoriesList = (films) => {
	const categories = []
	films.forEach((film) => {
		const {category} = film
		if (categories.includes(category)) return
		categories.push(category)
	})
	return categories
}

export default getCategoriesList