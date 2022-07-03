import React from "react";
import {AppBar} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import { blueGrey } from "@mui/material/colors";

const sxAppBar = {
    borderRadius : 1,
    backgroundColor : blueGrey[800],
    color: "white"
}

const Header = () => {
    return (
        <AppBar position="sticky" sx={sxAppBar}>
            <Toolbar>
                <MovieIcon />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                    Movies List
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
