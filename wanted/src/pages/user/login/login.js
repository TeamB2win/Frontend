import React from "react";
import { useNavigate } from "react-router-dom";
// bootstrap
import { Stack, Image, Button } from "react-bootstrap";
// css
import './login.css';


export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/admin`);
  }

  return (
    <div className="login-wrapper">
        <Stack direction="vertical" gap={2} className="login-content">
          <div className="login-title">관리자 로그인</div>
          <Stack direction="vertical" gap={2} className="login-logo-wrapper">
            <Image src="/images/admin/user-interface.png"/>
            <div>administrator</div>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack direction="vertical" gap={4}>
              <div className="login-input-wrapper">
                <label>ID</label>
                <input className="login-input" type="text" name="ID" required/>
              </div>
              <div className="login-input-wrapper">
                <label>PW</label>
                <input className="login-input" type="password" name="PW" required/>
              </div>
              <Button 
                className="login-btn"
                type="submit"
              >
                로그인
              </Button>
            </Stack>
          </form>
        </Stack>
    </div>
  )
}