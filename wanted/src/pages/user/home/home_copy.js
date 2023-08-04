import { useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import Slider from "react-slick";
import { Button, Col, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDataFetch from "../../../hooks/useDataFetch";
import { useState } from 'react';

const Home = () => {
    const { data, data_hash, status, error } = useSelector(
        (state) => state.data
    );
    useDataFetch(data_hash);

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
    return (
        <div className="content">
            <div className="slide-container">
                <Slider {...settings}>
                    {data.map((item) => <SlidingCard item={item}/>)}
                </Slider>
            </div>
        </div>
    );
};

const SlidingCard = ({ item }) => {
    const [videoError, setVideoError] = useState(false);

    return (
        <div key={item.id}>
            <Row className="slide-content">
                <Col className="img-container">
                    {videoError ? (
                        <img src="/logo.png" alt={"image_1"} className="img" />
                    ) : (
                        <video controls autoPlay loop className="img" onError={() => {setVideoError(true)}}>
                            <source src="images/test/video.mp4" type="video/mp4" />
                        </video>
                    )}
                </Col>
                <Col className="text-container">
                    {/* 이미지 오른쪽에 텍스트를 추가합니다 */}
                    <h1 className="title">
                        {item.detail[0].criminal}
                    </h1>
                    <div className="tagI-container">
                        <h2 className="tagI">{"수배정보"}</h2>
                        <p className="name">
                            {item.name}
                            {"("}
                            {item.age}
                            {","}
                            {item.sex ? "여자" : "남자"}
                            {")"}
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
                    {item.detail[0].characteristic !== null && (
                        <>
                            {item.detail[0].characteristic.split(/\n|\\n/).map((el, idx) => (
                                <p className="infoText" key={idx}>
                                    {`${idx + 1}. ${el}`}
                                </p>
                            ))}
                        </>
                    )}

                </Col>
            </Row>
        </div>
    )
}
export default Home;