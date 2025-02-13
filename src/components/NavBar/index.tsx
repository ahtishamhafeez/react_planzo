import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard/admin">Admin Dashboard</Link></li>
        <li><Link to="/dashboard/user">User Dashboard</Link></li>
      </ul>
    </nav>
  );
};

