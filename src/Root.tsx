import { Composition } from "remotion";
import { DefaultExe } from "./compositions/DefaultExe";

export const RemotionRoot = () => {
  return (
    <Composition
      id="DefaultExe"
      component={DefaultExe}
      durationInFrames={5400}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
