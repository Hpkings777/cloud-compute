import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence, interpolateColors } from "remotion";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

const COLORS = {
  background: "#0a0a12",
  robot: "#3a3a4a",
  robotGlow: "#4ecdc4",
  accent: "#ff6b6b",
  text: "#ffffff",
  muted: "#666680",
  success: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",
};

const Robo = ({ expression = "bored", glow = false, scale = 1 }: { expression?: "bored" | "shocked" | "happy" | "confused" | "wink"; glow?: boolean; scale?: number }) => {
  const frame = useCurrentFrame();
  
  const eyeGlow = glow ? interpolate(frame % 60, [0, 30, 60], [0.5, 1, 0.5]) : 0.3;
  
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "55%",
      transform: `translate(-50%, -50%) scale(${scale})`,
    }}>
      <div style={{
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${glow ? "#5a5a6a" : "#3a3a4a"}, #2a2a3a)`,
        boxShadow: glow 
          ? `0 0 60px rgba(78, 205, 196, ${eyeGlow}), 0 0 120px rgba(78, 205, 196, ${eyeGlow * 0.5})`
          : "0 10px 40px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#1a1a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid ${glow ? COLORS.robotGlow : "#4a4a5a"}`,
        }}>
          {expression === "bored" && (
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#888", opacity: 0.8 }} />
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#888", opacity: 0.8 }} />
            </div>
          )}
          {expression === "shocked" && (
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 35, height: 35, borderRadius: "50%", background: "#fff", boxShadow: "0 0 20px #fff" }} />
              <div style={{ width: 35, height: 35, borderRadius: "50%", background: "#fff", boxShadow: "0 0 20px #fff" }} />
            </div>
          )}
          {expression === "happy" && (
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.robotGlow, boxShadow: `0 0 25px ${COLORS.robotGlow}` }} />
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.robotGlow, boxShadow: `0 0 25px ${COLORS.robotGlow}` }} />
            </div>
          )}
          {expression === "confused" && (
            <div style={{ display: "flex", gap: 20, transform: "rotate(-10deg)" }}>
              <div style={{ width: 25, height: 25, borderRadius: "50%", background: "#aaa", borderBottom: "4px solid #666" }} />
              <div style={{ width: 25, height: 35, borderRadius: "50%", background: "#aaa", borderBottom: "4px solid #666" }} />
            </div>
          )}
          {expression === "wink" && (
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.robotGlow, boxShadow: `0 0 25px ${COLORS.robotGlow}` }} />
              <div style={{ width: 30, height: 8, borderRadius: 4, background: COLORS.robotGlow, marginTop: 10 }} />
            </div>
          )}
        </div>
      </div>
      <div style={{
        width: 60,
        height: 40,
        background: "#2a2a3a",
        borderRadius: "0 0 30px 30px",
        margin: "-5px auto 0",
      }} />
    </div>
  );
};

const RoomBackground = ({ variant = "messy" }: { variant?: "messy" | "clean" }) => {
  const frame = useCurrentFrame();
  
  const lightsOn = variant === "clean" ? 1 : interpolate(frame, [0, 30], [0.3, 0.3], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `rgba(10, 10, 18, ${lightsOn})`,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
      }} />
      {variant === "messy" && (
        <>
          <div style={{ position: "absolute", top: "20%", left: "10%", width: 200, height: 150, background: "#1a1a2a", borderRadius: 8, opacity: 0.5 }} />
          <div style={{ position: "absolute", top: "25%", right: "15%", width: 150, height: 100, background: "#1a1a2a", borderRadius: 8, opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: "20%", left: "20%", width: 80, height: 60, background: "#2a2a3a", borderRadius: 4, opacity: 0.3 }} />
        </>
      )}
      {variant === "clean" && (
        <>
          <div style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background: "linear-gradient(180deg, rgba(78, 205, 196, 0.1) 0%, transparent 100%)",
            borderRadius: "0 0 50% 50%",
          }} />
        </>
      )}
    </div>
  );
};

