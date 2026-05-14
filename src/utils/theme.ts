export const theme = {
  colors: {
    background: '#0a0e1a',
    backgroundLight: '#0d1225',
    cyan: '#00d4ff',
    cyanDark: '#0099cc',
    cyanGlow: '#00d4ff',
    blue: '#3b82f6',
    white: '#ffffff',
    whiteDim: 'rgba(255, 255, 255, 0.7)',
    orange: '#ff6b35',
    green: '#22c55e',
    red: '#ef4444',
    purple: '#a855f7',
  },
  fonts: {
    default: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
};

export const fadeIn = (frame: number, duration = 30) => ({
  opacity: interpolateSequence(frame, 0, duration, 0, 1),
});

export const fadeOut = (frame: number, duration = 30) => ({
  opacity: interpolateSequence(frame, 0, duration, 1, 0),
});

function interpolateSequence(
  currentFrame: number,
  startFrame: number,
  duration: number,
  startValue: number,
  endValue: number
): number {
  const progress = Math.max(0, Math.min(1, (currentFrame - startFrame) / duration));
  const eased = easeInOutCubic(progress);
  return startValue + (endValue - startValue) * eased;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function spring(
  frame: number,
  startFrame: number,
  duration: number,
  startValue: number,
  endValue: number
): number {
  const t = Math.max(0, Math.min(1, (frame - startFrame) / duration));
  const damping = 0.7;
  const frequency = 0.5;
  const decay = Math.exp(-damping * t * frequency * 10);
  const oscillation = Math.cos(t * frequency * Math.PI * 2);
  const progress = 1 - Math.pow(1 - t, 3);
  return startValue + (endValue - startValue) * progress * (1 + 0.1 * (1 - t) * oscillation * decay);
}

export function scaleIn(frame: number, startFrame: number, startScale = 0.5, endScale = 1) {
  const t = Math.max(0, Math.min(1, (frame - startFrame) / 30));
  const eased = easeOutBack(t);
  return startScale + (endScale - startScale) * eased;
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function sequence(
  frame: number,
  startFrame: number,
  duration: number,
  startValue: number,
  endValue: number
): number {
  return interpolateSequence(frame, startFrame, duration, startValue, endValue);
}

export const interpolate = (
  frame: number,
  start: number,
  end: number,
  startFrame: number,
  endFrame: number
) => {
  const progress = (frame - startFrame) / (endFrame - startFrame);
  const clamped = Math.max(0, Math.min(1, progress));
  return start + (end - start) * easeInOutCubic(clamped);
};