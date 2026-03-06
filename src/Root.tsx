import { Composition } from "remotion";
import { SystemUpdate } from "./SystemUpdate";

export const RemotionRoot = () => {
  return (
    <Composition
      id="SystemUpdate"
      component={SystemUpdate}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
