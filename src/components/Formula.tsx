import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { theme } from '../utils/theme';
import { GlowText } from './Glow';

interface FormulaProps {
  formula: string;
  startFrame: number;
  highlightVariable?: string;
  variableLabels?: { [key: string]: string };
  duration?: number;
}

export const Formula: React.FC<FormulaProps> = ({
  formula,
  startFrame,
  highlightVariable,
  variableLabels = {},
  duration = 60,
}) => {
  const frame = useCurrentFrame();

  const animatedStyle = useMemo(() => {
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 30));
    const exitProgress = Math.max(0, Math.min(1, (frame - (startFrame + duration - 30)) / 30));
    const opacity = progress * (1 - exitProgress);
    const scale = 0.5 + 0.5 * progress;
    const blur = (1 - progress) * 10;

    return { opacity, scale, blur };
  }, [frame, startFrame, duration]);

  const renderFormula = () => {
    const parts = formula.split(/([VIR=+\-*/])/g).filter(Boolean);
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: theme.fonts.mono,
        fontSize: 72,
        fontWeight: 800,
        transform: `scale(${animatedStyle.scale})`,
        opacity: animatedStyle.opacity,
        filter: `blur(${animatedStyle.blur}px)`,
      }}>
        {parts.map((part, i) => {
          const isVariable = /[VIR]/i.test(part);
          const isEquals = part === '=';
          const isOperator = /[+\-*/]/.test(part);
          
          let color = theme.colors.white;
          if (isEquals) color = theme.colors.whiteDim;
          else if (isOperator) color = theme.colors.cyan;
          else if (isVariable && highlightVariable?.toUpperCase() === part.toUpperCase()) {
            color = theme.colors.cyan;
          }

          return (
            <span key={i} style={{ color }}>
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {renderFormula()}
      {highlightVariable && variableLabels[highlightVariable.toUpperCase()] && (
        <div style={{
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          color: theme.colors.cyan,
          fontSize: 24,
          fontWeight: 600,
          textShadow: `0 0 10px ${theme.colors.cyan}`,
        }}>
          {variableLabels[highlightVariable.toUpperCase()]}
        </div>
      )}
    </div>
  );
};

interface AnimatedFormulaProps {
  formula: string;
  startFrame: number;
  duration?: number;
}

export const AnimatedFormula: React.FC<AnimatedFormulaProps> = ({
  formula,
  startFrame,
  duration = 60,
}) => {
  const frame = useCurrentFrame();

  const style = useMemo(() => {
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 30));
    return {
      opacity: progress,
      transform: `scale(${0.8 + 0.2 * progress}) translateY(${(1 - progress) * 30}px)`,
    };
  }, [frame, startFrame]);

  return (
    <div style={style}>
      <GlowText text={formula} color={theme.colors.white} fontSize={64} fontWeight={800} />
    </div>
  );
};