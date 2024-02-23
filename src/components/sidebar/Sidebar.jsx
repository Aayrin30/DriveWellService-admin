import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch} = useContext(DarkModeContext);
  const { dispatch2 } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout=(e)=>{
    e.preventDefault();
    try {
      dispatch2({type: "LOGOUT"})
      navigate("/login")
    } catch (error) {
      dispatch2({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/user" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Pannel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/company" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Company</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Rooms</span>
          </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout} >Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;