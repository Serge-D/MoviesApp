import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { filmsSelector } from '../../redux/films'
import { updateCurrentFilms, updateCategories, paginationSelector } from '../../redux/pagination'

const CategoriesFilter = () => {
	const dispatch = useDispatch()
	const { films } = useSelector(filmsSelector)
	const { filteredFilms, categories, categoriesList } = useSelector(paginationSelector)
	const [categoriesState, setCategoriesState] = useState(categories)
	const [isNewFilter, setIsNewFilter] = useState(false)

	useEffect(() => {
		const payload = { films, categories: categoriesState }
		dispatch(updateCategories(payload))
		setIsNewFilter(true)
	}, [categoriesState])

	useEffect(() => {
		const payload = {
			filteredFilms,
			totalFilteredFilms: filteredFilms.length,
		}
		dispatch(updateCurrentFilms(payload))
		setIsNewFilter(false)
	}, [isNewFilter])

	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		setCategoriesState(typeof value === 'string' ? value.split(',') : value)
	}

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="category">Categories</InputLabel>
				<Select
					labelId="category"
					id="category"
					multiple
					value={categoriesState}
					size="small"
					onChange={handleChange}
					input={<OutlinedInput label="categories" />}
				>
					{categoriesList.map((category) => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
export default CategoriesFilter