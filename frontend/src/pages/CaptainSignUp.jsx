import React, { useState } from "react";
import { Link } from "react-router-dom";
import veyrocaptainlogo from "../assets/Veyro_captain_logo.png";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="p-5 flex flex-col h-screen justify-between">
      <div>
        <img
          className="w-20 mt-3 ml-7"
          src={veyrocaptainlogo}
          alt="Veyro Logo"
        />
        <form className="p-5" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base text-black font-medium mb-2">
            Captain's name
          </h3>
          <div className="flex gap-4 mb-5 ">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  px-4 py-2 rounded border w-1/2 text-base placeholder:text-base"
              type="text"
              placeholder="Firstname"
            />

            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee]  px-4 py-2 rounded border w-1/2 text-base placeholder:text-base"
              type="text"
              placeholder="Lastname"
            />
          </div>
          <h3 className="text-base text-black font-medium mb-2">
            Captain's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 px-4 py-2 rounded border w-full text-base placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base text-black font-medium mb-2">
            Enter Password
          </h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 px-4 py-2 rounded border w-full text-base placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mt-2 mb-5 px-4 py-2 rounded border w-full text-base placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/captain-login"} className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="pl-7 text-[10px] leading-tight">
        <p>
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline cursor-pointer">Google Privacy</span> and{" "}
          <span className="underline cursor-pointer">Terms of Service</span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
