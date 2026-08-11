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

        {/* Login - first page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Registration */}
        <Route path="/register" element={<Registration />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Profile */}
        <Route path="/profile" element={<StudentProfile />} />

        {/* QR Display */}
        <Route path="/qr" element={<QRDisplay />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;