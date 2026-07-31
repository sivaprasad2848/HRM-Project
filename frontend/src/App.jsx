import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRDisplay from "./pages/QRDisplay";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRDisplay />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
