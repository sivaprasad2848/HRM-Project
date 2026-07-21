import { useState, useEffect } from 'react';
import "./Dashboard.css";

export default function Dashboard() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const candidateId = localStorage.getItem('candidateId');
    
    if (!candidateId) {
      setError('No candidate ID found. Please register first.');
      setLoading(false);
      return;
    }

    // Fetch candidate data from backend
    fetch(`http://localhost:8000/api/candidates/candidate/${candidateId}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch candidate data');
        }
        return response.json();
      })
      .then(data => {
        setCandidate(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-screen">
          <p>{error}</p>
          <a href="/register" className="register-link">Go to Registration</a>
        </div>
      </div>
    );
  }

  // Dynamic data based on candidate
  const getCourseName = (courseValue) => {
    const courses = {
      'web_development': 'Web Development',
      'python_programming': 'Python Programming',
      'data_science': 'Data Science',
      'machine_learning': 'Machine Learning'
    };
    return courses[courseValue] || courseValue;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Mock data based on course (in real app, this would come from backend)
  const getJobRecommendations = (course) => {
    const jobMap = {
      'web_development': [
        { title: 'Frontend Developer Intern', company: 'Google India', location: 'Remote', match: 94, skills: ['React', 'JavaScript', 'CSS'] },
        { title: 'Full Stack Developer', company: 'Microsoft', location: 'Hybrid', match: 87, skills: ['Node.js', 'React', 'MongoDB'] },
        { title: 'React Developer', company: 'Amazon', location: 'Bangalore', match: 82, skills: ['React', 'Redux', 'TypeScript'] }
      ],
      'python_programming': [
        { title: 'Python Developer Intern', company: 'Google', location: 'Remote', match: 95, skills: ['Python', 'Django', 'Flask'] },
        { title: 'Backend Developer', company: 'Microsoft', location: 'Hybrid', match: 88, skills: ['Python', 'FastAPI', 'PostgreSQL'] },
        { title: 'Software Engineer', company: 'Amazon', location: 'Bangalore', match: 85, skills: ['Python', 'AWS', 'Docker'] }
      ],
      'data_science': [
        { title: 'Data Scientist Intern', company: 'Google', location: 'Remote', match: 96, skills: ['Python', 'Pandas', 'SQL'] },
        { title: 'Data Analyst', company: 'Microsoft', location: 'Hybrid', match: 89, skills: ['Python', 'Tableau', 'Statistics'] },
        { title: 'ML Engineer', company: 'Amazon', location: 'Bangalore', match: 84, skills: ['Python', 'TensorFlow', 'NLP'] }
      ],
      'machine_learning': [
        { title: 'ML Engineer Intern', company: 'Google', location: 'Remote', match: 97, skills: ['Python', 'TensorFlow', 'PyTorch'] },
        { title: 'AI Research Assistant', company: 'Microsoft', location: 'Hybrid', match: 90, skills: ['Python', 'Deep Learning', 'NLP'] },
        { title: 'Data Scientist', company: 'Amazon', location: 'Bangalore', match: 86, skills: ['Python', 'ML', 'Computer Vision'] }
      ]
    };
    return jobMap[course] || jobMap['web_development'];
  };

  const getSkills = (course) => {
    const skillsMap = {
      'web_development': [
        { name: 'React.js', percent: 95 },
        { name: 'JavaScript', percent: 90 },
        { name: 'CSS/HTML', percent: 88 },
        { name: 'Node.js', percent: 75 }
      ],
      'python_programming': [
        { name: 'Python', percent: 95 },
        { name: 'Django', percent: 85 },
        { name: 'FastAPI', percent: 80 },
        { name: 'PostgreSQL', percent: 75 }
      ],
      'data_science': [
        { name: 'Python', percent: 95 },
        { name: 'Pandas', percent: 90 },
        { name: 'SQL', percent: 85 },
        { name: 'Tableau', percent: 78 }
      ],
      'machine_learning': [
        { name: 'Python', percent: 95 },
        { name: 'TensorFlow', percent: 88 },
        { name: 'PyTorch', percent: 85 },
        { name: 'Deep Learning', percent: 80 }
      ]
    };
    return skillsMap[course] || skillsMap['web_development'];
  };

  const jobRecommendations = getJobRecommendations(candidate?.course);
  const skills = getSkills(candidate?.course);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">IH</span>
            <span className="logo-name">InternHub</span>
            <span className="beta-tag">BETA</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-item active">
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
              <span className="badge">{jobRecommendations.length}</span>
            </div>
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>My Applications</span>
              <span className="badge">0</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span>Notifications</span>
              <span className="badge">0</span>
            </div>
            <div className="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Candidate Assessment</span>
              <span className="badge">0</span>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar-initials">
              {getInitials(candidate?.full_name || 'User')}
            </div>
            <div className="user-info">
              <div className="user-name">{candidate?.full_name || 'User'}</div>
              <div className="user-role">{getCourseName(candidate?.course || 'web_development')}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="top-header">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search jobs, skills, applications..." />
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="browse-jobs-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <span>Browse Jobs</span>
            </button>
            <div className="header-avatar-initials">
              {getInitials(candidate?.full_name || 'User')}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="page-header">
            <h1>Welcome, {candidate?.full_name?.split(' ')[0] || 'Student'}!</h1>
            <p className="subtitle">Your personalized dashboard based on your {getCourseName(candidate?.course || 'Web Development')} course</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">MATCHED JOBS</span>
                <span className="new-badge">+{jobRecommendations.length} New</span>
              </div>
              <div className="stat-value">{jobRecommendations.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">APPLICATIONS</span>
                <span className="new-badge">0%</span>
              </div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">PROFILE HEALTH</span>
                <span className="status-badge">Active</span>
              </div>
              <div className="stat-value">100%</div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="content-grid">
            {/* Job Recommendations */}
            <div className="content-card large">
              <div className="card-header">
                <div className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <h3>AI Job Recommendations</h3>
                </div>
                <p className="card-subtitle">Based on your {getCourseName(candidate?.course || 'Web Development')} profile</p>
                <a href="#" className="view-all">VIEW ALL →</a>
              </div>

              <div className="job-list">
                {jobRecommendations.map((job, index) => (
                  <div key={index} className="job-item">
                    <div className="job-icon">{job.title[0]}</div>
                    <div className="job-info">
                      <h4>{job.title}</h4>
                      <p className="company">{job.company} · {job.location}</p>
                      <div className="job-tags">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="job-match">
                      <div className="match-score">{job.match}%</div>
                      <div className="match-label">MATCH</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="right-sidebar">
              {/* Top Skills */}
              <div className="content-card">
                <div className="card-header">
                  <div className="card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <h3>Top Skills</h3>
                  </div>
                  <a href="#" className="edit-link">EDIT →</a>
                </div>

                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percent">{skill.percent}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{width: `${skill.percent}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="content-card">
                <div className="card-header">
                  <div className="card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <h3>Recent Activity</h3>
                  </div>
                </div>

                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Registration Complete</div>
                      <div className="activity-desc">Welcome to InternHub! · Just now</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon info">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Profile Created</div>
                      <div className="activity-desc">Your profile is now active · Just now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}