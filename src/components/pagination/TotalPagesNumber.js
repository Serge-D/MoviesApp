/* eslint-disable react/prop-types */
import React from "react";


import { Pagination } from '@mui/material';

const TotalPagesNumber = ({ totalPages, currentPage, setCurrentPage}) => {
    
    const handleChangePage = (e, newPage) => {
        setCurrentPage(newPage)
    }

    return(
        <Pagination 
            count = {totalPages}
            page = {currentPage}
            showFirstButton
            showLastButton
            size = "small"
            color = "secondary"
            onChange = {handleChangePage}
            style = {{ p:2 }}
        />
    )
}


export default TotalPagesNumber