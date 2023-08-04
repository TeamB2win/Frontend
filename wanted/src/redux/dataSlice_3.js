import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 비동기 액션으로 데이터를 가져오는 함수
export const fetchData = createAsyncThunk("data/fetchData", async () => {
    try {
        const response = await axios.get("http://63.35.31.27:8000/wanted");
        return response.data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    data: [],
    data_hash: null,
    status: "idle",
    error: null
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        
        filteredData(state, action) {
            state.data = state.cashedData;
            if (action.payload.criminal === "죄명") action.payload.criminal = "";
            if (action.payload.type === "유형") action.payload.type = "";
            if (action.payload.criminal === "" && action.payload.type === "") {
                state.data = state.cashedData;
            } else {
                console.log(state.data)
                state.data = state.data.filter(
                    (el) => {
                        let a = true
                        if (action.payload.type === "긴급") {
                            a = el.wantedType === true
                        } else if (action.payload.type === "종합") {
                            a = el.wantedType === false
                        }

                        let b = true
                        if (el.detail[0].criminal !== action.payload.criminal && action.payload.criminal !== "") {
                            b = false
                        } 

                        return a && b
                });
                console.log(state.data);
            }
        },
        removeHash(state) {
            state.data_hash = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.cashedData = action.payload.data;
                state.data_hash = action.payload.dataHash; 
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export let { filteredData, removeHash } = dataSlice.actions;

export default dataSlice.reducer;
