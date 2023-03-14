import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-between items-center w-full sm:px-16 px-6 py-6 bg-primary text-first text-[20px]">
      <Link to="/">Home</Link>
      <Link to="/auth">Register/Login</Link>
      <Link to="/create">Create</Link>
      <Link to="/save">Save</Link>
    </div>
  );
};

export default Navbar;
