import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paginationSelector, updateFilmsPerPage } from '../../redux/pagination'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'

const filmsNumbersArray = [
	{ label: '4', value: 4 },
	{ label: '8', value: 8 },
	{ label: '12', value: 12 },
]

const FilmsPerPage = () => {
	const dispatch = useDispatch()

	const { filmsPerPage, filteredFilms} = useSelector(paginationSelector)

	const handleChange = (number) => {
		const payload = {
			filteredFilms,
			filmsPerPage: number,
		}
		dispatch(updateFilmsPerPage(payload))
	}

	return (
		<FormControl sx={{ m: 1, width: 100 }}>
			<InputLabel id="filmsPerPage">Nb films/page</InputLabel>
			<Select
				value={filmsPerPage}
				onChange={(e) => handleChange(e.target.value)}
				fullWidth={false}
				variant="standard"
				size="small"
				sx={{ ft: '0.9rem' }}
				input={<OutlinedInput label="filmsPerPage" />}
			>
				{filmsNumbersArray.map((item, index) => (
					<MenuItem key={item.label} value={filmsNumbersArray[index].value}>
						{filmsNumbersArray[index].label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default FilmsPerPage