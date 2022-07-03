import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, filmsSelector } from "../redux/redux";
import Film from './Film';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PaginationPagesNumber from "./pagination/TotalPagesNumber";
import PaginationFilmsNumber from "./pagination/FilmsPerPage";



const sxPaper= {
    display: "flex",
    justifyContent: "space-between",
    p: 1,
    my: 2
}

const Films = () => {

    const dispatch = useDispatch();

    const {totalFilms, currentFilmsPage} = useSelector(filmsSelector);

    useEffect(()=>{
        dispatch(fetchFilms())
    },[dispatch])


    return (
		<>
			{totalFilms > 0 && (
				<>
					<Paper sx={sxPaper}>
						<Box sx={{width: 200}}>
							<PaginationPagesNumber />
						</Box>
						<Box>
							<PaginationFilmsNumber />
						</Box>
					</Paper>

					<Grid container spacing={10}>
						{currentFilmsPage.map((film) => (
								<Grid item key={film.id}>
									<Film film={film} />
								</Grid>
							))}
					</Grid>
				</>
			)}
		</>
	)
}

export default Films
