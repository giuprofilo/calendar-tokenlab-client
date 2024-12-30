import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          {/* rotas nao protegidas */}
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* rotas protegidas */}
          <Route
            path="/calendar"
            element={<ProtectRoute Component={CalendarPage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
