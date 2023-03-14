import React from "react";

const Auth = () => {
  return (
    <div className="sm:px-16 px-6 sm:py-16 py-6 flex justify-center text-first bg-secondary h-screen">
      <div className="xl:max-w-[1280px] w-full bg-primary flex md:flex-row flex-col sm:px-16 px-6 sm:py-16 py-6">
        <Login />
        <Register />
      </div>
    </div>
  );
};

const Login = () => {
  return <div className="">Login</div>;
};

const Register = () => {
  return (
    <div>
      <form action="">
        <h2>Register</h2>
      </form>
    </div>
  );
};

export default Auth;
