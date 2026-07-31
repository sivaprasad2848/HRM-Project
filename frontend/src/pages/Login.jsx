import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "../assets/cybersqaure.png";

export default function Login() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try{

            const response = await fetch("http://localhost:8000/api/login/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            });

            const result = await response.json();

            if(response.ok){

                localStorage.setItem("access",result.access);
                localStorage.setItem("refresh",result.refresh);

                alert("Login Successful");

                navigate("/dashboard");

            }else{

                setMessage(result.detail || "Invalid Email or Password");

            }

        }catch(err){

            setMessage("Server Error");

        }finally{

            setLoading(false);

        }

    }

    return(

        <div className="login-page">

            <div className="login-card">

                <img src={logo} className="login-logo" alt="" />

                <h1>Student Login</h1>

                <p>Login to continue</p>

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />

                    <label>Password</label>

                    <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />

                    {message &&

                        <div className="error">

                            {message}

                        </div>

                    }

                    <button disabled={loading}>

                        {loading ? "Logging..." : "Login"}

                    </button>

                </form>

                <div className="bottom">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}