import React from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch와 useSelector를 import
// bootstrap 
import {
  Col,
  Container,
  Row,
  Stack,
  Card,
} from "react-bootstrap";

import Form from 'react-bootstrap/Form';
// icons
import { CiSearch } from "react-icons/ci";


export default function Grid() {
  const state = useSelector((state) => state.data); // dataSlice에서 상태 전체를 가져오기
  
  const styles = {
    div: {
      "width": "80%",
      "margin": "0 auto",
      "padding": "2em 0",
      "color": "white"
    }
  }

  return (
    <div style={styles.div}>
      <ToolBar />
      <GridWanted />
    </div>
  )
};

function GridWanted() {
  const testList = [
    {
      "imgUrl": "images/test/01.png",
      "criminal": "공연음란",
      "name": "권화랑",
      "age": 23,
      "sex": "남"
    },
    {
      "imgUrl": "images/test/02.png",
      "criminal": "속도위반",
      "name": "김태형",
      "age": 29,
      "sex": "남"
    },
    {
      "imgUrl": "images/test/03.png",
      "criminal": "상습짜증",
      "name": "문건희",
      "age": 26,
      "sex": "남"
    },
    {
      "imgUrl": "images/test/04.png",
      "criminal": "3일째 지각",
      "name": "문숙희",
      "age": 27,
      "sex": "여"
    },
    {
      "imgUrl": "images/test/06.png",
      "criminal": "어제 생일",
      "name": "신은채",
      "age": 29,
      "sex": "여"
    },
    {
      "imgUrl": "images/test/05.png",
      "criminal": "침묵",
      "name": "조석준",
      "age": 28,
      "sex": "남"
    },
  ]


  return (
    <Container style={{
      "width": "100%",
    }}>
      <Row>
        {testList.map(item => CardList(item))}
      </Row>
    </Container>
  )
}

function CardList(props) {
  const styles = {
    col: {
      "margin": "0 auto",
      "width": '15rem',
      "border": "0",
      "marginBottom": "0.5em",
    },
    card: {
      "width": '15rem',
      "border": "0",
      "margin": "1em auto ",
    },
    cardBody: {
      "padding": "0"
    },
    cardTitle: {
      "margin": "0",
      "padding": "0.5em",
      "backgroundColor": "#FD6F22",
      "color": "black",
      "textAlign": "center"
    },
    cardSubTitle: {
      "margin": "0",
      "padding": "0.5em",
      "backgroundColor": "#2D55C9",
      "color": "white",
      "textAlign": "center"
    }
  }

  return (
    <Col style={styles.col}>
      <Card style={styles.card}>
        <Card.Img variant="top" src={props.imgUrl} style={{
          "width": "240px",
          "height": "245px",
          "objectFit":"cover"
        }}/>
        <Card.Body style={styles.cardBody}>
          <Card.Title style={styles.cardTitle}>{props.criminal}</Card.Title>
          <Card.Title style={styles.cardSubTitle}>{props.name}({props.age}세, {props.sex})</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  )
}

function ToolBar() {
  const styles = {
    toolBar: {
      div: {
        "width": "100%",
        "height": "5em",
      },
      select: {
        "backgroundColor": "transparent",
        "borderRadius": "0",
        "color": "white"
      },
      option: {
        "backgroundColor": "#1C1C1C",
        "color": "white"
      },
      input: {
        "border": "2px solid",
        "borderColor": "transparent transparent #FD6F22 transparent",
        "backgroundColor": "transparent",
        "color": "#FD6F22",
        "height": "2em",
        "width": "100%",
      },
    }
  }

  return (
    <Container>
      <div style={styles.toolBar.div}>
        <Stack direction="horizontal" gap={5} style={{ "height": "100%" }}>
          <div className="p-2">
            <Form.Select aria-label="select type" style={styles.toolBar.select}>
              <option style={styles.toolBar.option}>유형</option>
              <option value="1" style={styles.toolBar.option}>One</option>
              <option value="2" style={styles.toolBar.option}>Two</option>
              <option value="3" style={styles.toolBar.option}>Three</option>
            </Form.Select>
          </div>
          <div className="p-2">
            <Form.Select aria-label="select aria" style={styles.toolBar.select}>
              <option style={styles.toolBar.option}>지역</option>
              <option value="1" style={styles.toolBar.option}>One</option>
              <option value="2" style={styles.toolBar.option}>Two</option>
              <option value="3" style={styles.toolBar.option}>Three</option>
            </Form.Select>
          </div>
          <div className="p-2">
            <Form.Select aria-label="select criminal" style={styles.toolBar.select}>
              <option>죄명</option>
              <option value="1" style={styles.toolBar.option}>One</option>
              <option value="2" style={styles.toolBar.option}>Two</option>
              <option value="3" style={styles.toolBar.option}>Three</option>
            </Form.Select>
          </div>
          <Stack direction="horizontal" gap={3} className="p-2" style={{ "flexGrow": "1" }}>
            <input type="text" style={styles.toolBar.input} />
            <i style={{ "color": "#FD6F22" }}>
              <CiSearch size={30} />
            </i>
          </Stack>
        </Stack>
      </div>
    </Container>
  )
}