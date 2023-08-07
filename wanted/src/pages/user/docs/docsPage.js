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
              <p style={styles.p}>우리의 서비스는 몽타주 / 실사 사진을 비디오로 변환하여, 일반 시민들에게 더 효율적으로 공개수배 정보를 전달합니다.</p>
              <p style={styles.p}>Rush가 주장한 것과 같이 공개 수배가 시민들의 인식됨으로써 일반 시민의 범죄 발생을 억제하는 낙인효과를 기대할 수 있습니다.</p>
              <p style={styles.p}>또한 McAllister가 주장한 것과 같이 공개 수배 포스터를 통해 대중들에게 범죄 발생을 알려 장래적 기억(향후 미래의 행동과정에서 상기시키는 것)과 회고적 기억(묘사된 수배자와 과거 만남에 대한 기억을 탐색하는 것)의 효과를 통해 결과적으로 시민들의 제보율 및 검거율을 높이는 효과를 기대합니다.</p>
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