import "./Register.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import HouseIcon from "@mui/icons-material/House";
import LoginIcon from "@mui/icons-material/Login";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
const Register = () => {
  //creating all dynamic variables using hooks which would re render in case of any change
  const [userInfo, setuserInfo] = useState({
    username: "",
    email: "",
    password: "",
    hometown: "",
    file: "",
  });
  const [File, setFile] = useState(null);
  //uploading the image of user using FormData()
  const upload = async () => {
    try {
      //creating object of class FormData and adding key file with the value of File in it.
      const formdata = new FormData();
      formdata.append("file", File);
      //for posting the input from the client in the backend so the backend can write logic and extract the user file name from it.
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formdata
      );
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };
  //updating userinfor whenever handlchange is called with the targets name and its value all the values except file are updated using this function
  const handleChange = (e) => {
    setuserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //when submitted first the file of user is updated and then the notification is showed by doing reload then the same page will be rendered to login for the user.
  const handleSubmit = async (e) => {
    e.preventDefault();
    //upload function will post the file input to the backend and return the image name only.
    const imgUrl = await upload();
    // setuserInfo((prev) => ({ ...prev, file: imgUrl }));
    userInfo.file = imgUrl;
    // console.log(userInfo.file);
    console.log(userInfo);
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        userInfo
      );
      console.log(res.data);
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(function () {
        window.location.reload();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form>
      <h1>Create Account</h1>
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
      <span>or use your email for registration</span>
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
          name="username"
          variant="standard"
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          my: "10px",
          mt: "0px",
        }}
      >
        <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Email"
          name="email"
          onChange={handleChange}
          variant="standard"
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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          mb: "30px",
        }}
      >
        <HouseIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="HomeTown"
          name="hometown"
          onChange={handleChange}
          variant="standard"
          sx={{ width: "100%" }}
        />
      </Box>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        name="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />
      <Button
        component="label"
        variant="contained"
        htmlFor="file"
        name="file"
        startIcon={<FileUploadIcon />}
      >
        Upload Profile Image
      </Button>

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
        Sign Up
      </Button>
    </form>
  );
};
export default Register;
