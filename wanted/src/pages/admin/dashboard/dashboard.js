import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { Button, Col, Form, Row, Stack, Table } from "react-bootstrap";

import useDataFetch from "../../../hooks/useDataFetch";


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
  
  const tableColumn = ["ID", "이름", "유형", "죄명", "기간"];
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
  
  const styles = {
    div: {
      "width": "80%",
      "margin": "0 auto",
      "padding": "2em 0",
    },
    table: {
      tableContainer: {
        "margin": "1em 0",
        "border": "2px solid #1C1C1C",
      },
      th: {
        "backgroundColor": "#9E9E9E",
        "borderRight": "1px solid #1C1C1C"
      },
      td: {
        "verticalAlign": "middle",
        "borderRight": "1px solid #1C1C1C"
      },
      row: {
        "maxWidth": "100%", 
        "margin": "0"
      },
      col: {
        "margin": "2px",
        "padding": "0"
      },
      btn: {
        "padding": "0.375em 0.75em",
        "textDecoration": "none",
        "borderRadius": "0",
        "border": "none",
        "backgroundColor": "#1C1C1C",
        "whiteSpace": "nowrap",
        "wordBreak": "break-word",
        "color": "#FFCD4A",
        "margin": "0"
      }
    },
  }

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
      console.log(dataToDelete);
      await axios.delete(`http://63.35.31.27:8000/admin`,
        {data: dataToDelete}
      );

      window.location.reload();
    } catch (error) {
      console.error("API 호출에 실패했습니다.", error);
    }
  };

  return (
    <div style={styles.div}>
      <ToolBar uniqueData={uniqueData} filter={filter} setFilter={setFilter} />
      <Table striped style={styles.table.tableContainer}>
        <thead className="table-header" style={{
          "textAlign": "center"
        }}>
          <tr>
            {tableColumn
              && tableColumn.map((column, idx) =>
                <th key={idx} style={styles.table.th}>{column}</th>
              )}
            <th style={styles.table.th}>정보 변경</th>
          </tr>
        </thead>
        <tbody style={{"textAlign": "center"}}>
          {status == "loading" ?
            <div>Loading...</div> :
            <>
              {filteredData && filteredData.map((el, idx) => (
                <tr key={idx}>
                  <td style={styles.table.td}>{el.id}</td>
                  <td style={styles.table.td}>{el.name}</td>
                  <td style={styles.table.td}>{el.wantedType ? "긴급" : "종합"}</td>
                  <td style={styles.table.td}>{el.detail[0].criminal}</td>
                  <td style={styles.table.td}>{`${el.detail[0].startedAt.slice(0, 10)} ~ ${el.detail[0].endedAt.slice(0, 10)}`}</td>
                  <td>
                    <Row style={styles.table.row}>
                      <Col style={styles.table.col}>
                        <button onClick={() => clicked(el.id)} style={styles.table.btn}>
                          수정
                        </button>
                      </Col>
                      <Col style={styles.table.col}>
                        <button onClick={() => handleDelete(el.id)} style={styles.table.btn}>
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

  const styles = {
    toolBar: {
      div: {
        "width": "80%",
        "margin": "0 auto"
      },
      col: {
        "height": "fit-content",
        "margin": "auto 0"
      },
      select: {
        "backgroundColor": "transparent",
        "border": "2px solid #1C1C1C",
        "borderRadius": "0",
        "color": "#1C1C1C"
      },
      option: {
        "backgroundColor": "#C2C2C2",
        "color": "#1C1C1C"
      },
      input: {
        "border": "2px solid #1C1C1C",
        "borderColor": "transparent transparent #1C1C1C transparent",
        "backgroundColor": "transparent",
        "color": "#1C1C1C",
        "height": "2em",
        "width": "100%",
      },
      btn: {
        "fontSize": "1.2em",
        "borderRadius": "0",
        "border": "none",
        "backgroundColor": "#1C1C1C",
        "whiteSpace": "nowrap",
        "wordBreak": "break-word",
        "color": "#FFCD4A"
      }
    }
  }

  return (
    <Stack direction="horizontal" gap={5}>
      <Row style={{ "width": "100%" }}>
        {labels.map(({ ariaLabel, label }, idx) => (
          <Col key={idx} style={styles.toolBar.col}>
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
              <option selected={resetSelected} style={styles.toolBar.option} value={""} >
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
          </Col>
        ))}
      </Row>
      <Button href="/admin/create" style={styles.toolBar.btn}>
        공개수배자 등록
      </Button>
    </Stack>
  );
}
