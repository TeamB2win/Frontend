import { useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import Slider from "react-slick";
import { Button, Col, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Images from "../../../../src/images";
import "../../../../src/index.css"; // index.css 스타일을 import 합니다.
import useDataFetch from "../../../hooks/useDataFetch";

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
                    {data.map((item) => (
                        <div key={item.id}>
                            <Row className="slide-content">
                                <Col className="img-container">
                                    <img
                                        src="/logo.png"
                                        alt={"image_1"}
                                        className="img"
                                    />
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
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};
export default Home;

// <button
//                 onClick={() => {
//                     const aaa = async () => {
//                         const result = await axios({
//                             method: "post",
//                             url: "http://63.35.31.27:8000/admin",
//                             headers: { "Content-Type": "application/json" },
//                             data: {
//                                 wantedId: 15,
//                                 wantedType: true,
//                                 sex: true,
//                                 image: "string",
//                                 name: "string",
//                                 age: 0,
//                                 height: 0,
//                                 weight: "string",
//                                 registeredAddress: "string",
//                                 residence: "string",
//                                 criminal: "string",
//                                 relationalLink: "string",
//                                 characteristic: "string",
//                                 startedAt: "2023-07-31T09:00:16.859992",
//                                 endedAt: "2023-07-31T09:00:16.860084",
//                             },
//                         });
//                         console.log(result);
//                     };
//                     aaa();
//                 }}
//             >
//                 테스트
//             </button>
