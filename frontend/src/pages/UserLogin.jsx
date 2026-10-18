import React from "react";
import veyroLogo from "../assets/Veyro_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-5 flex flex-col h-screen justify-between">
      <div>
        <img className="w-20  mt-3 ml-7" src={veyroLogo} alt="Veyro Logo" />
        <form className="p-5" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg text-black font-medium mb-2">
            What's your email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg text-black font-medium mb-2">
            Enter Password
          </h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?
          <Link to={"/signup"} className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div className="p-7">
        <Link
          to={"/captain-login"}
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 px-4 py-2 rounded border w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
