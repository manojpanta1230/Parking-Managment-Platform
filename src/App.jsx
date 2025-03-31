import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParkingLots from "./pages/ParkingLots";
import AdminDashboard from "./pages/AdminDashboard";

import { useEffect } from "react";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/Contactus";

// Wrapper component to conditionally show header/footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutOnRoutes = ["/dashboard"]; // add more paths if needed

  const hideLayout = hideLayoutOnRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: { style: { background: "#059669" } },
          error: { style: { background: "#DC2626" } },
        }}
      />

      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/parking-lots" element={<ParkingLots />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
