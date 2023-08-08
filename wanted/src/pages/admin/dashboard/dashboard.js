import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { Button, Col, Form, Row, Stack, Table } from "react-bootstrap";

import useDataFetch from "../../../hooks/useDataFetch";

import "./dashboard.css";


export default function Dashboard() {
  const { data, data_hash, status } = useSelector((state) => state.data);
  useDataFetch(data_hash)

  const navigate = useNavigate();
  const clicked = async (id) => {
    navigate(`/admin/update/${id}`);
  };
  
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState({
    type: "",
    criminal: "",
  });
  
  const tableColumn = ["고유번호", "이름", "유형", "죄명", "기간"];
  let uniqueData = data.reduce((acc, val) => {
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
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("해당 데이터를 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteRecord(id);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const dataToDelete = {
        "id": id
      };
      await axios.delete(
        process.env.REACT_APP_BACK_BASE_URL + `/admin`,
        {data: dataToDelete}
      );

      window.location.reload();
    } catch (error) {
      console.error("API 호출에 실패했습니다.", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <ToolBar uniqueData={uniqueData} filter={filter} setFilter={setFilter} />
      <Table striped className="dashboard-table">
        <thead>
          <tr>
            {tableColumn && 
              tableColumn.map((column, idx) =>
                <th key={idx}>{column}</th>
              )
            }
            <th>정보 변경</th>
          </tr>
        </thead>
        <tbody>
          {status == "loading" ?
            <div>Loading...</div> :
            <>
              {filteredData && filteredData.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.wantedId === null? "긴급": el.wantedId}</td>
                  <td>{el.name}</td>
                  <td>{el.wantedType ? "긴급" : "종합"}</td>
                  <td>{el.detail[0].criminal}</td>
                  <td>{`${el.detail[0].startedAt.slice(0, 10)} ~ ${el.detail[0].endedAt.slice(0, 10)}`}</td>
                  <td>
                    <Row>
                      <Col>
                        <button onClick={() => clicked(el.id)}>
                          수정
                        </button>
                      </Col>
                      <Col>
                        <button onClick={() => handleDelete(el.id)}>
                          삭제
                        </button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </>
          }
        </tbody>
      </Table>
    </div>
  )
}

function ToolBar({ uniqueData, filter, setFilter }) {
  const [resetSelected, setResetSelected] = useState(true);

  const CRIMINAL_TYPES = ["긴급", "종합"];
  const labels = [
    { ariaLabel: "유형", label: "type" },
    { ariaLabel: "죄명", label: "criminal" },
  ];

  return (
    <Stack direction="horizontal" gap={5}>
      <Row style={{ "width": "100%" }}>
        {labels.map(({ ariaLabel, label }, idx) => (
          <Col key={idx} className="dashboard-toolbar-col">
            <Form.Select
              className="dashboard-toolbar-select"
              aria-label={`select ${label}`}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  [label]: e.target.value,
                });
                setResetSelected(false);
              }}
            >
              <option selected={resetSelected} value={""} >
                {ariaLabel}
              </option>
              {(ariaLabel === "유형"
                ? CRIMINAL_TYPES
                : uniqueData
              ).map((el) => (
                  <option
                    value={el}
                  >
                    {el}
                  </option>
              ))}
            </Form.Select>
          </Col>
        ))}
      </Row>
      <Button href="/admin/create" className="dashboard-toolbar-btn">
        공개수배자 등록
      </Button>
    </Stack>
  );
}
