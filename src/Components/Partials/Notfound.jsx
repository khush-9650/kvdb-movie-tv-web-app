import React from "react";
import error from "/404.gif";
function Loader() {
  return (
    <div className="w-screen  text-zinc-500 flex-col bg-black h-screen flex items-center justify-center">
      <img className=" h-[40%]" src={error} alt="" />
    </div>
  );
}

export default Loader;
