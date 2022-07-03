import  React, {useState} from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

const categoriesList = ['Animation', 'Comedy', 'Thriller', 'Drame']

function getStyles(category, categories, theme) {
	return {
		fontWeight:
			categories.indexOf(category) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	}
}

const CategoryFilter = () => {
	const theme = useTheme()
	const [categories, setCategories] = useState([])

	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		setCategories(

			typeof value === 'string' ? value.split(',') : value,
		)
        console.log("resultat", categories)
	}

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="category">Categories</InputLabel>
				<Select
					labelId="category"
					id="category"
					multiple
					value={categories}
					onChange={handleChange}
					input={<OutlinedInput label="categories" />}
					MenuProps={MenuProps}
				>
					{categoriesList.map((category) => (
						<MenuItem
							key={category}
							value={category}
							style={getStyles(category, categoriesList, theme)}
						>
							{category}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
export default CategoryFilter
