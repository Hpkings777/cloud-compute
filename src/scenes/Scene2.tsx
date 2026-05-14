import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { Caption } from '../components/Caption';
import { Formula } from '../components/Formula';
import { Glow } from '../components/Glow';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const vHighlight = useMemo(() => {
    return frame >= 330 && frame < 420;
  }, [frame]);

  const iHighlight = useMemo(() => {
    return frame >= 420 && frame < 510;
  }, [frame]);

  const rHighlight = useMemo(() => {
    return frame >= 510;
  }, [frame]);

  return (
    <AbsoluteFill>
      <Background grid particles />
      
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Glow x={0} y={0} color="#00d4ff" intensity={0.5} size={300} pulse />
        
        <Formula
          formula="V = I × R"
          startFrame={300}
          duration={600}
          variableLabels={{
            'V': 'VOLTAGE',
            'I': 'CURRENT',
            'R': 'RESISTANCE',
          }}
          highlightVariable={
            vHighlight ? 'V' : iHighlight ? 'I' : rHighlight ? 'R' : undefined
          }
        />
      </div>

      {vHighlight && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00d4ff',
          fontSize: 24,
          fontWeight: 600,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, opacity: 0.7 }}>Electrical Pressure</div>
          <div style={{ fontSize: 28 }}>Voltage (V)</div>
        </div>
      )}

      {iHighlight && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00d4ff',
          fontSize: 24,
          fontWeight: 600,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, opacity: 0.7 }}>Flow of Electrons</div>
          <div style={{ fontSize: 28 }}>Current (I)</div>
        </div>
      )}

      {rHighlight && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00d4ff',
          fontSize: 24,
          fontWeight: 600,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, opacity: 0.7 }}>Opposition to Flow</div>
          <div style={{ fontSize: 28 }}>Resistance (R)</div>
        </div>
      )}

      <Caption
        text="Ohm's Law connects voltage, current, and resistance."
        startFrame={330}
        duration={570}
      />
    </AbsoluteFill>
  );
};