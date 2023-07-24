import React, { useState } from "react";
import { Button, Container, Navbar, Modal, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
// css
import "./adminNav.css";

export default function AdminNav() {
  const [isLogout, setLogout] = useState(false);

  function openLoginModal() {
    setLogout(true);
  };

  function closeLoginModal() {
    setLogout(false);
  }

  // 로그아웃 하기 위한 로직
  // 현재 로그인 세션 삭제 및 백엔드에 세션 삭제 요청
  function logout() {

  }

  const styles = {
    div: {
      "backgroundColor": "#C2C2C2",
      "minHeight": "100vh",
      "height": "auto",
      "width": "100%"
    },
    topNav: {
      container: {
        "maxWidth": "95%"
      },
      navbar: {
        "minHeight": "5em",
        "borderBottom": "2px solid black"
      },
      navItem: {
        "width": "6.5em",
        "fontSize": "1.5em",
        "fontWeight": "600",
        "backgroundColor": "#1C1C1C",
        "color": "#FFCD4A",
        "textAlign": "center",
        "cursor": "pointer"
      }
    },
    modal: {
      modalContainer: {
        "position": "fixed",
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%, -50%)",
        "width": "20em",
        "borderRadius": "0",
        "border": "2px solid #1C1C1C",
        "backgroundColor": "#9E9E9E"
      },
      btnContainer: {
        "width": "fit-content",
        "margin": "1em auto"
      },
      btn: {
        "borderRadius": "0",
        "border": "none",
        "width": "5em",
        "backgroundColor": "#1C1C1C",
        "color": "#FFCD4A"
      },
    }
  }

  return (
    <div style={styles.div}>
      {/* 상위 Navbar */}
      <Navbar expand="lg" style={styles.topNav.navbar}>
        <Container style={styles.topNav.container}>
          <Navbar.Brand href="/admin" style={styles.topNav.navItem}>관리자모드</Navbar.Brand>
          <Navbar.Text>
          </Navbar.Text>
          <Stack direction="horizontal" gap={2}>
            <Navbar.Brand style={styles.topNav.navItem} onClick={openLoginModal}>로그아웃</Navbar.Brand>
            <Navbar.Brand style={styles.topNav.navItem} href="admin/edit">정보 수정</Navbar.Brand>
          </Stack>
        </Container>
      </Navbar>
      {/* Logout 버튼 클릭시 보여줄 모달 UI */}
      {isLogout &&
        <div
          className="modal show"
          style={{
            display: 'block',
          }}
        >
          <Modal.Dialog style={styles.modal.modalContainer}>
            <Modal.Body style={{
              "minHeight": "4em",
              "textAlign": "center",
              "fontSize": "1.2em",
              "fontWeight": "800",
            }}>
              <p>로그아웃 하시겠습니까?</p>
            </Modal.Body>
            <Stack direction="horizontal" gap={3} style={styles.modal.btnContainer}>
              <Button style={styles.modal.btn} onClick={logout}>네</Button>
              <Button style={styles.modal.btn} onClick={closeLoginModal}>아니요</Button>
            </Stack>
          </Modal.Dialog>
        </div>
      }
      <Outlet />
    </div>
  )
}