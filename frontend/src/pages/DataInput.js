import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // App.css 경로 수정

function DataInput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage(''); // 파일 선택 시 메시지 초기화
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      console.log('Upload successful:', response.data);
    } catch (error) {
      setMessage(`파일 업로드 실패: ${error.response?.data?.detail || error.message}`);
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ODS 화면 </h1>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>업로드</button>
        {selectedFile && <p>선택된 파일: {selectedFile.name}</p>}
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default DataInput;

