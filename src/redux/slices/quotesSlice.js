import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://api.kanye.rest";

const initialState = {
    quotes: [],
    fav: [],
    owned: [],
    status: 'idle',
    error: null
}

export const fetchQuotes = createAsyncThunk("quotes/fetchPosts", async()=>{
    try {
        const response = await axios.get(URL);
        return response.data
    } catch (error) {
        return error.message
    }
})

const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {
        quotesAdd(state, action){
            for(let i = 0; i<state.quotes.length; i++){
                if(action.payload.quote.toLowerCase() == state.quotes[0].quote.toLowerCase()){
                    alert("quotes sudah ada")
                    return
                }
                else{
                    if(state.fav.length !== 0){
                        for(let j = 0; j<state.fav.length; j++){
                                if(action.payload.quote.toLowerCase() == state.fav[i].fav){
                                    alert("quotes sudah ada")
                                }else{
                                    state.owned.push(action.payload)
                                    return;
                                }
                        }
                    }else{
                        state.owned.push(action.payload)
                    }
                }
            }
        },
        addFav(state, action){
            let fav = state.quotes[0].quote;
            state.fav.push({
                fav
            })
        },
        getData(state, action){
            state.status = 'idle'
        }
    },
    extraReducers(builder){
        builder.addCase(fetchQuotes.pending, (state, action)=>{
            state.status = "PENDING"
        })
        .addCase(fetchQuotes.fulfilled, (state, action)=>{
            state.status = 'SUCCED'
            state.quotes = [action.payload]
        })
        .addCase(fetchQuotes.rejected, (state, action)=>{
            state.status = "ERROR";
            state.error = action.error.message
        })
    }
})

export const selectAllQuotes = (state) => state
export const getQuotesStatus = (state) => state.quotes.status
export const getQuotesError = (state) => state.quotes.error

export const { quotesAdd, addFav, getData } = quotesSlice.actions

export default quotesSlice.reducer
