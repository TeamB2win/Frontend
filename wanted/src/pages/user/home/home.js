import { useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import Slider from "react-slick";
import { Col, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDataFetch from "../../../hooks/useDataFetch";
import { useState } from 'react';

const Home = () => {
    const { data, data_hash, status, error } = useSelector((state) => state.data);
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
        autoplaySpeed: 1000000,
        prevArrow: null,
        nextArrow: null,
    };
    return (
        <div className="content">
            <div className="slide-container">
                <Slider {...settings}>
                    {data.map((item) => <SlidingCard item={item} />)}
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
                        <img src={item.datasource[0].image} alt={"image_1"} className="img" />
                    ) : (
                        <video controls autoPlay loop className="img" onError={() => { setVideoError(true) }}>
                            <source src={item.datasource[0].video} type="video/mp4" />
                        </video>
                    )}
                </Col>
                <Col className="text-container">
                    {/* 이미지 오른쪽에 텍스트를 추가합니다 */}
                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "28px" }}>
                        <h1 className="wanted-type">
                            {item.wantedType ? (
                                <span style={{ color: "red" }}>긴급</span>
                            ) : (
                                <span style={{ color: "yellow" }}>종합</span>
                            )}
                        </h1>
                        <h1 className="title">
                            {item.detail[0].criminal}
                        </h1>
                    </div>

                    <div className="tagI-container">
                        <h2 className="tagI">{"수배정보"}</h2>
                        <p className="name">
                            {item.name}
                            {"("}
                            {item.age}
                            {", "}
                            {item.sex ? "여자" : "남자"}
                            {")"}
                        </p>
                    </div>
                    <div className="info-container">
                        <p className="infoText">
                            {"신장: "}
                            {item.detail[0].height ? `약 ${item.detail[0].height}(cm)` : "미상"}
                        </p>
                        <p className="infoText">
                            {"체중: "}
                            {item.detail[0].weight ? `${item.detail[0].weight}` : "미상"}
                        </p>
                        {item.hasOwnProperty("address") ? (
                            <p className="infoText">
                                {"주소: "}
                                {item.address}
                            </p>
                        ) : (
                            <p className="infoText">
                                {"주소: 미상"}
                            </p>
                        )}
                    </div>
                    <h2 className="tagC">{"특이사항"}</h2>
                    <div className="char-container">
                        {(item.detail[0].characteristic !== null && item.detail[0].characteristic !== "") ? (
                            item.detail[0].characteristic.split(/\n|\\n/).map((el, idx) => (
                                <p className="infoText" key={idx}>
                                    {`${idx + 1}. ${el}`}
                                </p>
                            ))
                        ) : (
                            <p className="infoText">특이사항이 없습니다.</p>
                        )}
                    </div>
                </Col>
            </Row>
        </div >
    )
}
export default Home;
