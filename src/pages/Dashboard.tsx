import {NavBar} from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* This will load Admin or User Dashboard */}
    </div>
  );
};

export default Dashboard;
