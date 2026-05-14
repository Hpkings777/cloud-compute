import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { Scene1 } from '../scenes/Scene1';
import { Scene2 } from '../scenes/Scene2';
import { Scene3 } from '../scenes/Scene3';
import { Scene4 } from '../scenes/Scene4';
import { Scene5 } from '../scenes/Scene5';
import { Scene6 } from '../scenes/Scene6';
import { Scene7 } from '../scenes/Scene7';

const DURATION = 3600;

export const OhmsLawAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  const transitionOpacity = (start: number, end: number) => {
    return interpolate(frame, [start, start + 30, end - 30, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  };

  return (
    <AbsoluteFill style={{ background: '#0a0e1a' }}>
      <Sequence from={0} duration={300}>
        <div style={{ opacity: transitionOpacity(0, 300) }}>
          <Scene1 />
        </div>
      </Sequence>
      
      <Sequence from={300} duration={900}>
        <div style={{ opacity: transitionOpacity(300, 1200) }}>
          <Scene2 />
        </div>
      </Sequence>
      
      <Sequence from={1200} duration={450}>
        <div style={{ opacity: transitionOpacity(1200, 1650) }}>
          <Scene3 />
        </div>
      </Sequence>
      
      <Sequence from={1650} duration={600}>
        <div style={{ opacity: transitionOpacity(1650, 2250) }}>
          <Scene4 />
        </div>
      </Sequence>
      
      <Sequence from={2250} duration={600}>
        <div style={{ opacity: transitionOpacity(2250, 2850) }}>
          <Scene5 />
        </div>
      </Sequence>
      
      <Sequence from={2850} duration={600}>
        <div style={{ opacity: transitionOpacity(2850, 3450) }}>
          <Scene6 />
        </div>
      </Sequence>
      
      <Sequence from={3450} duration={150}>
        <div style={{ opacity: transitionOpacity(3450, 3600) }}>
          <Scene7 />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export const composition = {
  id: 'OhmsLaw',
  durationInFrames: DURATION,
  fps: 30,
  width: 1920,
  height: 1080,
  component: OhmsLawAnimation,
};

export default composition;