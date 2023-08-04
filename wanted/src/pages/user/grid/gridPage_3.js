import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import { Col, Container, Row, Stack, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useDataFetch from "../../../hooks/useDataFetch";


// 화면페이지
//Grid가 부모, ToolBar가 자식
export default function Grid() {
    const { data, data_hash } = useSelector((state) => state.data); // dataSlice에서 상태 전체를 가져오기
    useDataFetch(data_hash); // 리덕스로 받아온 데이터

    const [filteredData, setFilteredData] = useState(data);
    const [filter, setFilter] = useState({
        type: "",
        criminal: "",
    });

    const uniqueData = data.reduce((acc, val) => {
        var criminal = val.detail[0].criminal;

        if (!acc.includes(criminal)) {
            acc.push(criminal);
        }
        return acc;
    }, []);

    useEffect(() => {
        if (filter.criminal === "" && filter.type === "") {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter((el) => {
                    let a = true
                    if (filter.type === "긴급") {
                        a = el.wantedType === true
                    } else if (filter.type === "종합") {
                        a = el.wantedType === false
                    }

                    let b = true
                    if (el.detail[0].criminal !== filter.criminal && filter.criminal !== "") {
                        b = false
                    } 

                    return a && b
                })
            )
        }
    }, [filter])
      
      
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
            {/* Grid 부모가 ToolBar자식에게 자신의 변수 cashedData를 상속함 */}
            <ToolBar uniqueData={uniqueData} filter={filter} setFilter={setFilter} />
            <GridWanted data={filteredData} />
        </div>
    );
}

//
function ToolBar({uniqueData, filter, setFilter}) {
    const [resetSelected, setResetSelected] = useState(true);
    const CRIMINAL_TYPES = ["긴급", "종합"];
    const labels = [
        { ariaLabel: "유형", label: "type" },
        { ariaLabel: "죄명", label: "criminal" },
    ];

    const styles = {
        toolBarContainer: {
          display: 'flex',
          justifyContent: 'space-between', // 중앙 정렬
          width: '100%',
          marginBottom: '1em', // 아래에 여백 추가
        },
        toolBar: {
          flex: 1,
          padding: "2em",
          //maxWidth: '50%', // 최대 너비를 50%로 설정
        },
        select: {
          backgroundColor: 'transparent',
          borderRadius: '0',
          color: 'white',
          width: '100%', // 너비를 100%로 설정
          height: '3em',
          margin: "0 auto"
        },
        option: {
          backgroundColor: '#1C1C1C',
          color: 'white',
        },
        input: {
          border: '2px solid',
          borderColor: 'transparent transparent #FD6F22 transparent',
          backgroundColor: 'transparent',
          color: '#FD6F22',
          height: '2em',
          width: '100%',
        },
      };
      
      
    // const styles = {
    //     toolBar: {
    //         div: {
    //             width: "100%",
    //             height: "5em",
    //         },
    //         select: {
    //             backgroundColor: "transparent",
    //             borderRadius: "0",
    //             color: "white",
    //         },
    //         option: {
    //             backgroundColor: "#1C1C1C",
    //             color: "white",
    //         },
    //         input: {
    //             border: "2px solid",
    //             borderColor: "transparent transparent #FD6F22 transparent",
    //             backgroundColor: "transparent",
    //             color: "#FD6F22",
    //             height: "2em",
    //             width: "100%",
    //         },
    //     },
    // };


    return (
        <Container>
            <Row style={styles.toolBarContainer}>
                    {labels.map(({ ariaLabel, label }, idx) => (
                        <Col style={{"minWidth": "15em"}}>
                            <Fragment key={idx}>
                                <div style={styles.toolBar}>
                                    <Form.Select
                                        aria-label={`select ${label}`}
                                        style={styles.toolBar.select}
                                        onChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                [label]: e.target.value,
                                            });
                                            setResetSelected(false);
                                        }}
                                    >
                                        <option
                                            selected={resetSelected}
                                            style={styles.toolBar.option}
                                            value={""}
                                        >
                                            {ariaLabel}
                                        </option>
                                        {(ariaLabel === "유형"
                                            ? CRIMINAL_TYPES
                                            : uniqueData
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
                        </Col>
                    ))}
            </Row>
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
    const [videoError, setVideoError] = useState(false);

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
                {videoError ?
                <img src="/logo.png" alt={"image_1"} /> :
                <video controls autoPlay loop onError={() => {setVideoError(true)}}>
                    {/* 여기에 비디오 파일 경로를 지정합니다. */}
                    <source src="images/test/video.mp4" type="video/mp4" />
                    {/* 기본적으로 보여줄 이미지 */}
                    {/* <img src="/logo.png" alt={"image_1"} /> */}
                </video>
                }
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

