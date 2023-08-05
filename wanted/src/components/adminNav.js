import React, { useState } from "react";
import { Button, Container, Navbar, Modal, Stack } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
// css
import "./adminNav.css";


export default function AdminNav() {
  const navigate = useNavigate();

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
    navigate(`/login`)
  }

  return (
    <div className="adminContainer">
      {/* 상위 Navbar */}
      <Navbar expand="lg" className="adminNavbar">
        <Container className="adminNavContainer">
          <Navbar.Brand href="/admin" className="adminNavItem">관리자모드</Navbar.Brand>
          <Navbar.Text>
          </Navbar.Text>
          <Stack direction="horizontal" gap={2}>
            <Navbar.Brand className="adminNavItem" onClick={openLoginModal}>로그아웃</Navbar.Brand>
            <Navbar.Brand className="adminNavItem" href="admin/edit">정보 수정</Navbar.Brand>
          </Stack>
        </Container>
      </Navbar>
      {/* Logout 버튼 클릭시 보여줄 모달 UI */}
      {isLogout &&
        <div
          className="modal show"
          style={{display: 'block',}}
        >
          <Modal.Dialog className="logoutModalContainer">
            <Modal.Body className="logoutModalBody">
              <p>로그아웃 하시겠습니까?</p>
            </Modal.Body>
            <Stack direction="horizontal" gap={3} className="logoutModalBtnContainer">
              <Button className="logoutModalBtn" onClick={logout}>네</Button>
              <Button className="logoutModalBtn" onClick={closeLoginModal}>아니요</Button>
            </Stack>
          </Modal.Dialog>
        </div>
      }
      <Outlet />
    </div>
  )
}