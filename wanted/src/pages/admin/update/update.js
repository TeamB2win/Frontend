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

    const columns = ["name", "sex", "wantedType", "age"];
    
    const [imageFile, setImageFile] = useState({
        file: null,
        image: null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://63.35.31.27:8000/wanted/${id}`);
                let data = {
                    ...res.data.data[0].datasource[0],
                    ...res.data.data[0].detail[0],
                    'age': res.data.data[0].age,
                    'name': res.data.data[0].name,
                    'sex': res.data.data[0].sex,
                    'wantedType': res.data.data[0].wantedType,
                }
                setRecordData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    // recordData가 변경될 때마다 호출되도록 useEffect를 사용
    useEffect(() => {
        // recordData가 존재하고, detail 배열과 relationalLink 속성이 존재할 때만 처리
        if (recordData && recordData.relationalLink) {
            // 연관 링크와 특이사항 데이터를 문자열로부터 배열로 분리하여 상태에 저장
            setRelationalLinks(recordData.relationalLink.split(/\\n|\n/));
        }
        if (recordData && recordData.characteristic) {
            setCharacteristics(recordData.characteristic.split(/\\n|\n/));
        }

    }, [recordData]);

    if (!recordData) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e, isoDate) => { // isoDate 인자 추가
        const { name, value } = e.target;
        const inputValue = value
        if(name === 'wantedType') {
            inputValue = value === 'true' ? true : false;
        } 
        setRecordData((prevData) => ({
            ...prevData,
            [name]: isoDate || inputValue, // isoDate가 있으면 isoDate를, 없으면 value를 사용
        }));
    };

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

    const handleDeletePhoto = (image) => {
        console.log('Delete');
        setImageFile({ file: null, image: image || null });
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
        if (!recordData.name || !recordData.age || !recordData.sex || !recordData.wanted_type) {
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
    const handleInferenceVideo = () => {
        //TODO: inference 요청보내기
    }

    return (
        <div className="Update">
            <h1 className="header">공개수배자 정보 수정</h1>
            <div className='photo-containers'>
                <div className="photo-container">
                    { imageFile.image ? (
                        <>
                            <img
                                src={imageFile.image}
                                alt="User"
                                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                                
                            />
                            <div className="delete-button">
                                <button onClick={() => handleDeletePhoto()} >삭제</button>
                            </div>
                        </>
                    ) : (
                    recordData.image ? (
                        <>
                            <img
                                src={recordData.image}
                                alt="User"
                                style={{ minWidth: '200px', minHeight: '200px', maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={"/images/admin/default-image.png"}
                                alt="Default User"
                                style={{ minWidth: '200px', minHeight: '200px', maxWidth: '200px', maxHeight: '200px', marginBottom: '1rem' }}
                            />
                        </>
                    ))}
                    <input style={{ maxWidth: '214px' }}
                            type="file"
                            accept="image/*"
                            name="image"
                            ref={photoInputRef}
                            onChange={handleImageChange}
                    />
                </div>
                <div className="photo-container">
                    {recordData.video && recordData.video.startsWith('/workspace/data/video/') ? (
                        <>
                            <video
                                controls
                                loop
                                autoPlay
                                muted
                                src={recordData.video}
                                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                            />
                            <div className="delete-button">
                                <button onClick={handleInferenceVideo}>재생성요청</button>
                            </div>
                        </>
                    ) : (
                        <img
                            src={"/images/admin/default-image.png"}
                            alt="Default User"
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: "1rem" }}
                        />
                    )}
                    <div className="delete-button">
                        <button onClick={handleInferenceVideo}>생성요청</button>
                    </div>
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
                    {/* <select name='wanted_type' type="bool" value={recordData.wantedType ? "긴급" : "종합"} onChange={handleInputChange} required>
                        <option>유형</option>
                        <option value={true}>종합</option>
                        <option value={false}>긴급</option>
                    </select> */}
                    <select
                        name='wanted_type'
                        value={recordData.wantedType? "true" : "false"}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={"true"}>긴급</option>
                        <option value={"false"}>종합</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>죄명</label>
                    <input
                        type="text"
                        name="criminal"
                        value={recordData.criminal}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>주민등록상 주소지</label>
                    <input
                        type="text"
                        name="registerd_address"
                        value={recordData.registeredAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>실거주지</label>
                    <input
                        type="text"
                        name="residence"
                        value={recordData.residence}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>신장</label>
                    <input
                        type="number"
                        name="height"
                        value={recordData.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>체중</label>
                    <input
                        type="text"
                        name="weight"
                        value={recordData.weight}
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
                        <button type="button" onClick={handleAddRelationalLink}>추가</button>
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
                        <button type="button" onClick={handleAddCharacteristic}>추가</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>수배시작기간</label>
                    <input
                        type="date"
                        name="startedAt"
                        value={recordData.startedAt.slice(0, 10)}
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
                        value={recordData.endedAt.slice(0, 10)}
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