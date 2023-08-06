import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";

import { fetchData } from "../redux/dataSlice";


export default function useDataFetch(data_hash) {
    const dispatch = useDispatch();

    useEffect(() => {
        // 데이터 가져오는 비동기 액션 호출
        if (data_hash) {
            const data = async () => {
                const isHashOK = await axios.get(
                    process.env.BACK_BASE_URL + `/wanted/check/${data_hash}`
                );
                if (isHashOK.data.status === "OK") return;
            
                dispatch(fetchData()).unwrap();
            };
    
            data();
        } else {
            dispatch(fetchData()).unwrap();
        }
    }, [])
}

