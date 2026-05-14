import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { Glow } from '../components/Glow';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  const smallBattery = useMemo(() => ({
    glow: 0.3 + 0.2 * Math.sin(frame * 0.05),
    electrons: 0.5 + 0.3 * Math.sin(frame * 0.03),
  }), [frame]);

  const largeBattery = useMemo(() => ({
    glow: 0.8 + 0.2 * Math.sin(frame * 0.07),
    electrons: 1.5 + 0.3 * Math.sin(frame * 0.05),
  }), [frame]);

  return (
    <AbsoluteFill>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: 80,
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <Glow x={60} y={80} color="#00d4ff" intensity={smallBattery.glow} size={80} />
          <svg width="120" height="160" viewBox="0 0 120 160">
            <rect x="30" y="40" width="60" height="100" rx="8" fill="#0d1225" stroke="#666" strokeWidth="2" />
            <rect x="40" y="60" width="40" height="20" fill="#333" />
            <rect x="50" y="20" width="20" height="20" fill="#666" />
            <text x="60" y="100" textAnchor="middle" fill="#666" fontSize="24" fontWeight="bold">9V</text>
          </svg>
          <div style={{ marginTop: 20, width: 80, height: 80, borderRadius: '50%', background: '#0d1225', border: '3px solid #333', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#00d4ff',
              opacity: smallBattery.glow,
              boxShadow: `0 0 ${20 * smallBattery.glow}px #00d4ff`,
            }} />
          </div>
        </div>

        <div style={{ fontSize: 40, color: '#fff', fontWeight: 800 }}>VS</div>

        <div style={{ textAlign: 'center' }}>
          <Glow x={60} y={80} color="#00d4ff" intensity={largeBattery.glow * 2} size={120} pulse />
          <svg width="120" height="160" viewBox="0 0 120 160">
            <rect x="20" y="40" width="80" height="100" rx="8" fill="#0d1225" stroke="#00d4ff" strokeWidth="3" />
            <rect x="30" y="60" width="60" height="20" fill="#00d4ff" opacity="0.5" />
            <rect x="40" y="20" width="20" height="20" fill="#fff" />
            <rect x="20" y="10" width="20" height="15" fill="#fff" />
            <text x="60" y="100" textAnchor="middle" fill="#00d4ff" fontSize="24" fontWeight="bold">24V</text>
          </svg>
          <div style={{ marginTop: 20, width: 80, height: 80, borderRadius: '50%', background: '#0d1225', border: '3px solid #00d4ff', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#00d4ff',
              opacity: largeBattery.glow,
              boxShadow: `0 0 ${30 * largeBattery.glow}px #00d4ff`,
            }} />
          </div>
        </div>
      </div>

      <Caption
        text="Increasing voltage increases current when resistance stays constant."
        startFrame={1800}
        duration={600}
      />
    </AbsoluteFill>
  );
};