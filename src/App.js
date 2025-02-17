import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import HomeCenter from "./pages/Home/HomeCenter";
import Attendance from "./pages/Attendance/Attendance";
import Schedule from "./pages/Schedule/Schedule";
import Students from "./pages/Students/Students";
import Database from "./pages/Database/Database";
import Settings from "./pages/Settings/Settings";
import Payments from "./pages/Payments/Payments";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";

import CustomNavbar from "./components/Navbar/CustomNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CustomNavbar></CustomNavbar>
          <Routes>
            <Route  index path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route defaultActiveKey="/home" path="/home" element={<Home />} />
              <Route defaultActiveKey="/homeforcenter" path="/homeforcenter" element={<HomeCenter />} />
            </Route>
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/students" element={<Students />} />
            <Route path="/database" element={<Database />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
//<button onClick={() => auth.logOut()} className="btn-submit">
//logout
//</button>