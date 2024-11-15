import React, { useEffect, useState } from "react";
import Scene from "./Scene";
import TerrainMap from "./assets/Mapbox";
import Preloader from "./assets/Preloader";

const App = () => {
  return (
    <div>
      <div className="w-[100vw] pointer-events-none h-screen fixed z-30   bg-black md:hidden flex text-white justify-center items-center  ">
        <h1 className="text-xl text-center capitalize">
          please use a Pc/Laptop
          <br />
          <a
            href="https://github.com/abhishekmill"
            className="text-blue-600 text-[12px] "
          >
            github.com/abhishekmill
          </a>
        </h1>
      </div>

      <Preloader />
      <Scene />

      {/* <TerrainMap /> */}
    </div>
  );
};

export default App;
