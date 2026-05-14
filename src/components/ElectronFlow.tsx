import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { AbsoluteFill } from 'remotion';
import { theme } from '../utils/theme';

interface ElectronFlowProps {
  path: string;
  speed?: number;
  count?: number;
  color?: string;
  startFrame?: number;
  intensity?: number;
}

export const ElectronFlow: React.FC<ElectronFlowProps> = ({
  path,
  speed = 1,
  count = 20,
  color = theme.colors.cyan,
  startFrame = 0,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  const electrons = useMemo(() => {
    const positions: { x: number; y: number; delay: number }[] = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: 0,
        y: 0,
        delay: i / count,
      });
    }
    return positions;
  }, [count]);

  const getPositionOnPath = (progress: number, pathData: string): { x: number; y: number } => {
    const parts = pathData.match(/[MLQCZ]/gi) || [];
    const numbers = pathData.match(/-?\d+\.?\d*/g)?.map(Number) || [];
    
    let x = 0, y = 0;
    let numIndex = 0;
    
    const totalLength = 800;
    const targetDistance = progress * totalLength;
    
    let currentDistance = 0;
    let px = 0, py = 0;
    
    for (let i = 0; i < parts.length && currentDistance < targetDistance; i++) {
      const cmd = parts[i].toUpperCase();
      const numCount = cmd === 'M' || cmd === 'L' ? 2 : cmd === 'C' ? 6 : cmd === 'Q' ? 4 : 0;
      
      if (numCount > 0) {
        const points = [];
        for (let j = 0; j < numCount; j += 2) {
          if (numIndex + j < numbers.length) {
            points.push({ x: numbers[numIndex + j], y: numbers[numIndex + j + 1] });
          }
        }
        
        if (points.length >= 2) {
          for (let p = 0; p < points.length - 1; p++) {
            const dx = points[p + 1].x - points[p].x;
            const dy = points[p + 1].y - points[p].y;
            const segLength = Math.sqrt(dx * dx + dy * dy);
            
            if (currentDistance + segLength >= targetDistance) {
              const t = (targetDistance - currentDistance) / segLength;
              return { x: points[p].x + dx * t, y: points[p].y + dy * t };
            }
            currentDistance += segLength;
          }
        }
        numIndex += numCount;
      }
    }
    
    return { x: px + 400, y: py + 300 };
  };

  const renderElectrons = () => {
    const adjustedFrame = Math.max(0, frame - startFrame);
    const baseProgress = (adjustedFrame * 0.01 * speed) % 1;

    return electrons.map((electron, i) => {
      const progress = (baseProgress + electron.delay) % 1;
      const pos = getPositionOnPath(progress, path);
      const glowIntensity = 0.5 + 0.5 * Math.sin(adjustedFrame * 0.1 + i);

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: 8 * intensity,
            height: 8 * intensity,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 ${10 * glowIntensity}px ${color}, 0 0 ${20 * glowIntensity}px ${color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    });
  };

  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{renderElectrons()}</AbsoluteFill>;
};

interface CircuitProps {
  wirePath?: string;
  electronSpeed?: number;
  electronCount?: number;
  bulbBrightness?: number;
  showBattery?: boolean;
  batterySize?: number;
}

export const Circuit: React.FC<CircuitProps> = ({
  wirePath = 'M 100 300 L 100 200 Q 100 100 200 100 L 600 100 Q 700 100 700 200 L 700 400 Q 700 500 600 500 L 200 500 Q 100 500 100 400 Z',
  electronSpeed = 1,
  electronCount = 30,
  bulbBrightness = 0.5,
  showBattery = true,
  batterySize = 1,
}) => {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <svg
        viewBox="0 0 800 600"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.cyanDark} />
            <stop offset="50%" stopColor={theme.colors.cyan} />
            <stop offset="100%" stopColor={theme.colors.cyanDark} />
          </linearGradient>
        </defs>

        <path
          d={wirePath}
          fill="none"
          stroke={theme.colors.cyanDark}
          strokeWidth="4"
          filter="url(#glow)"
          style={{
            opacity: 0.5 + 0.5 * bulbBrightness,
          }}
        />

        <path
          d={wirePath}
          fill="none"
          stroke={theme.colors.cyan}
          strokeWidth="2"
          style={{
            opacity: bulbBrightness,
          }}
        />

        <circle cx="700" cy="300" r="30" fill={theme.colors.backgroundLight} stroke={theme.colors.cyan} strokeWidth="3" />
        <circle
          cx="700" cy="300"
          r={20 * bulbBrightness + 5}
          fill={theme.colors.cyan}
          style={{
            opacity: bulbBrightness,
            filter: `blur(${10 * bulbBrightness}px)`,
          }}
        />

        {showBattery && (
          <g transform="translate(80, 280)">
            <rect x="0" y="0" width="40" height="60" rx="5" fill={theme.colors.backgroundLight} stroke={theme.colors.white} strokeWidth="2" />
            <rect x="5" y="10" width="30" height="10" fill={theme.colors.whiteDim} />
            <rect x="15" y="0" width="10" height="8" fill={theme.colors.white} />
            <text x="20" y="50" textAnchor="middle" fill={theme.colors.whiteDim} fontSize="10" fontWeight="bold">V</text>
            {batterySize > 1 && (
              <rect x="15" y="-15" width="10" height="10" fill={theme.colors.white} />
            )}
          </g>
        )}
      </svg>

      <ElectronFlow
        path={wirePath}
        speed={electronSpeed}
        count={electronCount}
        intensity={bulbBrightness}
      />
    </AbsoluteFill>
  );
};