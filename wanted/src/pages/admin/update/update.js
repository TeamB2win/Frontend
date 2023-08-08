import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/crud.css";


function isEmpty(node) {
    if (typeof node === 'undefined' || node === null || node === "")
        return true;
    else
        return false;
}

function Update() {
    const { id } = useParams(); // URL에서 id 파라미터 추출

    const navigate = useNavigate();

    const photoInputRef = useRef();

    const [recordData, setRecordData] = useState(null);
    const [relationalLinks, setRelationalLinks] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [videoInferenceButton, setVideoInferenceButton] = useState(false);
    const [imageFile, setImageFile] = useState({
        file: null,
        image: null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACK_BASE_URL + `/wanted/${id}`);
                let data = {
                    ...res.data.data[0].datasource[0],
                    ...res.data.data[0].detail[0],
                    'age': res.data.data[0].age,
                    'name': res.data.data[0].name,
                    'sex': res.data.data[0].sex,
                    'wantedType': res.data.data[0].wantedType,
                    'imagePath': res.data.data[0].datasource[0].image,
                    'videoPath': res.data.data[0].datasource[0].video,
                    'wantedId': res.data.data[0].wantedId
                }
                setRecordData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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


    const handleVideoInferenceButton = (event) => {
        const { checked } = event.target;
        setVideoInferenceButton(checked);
    }

    const handleInputChange = (e, isoDate) => { // isoDate 인자 추가
        const { name, value } = e.target;
        if (name === "sex" || name === "wantedType") {
            setRecordData((prevData) => ({
                ...prevData,
                [name]: value === "true", // "true"인 경우 true, 그렇지 않으면 false로 설정됨
            }));
        } else {
            setRecordData((prevData) => ({
                ...prevData,
                [name]: isoDate || value,
            }));
        }
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
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);

        event.target.style.display = 'none';

        setIsButtonDisabled(true);
    }

    const handleDeletePhoto = (image) => {
        setImageFile({ file: null, image: image || null });
        photoInputRef.current.value = '';
        photoInputRef.current.style.display = 'inline';
        setIsButtonDisabled(false);
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
        if (isEmpty(recordData.name) || isEmpty(recordData.criminal)) {
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
            handleUpdateDataRequest();
            if (imageFile.image) {
                handleImageChangeRequest();
            }
            else if (videoInferenceButton) {
                handleReInferenceVideoRequest();
            };

        } else {
            // 사용자가 취소를 누른 경우 아무 작업 없음
        }
    };

    const handleImageChangeRequest = async () => {
        const formData = new FormData();
        formData.append(
            "file",
            imageFile.file
        )
        const headers = { "Content-Type": "multipart/form-data" }
        const params = { "id": id }

        axios.put(
            process.env.REACT_APP_BACK_BASE_URL + "/admin/image",
            formData,
            {
                headers: headers,
                params: params
            }
        ).then(function (response) {
            console.log(response.data);
            // TODO data hash 값 redux에 저장
            alert("이미지 반영이 완료되었습니다.");
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
                alert("잘못된 이미지 수정 요청입니다. 잠시 후 다시 시도해주세요");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert("잘못된 이미지 수정 요청입니다. 잠시 후 다시 시도해주세요", error.message);
            }
            console.log(error.config);
        });

    };

    const handleReInferenceVideoRequest = async () => {
        const headers = { "Content-Type": "application/json" }

        axios.put(
            process.env.REACT_APP_BACK_BASE_URL + "/admin/video",
            { "id": id },
            { headers: headers }
        ).then(function (response) {
            console.log(response.data);
            // TODO data hash 값 redux에 저장
            alert("데이터 수정 요청이 완료되었습니다.");
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
                alert("잘못된 데이터 수정 요청입니다. 잠시 후 다시 시도해주세요");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert("잘못된 데이터 수정 요청입니다. 잠시 후 다시 시도해주세요", error.message);
            }
            console.log(error.config);
        });
    }

    const handleUpdateDataRequest = async () => {
        const startedAtAsDatetime = new Date(recordData.startedAt);
        const endedAtAsDatetime = new Date(recordData.endedAt);
        const finalData = {
            "id": id,
            "wantedType": recordData.wantedType,
            "wantedId": recordData.wantedType ? null : parseInt(recordData.wantedId, 10),
            "name": recordData.name,
            "sex": recordData.sex,
            "age": recordData.age,
            "criminal": recordData.criminal,
            "registeredAddress": recordData.registeredAddress,
            "residence": recordData.residence,
            "height": recordData.height,
            "weight": recordData.weight,
            "relationalLink": relationalLinks.join('\\n'),
            "characteristic": characteristics.join('\\n'),
            "startedAt": startedAtAsDatetime,
            "endedAt": endedAtAsDatetime,
        }
        const headers = { "Content-Type": "application/json" }

        axios.put(
            process.env.REACT_APP_BACK_BASE_URL + "/admin/data",
            finalData,
            { headers: headers }
        ).then(function (response) {
            console.log(response.data);
            // TODO data hash 값 redux에 저장
            alert("데이터 수정 요청이 완료되었습니다.");
            navigate(`/admin`);
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
                alert("잘못된 데이터 수정 요청입니다. 잠시 후 다시 시도해주세요");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert("잘못된 데이터 수정 요청입니다. 잠시 후 다시 시도해주세요", error.message);
            }
            console.log(error.config);
        });
    };

    if (!recordData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-wrapper">
            <h1 className="header">공개수배자 정보 수정</h1>
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
                        recordData.image ? (
                            <>
                                <img
                                    src={recordData.image}
                                    alt="User"
                                    className='photo-image'
                                />
                            </>
                        ) : (
                            <>
                                <img
                                    src={"images/admin/default-image.png"}
                                    alt="Default User"
                                    className='photo-image'
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
                                loop
                                autoPlay
                                muted
                                src={recordData.video}
                                className='photo-video'
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    name="inference"
                                    onClick={handleVideoInferenceButton}
                                    disabled={isButtonDisabled}
                                />  영상 생성요청 (사진 선택 시, 자동 요청)
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={"/images/admin/default-image.png"}
                                alt="Default User"
                                className='photo-image'
                            />
                            <div>
                                <input type="checkbox" name="inference" disabled checked />  영상 생성
                            </div>
                        </>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group-radio">
                    <label>유형</label>
                    <div>
                        <input style={{ minWidth: "4rem", minHeight: "1.2rem" }}
                            type="radio"
                            name="wantedType"
                            value="true"
                            checked={recordData.wantedType} // "true"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                        /> 긴급
                        <input style={{ minWidth: "4rem", minHeight: "1.2rem" }}
                            type="radio"
                            name="wantedType"
                            value="false"
                            checked={!recordData.wantedType} // "false"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                        /> 종합
                    </div>
                </div>
                <div className="form-group">
                    <label>공개수배번호</label>
                    <input
                        type="number"
                        name="wantedId"
                        value={recordData.wantedId}
                        onChange={handleInputChange}
                        disabled={recordData.wantedType}
                    />
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
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={recordData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group-radio">
                    <label>성별</label>
                    <div>
                        <input style={{ minWidth: "4rem", minHeight: "1.2rem" }}
                            type="radio"
                            name="sex"
                            value="false"
                            checked={!recordData.sex} // "false"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                        /> 남성
                        <input style={{ minWidth: "4rem", minHeight: "1.2rem" }}
                            type="radio"
                            name="sex"
                            value="true"
                            checked={recordData.sex} // "true"인 경우에만 체크되도록 설정
                            onChange={handleInputChange}
                        /> 여성
                    </div>
                </div>
                <div className="form-group">
                    <label>나이</label>
                    <input
                        type="number"
                        name="age"
                        value={recordData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>주민등록상 주소지</label>
                    <input
                        type="text"
                        name="registeredAddress"
                        value={recordData.registeredAddress}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>실거주지</label>
                    <input
                        type="text"
                        name="residence"
                        value={recordData.residence}
                        onChange={handleInputChange}
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
            </form >
        </div >
    );
}

export default Update;