import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux"; // useDispatch와 useSelector를 import
import { Col, Container, Row, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useDataFetch from "../../../hooks/useDataFetch";

import "./gridPage.css";

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
    }, []).sort();

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

    useEffect(() => {
        setFilteredData(data);
    }, [data])

    return (
        <div className="content-wrapper">
            {/* Grid 부모가 ToolBar자식에게 자신의 변수 cashedData를 상속함 */}
            <ToolBar uniqueData={uniqueData} filter={filter} setFilter={setFilter} />
            <GridWanted data={filteredData} />
        </div>
    );
}

//
function ToolBar({ uniqueData, filter, setFilter }) {
    const [resetSelected, setResetSelected] = useState(true);
    const CRIMINAL_TYPES = ["긴급", "종합"];
    const labels = [
        { ariaLabel: "유형", label: "type" },
        { ariaLabel: "죄명", label: "criminal" },
    ];

    return (
        <Container>
            <Row className="grid-toolbar-wrapper">
                {labels.map(({ ariaLabel, label }, idx) => (
                    <Col>
                        <Fragment key={idx}>
                            <div className="grid-toolbar-content">
                                <Form.Select
                                    aria-label={`select ${label}`}
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
                                        value={""}
                                    >
                                        {ariaLabel}
                                    </option>
                                    {(ariaLabel === "유형"
                                        ? CRIMINAL_TYPES
                                        : uniqueData
                                    ).map((el) => (
                                            <option value={el}>{el}</option>
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
        <Container className="grid-wrapper">
            <Row>{data.map((item) => <CardList item={item} />)}</Row>
        </Container>
    );
}

function CardList({ item }) {
    const [videoError, setVideoError] = useState(false);
    const { id, name, age, sex, detail, wantedType, datasource, wantedId } = item;
    const { criminal } = detail[0];

    return (
        <Col key={id}>
            <div className="card-wrapper" style={{backgroundColor: wantedType ? "red" : "yellow"}}>
                <Card>
                    {videoError ?
                        <img src={datasource[0].image} alt={`image_${wantedId}`} /> :
                        <video muted autoPlay loop onError={() => { setVideoError(true) }}>
                            <source src={datasource[0].video} type="video/mp4" />
                        </video>
                    }
                    <Card.Body>
                        <Card.Title>{criminal}</Card.Title>
                        <Card.Title className="card-subtitle">
                            {name}({age}세, {sex ? "여" : "남"})
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    );
}

