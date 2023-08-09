import React, { useState } from "react";
import { Col, Container, Row, Card, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./reportPage.css";


export default function ReportPage() {
  // 접속한 기기가 모바일인지 확인
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  var mobile = isMobile();

  const reportList = [
    {
      imgUrl: "/images/report/report112.png",
      title: "국번없이 112",
      link: mobile ?
        "tel://+01020802123" :
        "",
      target: mobile ?
        "_blank" :
        "",
    },
    {
      imgUrl: "/images/report/report_smart_web.png",
      title: "스마트 국민제보 홈페이지",
      link: "http://onetouch.police.go.kr/",
      target: "_black"
    },
    {
      imgUrl: "/images/report/report_smart_app.png",
      title: "스마트 국민제보 앱",
      link: mobile ?
        "https://play.google.com/store/apps/details?id=kr.go.police.cyber112&hl=ko&gl=US&pli=1" :
        "",
      target: mobile ?
        "_blank" :
        ""
    }
  ]

  return (
    <div className="report-wrapper">
      <Container>
        <Row className="justify-content-md-center">
          {reportList.map(info => ReportCard(Object.assign({}, info, { "mobile": mobile })))}
        </Row>
      </Container>
      <Container>
        <Stack direction="horizontal" gap={3}>
          <div className="title">
            신고안내
          </div>
          <div className="content">
            스마트 국민제보 홈페이지
          </div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="subtitle-num">
            01
          </div>
          <div className="subtitle-detail">
            사건제보-공개수배 제보 등록화면으로 이동하기
          </div>
        </Stack>
        <Row>
          <Col>
            <Image src="/images/report/report_tutorial_01.png" rounded className="report-image"/>
          </Col>
          <Col className="report-detail">
            <p>사건제보, 공개수배 메뉴에서 사건을 선택하면 이동하는 조회화면에서 아래의 제보하기 버튼을 클릭하여</p>
            <p>제보 등록화면으로 이동합니다.</p>
          </Col>
        </Row>
        <hr/>
        <Stack direction="horizontal" gap={3}>
          <div className="subtitle-num">
            02
          </div>
          <div className="subtitle-detail">
            제보내용 입력
          </div>
        </Stack>
        <Row>
          <Col>
            <Image src="/images/report/report_tutorial_02.png" rounded className="report-image"/>
          </Col>
          <Col className="report-detail">
            <p>1. 익명여부를 선택합니다. (익명제보 시 제보 내용은 참고로만 활용되며 보상에서 제외됩니다.)</p>
            <p>2. (익명인 경우) 비밀번호를 입력해주세요. 익명제보조회 시 필요합니다.</p>
            <p>3. 사건이 발생한 일자와 시간을 입력합니다.</p>
            <p>4. 사건발생장소 설정 버튼을 클릭하여 팝업창에서 사건이 발생한 장소를 선택합니다.</p>
            <p>5. 목격한 사건에 대한 제보내용을 입력합니다.</p>
            <p>6. 첨부파일로 등록할 동영상 또는 이미지를 선택합니다.</p>
            <p>7. (사건제보 사건 또는 공개수배에 대한 제보하는 경우) 사건 조회 시 하단에 보여지는 제보 목록에서</p>
            <p>&nbsp;&nbsp;&nbsp;제보내용을 보여줄 것인지 선택합니다.</p>
            <p>8. 개인정보 수집 및 이용동의, 제보정보 공유 동의 내용을 읽어보시고 동의에 체크해주세요.</p>
          </Col>
        </Row>
        <hr/>
        <Stack direction="horizontal" gap={3}>
          <div className="subtitle-num">
            03
          </div>
          <div className="subtitle-detail">
            제보 등록하기
          </div>
        </Stack>
        <Row>
          <Col>
            <Image src="/images/report/report_tutorial_03.png" rounded className="report-image"/>
          </Col>
          <Col className="report-detail">
            <p>제보등록 버튼을 클릭하면 제보가 등록됩니다.</p>
            <p>익명제보 시 팝업창으로 제보번호와 입력한 비밀번호를 한번 더 알려줍니다.</p>
            <p>(익명제보조회 시 필요하니 꼭 기억하시기 바랍니다.)</p>
            <p>제보한 내용은 실명제보인 경우 마이페이지 > 나의 제보조회 메뉴에서,</p>
            <p>익명제보인 경우 익명제보조회 메뉴에서 제보번호와 비밀번호를 입력하면 조회할 수 있습니다.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

// 각 신고 방법으로 이동하는 카드
function ReportCard(props) {
  const [isHover, setHover] = useState(false);

  function handleMouseEnter() {
    setHover(true);
  };

  function handleMouseLeave() {
    setHover(false);
  };

  // 모바일 환경에서만 지원하는 신고방법의 경우 사용자 알림
  function handleMobile() {
    if (!props.mobile) {
      alert("모바일 환경에서만 지원하는 기능입니다.")
    }
  }

  const styles = {
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
      "textDecoration": isHover ? "underline" : "none"
    }
  }

  return (
    <Col xs lg="2" style={styles.col}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobile}
    >
      <Link to={props.link} target={props.target} style={{ "textDecoration": "none" }} onClick={props.onClick}>
        <Card style={styles.card}>
          <Card.Img variant="top" src={props.imgUrl} style={styles.cardImg} />
          <Card.Body style={styles.cardBody}>
            <Card.Title style={styles.cardTitle}>{props.title}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}