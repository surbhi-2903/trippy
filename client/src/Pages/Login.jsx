import { Box, TextField } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { Login } = useContext(AuthContext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("signin");
    try {
      await Login(user);
      toast.success("Directing you to home page!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  return (
    <form>
      <h1>Sign in</h1>
      <div className="social-container">
        <a className="social">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a className="social">
          <i className="fab fa-google-plus-g"></i>
        </a>
        <a className="social">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <span>or use your account</span>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          my: "10px",
        }}
      >
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Username"
          variant="standard"
          name="username"
          onChange={(e) => handleChange(e)}
          sx={{ width: "100%" }}
        />
      </Box>
      <FormControl sx={{ width: "100%", my: "10px" }} variant="standard">
        <InputLabel
          htmlFor="standard-adornment-password"
          sx={{ left: "30px", top: "-8px" }}
        >
          Password
        </InputLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            mt: "10px",
          }}
        >
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <Input
            id="standard-adornment-password"
            name="password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            sx={{ width: "100%" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ width: "50px", height: "50px" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </FormControl>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button
        variant="contained"
        onClick={handleSubmit}
        endIcon={<LoginIcon />}
        sx={{
          backgroundColor: "red",
          px: "20px",
          py: "10px",
          my: "20px",
          mt: "30px",
          borderWidth: "1px",
          ":hover": {
            bgcolor: "white",
            color: "red",
            borderWidth: "1px",
          },
        }}
      >
        Sign In
      </Button>
    </form>
  );
};
export default Login;
