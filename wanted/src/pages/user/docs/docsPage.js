import React from "react";
import { Col, Container, Row, Image, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./docsPage.css";


export default function Docs() {

  return (
    <div className="docs-wrapper">
      <Container>
        <Row direction="horizontal" gap={5}>
          <Col>
            <div className="service-intro">
              서비스 소개
            </div>
            <div className="service-content">
              <p>우리의 서비스는 몽타주 / 실사 사진을 비디오로 변환하여, 일반 시민들에게 더 효율적으로 공개수배 정보를 전달합니다.</p>
              <p>Rush가 주장한 것과 같이 공개 수배가 시민들의 인식됨으로써 일반 시민의 범죄 발생을 억제하는 낙인효과를 기대할 수 있습니다.</p>
              <p>또한 McAllister가 주장한 것과 같이 공개 수배 포스터를 통해 대중들에게 범죄 발생을 알려 장래적 기억(향후 미래의 행동과정에서 상기시키는 것)과 회고적 기억(묘사된 수배자와 과거 만남에 대한 기억을 탐색하는 것)의 효과를 통해 결과적으로 시민들의 제보율 및 검거율을 높이는 효과를 기대합니다.</p>
            </div>
          </Col>
          <Col className="logo-wraper">
            <Image src="logo.png" />
            <div className="logo-content">
              B2Win: Between
            </div>
            <Stack direction="horizontal" gap={3}>
              <Link to="https://www.notion.so/B2Win-Between-a9b09623b67243319d9bbce293bfa46b" target="_blank">
                <Image src="notion_app_logo.png" className="small-logo" />
              </Link>
              <Link to="https://github.com/TeamB2win" target="_blank">
                <Image src="github.png" className="small-logo" id='github-logo'/>
              </Link>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  )
};