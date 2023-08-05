import { useDispatch } from "react-redux";
import { fetchData } from "../redux/dataSlice";
import axios from "axios";
import { useEffect } from "react";

export default function useDataFetch(data_hash) {
    const dispatch = useDispatch();

    useEffect(() => {
        // 데이터 가져오는 비동기 액션 호출
        if (data_hash) {
            const data = async () => {
                const isHashOK = await axios.get(
                    `http://63.35.31.27:8000/wanted/check/${data_hash}`
                );
                console.log(data_hash);
                console.log(isHashOK.data.status);
                if (isHashOK.data.status === "OK") return;
            
                dispatch(fetchData()).unwrap();
            };
    
            data();
        } else {
            dispatch(fetchData()).unwrap();
        }
    }, [])
}

