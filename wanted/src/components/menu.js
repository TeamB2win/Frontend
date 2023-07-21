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
import { CiSearch } from "react-icons/ci";
// css
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Menu() {
  const [menuOpen, setOpen] = useState(false);

  // 메뉴 버튼을 누를 경우 호출
  function toggleHandling() {
    setOpen(state => !(state));
  };

  // 컴포넌트 스타일
  const styles = {
    div: {
      "backgroundColor": "#1C1C1C", 
      "minHeight": "100vh", 
      "height": "auto",
      "width": "100%"
    },
    topNav: {
      navbar: {
        "position": "sticky", 
        "top": "0px", 
        "backgroundColor": "#1C1C1C", 
        "borderBottom": "2px solid white", 
        "zIndex": "2",
        "margin": "0"
      },
      logo: {
        "color": "white",
        "width": "5em",
        "bordor": "0"
      },
      btn: {
        "color": "white",
        "backgroundColor": "transparent",
        "border": "0",
      },
      search: {
        "color": "white",
        "backgroundColor": "transparent",
        "height": "2em",
        "width": "10em",
        "border": "2px solid white"
      }
    },
    sideNav: {
      div: {
        "backgroundColor": "#C2C2C2",
        "position": "fixed",
        "left":"0",
        "top":"0px",
        "width": "20em",
        "height":"100%",
        "padding": "5em 0 1em 1.3em",
        "zIndex":"1",
        "opacity": "0.95"
      },
      content: {
        "position": "relative",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
        "height": "100%",
        "fontSize": "20px",
        "fontWeight": "800",
      }
    },
  }

  return (
    <div style={styles.div}>
      {/* 상위 Navbar */}
      <Navbar expand="lg" style={styles.topNav.navbar}>
        <Container>
          <Navbar.Brand href="/" style={styles.topNav.logo}><i>Passerby</i></Navbar.Brand>
          <Navbar.Text>
            <button 
              type="button" 
              onClick={toggleHandling}
              style={styles.topNav.btn}
            >
              {menuOpen?
                <MdOutlineCancel size={30} />:
                <AiOutlineMenu size={30} />
              }
            </button>
          </Navbar.Text>
          <Stack direction="horizontal" gap={2}>
            <input type="text" style={styles.topNav.search}/>
            <i style={{"color":"white"}}>
              <CiSearch size={30} />
            </i>
          </Stack>
        </Container>
      </Navbar>
      {/* 사이드 메뉴 오픈 시 */}
      {menuOpen &&
      <div style={styles.sideNav.div}>
        <div style={styles.sideNav.content}>
          <Stack direction="vertical" gap={5}>
            <NavLink link="/grid" name="공개수배자 조회" />
            <NavLink link="/report" name="사건/목격 제보" />
            <NavLink link="/docs" name="이용 안내" />
          </Stack>
          <NavLink link="/" name="관리자 로그인" style={{"color": "#2D55C9"}}/>
        </div>
      </div>
      }
      <Outlet />
    </div>
  );
}