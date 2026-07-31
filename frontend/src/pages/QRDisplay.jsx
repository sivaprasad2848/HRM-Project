import { QRCodeCanvas } from "qrcode.react";
import "./QRDisplay.css";
import logo from "../assets/cybersqaure.png";

export default function QRDisplay() {

  const registerURL = "http://localhost:5173/register"

  return (
    <div className="qr-page">

      <div className="qr-container">

        <img 
          src={logo} 
          alt="Cyber Square" 
          className="logo" 
        />

        <h1 className="title">
          SCAN TO REGISTER
        </h1>

        <p className="subtitle">
          Point your camera at the QR code to get started
        </p>


        <div className="card">

          <div className="qr-link">

            <QRCodeCanvas
              value={registerURL}
              size={220}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />

          </div>


          <p className="qr-text">
            Scan this QR code with your phone camera or QR scanner app to access the registration form
          </p>


          <div className="instruction">

            <span className="instruction-icon">
              📱
            </span>

            <span>
              Open your phone camera and point it at the QR code
            </span>

          </div>


          <div className="url-display">
            <code>
              {registerURL}
            </code>
          </div>

        </div>

      </div>

    </div>
  );
}