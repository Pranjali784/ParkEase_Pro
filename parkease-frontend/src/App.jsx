import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./routes/Landing";
import Services from "./routes/Services";
import Signin from "./routes/Signin";
import AddPark from "./routes/AddPark";
import Register from "./routes/Register";
import Profile from "./routes/Profile";

export default function App() {
  return (
    <Router>
      {/* --- MODIFIED: Added h-screen to fill the viewport height --- */}
      <div className="min-h-screen h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/add-park"
            element={
              <ProtectedRoute>
                <AddPark />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}