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
    error: null,
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // 다른 필요한 리듀서 작성 가능
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
                state.data_hash = action.payload.dataHash; // 새로운 데이터를 가져올 때마다 hash 값을 업데이트
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;
