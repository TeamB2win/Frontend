import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavLink from "./navLink";
// bootstrap 요소
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from "react-bootstrap/Stack";
// icons
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "./userNav.css";


export default function UserNav() {
  const [menuOpen, setOpen] = useState(false);

  // 메뉴 버튼을 누를 경우 호출
  function toggleHandling() {
    setOpen(state => !(state));
  };

  return (
    <div className="userContainer">
      {/* 상위 Navbar */}
      <Navbar expand="lg" className="userNavbar">
        <Container>
          <Navbar.Brand href="/" className="userNavLogo">Passerby</Navbar.Brand>
          <Navbar.Text>
            <button
              type="button"
              onClick={toggleHandling}
              className="userNavBtn"
            >
              {menuOpen ?
                <MdOutlineCancel size={30} /> :
                <AiOutlineMenu size={30} />
              }
            </button>
          </Navbar.Text>
        </Container>
      </Navbar>
      {/* 사이드 메뉴 오픈 시 */}
      <div className={`sidebarContainer ${menuOpen? 'sidebarOpen': 'sidebarClose'}`}>
        <div className="sidebarContent">
          <Stack direction="vertical" gap={5}>
            <NavLink link="grid" name="공개수배자 조회" />
            <NavLink link="report" name="사건/목격 제보" />
            <NavLink link="docs" name="이용 안내" />
          </Stack>
          <NavLink link="login" name="관리자 로그인" style={{ "color": "#2D55C9" }} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}