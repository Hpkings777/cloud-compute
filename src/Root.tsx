import { Composition } from "remotion";
import { DefaultExe } from "./compositions/DefaultExe";
import { OhmsLawAnimation } from "./OhmsLaw";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DefaultExe"
        component={DefaultExe}
        durationInFrames={5400}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="OhmsLaw"
        component={OhmsLawAnimation}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};