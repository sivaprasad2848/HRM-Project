import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRDisplay from "./pages/QRDisplay";
import RegistrationQR from "./pages/RegistrationQR";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRDisplay />} />
        <Route path="/register" element={<RegistrationQR />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
