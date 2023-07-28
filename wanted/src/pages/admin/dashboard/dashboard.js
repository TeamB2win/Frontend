import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [numColumns, setNum] = useState(10);

  const tableColomn = [
    "수배번호", "이름", "유형", "죄명", "기간"
  ]

  const datas = [
    {
      "수배번호": "ID-000001",
      "이름": "황주연",
      "유형": "긴급",
      "죄명": "살인",
      "기간": "2023-06-01 ~ 2023-12-31",
    },
    {
      "수배번호": "ID-000002",
      "이름": "성치영",
      "유형": "종합",
      "죄명": "살인",
      "기간": "2023-07-01 ~ 2023-12-31",
    },
  ]

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
        "color": "#FFCD4A"
      }
    },
  }

  return (
    <div style={styles.div}>
      <ToolBar />
      <Table striped style={styles.table.tableContainer}>
        <thead className="table-header" style={{
          "textAlign": "center"
        }}>
          <tr>
            {tableColomn.map(column => <th style={styles.table.th}>{column}</th>)}
            <th style={styles.table.th}>정보 변경</th>
          </tr>
        </thead>
        <tbody style={{
          "textAlign": "center"
        }}>
          {datas.map(data => {
            return (
              <tr>
                {tableColomn.map(column => <td style={styles.table.td}>{data[column]}</td>)}
                <td>
                  <Row>
                    <Col style={styles.table.col}>
                      <Link to="/admin/update" style={styles.table.btn}>
                        수정
                      </Link>
                    </Col>
                    <Col style={styles.table.col}>
                      <Link to="/admin/delete" style={styles.table.btn}>
                        삭제
                      </Link>
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
      <Button href="admin/create" style={styles.toolBar.btn}>
        공개수배자 등록
      </Button>
    </Stack>
  )
}