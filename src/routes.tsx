import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes";
import Login from "./pages/login";
import {AdminDashboard} from "./pages/admin";
import UserDashboard from "./pages/user";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          {/*<Route path="/dashboard" element={<Dashboard/>}>*/}
            <Route path="/dashboard/admin" element={<AdminDashboard/>}/>
            <Route path="/dashboard/user/:id" element={<UserDashboard/>}/>
          {/*</Route>*/}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
