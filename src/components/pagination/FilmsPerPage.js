import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paginationSelector, updatePagination } from '../../redux/pagination'
import { filmsSelector } from '../../redux/films'
import { InputAdornment } from '@mui/material'
import { TextField } from '@mui/material'
import { MenuItem } from '@mui/material'

const filmsNumbersArray = [
	{ label: '4', value: 4 },
	{ label: '8', value: 8 },
	{ label: '12', value: 12 },
]

const sxAdornment = {
	'& .MuiTypography-root': {
		fontSize: '0.9rem',
		color: '#4e6f99',
	},
}

const FilmsPerPage = () => {
	const dispatch = useDispatch()

	const { filmsPerPage, currentPage } = useSelector(paginationSelector)
	const { totalFilms, films } = useSelector(filmsSelector)

	const handleChange = (number) => {
		const payload = { films, totalFilms, filmsPerPage: number, currentPage }
		dispatch(updatePagination(payload))
	}

	return (
		<TextField
			select
			value={filmsPerPage}
			onChange={(e) => handleChange(e.target.value)}
			fullWidth={false}
			variant="standard"
			size="small"
			sx={{ ft: '0.9rem' }}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" sx={sxAdornment}>
						Nb Films/Page
					</InputAdornment>
				),
			}}
		>
			{filmsNumbersArray.map((item, index) => (
				<MenuItem key={item.label} value={filmsNumbersArray[index].value}>
					{filmsNumbersArray[index].label}
				</MenuItem>
			))}
		</TextField>
	)
}

export default FilmsPerPage