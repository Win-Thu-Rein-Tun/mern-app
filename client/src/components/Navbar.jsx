import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="flex flex-row justify-between items-center w-full sm:px-16 px-6 py-6 bg-primary text-first text-[20px]">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/save">Save</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login</Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
