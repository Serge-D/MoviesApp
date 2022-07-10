import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from './films';
import paginationReducer from "./pagination";


export const store = configureStore({
    reducer: {
        films: filmsReducer,
        pagination: paginationReducer
    }
})