const TextOverlay = ({ text, subtext, delay = 0 }: { text: string; subtext?: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(Math.max(0, frame - delay), [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(Math.max(0, frame - delay), [0, 30], [30, 0]);
  
  return (
    <div style={{
      position: "absolute",
      top: "15%",
      left: "50%",
      transform: `translateX(-50%) translateY(${translateY}px)`,
      opacity,
      textAlign: "center",
    }}>
      <div style={{
        fontSize: 64,
        fontWeight: 800,
        color: COLORS.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "0.05em",
        textShadow: "0 0 30px rgba(255,255,255,0.3)",
      }}>
        {text}
      </div>
      {subtext && (
        <div style={{
          fontSize: 36,
          color: COLORS.muted,
          marginTop: 20,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          {subtext}
        </div>
      )}
    </div>
  );
};

const UIOverlay = ({ battery = 12, productivity = 0, status = "Idle" }: { battery?: number; productivity?: number; status?: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      position: "absolute",
      top: "25%",
      left: "50%",
      transform: "translateX(-50%)",
      opacity,
      background: "rgba(0,0,0,0.7)",
      padding: "20px 40px",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 20, color: COLORS.muted, marginBottom: 8 }}>Battery</div>
          <div style={{ 
            width: 100, 
            height: 20, 
            background: "#1a1a2a", 
            borderRadius: 10,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${battery}%`,
              height: "100%",
              background: battery < 20 ? COLORS.error : COLORS.success,
              borderRadius: 10,
            }} />
          </div>
          <div style={{ fontSize: 24, color: COLORS.text, marginTop: 4 }}>{battery}%</div>
        </div>
        <div>
          <div style={{ fontSize: 20, color: COLORS.muted, marginBottom: 8 }}>Productivity</div>
          <div style={{ 
            width: 100, 
            height: 20, 
            background: "#1a1a2a", 
            borderRadius: 10,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${productivity}%`,
              height: "100%",
              background: COLORS.accent,
              borderRadius: 10,
            }} />
          </div>
          <div style={{ fontSize: 24, color: COLORS.text, marginTop: 4 }}>{productivity}%</div>
        </div>
        <div>
          <div style={{ fontSize: 20, color: COLORS.muted, marginBottom: 8 }}>Status</div>
          <div style={{ fontSize: 24, color: COLORS.warning }}>{status}</div>
        </div>
      </div>
    </div>
  );
};

const ErrorPopup = ({ message, delay = 0 }: { message: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(Math.max(0, frame - delay), [0, 10, 90, 100], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(Math.max(0, frame - delay), [0, 20], [0.5, 1]);
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 100;
  
  return (
    <div style={{
      position: "absolute",
      top: `calc(35% + ${y}px)`,
      left: `calc(50% + ${x}px)`,
      transform: `translateX(-50%) scale(${scale})`,
      opacity,
      background: "rgba(231, 76, 60, 0.9)",
      padding: "15px 25px",
      borderRadius: 8,
      border: "2px solid #c0392b",
      boxShadow: "0 10px 30px rgba(231, 76, 60, 0.5)",
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>ERROR</div>
      <div style={{ fontSize: 18, color: "#fff" }}>{message}</div>
    </div>
  );
};

const SearchScreen = ({ query = "", results = [] }: { query?: string; results?: string[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -40%)",
      width: 600,
      height: 500,
      background: "#1a1a2a",
      borderRadius: 20,
      opacity,
      padding: 40,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    }}>
      <div style={{
        width: "100%",
        height: 60,
        background: "#2a2a3a",
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        padding: "0 25px",
      }}>
        <div style={{ fontSize: 28, color: COLORS.muted, marginRight: 15 }}>🔍</div>
        <div style={{ fontSize: 28, color: COLORS.text }}>{query}</div>
      </div>
      <div style={{ marginTop: 30 }}>
        {results.map((result, i) => (
          <div key={i} style={{
            padding: "15px 20px",
            background: i === 0 ? "rgba(78, 205, 196, 0.2)" : "transparent",
            borderRadius: 10,
            marginBottom: 10,
            border: i === 0 ? `1px solid ${COLORS.robotGlow}` : "1px solid transparent",
          }}>
            <div style={{ fontSize: 24, color: COLORS.text }}>{result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const width = interpolate(frame, [0, 180], [0, progress], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, 50%)",
      width: 500,
    }}>
      <div style={{
        fontSize: 32,
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 20,
      }}>
        Installing Intelligence Update...
      </div>
      <div style={{
        width: "100%",
        height: 30,
        background: "#1a1a2a",
        borderRadius: 15,
        overflow: "hidden",
      }}>
        <div style={{
          width: `${width}%`,
          height: "100%",
          background: "linear-gradient(90deg, #4ecdc4, #44a08d)",
          borderRadius: 15,
          boxShadow: "0 0 20px rgba(78, 205, 196, 0.5)",
        }} />
      </div>
      <div style={{
        fontSize: 48,
        fontWeight: 800,
        color: COLORS.robotGlow,
        textAlign: "center",
        marginTop: 20,
        textShadow: `0 0 30px ${COLORS.robotGlow}`,
      }}>
        {Math.round(width)}%
      </div>
    </div>
  );
};

const FinalMessage = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "#000",
      opacity,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        fontSize: 80,
        fontWeight: 900,
        color: COLORS.text,
        letterSpacing: "0.1em",
        textShadow: "0 0 50px rgba(255,255,255,0.5)",
      }}>
        UPGRADE YOUR MIND
      </div>
      <div style={{
        fontSize: 36,
        color: COLORS.robotGlow,
        marginTop: 30,
      }}>
        Version 2.0 starts today.
      </div>
    </div>
  );
};

const Act1Scene1 = () => {
  const frame = useCurrentFrame();
  
  const zoom = interpolate(frame, [0, 60], [0.8, 1], { extrapolateRight: "clamp" });
  
  return (
    <div style={{ transform: `scale(${zoom})` }}>
      <RoomBackground variant="messy" />
      <Robo expression="bored" scale={1.5} />
      <Sequence from={30} durationInFrames={120}>
        <TextOverlay text="Meet Robo." delay={0} />
      </Sequence>
      <Sequence from={90} durationInFrames={60}>
        <TextOverlay text="The laziest robot ever built." delay={0} />
      </Sequence>
    </div>
  );
};

const Act1Scene2 = () => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <RoomBackground variant="messy" />
      <Robo expression="bored" scale={1.5} />
      <UIOverlay battery={12} productivity={0} status="Idle" />
      <Sequence from={30} durationInFrames={90}>
        <div style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          color: COLORS.text,
          opacity: interpolate(frame - 30, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          "Another day... doing absolutely nothing."
        </div>
      </Sequence>
    </>
  );
};

const Act2Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const glitchOffset = spring({ frame, fps, config: { damping: 5, stiffness: 50 } });
  
  return (
    <>
      <div style={{ transform: `translateX(${(Math.random() > 0.5 ? 1 : -1) * glitchOffset * 5}px)` }}>
        <RoomBackground variant="messy" />
        <Robo expression="shocked" scale={1.5} />
      </div>
      <ErrorPopup message="Error 404: Motivation Not Found" delay={15} />
      <ErrorPopup message="Warning: Brain Lag Detected" delay={45} />
      <ErrorPopup message="System Performance: Critical" delay={75} />
      <Sequence from={60} durationInFrames={60}>
        <div style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          color: COLORS.accent,
        }}>
          "Why... am I... so slow?"
        </div>
      </Sequence>
    </>
  );
};

