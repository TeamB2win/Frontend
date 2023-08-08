import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/crud.css";


function Create() {
    const navigate = useNavigate();

    const photoInputRef = useRef();

    const [relationalLinks, setRelationalLinks] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [userInfo, setUserInfo] = useState({
        wantedType: false,
        wantedId: null,
        criminal: null,
        name: null,
        sex: false,
        age: null,
        registeredAddress: null,
        residence: null,
        height: null,
        weight: null,
        relationalLink: null,
        characteristic: null,
        startedAt: null,
        endedAt: null,
        image: null,
    });
    const [imageFile, setImageFile] = useState({
        file: null,
        image: null
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const maxSize = 1024 * 1024;

        if (file.size > maxSize) {
            handleDeletePhoto();
            window.alert("이미지 용량은 1MB를 초과할 수 없습니다.");
            event.target.value = ""; // 파일 입력값 초기화
            return;
        }

        reader.onloadend = () => {
            const img = new Image();
            const maxWidth = 1000;
            const maxHeight = 1000;
            img.onload = () => {
                if (img.width > maxWidth || img.height > maxHeight) {
                    handleDeletePhoto();
                    window.alert("이미지 크기를 1000px 이하로 제한해주세요.");
                    event.target.value = "";
                    return;
                } else {
                    setImageFile({ file: file, image: reader.result })
                    console.log("이미지 등록")
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);

        event.target.style.display = 'none';
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "sex" || name === "wantedType") {
            setUserInfo(prevData => ({
                ...prevData,
                [name]: value === "true"
            }));
        } else {
            setUserInfo(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleDeletePhoto = () => {
        console.log('Delete')
        setImageFile({ file: null, image: null });
        photoInputRef.current.value = '';
        photoInputRef.current.style.display = 'inline';
    };

    const handleRelationalLinkChange = (index, event) => {
        const newLinks = [...relationalLinks];
        newLinks[index] = event.target.value;
        setRelationalLinks(newLinks);
    };

    const handleAddRelationalLink = () => {
        setRelationalLinks((prevLinks) => [...prevLinks, ""]);
    };

    const handleDeleteRelationalLink = (index) => {
        setRelationalLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    };

    const handleCharacteristicChange = (index, event) => {
        const newCharacteristics = [...characteristics];
        newCharacteristics[index] = event.target.value;
        setCharacteristics(newCharacteristics);
    };

    const handleAddCharacteristic = () => {
        setCharacteristics((prevCharacteristics) => [...prevCharacteristics, ""]);
    };

    const handleDeleteCharacteristic = (index) => {
        setCharacteristics((prevCharacteristics) => prevCharacteristics.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기서 정보를 API로 전송하거나 다른 처리를 수행할 수 있습니다.
        if (!imageFile.image) {
            alert("이미지를 선택해주세요");
            return;
        }

        handleConfirmation();
    };

    const handleConfirmation = async () => {
        const result = window.confirm("정보 등록을 완료하시겠습니까?");

        if (result) {
            const formData = new FormData();
            const startedAtAsDatetime = new Date(userInfo.startedAt);
            const endedAtAsDatetime = new Date(userInfo.endedAt);

            formData.append("file", imageFile.file);

            const finalData = {
                "wantedType": userInfo.wantedType,
                "wantedId": userInfo.wantedType? null: parseInt(userInfo.wantedId, 10),
                "criminal": userInfo.criminal,
                "name": userInfo.name,
                "sex": userInfo.sex,
                "age": userInfo.age? parseInt(userInfo.age, 10): null,
                "registeredAddress": userInfo.registered_address,
                "residence": userInfo.residence,
                "height": userInfo.height,
                "weight": userInfo.weight,
                "relationalLink": relationalLinks.join("\\n"),
                "characteristic": characteristics.join("\\n"),
                "startedAt": startedAtAsDatetime,
                "endedAt": endedAtAsDatetime,
            }

            try {
                // 이미지 업로드 및 회원 정보 등록을 동시에 수행
                await axios.post(
                    process.env.REACT_APP_BACK_BASE_URL + "/admin",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, params: finalData }
                );

                alert("등록이 완료되었습니다.");
                navigate(`/admin`);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.headers);
                    console.log(error.response.data);
                    alert("에러가 발생하였습니다.", error.response.data);
                } else if (error.request) {
                    alert("잘못된 요청입니다. 잠시 후 다시 시도해주세요");
                } else {
                    console.log('Error', error.message);
                    alert("잘못된 요청입니다. 잠시 후 다시 시도해주세요", error.message);
                }
                console.log(error.config);
            }
        }
    };
    return (
        <div className="form-wrapper">
            <h1 className="header">공개수배자 정보 등록</h1>
            <div className='photo-containers'>
                <div className="photo-container">
                    {imageFile.image ? (
                        <>
                            <img
                                src={imageFile.image}
                                alt="User"
                                className='photo-image'
                            />
                            <div className="delete-button">
                                <button onClick={() => handleDeletePhoto()}>삭제</button>
                            </div>
                        </>
                    ) : (
                        <img
                            src={"/images/admin/default-image.png"}
                            alt="Default User"
                            className='photo-image'
                        />
                    )}
                    <input style={{ maxWidth: '214px' }}
                        type="file"
                        accept="image/*"
                        name="image"
                        ref={photoInputRef}
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group-radio">
                    <label>유형</label>
                    <div>
                        <input
                            type="radio"
                            name="wantedType"
                            value="true"
                            checked={userInfo.wantedType} // "true"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                            required
                        />
                        <label>긴급</label>
                        <input
                            type="radio"
                            name="wantedType"
                            value="false"
                            checked={!userInfo.wantedType} // "false"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                            required
                        /> 
                        <label>종합</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>공개수배번호</label>
                    <input
                        type="number"
                        name="wantedId"
                        value={userInfo.wantedId}
                        onChange={handleInputChange}
                        disabled={userInfo.wantedType}
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
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group-radio">
                    <label>성별</label>
                    <div>
                        <input
                            type="radio"
                            name="sex"
                            value="false"
                            checked={!userInfo.sex} // "false"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                            required
                        /> 남성
                        <input
                            type="radio"
                            name="sex"
                            value="true"
                            checked={userInfo.sex} // "true"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                            required
                        /> 여성
                    </div>
                </div>
                <div className="form-group">
                    <label>나이</label>
                    <input
                        type="number"
                        name="age"
                        value={userInfo.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>주민등록상 주소지</label>
                    <input
                        type="text"
                        name="registered_address"
                        value={userInfo.registered_address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>실거주지</label>
                    <input
                        type="text"
                        name="residence"
                        value={userInfo.residence}
                        onChange={handleInputChange}
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
                    <div className="input-button">
                        {relationalLinks.map((link, index) => (
                            <div key={index}>
                                <input
                                    style={{ minWidth: "12.5rem" }}
                                    type="text"
                                    value={link}
                                    onChange={(event) => handleRelationalLinkChange(index, event)}
                                />
                                <button type="button" onClick={() => handleDeleteRelationalLink(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                        <button type="button" className='input-create-button' onClick={handleAddRelationalLink}>추가</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>특이사항</label>
                    <div className="input-button">
                        {characteristics.map((characteristic, index) => (
                            <div key={index}>
                                <input
                                    style={{ minWidth: "12.5rem" }}
                                    type="text"
                                    value={characteristic}
                                    onChange={(event) => handleCharacteristicChange(index, event)}
                                />
                                <button type="button" onClick={() => handleDeleteCharacteristic(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                        <button type="button" className='input-create-button' onClick={handleAddCharacteristic}>추가</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>수배시작기간</label>
                    <input
                        type="date"
                        name="startedAt"
                        value={userInfo.startedAt}
                        onChange={(e) => {
                            const dateValue = new Date(e.target.value); // 입력받은 연-월-일을 Date 객체로 변환
                            const isoDate = dateValue.toISOString(); // Date 객체를 ISO 8601 형식의 문자열(datetime)로 변환
                            handleInputChange(e, isoDate); // 변환된 문자열을 함께 핸들러에 전달
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>수배마감기간</label>
                    <input
                        type="date"
                        name="endedAt"
                        value={userInfo.endedAt}
                        onChange={(e) => {
                            const dateValue = new Date(e.target.value);
                            const isoDate = dateValue.toISOString();
                            handleInputChange(e, isoDate); // 변환된 문자열을 함께 핸들러에 전달
                        }}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: "40px", marginBottom: "20px" }}>정보 등록</button>
            </form>
        </div >
    );
}

export default Create;