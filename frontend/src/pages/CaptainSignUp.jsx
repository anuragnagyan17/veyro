import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import veyrocaptainlogo from "../assets/Veyro_captain_logo.png";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData,
      );
      if (res.status === 201) {
        const data = res.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(captainData);

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="py-5 px-5 flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src={veyrocaptainlogo} alt="Veyro Logo" />
        <form onSubmit={(e) => submitHandler(e)}>
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

          <h3 className="text-base text-black font-medium mb-2">
            Vehicle Information
          </h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
            />
          </div>

          <div className="flex gap-4 mb-5">
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-base"
              type="number"
              min="1"
              placeholder="Vehicle Capacity"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base text-gray-700"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="Car">Car</option>
              <option value="auto">Auto</option>
              <option value="Bike">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mt-2 mb-5 px-4 py-2 rounded border w-full text-base placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/captain-login"} className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="p-5 text-[10px] leading-tight">
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
