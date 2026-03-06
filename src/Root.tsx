import { Composition } from "remotion";
import { IntroScene } from "./IntroScene";

export const RemotionRoot = () => {
  return (
    <Composition
      id="CinematicIntro"
      component={IntroScene}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
