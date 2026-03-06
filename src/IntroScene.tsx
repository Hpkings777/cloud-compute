import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const DynamicGrid = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0a0a0f",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          opacity: gridOpacity,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

const Title = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      stiffness: 200,
      damping: 12,
    },
  });

  const blur = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 15, 20], [0, 0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(titleSpring, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        fontSize: 120,
        fontWeight: 800,
        letterSpacing: "0.08em",
        color: "#ffffff",
        textShadow: "0 0 60px rgba(100, 200, 255, 0.5), 0 0 120px rgba(100, 200, 255, 0.3)",
        filter: `blur(${blur}px)`,
        opacity,
      }}
    >
      AI MOBILE
    </div>
  );
};

const GlowBar = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const expandSpring = spring({
    frame,
    fps,
    config: {
      stiffness: 100,
      damping: 15,
    },
  });

  const barWidth = interpolate(expandSpring, [0, 1], [0, width]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        width: barWidth,
        height: 4,
        background: "linear-gradient(90deg, transparent, #64c8ff, #a78bfa, #64c8ff, transparent)",
        borderRadius: 2,
        boxShadow: "0 0 20px rgba(100, 200, 255, 0.8), 0 0 40px rgba(167, 139, 250, 0.6)",
      }}
    />
  );
};

export const IntroScene = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <DynamicGrid />
      <Title />
      <GlowBar />
    </div>
  );
};
