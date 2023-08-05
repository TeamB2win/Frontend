import React from "react";
// bootstrap
import { Stack, Image, Button } from "react-bootstrap";
// css
import './login.css';
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    navigate(`/admin`);
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
    }
  }

  return (
    <div>
      <div style={styles.div}>
        <Stack direction="vertical" gap={2} style={styles.content}>
          <div style={styles.title}>관리자 로그인</div>
          <Stack direction="vertical" gap={2} style={{ "margin": "3em" }}>
            <Image src="/images/admin/user-interface.png" style={styles.loginLogo} />
            <div>administrator</div>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack direction="vertical" gap={4}>
              <div style={styles.inputContainer}>
                <label style={styles.inputPrefix}>ID</label>
                <input className="loginInput" type="text" name="ID"
                  style={styles.input} required />
              </div>
              <div style={styles.inputContainer}>
                <label style={styles.inputPrefix}>PW</label>
                <input className="loginInput" type="password" name="PW"
                  style={styles.input} required />
              </div>
              <Button style={styles.btn}
                type="submit">로그인</Button>
            </Stack>
          </form>
        </Stack>
      </div>
    </div>
  )
}