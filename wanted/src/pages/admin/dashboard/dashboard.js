import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {

  const navigate = useNavigate();

  // const clicked = (id) => {
  //   navigate(`/admin/update/${id}`);
  // };

  const clicked = async (id) => {
    try {
      // 해당 레코드의 ID에 맞는 API를 호출하여 데이터를 받아옴
      const response = await axios.get(`http://63.35.31.27:8000/wanted/${id}`);
      const recordData = response.data;

      // 데이터를 받아와서 해당 레코드의 ID와 함께 상세 페이지로 이동
      navigate(`/admin/update/${id}`, { state: { recordData } });
      console.log(recordData.data[0])
    } catch (error) {
      // API 호출에 실패했을 때 예외 처리
      console.error("API 호출에 실패했습니다.", error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://63.35.31.27:8000/wanted");
      return res.data;
    }

    fetchData().then(res => setData(res));
  }, []);

  const tableColumn = [
    "ID", "이름", "유형", "죄명", "기간"
  ]

  const tableColumnEng = [
    "id", "name", "wantedType", "detailC", "detailS"
  ]

  const datas = data['data']

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
      col: {
        "margin": "2px 0",
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
        request: {
          id: id
        }
      };

      await axios.delete(`http://63.35.31.27:8000/admin`, {
        data: dataToDelete
      });

      window.location.reload();
    } catch (error) {
      console.error("API 호출에 실패했습니다.", error);
    }
  };

  return (
    <div style={styles.div}>
      <ToolBar />
      <Table striped style={styles.table.tableContainer}>
        <thead className="table-header" style={{
          "textAlign": "center"
        }}>
          <tr>
            {tableColumn && tableColumn.map(column => <th style={styles.table.th}>{column}</th>)}
            <th style={styles.table.th}>정보 변경</th>
          </tr>
        </thead>
        <tbody style={{
          "textAlign": "center"
        }}>
          {datas && datas.map(data => {
            return (
              <tr>
                {tableColumnEng && tableColumnEng.map(column => {
                  let valueToDisplay;
                  if (data[column] === true) {
                    valueToDisplay = '긴급';
                  } else if (data[column] === false) {
                    valueToDisplay = '종합';
                  } else if (column === 'detailC') {
                    valueToDisplay = data['detail'][0]['criminal'];
                  } else if (column === 'detailS') {
                    valueToDisplay = data['detail'][0]['startedAt'].slice(0, 10) + " ~ " + data['detail'][0]['endedAt'].slice(0, 10);
                  } else {
                    valueToDisplay = data[column];
                  }
                  return <td style={styles.table.td}>{valueToDisplay}</td>;
                })}
                <td>
                  <Row>
                    <Col style={styles.table.col}>
                      <button onClick={() => clicked(data.id)} style={styles.table.btn}>
                        수정
                      </button>
                    </Col>
                    <Col style={styles.table.col}>
                      <button onClick={() => handleDelete(data.id)} style={styles.table.btn}>
                        삭제
                      </button>
                    </Col>
                  </Row>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

function ToolBar() {
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
        <Col style={styles.toolBar.col}>
          <Form.Select aria-label="select type" style={styles.toolBar.select}>
            <option style={styles.toolBar.option}>유형</option>
            <option value="1" style={styles.toolBar.option}>One</option>
            <option value="2" style={styles.toolBar.option}>Two</option>
            <option value="3" style={styles.toolBar.option}>Three</option>
          </Form.Select>
        </Col>
        <Col style={styles.toolBar.col}>
          <Form.Select aria-label="select aria" style={styles.toolBar.select}>
            <option style={styles.toolBar.option}>지역</option>
            <option value="1" style={styles.toolBar.option}>One</option>
            <option value="2" style={styles.toolBar.option}>Two</option>
            <option value="3" style={styles.toolBar.option}>Three</option>
          </Form.Select>
        </Col>
        <Col style={styles.toolBar.col}>
          <Form.Select aria-label="select criminal" style={styles.toolBar.select}>
            <option>죄명</option>
            <option value="1" style={styles.toolBar.option}>One</option>
            <option value="2" style={styles.toolBar.option}>Two</option>
            <option value="3" style={styles.toolBar.option}>Three</option>
          </Form.Select>
        </Col>
        <Col style={styles.toolBar.col}>
          <Stack direction="horizontal" gap={3} className="p-2" style={{ "flexGrow": "1" }}>
            <input type="text" style={styles.toolBar.input} />
            <i style={{ "color": "#1C1C1C" }}>
              <CiSearch size={30} />
            </i>
          </Stack>
        </Col>
      </Row>
      <Button href="/admin/create" style={styles.toolBar.btn}>
        공개수배자 등록
      </Button>
    </Stack>
  )
}