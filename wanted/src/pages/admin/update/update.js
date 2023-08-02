import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import "./update.css";

function isoDateStringToDate(isoDateString) {
    // ISO 8601 형식의 문자열을 Date 객체로 변환
    const dateValue = new Date(isoDateString);
    return dateValue;
}

function Update() {
    const { id } = useParams(); // URL에서 id 파라미터 추출

    const [recordData, setRecordData] = useState(null);

    const [relationalLinks, setRelationalLinks] = useState([]);

    const [characteristics, setCharacteristics] = useState([]);

    const photoInputRef = useRef();

    const additionalPhotoInputRef = useRef();

    const [additionalPhoto, setAdditionalPhoto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://63.35.31.27:8000/wanted/${id}`);
                setRecordData(res.data.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    // recordData가 변경될 때마다 호출되도록 useEffect를 사용
    useEffect(() => {
        // recordData가 존재하고, detail 배열과 relationalLink 속성이 존재할 때만 처리
        if (recordData && recordData.detail[0].relationalLink) {
            // 연관 링크와 특이사항 데이터를 문자열로부터 배열로 분리하여 상태에 저장
            setRelationalLinks(recordData.detail[0].relationalLink.split(/\\n|\n/));
        }
        if (recordData && recordData.detail[0].characteristic) {
            setCharacteristics(recordData.detail[0].characteristic.split(/\\n|\n/));
        }

    }, [recordData]);

    if (!recordData) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        // 사용자가 input 값을 변경할 때 호출되는 이벤트 핸들러
        const { name, value } = e.target;
        setRecordData((prevData) => ({
            ...prevData,
            [name]: value, // name 속성을 사용하여 해당 필드를 업데이트
        }));
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
        setRecordData({ ...recordData, photo: null });
        photoInputRef.current.value = '';
        photoInputRef.current.style.display = 'inline';
    };

    const handleDeleteAdditionalPhoto = () => {
        setAdditionalPhoto(null);
        additionalPhotoInputRef.current.value = '';
        additionalPhotoInputRef.current.style.display = 'inline';
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
        if (!recordData.name || !recordData.age || !recordData.sex || !recordData.wanted_type || !recordData.criminal || !recordData.registerd_address || !recordData.residence) {
            alert("빈 칸을 모두 입력해주세요.");
            return;
        }
        handleConfirmation();
    };

    if (!recordData) {
        return <div>Loading...</div>;
    }

    const handleConfirmation = () => {
        const result = window.confirm("정보 수정을 완료하시겠습니까?");
        if (result) {
            const mergedLinks = relationalLinks.join('\n');
            setRelationalLinks(mergedLinks);

            const mergedCharacteristics = characteristics.join('\n');
            setCharacteristics(mergedCharacteristics);
            handleSubmit(); // 정보 수정 실행
        } else {
            // 사용자가 취소를 누른 경우 아무 작업 없음
        }
    };

    return (
        <div className="Update">
            <h1 className="header">공개수배자 정보 수정</h1>
            <div className='photo-containers'>
                <div className="photo-container">
                    {recordData.photo ? (
                        <>
                            <img
                                src={recordData.photo}
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
                <div className="photo-container">
                    {/* 비디오 파일 프리뷰 */}
                    {additionalPhoto && additionalPhoto.startsWith('data:video/') ? (
                        <>
                            <video
                                controls
                                src={additionalPhoto}
                                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                            />
                            {/* 비디오 파일을 삭제할 수 있는 삭제 버튼 */}
                            <div className="delete-button">
                                <button onClick={handleDeleteAdditionalPhoto}>삭제</button>
                            </div>
                        </>
                    ) : (
                        <img
                            src={"/images/admin/default-image.png"}
                            alt="Default User"
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                        />
                    )}
                    {/* 비디오 파일을 선택할 수 있는 input 요소 */}
                    <input style={{ maxWidth: '214px' }}
                        type="file"
                        accept="video/*"
                        name="additionalPhoto"
                        ref={additionalPhotoInputRef} // additionalPhoto input 요소에 대한 ref를 할당합니다.
                        onChange={handleAdditionalPhotoChange}
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={recordData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>성별</label>
                    <input
                        type="bool"
                        name="sex"
                        value={recordData.sex ? "여성" : "남성"}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>나이</label>
                    <input
                        type="number"
                        name="age"
                        value={recordData.age}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>유형</label>
                    <input
                        type="bool"
                        name="wanted_type"
                        value={recordData.wantedType ? "긴급" : "종합"}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>죄명</label>
                    <input
                        type="text"
                        name="criminal"
                        value={recordData.detail[0].criminal}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>주민등록상 주소지</label>
                    <input
                        type="text"
                        name="registerd_address"
                        value={recordData.detail[0].registeredAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>실거주지</label>
                    <input
                        type="text"
                        name="residence"
                        value={recordData.detail[0].residence}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>신장</label>
                    <input
                        type="number"
                        name="height"
                        value={recordData.detail[0].height}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>체중</label>
                    <input
                        type="text"
                        name="weight"
                        value={recordData.detail[0].weight}
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
                                <button onClick={() => handleDeleteRelationalLink(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddRelationalLink}>추가</button>
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
                                <button onClick={() => handleDeleteCharacteristic(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddCharacteristic}>추가</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>수배시작기간</label>
                    <input
                        type="date"
                        name="startedAt"
                        value={recordData.detail[0].startedAt.slice(0, 10)}
                        onChange={(e) => {
                            const dateValue = new Date(e.target.value);
                            const isoDate = dateValue.toISOString();
                            handleInputChange(e, isoDate);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>수배마감기간</label>
                    <input
                        type="date"
                        name="endedAt"
                        value={recordData.detail[0].endedAt.slice(0, 10)}
                        onChange={(e) => {
                            const dateValue = new Date(e.target.value);
                            const isoDate = dateValue.toISOString();
                            handleInputChange(e, isoDate);
                        }}
                    />
                </div>
                <button type="submit" style={{ marginTop: '40px', marginBottom: "20px" }}>정보 수정</button>
            </form>
        </div >
    );
}

export default Update;