import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { Glow } from '../components/Glow';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const slowFlow = useMemo(() => ({
    progress: (frame * 0.3) % 1,
    opacity: 0.3 + 0.2 * Math.sin(frame * 0.05),
  }), [frame]);

  const fastFlow = useMemo(() => ({
    progress: (frame * 1.2) % 1,
    opacity: 0.8 + 0.2 * Math.sin(frame * 0.08),
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
        gap: 100,
        width: '100%',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 24, marginBottom: 20, opacity: 0.7 }}>SLOW CURRENT</div>
          <svg width="300" height="200" viewBox="0 0 300 200">
            <rect x="50" y="50" width="200" height="100" rx="10" fill="none" stroke="#00d4ff" strokeWidth="3" opacity="0.5" />
            {[...Array(5)].map((_, i) => (
              <circle key={i} cx={80 + i * 35 + slowFlow.progress * 100} cy="100" r="8" fill="#00d4ff" opacity={slowFlow.opacity * (0.5 + 0.5 * Math.sin(i))} />
            ))}
          </svg>
          <div style={{ marginTop: 20, width: 100, height: 10, background: '#333', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: '#00d4ff', opacity: 0.5 }} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 24, marginBottom: 20, opacity: 0.7 }}>FAST CURRENT</div>
          <svg width="300" height="200" viewBox="0 0 300 200">
            <rect x="50" y="50" width="200" height="100" rx="10" fill="none" stroke="#00d4ff" strokeWidth="3" opacity="0.5" />
            {[...Array(15)].map((_, i) => (
              <circle key={i} cx={80 + (i * 20 + fastFlow.progress * 150) % 180} cy="100" r="8" fill="#00d4ff" opacity={fastFlow.opacity} style={{ filter: 'blur(1px)' }} />
            ))}
          </svg>
          <div style={{ marginTop: 20, width: 100, height: 10, background: '#333', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', background: '#00d4ff' }} />
          </div>
        </div>
      </div>

      <Caption
        text="Current is the flow of electric charge through a conductor."
        startFrame={750}
        duration={450}
      />
    </AbsoluteFill>
  );
};