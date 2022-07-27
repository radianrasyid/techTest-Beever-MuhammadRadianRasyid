import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useState } from 'react';

const URL = "https://api.kanye.rest";

export const getBarangsAsync = createAsyncThunk('barangs/getBarangs', 
async() => {
    const response = await fetch("https://secondhandkelompok4.herokuapp.com/api/items/findall");
    if(response.ok){
        const barangs = await response.json()
        return { barangs }
    }
})

export const fetchQuotes = createAsyncThunk("quotes/fetchPosts", async()=>{
    const response = await fetch(URL);
    if(response.ok){
        const quotes = await response.json();
        return { quotes };
    }
})

const barangSlice = createSlice({
    name: "barangs",
    initialState: [],
    reducers: {
        addBarang: (state, action) =>{
            let temp = [...state]
            const filter = state.filter((item) => item.price == Number(action.payload));
            return filter
        },
        filterBarang: {
            reducer(state,action){
                state.filter(action.payload)
            }
        }
    },

    extraReducers: {
        [getBarangsAsync.pending]: (state, action) => {
            console.log("fetching data")
        },
        [getBarangsAsync.fulfilled] : (state, action) => {
            console.log("fetching complete")
            return action.payload.barangs
            
        },
    }
});

export const {addBarang} = barangSlice.actions;

export default barangSlice.reducer;