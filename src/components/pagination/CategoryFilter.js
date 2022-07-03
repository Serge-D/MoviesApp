import React, {useState} from 'react'
import { InputAdornment } from '@mui/material'
import { TextField } from '@mui/material'
import { MenuItem } from '@mui/material'

const categories = ['Animation', 'Comedy', 'Drame', 'Thriller']

const sxAdornment = {
	'& .MuiTypography-root': {
		fontSize: '0.9rem',
		color: '#4e6f99',
	},
}
const CategoryFilter = () => {
	const [category, setCategory] = useState('')
	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		setCategory(value)
	}
	return (
		<TextField
			select
			multiple
			value={category}
			onChange={(e) => handleChange(e.target.value)}
			fullWidth={false}
			variant="standard"
			size="small"
			sx={{ ft: '0.9rem' }}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" sx={sxAdornment}>
						Catégories
					</InputAdornment>
				),
			}}
		>
			{categories.map((item, index) => (
				<MenuItem key={index} value={categories[index]}>
					{categories[index]}
				</MenuItem>
			))}
		</TextField>
	)
}

export default CategoryFilter