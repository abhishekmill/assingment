import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { RenderPass } from "postprocessing";
import React from "react";

const Effects = () => {
  return (
    <EffectComposer>
      <Bloom intensity={0.1} />
    </EffectComposer>
  );
};

export default Effects;
