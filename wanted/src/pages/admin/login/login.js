import React, { useState } from "react";
// bootstrap
import { Stack, Image, Button } from "react-bootstrap";
// 사용자 컴포넌트
import Menu from "../../../components/menu";
// css
import './login.css';

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    alert("submit event");
  }

  const styles = {
    div: {
      "width": "80vw",
      "margin": "0 auto",
      "padding": "2em 0",
      "color": "white"
    },
    content: {
      "padding": "2em ",
      "textAlign": "center",
    },
    title: {
      "fontSize": "1.5em",
      "fontWeight": "700"
    },
    loginLogo: {
      "width": "5em",
      "height": "5em",
      "margin": "0 auto",
      "objectFit": "fill"
    },
    inputContainer: {
      "display": "flex",
      "width": "20em",
      "height": "2.3em",
      "margin": "0 auto",
      "border": "2px solid #FD6F22",
    },
    inputPrefix: {
      "minWidth": "50px",
      "padding": "0",
      "margin": "0 5px",
      "textAlign": "center",
      "verticalAlign": "middle",
      "lineHeight": "2em",
    },
    input: {
      "backgroundColor": "transparent",
      // "borderLeft": "1px solid ",
      "border": "0",
      "color": "white",
      "flexGrow": "1",
    },
    btn: {
      "width": "7em",
      "height": "2em",
      "margin": "0 auto",
      "padding": "0",
      "backgroundColor": "transparent",
      "border": "2px solid #FD6F22",
      "borderRadius": "0",
      "verticalAlign": "middle",
      "lineHeight": "2em",
    }
  }

  return (
    <div>
      <Menu>
        <div style={styles.div}>
          <Stack direction="vertical" gap={2} style={styles.content}>
            <div style={styles.title}>관리자 로그인</div>
            <Stack direction="vertical" gap={2} style={{"margin": "3em"}}>
              <Image src="/images/admin/user-interface.png" style={styles.loginLogo}/>
              <div>administrator</div>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" gap={4}>
                <div style={styles.inputContainer}>
                  <label style={styles.inputPrefix}>ID</label>
                  <input className="loginInput" type="text" name="ID"
                    style={styles.input} required/>
                </div>
                <div style={styles.inputContainer}>
                  <label style={styles.inputPrefix}>PW</label>
                  <input className="loginInput" type="password" name="PW" 
                    style={styles.input} required/>
                </div>
                <Button style={styles.btn}
                type="submit">로그인</Button>
              </Stack>
            </form>
          </Stack>
        </div>      
      </Menu>
    </div>
  )
}