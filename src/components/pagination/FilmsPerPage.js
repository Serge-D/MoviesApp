import React from "react";
import PropTypes from "prop-types";
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

const FilmsPerPage = ({filmsPerPage, setFilmsPerPage}) =>{
    const handleChange = (number) =>{
        setFilmsPerPage(number)
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

FilmsPerPage.propTypes= {
    filmsPerPage: PropTypes.number.isRequired,
    setFilmsPerPage: PropTypes.func.isRequired
}

export default FilmsPerPage