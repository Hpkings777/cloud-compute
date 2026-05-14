import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { GlowText } from '../components/Glow';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  const [voltage, current, resistance] = useMemo(() => {
    const base = Math.floor(frame / 60) % 3;
    switch (base) {
      case 0: return [12, 4, 3];
      case 1: return [24, 8, 3];
      case 2: return [12, 2, 6];
      default: return [12, 4, 3];
    }
  }, [frame]);

  const barWidth = useMemo(() => (current / 8) * 200, [current]);

  return (
    <AbsoluteFill>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{ color: '#fff', fontSize: 32, marginBottom: 40, opacity: 0.7 }}>I = V / R</div>
        
        <div style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            padding: '20px 30px',
            background: 'rgba(0, 212, 255, 0.1)',
            borderRadius: 10,
            border: '1px solid #00d4ff',
          }}>
            <div style={{ color: '#00d4ff', fontSize: 18, marginBottom: 8 }}>VOLTAGE (V)</div>
            <div style={{ color: '#fff', fontSize: 36, fontWeight: 800 }}>{voltage}V</div>
          </div>
          
          <div style={{ color: '#fff', fontSize: 36 }}>÷</div>
          
          <div style={{
            padding: '20px 30px',
            background: 'rgba(255, 107, 53, 0.1)',
            borderRadius: 10,
            border: '1px solid #ff6b35',
          }}>
            <div style={{ color: '#ff6b35', fontSize: 18, marginBottom: 8 }}>RESISTANCE (R)</div>
            <div style={{ color: '#fff', fontSize: 36, fontWeight: 800 }}>Ω</div>
          </div>
          
          <div style={{ color: '#fff', fontSize: 36 }}>=</div>
          
          <div style={{
            padding: '20px 30px',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: 10,
            border: '1px solid #22c55e',
          }}>
            <div style={{ color: '#22c55e', fontSize: 18, marginBottom: 8 }}>CURRENT (I)</div>
            <div style={{ color: '#fff', fontSize: 36, fontWeight: 800 }}>{current}A</div>
          </div>
        </div>
        
        <div style={{ marginTop: 50, width: 300, height: 20, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            width: barWidth,
            height: '100%',
            background: 'linear-gradient(90deg, #00d4ff, #22c55e)',
            borderRadius: 10,
            transition: 'width 0.3s',
          }} />
        </div>
        <div style={{ color: '#666', marginTop: 10 }}>Current Flow</div>
      </div>

      <Caption
        text="More voltage increases current. More resistance reduces it."
        startFrame={2400}
        duration={600}
      />
    </AbsoluteFill>
  );
};