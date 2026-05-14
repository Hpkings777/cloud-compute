import { useMemo } from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';

interface BackgroundProps {
  animated?: boolean;
  grid?: boolean;
  particles?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ animated = true, grid = false, particles = true }) => {
  const frame = useCurrentFrame();

  const gridStyle = useMemo(() => {
    if (!grid) return {};
    
    const offset = animated ? (frame * 0.5) % 50 : 0;
    
    return {
      backgroundImage: `
        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: `50px 50px`,
      backgroundPosition: `${offset}px ${offset}px`,
    };
  }, [frame, grid, animated]);

  const particlesStyle = useMemo(() => {
    if (!particles) return { display: 'none' };
    return {};
  }, [particles]);

  const particleElements = useMemo(() => {
    if (!particles) return [];
    
    return Array.from({ length: 30 }, (_, i) => {
      const baseX = (i * 73 + frame * 0.2) % 1920;
      const baseY = (i * 47 + frame * 0.1) % 1080;
      const size = 2 + (i % 3);
      const opacity = 0.1 + 0.2 * Math.sin(frame * 0.02 + i);
      
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: baseX,
            top: baseY,
            width: size,
            height: size,
            borderRadius: '50%',
            background: '#00d4ff',
            opacity,
            boxShadow: `0 0 ${size * 2}px #00d4ff`,
          }}
        />
      );
    });
  }, [frame, particles]);

  return (
    <AbsoluteFill style={{ background: '#0a0e1a', ...gridStyle }}>
      <div style={particlesStyle}>{particleElements}</div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, #0a0e1a 70%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};