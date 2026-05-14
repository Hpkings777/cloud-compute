import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { Circuit } from '../components/ElectronFlow';
import { Glow } from '../components/Glow';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const brightness = useMemo(() => {
    const progress = Math.max(0, Math.min(1, frame / 150));
    return 0.1 + 0.7 * progress;
  }, [frame]);

  const scale = useMemo(() => {
    const progress = Math.max(0, Math.min(1, frame / 200));
    return 1 + 0.3 * progress;
  }, [frame]);

  return (
    <AbsoluteFill>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 800,
        height: 600,
      }}>
        <Glow x={400} y={300} color="#00d4ff" intensity={brightness} size={200} pulse />
        
        <Circuit
          electronSpeed={0.5 + brightness * 0.5}
          electronCount={20 + Math.floor(brightness * 20)}
          bulbBrightness={brightness}
          showBattery
        />
      </div>

      <Caption
        text="How does electricity actually flow through a circuit?"
        startFrame={90}
        duration={210}
      />
    </AbsoluteFill>
  );
};