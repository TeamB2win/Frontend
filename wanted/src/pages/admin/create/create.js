import React, { useState, useRef } from 'react';
import "./create.css";

function Create() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        age: '',
        photo: null,
    });

    const photoInputRef = useRef();
    const additionalPhotoInputRef = useRef();

    const [additionalPhoto, setAdditionalPhoto] = useState(null);

    const handleInputChange = (event) => {
        const { name, type } = event.target;
        if (type === 'file') {
            const file = event.target.files[0];
            const reader = new FileReader();
            // reader.onloadend = () => {
            //     setUserInfo({ ...userInfo, [name]: reader.result });
            // };
            reader.onloadend = () => {
                const img = new Image();
                const maxWidth = 1000;
                const maxHeight = 1000;
                const maxSize = 1024 * 1024
                img.onload = () => {
                    const isMaxsize = img.size > maxSize
                    const isSquare = img.width === img.height;
                    if(isMaxsize){
                        const msg = '파일 용량을 1MB 이하로 제한해주세요.';
                            window.alert(msg);
                            handleDeletePhoto();
                    }
                    if (isSquare) {
                        // Image has a square aspect ratio, do something
                        console.log('정방형 이미지 입니다.');
                        if (img.width > maxWidth || img.height > maxHeight) {
                            window.alert("이미지 크기를 1000px 이하로 제한해주세요.");
                        } else{
                            setUserInfo({ ...userInfo, [name]: reader.result })
                        }
                    } else {
                        // Image does not have a square aspect ratio, do something else
                        const msg = 'Image must have a "square aspect ratio". Please choose another image.';
                        window.alert(msg);
                        handleDeletePhoto();
                    }
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            console.log("이미지 등록")

            event.target.style.display = 'none';
        } else {
            setUserInfo({ ...userInfo, [name]: event.target.value });
        }
    };

    const handleAdditionalPhotoChange = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAdditionalPhoto(reader.result);
        };
        reader.readAsDataURL(file);

        event.target.style.display = 'none';
    };

    const handleDeletePhoto = () => {
        setUserInfo({ ...userInfo, photo: null });
        photoInputRef.current.value = '';
        photoInputRef.current.style.display = 'inline';
    };

    const handleDeleteAdditionalPhoto = () => {
        setAdditionalPhoto(null);
        additionalPhotoInputRef.current.value = '';
        additionalPhotoInputRef.current.style.display = 'inline';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기서 정보를 API로 전송하거나 다른 처리를 수행할 수 있습니다.
        if (!userInfo.name || !userInfo.age || !userInfo.sex || !userInfo.wanted_type || !userInfo.criminal || !userInfo.registerd_address || !userInfo.residence) {
            alert("빈 칸을 모두 입력해주세요.");
            return;
        }
        handleConfirmation();
    };

    const handleConfirmation = () => {
        const result = window.confirm("정보 등록을 완료하시겠습니까?");
        if (result) {
            handleSubmit();
        } else {
            // 사용자가 취소를 누른 경우 아무 작업 없음
        }
    };

    return (
        <div className="Update">
            <h1 className="header">공개수배자 정보 등록</h1>
            <div className='photo-containers'>
                <div className="photo-container">
                    {userInfo.photo ? (
                        <>
                            <img
                                src={userInfo.photo}
                                alt="User"
                                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                            />
                            <div className="delete-button">
                                <button onClick={() => handleDeletePhoto()}>삭제</button>
                            </div>
                        </>
                    ) : (
                        <img
                            src={"/images/admin/default-image.png"}
                            alt="Default User"
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                        />
                    )}
                    <input style={{ maxWidth: '214px' }}
                        type="file"
                        accept="image/*"
                        name="photo"
                        ref={photoInputRef}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>성별</label>
                    <input
                        type="bool"
                        name="sex"
                        value={userInfo.sex}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>나이</label>
                    <input
                        type="number"
                        name="age"
                        value={userInfo.age}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>유형</label>
                    <input
                        type="bool"
                        name="wanted_type"
                        value={userInfo.wanted_type}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>죄명</label>
                    <input
                        type="text"
                        name="criminal"
                        value={userInfo.criminal}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>주민등록상 주소지</label>
                    <input
                        type="text"
                        name="registerd_address"
                        value={userInfo.registerd_address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>실거주지</label>
                    <input
                        type="text"
                        name="residence"
                        value={userInfo.residence}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>신장</label>
                    <input
                        type="number"
                        name="height"
                        value={userInfo.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>체중</label>
                    <input
                        type="text"
                        name="weight"
                        value={userInfo.weight}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>연관 링크</label>
                    <textarea
                        style={{ minWidth: "16rem", minHeight: "40px" }}
                        name="relational_link"
                        value={userInfo.relational_link}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>특이사항</label>
                    <textarea
                        style={{ minWidth: "16rem", minHeight: "80px" }}
                        name="characteristic"
                        value={userInfo.characteristic}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" style={{ marginTop: '40px', marginBottom: "20px" }}>정보 등록</button>
            </form>
        </div >
    );
}

export default Create;