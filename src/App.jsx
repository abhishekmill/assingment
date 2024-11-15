import React, { useEffect, useState } from "react";
import Scene from "./Scene";
import TerrainMap from "./assets/Mapbox";
import Preloader from "./assets/Preloader";

const App = () => {


  return (
    <div>
      <Preloader/>
      <Scene />

      {/* <TerrainMap /> */}
    </div>
  );
};

export default App;
