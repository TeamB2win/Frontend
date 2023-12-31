import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// 비동기 액션으로 데이터를 가져오는 함수
export const fetchData = createAsyncThunk("data/fetchData", async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACK_BASE_URL + "/wanted");
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
                state.data_hash = action.payload.dataHash;
                
                // 데이터 정렬 로직 추가
                state.data = action.payload.data.sort((a, b) => {
                    // wantedType을 기준으로 내림차순 정렬
                    if (a.wantedType && !b.wantedType) return -1;
                    if (!a.wantedType && b.wantedType) return 1;
                    
                    // wantedType이 같은 경우 id를 오름차순으로 정렬
                    return a.wantedId - b.wantedId;
                });
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export let { filteredData, removeHash } = dataSlice.actions;

export default dataSlice.reducer;
