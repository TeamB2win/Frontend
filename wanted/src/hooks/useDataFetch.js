import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/dataSlice_3";
import axios from "axios";

export default function useDataFetch(data_hash) {
    const dispatch = useDispatch();

    useEffect(() => {
        // 데이터 가져오는 비동기 액션 호출
        if (data_hash) {
            const data = async () => {
                const isHashOK = await axios.get(
                    `http://63.35.31.27:8000/wanted/check/${data_hash}`
                );
                if (isHashOK.data.status === "OK") return;
                return (async () => {
                    await dispatch(fetchData()).unwrap();
                })();
            };
            data();
        } else {
            (async () => {
                await dispatch(fetchData()).unwrap();
            })();
        }
    }, []);
}

