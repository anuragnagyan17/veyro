import React from "react";

const vehiclePanelOpen = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-full"
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <i class="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>
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
  );
};

export default vehiclePanelOpen;
