import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function ReportPage() {
  const styles = {
    div: {
      "width": "80vw",
      "margin": "30px auto",
      "padding": "2em 0",
      "color": "white"
    },
    col: {
      "margin": "0 20px",
      "width": '15rem',
      "border": "0",
      "marginBottom": "0.5em",
    },
    card: {
      "border": "0",
      "marginBottom": "0.5em",
      "backgroundColor": "transparent"
    },
    cardBody: {
      "padding": "0"
    },
    cardImg: {
      "width": "13em",
      "height": "13em",
      "margin": "0 auto",
      "borderRadius": "70%",
      "overflow": "hidden"
    },
    cardTitle: {
      "margin": "0",
      "border": "0",
      "padding": "0.5em",
      "color": "white",
      "textAlign": "center",
      "fontSize": "1.4em",
    }
  }
  
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  return (
    <div style={styles.div}>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={styles.col}>
            <Card style={styles.card}>
              <Card.Img variant="top" src={'/images/report/report112.png'} style={styles.cardImg}/>
              <Card.Body style={styles.cardBody}>
                <Card.Title style={styles.cardTitle}>국번없이 112</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="2" style={styles.col}>
            <Link to={'http://onetouch.police.go.kr/'} target="_blank" style={{"textDecoration": "none"}}>
              <Card style={styles.card}>
                <Card.Img variant="top" src={'/images/report/report_smart_web.png'} style={styles.cardImg}/>
                <Card.Body style={styles.cardBody}>
                  <Card.Title style={styles.cardTitle}>스마트 국민제보 홈페이지</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xs lg="2" style={styles.col}>
            <Card style={styles.card}>
              <Card.Img variant="top" src={'/images/report/report_smart_app.png'} style={styles.cardImg}/>
              <Card.Body style={styles.cardBody}>
                <Card.Title style={styles.cardTitle}>스마트 국민제보 앱</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}