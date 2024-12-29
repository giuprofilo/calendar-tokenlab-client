import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
