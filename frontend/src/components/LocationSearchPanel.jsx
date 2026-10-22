import React from "react";

const LocationSearchPanel = (props) => {
  console;

  let locationsData = [
    "24B, Near kapoor's cafe,MG Road, New Delhi",
    "20D, Near Sharma's cafe,MG Road, New Delhi",
    "34F, Near Verma's cafe,MG Road, New Delhi",
    "44B, Near gupta's cafe,MG Road, New Delhi",
    "54A, Near verma's cafe,MG Road, New Delhi",
  ];

  return (
    <div>
      {locationsData.map(function (elem, idx) {
        return (
          <div
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanalOpen(false);
            }}
            key={idx}
            className="flex item-center justify-start my-2 border-2 border-gray-50 active:border-black p-2 rounded-xl  gap-4"
          >
            <h3 className="bg-[#eeeeee] h-11 w-14 flex justify-center items-center rounded-full">
              <i className="ri-map-pin-fill text-2xl"></i>
            </h3>
            <h4 className="text-lg font-medium text-black">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
