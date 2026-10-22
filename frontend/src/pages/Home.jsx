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
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

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

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
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
          <LocationSearchPanel
            setPanalOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-8 translate-y-full bg-white"
      >
        <h3 className="font-semibold mb-5 text-2xl">Choose a vehicle</h3>
        <div className="flex p-3 border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=851/height=638/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYTlmZTg3My0xZjE2LTRjODktYmE0MS0yNzEyMjExMzgwYTkucG5n"
            alt=""
          />
          <div className="ml-2 w-1/">
            <h4 className="font=medium text-base">
              VeyroGO{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font=semibold text-base">2 mins away</h5>
            <p className="font=normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">$193</h2>
        </div>
        <div className=" flex p-3 border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lMDAwNzljZS0yMjYzLTQ2ODMtYmM3OC1iOWUyOGZlYzM1M2QucG5n"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font=medium text-base">
              SedanGO{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font=semibold text-base">5 mins away</h5>
            <p className="font=normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">$250</h2>
        </div>
        <div className="flex p-3 border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font=medium text-base">
              MotoGO{" "}
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font=semibold text-base">15 mins away</h5>
            <p className="font=normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-xl font-base">$115</h2>
        </div>
        <div className="flex p-3 border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=0/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy80ZTcxOGQ1Yy1lNDMxLTU5YzUtYWNiNS1hYzQwYzI2YzI0ZGYud2VicA=="
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font=medium text-base">
              AutoGO{" "}
              <span>
                <i className="ri-user-3-fill"></i>2
              </span>
            </h4>
            <h5 className="font=semibold text-base">10 mins away</h5>
            <p className="font=normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-xl font-base">$80</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
