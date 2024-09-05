import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { styles } from "./styles";

function App() {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [darkMode, setDarkMode] = useState(false);
  const qrRef = useRef(null);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const containerStyle = {
    ...styles.appContainer,
    background: darkMode ? '#121212' : 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
  };

  const cardStyle = {
    ...styles.card,
    backgroundColor: darkMode ? '#1E1E1E' : 'rgba(255, 255, 255, 0.9)',
    color: darkMode ? '#E0E0E0' : '#333',
  };

  const inputStyle = {
    ...styles.input,
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#E0E0E0' : '#333',
    border: darkMode ? '1px solid #555' : '1px solid #ddd',
  };

  const buttonStyle = {
    ...styles.button,
    backgroundColor: darkMode ? '#4A148C' : '#6e8efb',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={styles.title}>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
          style={inputStyle}
        />
        <label style={{...styles.fileInputLabel, backgroundColor: darkMode ? '#333' : '#f0f0f0', color: darkMode ? '#E0E0E0' : '#333'}}>
          Upload Logo
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={styles.fileInput}
          />
        </label>
        <div style={styles.customizationContainer}>
          <div style={styles.colorContainer}>
            <label style={{...styles.label, color: darkMode ? '#E0E0E0' : '#666'}}>QR Color</label>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              style={styles.colorInput}
            />
          </div>
          <div style={styles.colorContainer}>
            <label style={{...styles.label, color: darkMode ? '#E0E0E0' : '#666'}}>BG Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={styles.colorInput}
            />
          </div>
        </div>
        <div style={styles.sizeContainer}>
          <label style={{...styles.label, color: darkMode ? '#E0E0E0' : '#666'}}>Size: {size}px</label>
          <input
            type="range"
            min="128"
            max="512"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={styles.rangeInput}
          />
        </div>
        <button onClick={toggleDarkMode} style={buttonStyle}>
          Toggle Dark Mode
        </button>
        {url && (
          <div style={{...styles.qrCodeContainer, backgroundColor: darkMode ? '#333' : 'white'}} ref={qrRef}>
            <QRCode
              value={url}
              size={size}
              logoImage={logo}
              logoWidth={size / 4}
              logoHeight={size / 4}
              fgColor={qrColor}
              bgColor={bgColor}
            />
          </div>
        )}
        {url && (
          <button onClick={handleDownload} style={buttonStyle}>
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
}

export default App;