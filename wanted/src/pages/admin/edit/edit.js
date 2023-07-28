import React, { useState } from 'react';
import "./edit.css";

function Edit() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'currentPassword') setCurrentPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('신규 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        } else {
            alert('비밀번호 변경에 성공하였습니다.');
            // TODO: Send a request to the server to change the password
            // You can use fetch() or any other HTTP library to communicate with the server
        }
    };

    return (
        <div>
            <h1 className="admin-title">관리자 정보 수정</h1>
            <img className="admin-interface" src="/images/admin/admin-interface.png" />
            <p style={{ textAlign: "center", marginTop: "1rem", marginBottom: "2rem" }}>Administrator</p>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>현재 비밀번호</label>
                    <input className="change-password"
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>신규 비밀번호</label>
                    <input className="change-password"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>신규 비밀번호 확인</label>
                    <input className="change-password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">관리자 정보 수정</button>
            </form>
        </div>
    );
}

export default Edit;