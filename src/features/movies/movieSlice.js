import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', 
    async (term)=>{
        term = term === "" ? "Avengers" : term;
        const response = await movieApi.get(
            `?apiKey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=movie`
            );
        return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', 
    async (term)=>{
        term = term === "" ? "Love" : term;
        const response = await movieApi.get(
            `?apiKey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=series`
            );
        return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', 
    async (id)=>{
        const response = await movieApi.get(
            `?apiKey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&Plot=full`
            );
        return response.data;
});

const initailState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{}
}

const movieSlice = createSlice({
    name: "movies",
    initialState: initailState,
    reducers: {
        removeSelectedMovieOrShow: (state)=>{
            state.selectedMovieOrShow ={};
        }
    },
    extraReducers:{
        [fetchAsyncMovies.pending]: ()=>{
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            return {...state, movies: payload};
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            return {...state, shows: payload};
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) => {
            return {...state, selectedMovieOrShow: payload};
        },
    }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;