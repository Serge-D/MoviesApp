import { configureStore } from "@reduxjs/toolkit";
import {filmSlice} from './films';
import { paginationSlice } from "./pagination";
import { categoriesSlice } from "./categories";

export const store = configureStore({
    reducer: {
        films: filmSlice.reducer,
        pagination: paginationSlice.reducer,
        categories: categoriesSlice.reducer
    }
})