import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Registration.css";
import logo from "../assets/cybersqaure.png";

export default function RegistrationQR() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    course: '',
    password: "",
  });
  const [cv, setCv] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e, field) => {
    if (field === 'cv') {
      setCv(e.target.files[0]);
    } else if (field === 'photo') {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const data = new FormData();
  data.append("full_name", formData.full_name);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("course", formData.course);
  data.append("password", formData.password);

  if (cv) data.append("cv", cv);
  if (profilePhoto) data.append("profile_photo", profilePhoto);

  try {
    const response = await fetch(
      "http://localhost:8000/api/candidates/register/",
      {
        method: "POST",
        body: data,
      }
    );

    const text = await response.text();
console.log("Response:", text);

let result = {};
try {
  result = JSON.parse(text);
} catch (e) {
  console.log("Response is not JSON");
}
    if (response.ok) {
      if (result.candidate_id) {
        localStorage.setItem("candidateId", result.candidate_id);
      }

      alert("🎉 Registration Successful!");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        course: "",
      });

      setCv(null);
      setProfilePhoto(null);

      navigate("/dashboard");
    } else {
      console.log(result);
      setMessage(JSON.stringify(result));
    }
  } catch (error) {
    console.error(error);
    setMessage("Error connecting to server. Please try again.");
  } finally {
    setLoading(false);
  }
};
    

  return (
    <div className="qr-page">
      <div className="qr-container">

        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="user-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="header-text">
              <h2>Student Registration</h2>
              <p>Fill in the details below to register</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            {/* Section 1: Personal Information */}
            <div className="section">
              <div className="section-title">
                <span className="number">1</span>
                <h3>PERSONAL INFORMATION</h3>
                <div className="line"></div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>FULL NAME *</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Your name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                <label>PASSWORD *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

                <div className="form-group">
                  <label>EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>PHONE *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>COURSE *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="web_development">Web Development</option>
                    <option value="python_programming">Python Programming</option>
                    <option value="data_science">Data Science</option>
                    <option value="machine_learning">Machine Learning</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Documents */}
            <div className="section">
              <div className="section-title">
                <span className="number">2</span>
                <h3>DOCUMENTS</h3>
                <div className="line"></div>
              </div>

              <div className="upload-grid">
                <div className="upload-box">
                  <div className="upload-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Upload CV</h4>
                  <p>PDF, DOC, DOCX · Max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'cv')}
                    className="file-input"
                  />
                </div>

                <div className="upload-box">
                  <div className="upload-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#999" strokeWidth="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="#999" strokeWidth="2"/>
                      <path d="M21 15L16 10L5 21" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Upload Photo</h4>
                  <p>JPG, PNG · Max 5MB</p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'photo')}
                    className="file-input"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {/* Footer */}
            <div className="footer">
              <div className="footer-left">
                <span>Already have an account? </span>
                <a href="/login">Login here</a>
              </div>
              <div className="buttons">
                <button type="button" className="btn-reset" onClick={() => setFormData({ full_name: '', email: '', phone: '', course: '' })}>
                  Reset
                </button>
                <button type="submit" className="btn-register" disabled={loading}>
                  {loading ? 'Registering...' : 'Register →'}
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
