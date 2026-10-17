import React from "react";
import veyroLogo from "../assets/Veyro_logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img className="w-20 ml-8 " src={veyroLogo} alt="Veyro Logo" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold text-black">
            Get started with Veyro
          </h2>
          <Link
            to={"/login"}
            className="flex items-center justify-center bg-black text-white py-3 rounded mt-5 w-full"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
