import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

interface GlowProps {
  color?: string;
  intensity?: number;
  size?: number;
  x?: number;
  y?: number;
  pulse?: boolean;
  speed?: number;
}

export const Glow: React.FC<GlowProps> = ({
  color = '#00d4ff',
  intensity = 1,
  size = 100,
  x = 0,
  y = 0,
  pulse = false,
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const animatedStyle = useMemo(() => {
    const pulseAmount = pulse ? 0.3 + 0.2 * Math.sin(frame * 0.05 * speed) : 0;
    const currentIntensity = intensity + pulseAmount;

    return {
      position: 'absolute' as const,
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} ${20 * currentIntensity}%, transparent 70%)`,
      filter: `blur(${size / 4}px)`,
      pointerEvents: 'none',
    };
  }, [frame, color, intensity, size, x, y, pulse, speed]);

  return <div style={animatedStyle} />;
};

interface GlowTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

export const GlowText: React.FC<GlowTextProps> = ({
  text,
  color = '#00d4ff',
  fontSize = 48,
  fontWeight = 700,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.8 + 0.2 * Math.sin(frame * 0.03);

  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        textShadow: `0 0 ${20 * pulse}px ${color}, 0 0 ${40 * pulse}px ${color}, 0 0 ${60 * pulse}px ${color}`,
      }}
    >
      {text}
    </div>
  );
};