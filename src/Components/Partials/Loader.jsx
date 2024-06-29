import React from "react";
import loader from "/loader.gif";
function Loader() {
  return (
    <div className="w-screen text-zinc-500 flex-col bg-black h-screen flex items-center justify-center">
      <img className=" h-[60%]" src={loader} alt="" />
      <h1 className="text-6xl font-bold p-[2%]">Loading...</h1>
    </div>
  );
}

export default Loader;
