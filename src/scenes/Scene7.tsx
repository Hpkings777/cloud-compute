import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { GlowText } from '../components/Glow';
import { Circuit } from '../components/ElectronFlow';

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = useMemo(() => Math.min(1, (frame - 3000) / 60), [frame]);
  const fadeOut = useMemo(() => Math.max(0, 1 - (frame - 3300) / 60), [frame]);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity,
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <GlowText text="V = I × R" fontSize={56} fontWeight={800} />
        </div>
        
        <Circuit
          electronSpeed={1.5}
          electronCount={40}
          bulbBrightness={0.9}
          showBattery
        />
        
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 40,
          fontSize: 18,
          color: '#666',
        }}>
          <span><span style={{ color: '#00d4ff' }}>V</span> = Voltage</span>
          <span><span style={{ color: '#00d4ff' }}>I</span> = Current</span>
          <span><span style={{ color: '#00d4ff' }}>R</span> = Resistance</span>
        </div>
      </div>

      <Caption
        text="Ohm's Law is the foundation of electrical circuits."
        startFrame={3000}
        duration={400}
      />
    </AbsoluteFill>
  );
};