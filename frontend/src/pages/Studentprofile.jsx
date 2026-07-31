import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";

export default function StudentProfile() {
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("candidateId");

    fetch(`http://localhost:8000/api/candidates/candidate/${id}/`)
      .then((res) => res.json())
      .then((data) => setCandidate(data))
      .catch(console.error);
  }, []);

  if (!candidate) return <h2>Loading...</h2>;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">IH</span>
            <span className="logo-name">InternHub</span>
            <span className="beta-tag">BETA</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-item" onClick={() => navigate("/dashboard")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Overview</span>
            </div>
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <span>Job Recommendations</span>
            </div>
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>My Applications</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span>Notifications</span>
            </div>
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Candidate Assessment</span>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar-initials">
              {getInitials(candidate?.full_name || "User")}
            </div>
            <div className="user-info">
              <div className="user-name">
                {candidate?.full_name || "User"}
              </div>
              <div className="user-role">
                Profile
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Profile Content */}
      <div className="profile-content">
    <div className="profile-card">

      {/* Header */}
      <div className="profile-top">
        <h1>Student Profile</h1>
      </div>

      {/* Body */}
      <div className="profile-body">

        {/* Left Section */}
        <div className="profile-left">
          <img
            src={`http://localhost:8000${candidate.profile_photo}`}
            alt="Profile"
            className="profile-photo"
          />

          <h2 className="student-name">{candidate.full_name}</h2>

          <p className="student-course">
            {candidate.course.replace("_", " ")}
          </p>

        </div>

        {/* Right Section */}
        <div className="profile-right">

          <div className="info-row">
            <div className="label">Full Name</div>
            <div className="value">{candidate.full_name}</div>
          </div>

          <div className="info-row">
            <div className="label">Email</div>
            <div className="value">{candidate.email}</div>
          </div>

          <div className="info-row">
            <div className="label">Phone</div>
            <div className="value">{candidate.phone}</div>
          </div>

          <div className="info-row">
            <div className="label">Course</div>
            <div className="value">
              {candidate.course.replace("_", " ")}
            </div>
          </div>

          <div className="info-row">
            <div className="label">Resume</div>
            <div className="value">
              <a
                href={`http://localhost:8000${candidate.cv}`}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
              >
                View Resume
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
    </div>
    </div>
  )}
