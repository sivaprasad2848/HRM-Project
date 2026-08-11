import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/candidates/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("access", result.access);
                localStorage.setItem("refresh", result.refresh);

                alert("Login Successful");
                navigate("/dashboard");
            } else {
                setMessage(
                    result.detail || "Invalid email or password"
                );
            }
        } catch (err) {
            console.error(err);
            setMessage(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* LEFT BRAND SECTION */}
            <section className="login-left">

                <div className="grid-background"></div>

                <div className="brand-logo">
                    <div className="brand-icon">IH</div>
                    <span>InternHub</span>
                </div>

                <div className="hero-content">

                    <div className="eyebrow">
                        <span></span>
                        AI-POWERED PLATFORM
                    </div>

                    <h1>
                        Land your
                        <br />
                        <span>dream internship.</span>
                    </h1>

                    <p>
                        Upload your CV once. Our AI matches you with the
                        right internships, tracks your applications, and
                        keeps you ahead of deadlines.
                    </p>

                    <div className="stats">

                        <div className="stat">
                            <strong>2,400+</strong>
                            <span>Active Listings</span>
                        </div>

                        <div className="stat">
                            <strong>94%</strong>
                            <span>Match Accuracy</span>
                        </div>

                        <div className="stat">
                            <strong>12k+</strong>
                            <span>Students Placed</span>
                        </div>

                    </div>

                </div>

                <div className="circle circle-one"></div>
                <div className="circle circle-two"></div>

                <div className="left-footer">
                    © 2026 InternHub · Privacy · Terms
                </div>

            </section>

            {/* RIGHT LOGIN SECTION */}
            <section className="login-right">

                <div className="signup-top">
                    No account?
                    <Link to="/register">Sign up</Link>
                </div>

                <div className="login-container">

                    <div className="welcome">
                        WELCOME BACK
                    </div>

                    <h2>
                        Sign in to
                        <br />
                        InternHub
                    </h2>

                    <p className="subtitle">
                        Continue where you left off.
                    </p>

                    {/* GOOGLE */}
                    <button
                        type="button"
                        className="google-btn"
                    >
                        <span className="google-icon">G</span>
                        Continue with Google
                    </button>

                    {/* DIVIDER */}
                    <div className="divider">
                        <span></span>
                        <p>OR LOGIN WITH EMAIL</p>
                        <span></span>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="field">

                            <label>EMAIL ADDRESS</label>

                            <input
                                type="email"
                                placeholder="you@university.edu"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="field">

                            <div className="password-label">

                                <label>PASSWORD</label>

                                <button
                                    type="button"
                                    className="forgot-btn"
                                    onClick={() =>
                                        navigate("/forgot-password")
                                    }
                                >
                                    Forgot password? →
                                </button>

                            </div>

                            <div className="password-input">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "◉" : "◌"}
                                </button>

                            </div>

                        </div>

                        <label className="remember">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />

                            <span>
                                Remember me for 30 days
                            </span>

                        </label>

                        {message && (
                            <div className="error">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in  →"}
                        </button>

                    </form>

                    <div className="create-account">
                        New to InternHub?
                        <Link to="/register">
                            Create an account
                        </Link>
                    </div>

                    <div className="terms">
                        By signing in you agree to our
                        <a href="#"> Terms of Service</a>
                        {" "}and
                        <a href="#"> Privacy Policy</a>.
                    </div>

                </div>

            </section>

        </div>
    );
}