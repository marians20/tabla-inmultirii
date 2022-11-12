import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const LoginLogout = (props) => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginClickHandler = () => {
    navigate("/static/login");
  }

  const logoutClickHandler = () => {
    navigate("/static/login");
  }

  const loginContent = (
    <IconButton
      color="inherit"
      aria-label="login"
      onClick={loginClickHandler}
    >
      <PersonIcon />
    </IconButton>
  );

  const logoutContent = (
    <IconButton
      color="inherit"
      aria-label="logout"
      onClick={logoutClickHandler}
    >
      <LogoutIcon />
    </IconButton>
  );

  return <>{isAuthenticated ? logoutContent : loginContent}</>;
};

export default LoginLogout;
