import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="sm:px-16 px-6 sm:py-16 py-6 flex justify-center text-first bg-secondary lg:h-screen h-max">
      <div className="xl:max-w-[1280px] w-full flex xl:flex-row flex-col sm:px-16 px-6 sm:py-16 py-6 gap-10">
        <Login />
        <Register />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cookies,setCookies] = useCookies(["acess_token"]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      setCookies("acess_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      // window.location.pathname = "/"
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username,
        password,
      });

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="flex-1 bg-primary md:px-20 px-6 py-20 rounded-[20px] h-max">
      <form onSubmit={onSubmit}>
        <h2 className="sm:text-[60px] text-[30px] font-semibold">{label}</h2>
        <div className="mt-5">
          <label htmlFor="username" className="mb-4 block">
            {" "}
            Username:{" "}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="rounded-lg border-none outline-none placeholder:text-second bg-secondary py-4 px-6 w-full"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="username" className="mb-4 block">
            {" "}
            Password:{" "}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="rounded-lg border-none outline-none placeholder:text-second bg-secondary py-4 px-6 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-second hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 justify-end flex"
        >
          {label}
        </button>
      </form>
    </div>
  );
};

export default Auth;
