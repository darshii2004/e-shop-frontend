import React from "react";

const NoDataFound = ({ message }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="">
        <img src="notfound.png" />
        <div className="flex text-4xl mt-10 font-semibold text-blue-600 justify-center">
          {" "}
          {message}
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