const Act2Scene4 = () => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <RoomBackground variant="messy" />
      <Robo expression="confused" scale={1.5} />
      <SearchScreen 
        query="How to stop being useless"
        results={["Install AI Upgrade", "Improve Brain Performance", "System Optimization Pack"]}
      />
      <Sequence from={90} durationInFrames={60}>
        <div style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          color: COLORS.text,
        }}>
          "Hmm... AI upgrade?"
        </div>
      </Sequence>
    </>
  );
};

const Act3Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const glowPulse = spring({ frame, fps, config: { damping: 10, stiffness: 30 } });
  
  return (
    <>
      <RoomBackground variant="messy" />
      <Robo expression="shocked" glow scale={1.5 + glowPulse * 0.2} />
      <ProgressBar progress={100} />
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at center, transparent 30%, rgba(78, 205, 196, ${glowPulse * 0.1}) 100%)`,
        pointerEvents: "none",
      }} />
    </>
  );
};

const Act3Scene6 = () => {
  const frame = useCurrentFrame();
  
  const flashOpacity = interpolate(frame, [0, 15], [1, 0], { extrapolateRight: "clamp" });
  
  return (
    <>
      <div style={{ opacity: 1 - flashOpacity }}>
        <RoomBackground variant="clean" />
      </div>
      {flashOpacity > 0.1 && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          opacity: flashOpacity,
        }} />
      )}
      <Robo expression="happy" glow scale={1.5} />
      <Sequence from={30} durationInFrames={60}>
        <div style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 36,
          color: COLORS.success,
          fontWeight: 700,
        }}>
          Update Successful - Version: Robo 2.0
        </div>
      </Sequence>
      <Sequence from={60} durationInFrames={30}>
        <div style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 32,
          color: COLORS.text,
        }}>
          "Whoa..."
        </div>
      </Sequence>
    </>
  );
};

const Act4Scene7 = () => {
  const frame = useCurrentFrame();
  
  const scenes = [
    { bg: "#1a1a2a", text: "Rapidly coding", icon: "💻" },
    { bg: "#2a1a2a", text: "Building drones", icon: "🚀" },
    { bg: "#1a2a2a", text: "Solving math", icon: "🔢" },
    { bg: "#2a2a1a", text: "Designing apps", icon: "📱" },
  ];
  
  const currentScene = Math.floor(frame / 24) % scenes.length;
  const sceneOpacity = interpolate(frame % 24, [0, 5, 19, 24], [0, 1, 1, 0]);
  
  return (
    <div style={{ opacity: sceneOpacity }}>
      <div style={{ background: scenes[currentScene].bg, width: "100%", height: "100%", position: "absolute" }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 120 }}>{scenes[currentScene].icon}</div>
        <div style={{ fontSize: 36, color: COLORS.text, marginTop: 20 }}>{scenes[currentScene].text}</div>
      </div>
    </div>
  );
};

const Act4Scene8 = () => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <RoomBackground variant="clean" />
      <Robo expression="happy" glow scale={1.5} />
      <Sequence from={30} durationInFrames={60}>
        <TextOverlay text="Best update ever." delay={0} />
      </Sequence>
    </>
  );
};

const Act5Scene = () => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <RoomBackground variant="clean" />
      <Robo expression="wink" glow scale={1.5} />
      <Sequence from={30} durationInFrames={60}>
        <div style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          color: COLORS.text,
          textAlign: "center",
        }}>
          "You know..."<br/>"Humans could use this update too."
        </div>
      </Sequence>
    </>
  );
};

export const SystemUpdate = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <Sequence from={0} durationInFrames={150}>
        <Act1Scene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={150}>
        <Act1Scene2 />
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <Act2Scene3 />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <Act2Scene4 />
      </Sequence>
      <Sequence from={360} durationInFrames={90}>
        <Act3Scene5 />
      </Sequence>
      <Sequence from={450} durationInFrames={90}>
        <Act3Scene6 />
      </Sequence>
      <Sequence from={540} durationInFrames={120}>
        <Act4Scene7 />
      </Sequence>
      <Sequence from={660} durationInFrames={90}>
        <Act4Scene8 />
      </Sequence>
      <Sequence from={750} durationInFrames={120}>
        <Act5Scene />
      </Sequence>
      <Sequence from={840} durationInFrames={60}>
        <FinalMessage />
      </Sequence>
    </AbsoluteFill>
  );
};
