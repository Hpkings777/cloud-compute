import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const morphProgress = useMemo(() => Math.min(1, (frame - 1200) / 60), [frame]);

  return (
    <AbsoluteFill>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
      }}>
        <div style={{ color: '#fff', fontSize: 28, opacity: 0.7 }}>WIDE PIPE → NARROW PIPE</div>
        
        <svg width="600" height="300" viewBox="0 0 600 300">
          <defs>
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          <path d="M 0 100 Q 150 100 200 120 L 400 120 Q 450 100 600 100 L 600 200 Q 450 200 400 180 L 200 180 Q 150 200 0 200 Z" fill="url(#pipeGrad)" stroke="#00d4ff" strokeWidth="2" opacity={1 - morphProgress} />
          
          <rect x="150" y="80" width="100" height="140" rx="5" fill="none" stroke="#00d4ff" strokeWidth="3" opacity={morphProgress} />
          <rect x="350" y="100" width="100" height="100" rx="5" fill="none" stroke="#00d4ff" strokeWidth="3" opacity={morphProgress} />
          
          {[...Array(12)].map((_, i) => {
            const basePos = (frame * 2 + i * 30) % 400;
            const slowZone = basePos > 200 && basePos < 300;
            const speed = slowZone ? 0.3 : 1;
            const y = slowZone ? 140 : 130;
            
            return (
              <circle
                key={i}
                cx={100 + basePos}
                cy={y}
                r="6"
                fill="#00d4ff"
                opacity={morphProgress}
                style={{
                  filter: `blur(${slowZone ? 3 : 1}px)`,
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
          
          <text x="200" y="50" textAnchor="middle" fill="#fff" fontSize="16" opacity={morphProgress}>Easy Flow</text>
          <text x="400" y="50" textAnchor="middle" fill="#ff6b35" fontSize="16" opacity={morphProgress}>Restricted!</text>
        </svg>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '15px 30px',
          background: 'rgba(0, 212, 255, 0.1)',
          borderRadius: 10,
          border: '1px solid #00d4ff',
          opacity: morphProgress,
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect x="5" y="5" width="30" height="30" fill="#333" stroke="#00d4ff" strokeWidth="2" />
            <rect x="10" y="10" width="20" height="8" fill="#00d4ff" opacity="0.5" />
            <rect x="10" y="22" width="20" height="8" fill="#00d4ff" opacity="0.5" />
          </svg>
          <span style={{ color: '#fff', fontSize: 20 }}>Resistor</span>
        </div>
      </div>

      <Caption
        text="Resistance opposes the flow of current."
        startFrame={1200}
        duration={600}
      />
    </AbsoluteFill>
  );
};