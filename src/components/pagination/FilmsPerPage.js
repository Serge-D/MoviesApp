import React from "react";
import { useSelector, useDispatch } from "react-redux";
import calculateTotalPages from "../../tools/calculateTotalPages";
import { filmsSelector, updateFilmsPerPage } from "../../redux/redux";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";

const filmsNumbersArray = [
    { label: '4', value : 4},
    { label: '8', value : 8},
    { label: '12', value : 12}
];

const sxAdornment = {
    '& .MuiTypography-root': {
		fontSize: '0.9rem',
		color: '#4e6f99',
	},
};

const FilmsPerPage = () =>{

    const dispatch =useDispatch()

    const {filmsPerPage, currentPage, totalFilms, films} = useSelector(filmsSelector)

    const handleChange = (number) =>{
        const totalPages = calculateTotalPages(totalFilms, number)
		const firstIndex = (currentPage - 1) * number
		const lastIndex = currentPage * number
		const data = films.slice(firstIndex, lastIndex)
		const payload = { totalPages, filmsPerPage: number, currentFilmsPage: [...data] } 
        dispatch(updateFilmsPerPage(payload))
    }

    return(
        <TextField
            select
            value={filmsPerPage}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={false}
            variant="standard"
            size="small"
            sx={{ft: "0.9rem"}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" sx={sxAdornment}>
                        Nb Films/Page
                    </InputAdornment>
                )
            }}
        >
            {filmsNumbersArray.map((item,index)=>(
                <MenuItem key={item} value={filmsNumbersArray[index].value}>
                    {filmsNumbersArray[index].label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default FilmsPerPage