import React from "react";
import veyroLogo from "../assets/Veyro_logo.png";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          duration: 0.2,
          padding: 27,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
          duration: 0.2,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          duration: 0.2,
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
          duration: 0.2,
        });
      }
    },
    [panelOpen],
  );

  return (
    <div className="h-screen relative">
      <img
        className="w-20 absolute top-3 left-4"
        src={veyroLogo}
        alt="Veyro Logo"
      />
      <div className="">
        {/* image for temporary */}
        <img
          className="w-screen h-screen object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3deLFwVFkIMTer5GsQ1gB2PuCAe096j-qb0UXdBdJzA&s=10"
          alt=""
        />
      </div>
      <div className="absolute flex flex-col justify-end h-screen top-0 w-full ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[44%] left-[32px] bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-[#eeeeee] mt-3 px-8 py-2 rounded-lg border w-full text-base placeholder:text-base"
              type="text"
              placeholder="Pickup location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="bg-[#eeeeee] mt-3  px-8 py-2 rounded-lg border w-full text-base placeholder:text-base"
              type="text"
              placeholder="Dropoff location"
            />
            {/* <button>Find Trip</button> */}
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
