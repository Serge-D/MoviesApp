import React, { useEffect , useState } from "react";
import Film from './Film';
import { movies$ } from "../data/movies";
import Grid  from "@mui/material/Grid";
import  Box  from "@mui/material/Box";
import  Paper  from "@mui/material/Paper";
import PaginationPagesNumber from "./pagination/TotalPagesNumber";
import PaginationFilmsNumber from "./pagination/FilmsPerPage";

const calculeTotalPages = (totalFilms, filmsPerPage) => {
    if (totalFilms === 0) return 0
    let result = Math.ceil(totalFilms / filmsPerPage)
    if ( result < 1 ) return 1
    return result
}

const sxPaper= {
    display: "flex",
    justifyContent: "space-between",
    p: 1,
    my: 2
}

const Films = () => {
    const [filmsData, setFilmsData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filmsPerPage, setFilmsPerPage] = useState();
    const [currentPageFilms, setCurrentPageFilms]= useState();
    const { films, totalFilms, totalPages} = filmsData || {};

    useEffect(()=>{
        movies$.then((res)=>{
            const totalFilms = res.length
            const data = {
                films: res,
                totalFilms
            }
            setFilmsData(data)
            setFilmsPerPage(8)
        })
    },[])

    useEffect(()=>{
        const totalPages = calculeTotalPages(totalFilms, filmsPerPage)
        const data = {
            ...filmsData,
            totalPages
        }
        console.log("fff")
        setFilmsData(data)
    }, [filmsPerPage])

    useEffect(()=>{
        if (totalFilms && totalFilms > 0){
            const firstIndex = (currentPage - 1 ) * filmsPerPage;
            const lastIndex = currentPage * filmsPerPage;
            const data = films.slice(firstIndex, lastIndex);
            console.log("ici", data)
            setCurrentPageFilms(data)
        }
    },[totalFilms, currentPage, filmsPerPage])


    return (
		<>
			{totalFilms > 0 && (
				<>
					<Paper sx={sxPaper}>
						<Box sx={{width: 200}}>
							<PaginationPagesNumber
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						</Box>
						<Box>
							<PaginationFilmsNumber
								filmsPerPage={filmsPerPage}
								setFilmsPerPage={setFilmsPerPage}
							/>
						</Box>
					</Paper>

					<Grid container spacing={5}>
						{currentPageFilms &&
							currentPageFilms.map((film) => (
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
