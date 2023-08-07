import React from "react";
import { Col, Container, Row, Image, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Docs() {
  const styles = {
    div: {
      "width": "80vw",
      "margin": "0 auto",
      "padding": "2em 0",
      "color": "white"
    },
    serviceDiv: {
      "fontSize": "1.6em",
      "fontWeight": "600",
      "backgroundColor": "#2D55C9",
      "width": "fit-content",
      "padding": "0.3em 0.6em"
    },
    serviceContent: {
      "marginTop": "2em",
      "fontSize": "1.2em",
      "fontWeight": "500",
      "padding": "0.5em 1em",
      "wordBreak": "break-word",
    },
    p: { "wordBreak": "break-word" },
    logo: {
      "minWidth": "20em",
      "maxWidth": "20em",
      "padding": "7em 1em 0 1em"
    },
    mainLogo: {
      "width": "100%",
      "objectFit": "fill",
      "backgroundColor": "white"
    },
    logoContent: {
      "fontSize": "1.8em",
      "fontWeight": "600",
      "color": "#FD6F22",
      "padding": "0.8em 0 0.4em 0",
    },
    smallLogo: {
      "maxWidth": "2em"
    }
  }

  return (
    <div style={styles.div}>
      <Container>
        <Row direction="horizontal" gap={5}>
          <Col style={{ "minWidth": "30em", "padding": "1em" }}>
            <div style={styles.serviceDiv}>
              서비스 소개
            </div>
            <div style={styles.serviceContent}>
              <p style={styles.p}>본 웹은 몽타주 및 실사 사진을 비디오로 변환하여, 일반 시민들에게 더 효율적으로 공개수배 정보를 제공하는 서비스입니다.</p>
              <p style={styles.p}>공개수배자들에 대한 인식률을 높여, 결과적으로 시민들의 제보율 및 검거율을 높이는 효과를 기대합니다.</p>
            </div>
          </Col>
          <Col style={styles.logo}>
            <Image src="logo.png" style={styles.mainLogo} />
            <div style={styles.logoContent}>
              B2Win: Between
            </div>
            <Stack direction="horizontal" gap={3}>
              <Link to="https://www.notion.so/B2Win-Between-a9b09623b67243319d9bbce293bfa46b" target="_blank">
                <Image src="notion_app_logo.png" style={styles.smallLogo} />
              </Link>
              <Link to="https://github.com/TeamB2win" target="_blank">
                <Image src="github.png" style={styles.smallLogo} />
              </Link>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  )
};