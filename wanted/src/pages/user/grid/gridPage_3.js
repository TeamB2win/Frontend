import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import { Col, Container, Row, Stack, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CiSearch } from "react-icons/ci"; // icons
import useDataFetch from "../../../hooks/useDataFetch";
import { filteredData, removeHash } from "../../../redux/dataSlice_3";


// 화면페이지
export default function Grid() {
    const dispatch = useDispatch();
    const { data, data_hash } = useSelector((state) => state.data); // dataSlice에서 상태 전체를 가져오기
    useDataFetch(data_hash); // 리덕스로 받아온 데이터

    const styles = {
        div: {
            width: "80%",
            margin: "0 auto",
            padding: "2em 0",
            color: "white",
        },
    };

    return (
        <div style={styles.div}>
            <button
                onClick={() => {
                    dispatch(removeHash());
                }}
            >
                해시 리셋
            </button>
            <ToolBar />
            <GridWanted data={data} />
        </div>
    );
}

//
function ToolBar() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState({
        type: "",
        aria: "",
        criminal: "",
    });
    const [resetSelected, setResetSelected] = useState(true);
    const [labels, setLabels] = useState([
        { ariaLabel: "유형", label: "type" },
        { ariaLabel: "지역", label: "aria" },
        { ariaLabel: "죄명", label: "criminal" },
    ]);

    const styles = {
        toolBar: {
            div: {
                width: "100%",
                height: "5em",
            },
            select: {
                backgroundColor: "transparent",
                borderRadius: "0",
                color: "white",
            },
            option: {
                backgroundColor: "#1C1C1C",
                color: "white",
            },
            input: {
                border: "2px solid",
                borderColor: "transparent transparent #FD6F22 transparent",
                backgroundColor: "transparent",
                color: "#FD6F22",
                height: "2em",
                width: "100%",
            },
        },
    };

    const CRIMINAL_TYPES = ["긴급", "종합"];
    const CRIMINAL_LOCATION = [
        "울산광역시",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상남도",
        "경상북도",
        "서울특별시",
        "경기도북부",
        "경기도남부",
        "인천광역시",
        "부산광역시",
        "대전광역시",
        "대구광역시",
        "광주광역시",
        "세종특별자치시",
        "제주특별자치시",
        "강원특별자치도",
    ];
    const CRIMINAL_NAME = [
        "뺑소니사건",
        "강도",
        "절도",
        "사기",
        "공갈",
        "악취유린",
        "방화",
        "학교폭력서클",
        "장물",
        "살인",
        "선거사범",
        "기타",
    ];

    useEffect(() => {
        dispatch(filteredData(selected));
        console.log(selected);
    }, [selected]);

    return (
        <Container>
            <button
                onClick={() => {
                    setSelected({
                        type: "",
                        aria: "",
                        criminal: "",
                    });
                    setResetSelected(true);
                }}
            >
                필터 리셋
            </button>
            <div style={styles.toolBar.div}>
                <Stack
                    direction="horizontal"
                    gap={5}
                    style={{ height: "100%" }}
                >
                    {labels.map(({ ariaLabel, label }, idx) => (
                        <Fragment key={idx}>
                            <div className="p-2">
                                <Form.Select
                                    aria-label={`select ${label}`}
                                    style={styles.toolBar.select}
                                    onChange={(e) => {
                                        setSelected({
                                            ...selected,
                                            [label]: e.target.value,
                                        });
                                        setResetSelected(false);
                                    }}
                                >
                                    <option
                                        selected={resetSelected}
                                        style={styles.toolBar.option}
                                    >
                                        {ariaLabel}
                                    </option>
                                    {(ariaLabel === "유형"
                                        ? CRIMINAL_TYPES
                                        : ariaLabel === "지역"
                                        ? CRIMINAL_LOCATION
                                        : CRIMINAL_NAME
                                    ).map((el) => (
                                        <>
                                            <option
                                                value={el}
                                                style={styles.toolBar.option}
                                            >
                                                {el}
                                            </option>
                                        </>
                                    ))}
                                </Form.Select>
                            </div>
                        </Fragment>
                    ))}

                    <Stack
                        direction="horizontal"
                        gap={3}
                        className="p-2"
                        style={{ flexGrow: "1" }}
                    >
                        <input type="text" style={styles.toolBar.input} />
                        <i style={{ color: "#FD6F22" }}>
                            <CiSearch size={30} />
                        </i>
                    </Stack>
                </Stack>
            </div>
        </Container>
    );
}

function GridWanted({ data }) {
    return (
        <Container
            style={{
                width: "100%",
            }}
        >
            <Row>{data.map((item) => CardList(item))}</Row>
        </Container>
    );
}

function CardList(props) {
    const { id, name, age, sex, detail } = props;
    const [{ criminal }] = detail;
    const styles = {
        col: {
            margin: "0 auto",
            width: "15rem",
            border: "0",
            marginBottom: "0.5em",
        },
        card: {
            width: "15rem",
            border: "0",
            margin: "1em auto ",
        },
        cardBody: {
            padding: "0",
        },
        cardTitle: {
            margin: "0",
            padding: "0.5em",
            backgroundColor: "#FD6F22",
            color: "black",
            textAlign: "center",
        },
        cardSubTitle: {
            margin: "0",
            padding: "0.5em",
            backgroundColor: "#2D55C9",
            color: "white",
            textAlign: "center",
        },
    };

    return (
        <Col key={id} style={styles.col}>
            <Card style={styles.card}>
                {/* <Card.Img variant="top" src={''} style={{
          "width": "240px",
          "height": "245px",
          "objectFit":"cover"
        }}/> */}
                <video src="/images/test/video.mp4" loop controls></video>
                <Card.Body style={styles.cardBody}>
                    <Card.Title style={styles.cardTitle}>{criminal}</Card.Title>
                    <Card.Title style={styles.cardSubTitle}>
                        {name}({age}세, {sex ? "여" : "남"})
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

// const TEST_LIST = [
//     {
//         id: 1,
//         imgUrl: "images/test/01.png",
//         detail: [{ criminal: "뺑소니사건" }],
//         name: "권화랑",
//         age: 23,
//         sex: "남",
//     },
//     {
//         id: 2,
//         imgUrl: "images/test/02.png",
//         detail: [{ criminal: "강도" }],
//         name: "김태형",
//         age: 29,
//         sex: "남",
//     },
//     {
//         id: 3,
//         imgUrl: "images/test/03.png",
//         detail: [{ criminal: "절도" }],
//         name: "문건희",
//         age: 26,
//         sex: "남",
//     },
//     {
//         id: 4,
//         imgUrl: "images/test/04.png",
//         detail: [{ criminal: "절도" }],
//         name: "문숙희",
//         age: 27,
//         sex: "여",
//     },
//     {
//         id: 5,
//         imgUrl: "images/test/04.png",
//         detail: [{ criminal: "악취유린" }],
//         name: "문숙희",
//         age: 27,
//         sex: "여",
//     },
//     {
//         id: 6,
//         imgUrl: "images/test/04.png",
//         detail: [{ criminal: "학교폭력서클" }],
//         name: "문숙희",
//         age: 27,
//         sex: "여",
//     },
//     {
//         id: 7,
//         imgUrl: "images/test/04.png",
//         detail: [{ criminal: "선거사범" }],
//         name: "문숙희",
//         age: 27,
//         sex: "여",
//     },
//     {
//         id: 8,
//         imgUrl: "images/test/06.png",
//         detail: [{ criminal: "선거사범" }],
//         name: "신은채",
//         age: 29,
//         sex: "여",
//     },
// ];
