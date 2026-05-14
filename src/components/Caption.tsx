import { useMemo } from 'react';
import { AbsoluteFill, spring, useCurrentFrame } from 'remotion';
import { theme } from '../utils/theme';

interface CaptionProps {
  text: string;
  startFrame: number;
  duration: number;
  style?: 'default' | 'highlight' | 'formula';
}

export const Caption: React.FC<CaptionProps> = ({ text, startFrame, duration, style = 'default' }) => {
  const frame = useCurrentFrame();

  const animatedStyle = useMemo(() => {
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 20));
    const fadeOutProgress = Math.max(0, Math.min(1, (frame - (startFrame + duration - 20)) / 20));
    const opacity = progress * (1 - fadeOutProgress);
    const y = (1 - progress) * 20;

    return {
      opacity,
      transform: `translateY(${y}px)`,
    };
  }, [frame, startFrame, duration]);

  const textStyle = useMemo(() => {
    switch (style) {
      case 'highlight':
        return {
          fontSize: 32,
          fontWeight: 700,
          color: theme.colors.cyan,
          textShadow: `0 0 20px ${theme.colors.cyan}, 0 0 40px ${theme.colors.cyan}`,
        };
      case 'formula':
        return {
          fontSize: 48,
          fontWeight: 800,
          color: theme.colors.white,
          fontFamily: theme.fonts.mono,
        };
      default:
        return {
          fontSize: 28,
          fontWeight: 500,
          color: theme.colors.white,
        };
    }
  }, [style]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        ...textStyle,
        textAlign: 'center',
        maxWidth: 800,
        lineHeight: 1.4,
        ...animatedStyle,
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};