import React, { useState, useRef } from 'react';
import axios from "axios";
import "./create.css";

function Create() {
    const [userInfo, setUserInfo] = useState({
        wanted_id: '',
        wanted_type: '',
        name: '',
        email: '',
        age: '',
        image: null,
    });
    const [imageFile, setImageFile] = useState({
        file: null,
        image: null
    })

    const photoInputRef = useRef();

    const [relationalLinks, setRelationalLinks] = useState([""]);

    const [characteristics, setCharacteristics] = useState([""]);

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
        const { name, type } = event.target;
        setUserInfo({ ...userInfo, [name]: event.target.value });
    };

    const handleDeletePhoto = () => {
        console.log('Delete')
        setImageFile({ file: null, image: null });
        photoInputRef.current.value = '';
        photoInputRef.current.style.display = 'inline';
    };

    const handleAddRelationalLink = () => {
        setRelationalLinks([...relationalLinks, ""]);
    };

    const handleRelationalLinkChange = (index, event) => {
        const updatedLinks = [...relationalLinks];
        updatedLinks[index] = event.target.value;
        const combinedLinks = updatedLinks.join('\n');
        setRelationalLinks(combinedLinks);
    };

    const handleDeleteRelationalLink = (index) => {
        const updatedLinks = [...relationalLinks];
        updatedLinks.splice(index, 1);
        const combinedLinks = updatedLinks.join('\n');
        setRelationalLinks(combinedLinks);
    };

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, ""]);
    };

    const handleCharacteristicChange = (index, event) => {
        const updatedCharacteristics = [...characteristics];
        updatedCharacteristics[index] = event.target.value;
        const combinedCharacteristics = updatedCharacteristics.join('\n');
        setCharacteristics(combinedCharacteristics);
    };

    const handleDeleteCharacteristic = (index) => {
        const updatedCharacteristics = [...characteristics];
        updatedCharacteristics.splice(index, 1);
        const combinedCharacteristics = updatedCharacteristics.join('\n');
        setCharacteristics(combinedCharacteristics);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기서 정보를 API로 전송하거나 다른 처리를 수행할 수 있습니다.
        if (!imageFile.image) {
            alert("이미지를 선택해주세요");
            return;
        }
        if (!userInfo.name || !userInfo.age || !userInfo.sex || !userInfo.wanted_type || !userInfo.criminal || !userInfo.registered_address || !userInfo.residence) {
            alert("빈 칸을 모두 입력해주세요.");
            return;
        }
        handleConfirmation();
    };

    const handleConfirmation = async () => {
        const result = window.confirm("정보 등록을 완료하시겠습니까?");
        if (result) {
            // uploading the image file
            const formData = new FormData();
            formData.append(
                "file",
                imageFile.file
            )

            const headers = { "Content-Type": `${imageFile.file.type}; charset=UTF-8` }
            const response = await axios.post(
                "http://localhost:8000/admin/uploadimage",
                formData,
                headers
            )

            if (response.status !== 201) {
                alert(response.data);
                return;
            }

            // Wanted 데이터 테이블에 등록
            const image_path = response.data.imagePath
            axios.post(
                "http://localhost:8000/admin",
                {
                    ...userInfo,
                    image: image_path
                },
            ).then(function (response) {
                console.log(response.data);
                // TODO data hash 값 redux에 저장


                alert("등록이 완료되었습니다.");
                // 차후 domain 주소로 변경
                // window.location.replace('http://localhost:3000/admin');
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.headers);
                    console.log(error.response.data);
                    alert("에러가 발생하였습니다.", error.response.data)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    alert("잘못된 요청입니다. 잠시 후 다시 시도해주세요");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    alert("잘못된 요청입니다. 잠시 후 다시 시도해주세요", error.message);
                }
                console.log(error.config);
            });
        }
    };

    return (
        <div className="Create">
            <h1 className="header">공개수배자 정보 등록</h1>
            <div className='photo-containers'>
                <div className="photo-container">
                    {imageFile.image ? (
                        <>
                            <img
                                src={imageFile.image}
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
                        name="image"
                        ref={photoInputRef}
                        onChange={handleImageChange}
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
                    <select name='sex' onChange={handleInputChange}>
                        <option>성별</option>
                        <option value={true}>남자</option>
                        <option value={false}>여자</option>
                    </select>
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
                    <select name='wanted_type' onChange={handleInputChange}>
                        <option>유형</option>
                        <option value={true}>종합</option>
                        <option value={false}>긴급</option>
                    </select>
                </div>
                {userInfo.wanted_type === 'true' &&
                    <div className="form-group">
                        <label>공개수배번호</label>
                        <input
                            type="bool"
                            name="wanted_id"
                            value={userInfo.wanted_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                }
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
                        name="registered_address"
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
                    <div className="input-button">
                        <div>
                            <input style={{ minWidth: "12.5rem" }}
                                type="text"
                                value={relationalLinks[0]}
                                onChange={(event) => handleRelationalLinkChange(0, event)}
                            />
                            <button onClick={handleAddRelationalLink}>추가</button>
                        </div>
                        {relationalLinks.slice(1).map((link, index) => (
                            <div key={index}>
                                <input style={{ minWidth: "12.5rem" }}
                                    type="text"
                                    value={link}
                                    onChange={(event) => handleRelationalLinkChange(index + 1, event)}
                                />
                                <button onClick={() => handleDeleteRelationalLink(index + 1)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>특이사항</label>
                    <div className="input-button">
                        <div>
                            <input style={{ minWidth: "12.5rem" }}
                                type="text"
                                value={characteristics[0]}
                                onChange={(event) => handleCharacteristicChange(0, event)}
                            />
                            <button onClick={handleAddCharacteristic}>추가</button>
                        </div>
                        {characteristics.slice(1).map((characteristic, index) => (
                            <div key={index}>
                                <input style={{ minWidth: "12.5rem" }}
                                    type="text"
                                    value={characteristic}
                                    onChange={(event) => handleCharacteristicChange(index + 1, event)}
                                />
                                <button onClick={() => handleDeleteCharacteristic(index + 1)}>삭제</button>
                            </div>
                        ))}
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
                    />
                </div>
                <button type="submit" style={{ marginTop: "40px", marginBottom: "20px" }}>정보 등록</button>
            </form>
        </div >
    );
}

export default Create;