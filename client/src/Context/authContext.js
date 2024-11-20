import { createContext, useEffect, useState, useNavigate } from "react";
import axios from "axios";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const Login = async (user) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", user);
    setCurrentUser(res.data);
  };
  const Logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
