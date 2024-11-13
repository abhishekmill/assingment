import {
  Autofocus,
  Bloom,
  EffectComposer,
  Sepia,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, RenderPass } from "postprocessing";
import React from "react";

const Effects = () => {
  return (
    <EffectComposer>
      <Vignette darkness={[0.5]} />
      {/* <Sepia blendFunction={BlendFunction.HUE} intensity={.2} /> */}
    </EffectComposer>
  );
};

export default Effects;
