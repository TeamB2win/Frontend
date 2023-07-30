import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch와 useSelector를 import
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Images from "../../../../src/images";
import { fetchData } from "../../../../src/redux/dataSlice_2"; // dataSlice에서 fetchData 가져오기
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const { data, data_hash, status, error } = useSelector(
        (state) => state.data
    );

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
            const data = async () => {
                await dispatch(fetchData()).unwrap();
            };
            data();
        }
    }, []);

    // 데이터 로딩 중인 경우
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // 데이터 로딩 오류인 경우
    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    //데이터가 비어있는 경우
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // 데이터가 있는 경우
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000000,
        prevArrow: null,
        nextArrow: null,
    };

    // data_hash가 있고, 기존 데이터와 hash 값이 동일한 경우

    return (
        data && (
            <>
                <button
                    onClick={() => {
                        axios({
                            method: "post",
                            url: "http://63.35.31.27:8000/admin",
                            headers: { "Content-Type": "application/json" },
                            data: {
                                request: {
                                    wantedId: 0,
                                    sex: true,
                                    wantedType: true,

                                    characteristic: "asdgxcb",
                                    startedAt: "2023-07-29T11:45:43.906207",
                                    endedAt: "2023-07-29T11:45:43.906295",

                                    image: "criminal_city",
                                },
                            },
                        });
                    }}
                >
                    ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ
                </button>
                <div className="content">
                    <div className="slide-container">
                        <Slider {...settings}>
                            {data.map((item) => (
                                <>
                                    <img src="/logo.png" />
                                    <div className="text-container">
                                        <h1 className="title">
                                            {item.detail[0].criminal}
                                        </h1>
                                        <h1 className="title">{"테스트"}</h1>
                                        <div className="tagI-container">
                                            <h2 className="tagI">
                                                {"수배정보"}
                                            </h2>
                                            <p className="name">
                                                {item.name}
                                                {item.age}
                                                {item.sex ? "여자" : "남자"}
                                            </p>
                                        </div>
                                        <p className="infoText">
                                            {"신장: 약 "}
                                            {item.detail[0].height}
                                        </p>
                                        <p className="infoText">
                                            {"체중: "}
                                            {item.detail[0].weight}
                                        </p>
                                        받아온 데이터에 address 정보(address
                                        key를 말한다.)가 있다면 해당 정보를
                                        표시하고 없다면 없다는 문구를 표시
                                        {item.hasOwnProperty("address") ? (
                                            <p className="infoText">
                                                {"주소: "}
                                                {item.address}
                                            </p>
                                        ) : (
                                            <p className="infoText">
                                                {"주소 정보가 없습니다."}
                                            </p>
                                        )}
                                        <h2 className="tagC">{"특이사항"}</h2>
                                        <p className="infoText">
                                            {"1. "}
                                            {item.detail[0].characteristic}
                                        </p>
                                        <p className="infoText">
                                            {"2. "}
                                            {"범죄자얼굴특징정보없음"}
                                        </p>
                                        <p className="infoText">
                                            {"3. "}
                                            {"도피생활정보없음"}
                                        </p>
                                        <p className="infoText">
                                            {"4. "}
                                            {
                                                "결정적 제보를 하신 분께는 신고 보상금(3000만원 지급)"
                                            }
                                        </p>
                                    </div>
                                </>
                            ))}
                        </Slider>
                    </div>
                </div>
            </>
        )
    );
};

export default Home;

{
    /* <div key={item.id}>
                                    <div className="slide-content">
                                        <div className="img-container">
                                            <img
                                                src={item.datasource[0].image}
                                                alt={item.detail.criminal}
                                                className="img"
                                            />
                                        </div>
                                        
                                    </div>
                                </div> */
}
