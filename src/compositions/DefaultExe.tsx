import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill, Sequence, SequenceFrom } from "remotion";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

const COLORS = {
  BG_DARK: "#060608",
  PANEL: "#0d0d14",
  ACCENT_LIME: "#c8ff00",
  ACCENT_RED: "#ff2d55",
  ACCENT_CYAN: "#00d4ff",
  TEXT_MAIN: "#e8e8f0",
  TEXT_MUTED: "#5a5a7a",
};

const PARTICLE_POSITIONS: { x: number; y: number }[] = [
  { x: 100, y: 1600 }, { x: 200, y: 1700 }, { x: 300, y: 1650 }, { x: 450, y: 1750 },
  { x: 550, y: 1680 }, { x: 650, y: 1720 }, { x: 750, y: 1600 }, { x: 850, y: 1700 },
  { x: 950, y: 1650 }, { x: 150, y: 1800 }, { x: 350, y: 1780 }, { x: 500, y: 1820 },
  { x: 700, y: 1790 }, { x: 880, y: 1760 }, { x: 250, y: 1850 }, { x: 480, y: 1880 },
  { x: 620, y: 1830 }, { x: 780, y: 1870 }, { x: 400, y: 1900 }, { x: 580, y: 1920 },
];

const HEX_CHARS = "0123456789ABCDEF";

const TypeWriterText = ({ text, startFrame, color, fontSize, fontFamily }: {
  text: string; startFrame: number; color?: string; fontSize?: number; fontFamily?: string;
}) => {
  const frame = useCurrentFrame();
  const charsVisible = interpolate(Math.max(0, frame - startFrame), [0, text.length * 2], [0, text.length], { extrapolateRight: "clamp" });
  const displayText = text.slice(0, Math.floor(charsVisible));
  return (
    <span style={{ color: color || COLORS.TEXT_MAIN, fontSize: fontSize || 24, fontFamily: fontFamily || "monospace" }}>
      {displayText}
    </span>
  );
};

const BlinkingCursor = () => {
  const frame = useCurrentFrame();
  const opacity = Math.sin(frame * 0.15) > 0 ? 1 : 0;
  return <span style={{ opacity, color: COLORS.ACCENT_LIME }}>|</span>;
};

const Scanlines = () => (
  <div style={{
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
    opacity: 0.06,
    pointerEvents: "none",
    zIndex: 100,
  }} />
);

const CornerTags = ({ hide }: { hide?: boolean }) => {
  const frame = useCurrentFrame();
  const seconds = Math.floor(frame / 30);
  const opacity = hide ? 0 : 1;
  return (
    <>
      <div style={{ position: "absolute", top: 40, left: 40, opacity: opacity * 0.5, color: COLORS.ACCENT_LIME, fontFamily: "Share Tech Mono, monospace", fontSize: 10, zIndex: 50 }}>PHORIX//SYS</div>
      <div style={{ position: "absolute", top: 40, right: 40, opacity: opacity * 0.4, color: COLORS.TEXT_MUTED, fontFamily: "Share Tech Mono, monospace", fontSize: 10, zIndex: 50 }}>{seconds}s</div>
      <div style={{ position: "absolute", bottom: 40, left: 40, opacity: opacity * 0.3, color: COLORS.TEXT_MUTED, fontFamily: "Share Tech Mono, monospace", fontSize: 10, zIndex: 50 }}>DEFAULT.EXE</div>
    </>
  );
};

const GlitchBar = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const scaleX = interpolate(Math.max(0, frame - delay), [0, 4, 8], [0, 1, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      height: 4,
      background: COLORS.ACCENT_CYAN,
      transform: `scaleX(${scaleX})`,
      opacity: scaleX > 0.1 ? 1 : 0,
    }} />
  );
};

const ScanLine = () => {
  const frame = useCurrentFrame();
  const left = interpolate(frame % 90, [0, 90], [-10, 110], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 2,
      background: COLORS.ACCENT_CYAN,
      left: `${left}%`,
      opacity: 0.3,
    }} />
  );
};

const DataStream = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", right: 20, top: 0, bottom: 0, display: "flex", flexDirection: "column", gap: 16, opacity: 0.2 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const charIndex = Math.floor((frame / 3 + i) % HEX_CHARS.length);
        return (
          <span key={i} style={{ color: COLORS.ACCENT_CYAN, fontFamily: "Share Tech Mono, monospace", fontSize: 12 }}>
            {HEX_CHARS[charIndex]}
          </span>
        );
      })}
    </div>
  );
};

const AnimatedGrid = ({ visible = true }: { visible?: boolean }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 60], [0, 0.3], { extrapolateRight: "clamp" });
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: `
        linear-gradient(90deg, ${COLORS.ACCENT_LIME}22 1px, transparent 1px),
        linear-gradient(0deg, ${COLORS.ACCENT_LIME}22 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      opacity,
    }} />
  );
};

const GlitchSlice = ({ index }: { index: number }) => {
  const frame = useCurrentFrame();
  const yPositions = [200, 450, 700, 1000, 1300, 1600];
  const y = yPositions[index % yPositions.length];
  const visible = Math.sin(frame * 0.8 + index) > 0.7;
  const offsetX = Math.sin(frame * 0.5 + index * 2) * 20;
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute",
      top: y,
      left: offsetX,
      width: "100%",
      height: 6,
      background: COLORS.BG_DARK,
    }} />
  );
};

const LyricLine = ({ text, startFrame, isActive, isPunchline, color }: {
  text: string; startFrame: number; isActive: boolean; isPunchline?: boolean; color?: string;
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const opacity = isActive ? interpolate(elapsed, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : interpolate(elapsed, [0, 12, 24], [1, 1, 0], { extrapolateRight: "clamp" });
  const translateY = isActive ? interpolate(elapsed, [0, 12], [20, 0], { extrapolateRight: "clamp" }) : interpolate(elapsed, [0, 12], [0, -20], { extrapolateRight: "clamp" });
  const scale = isPunchline ? interpolate(elapsed, [0, 12, 24], [1, 1.05, 1], { extrapolateRight: "clamp" }) : 1;
  const textColor = isPunchline ? COLORS.ACCENT_LIME : (color || (isActive ? COLORS.TEXT_MAIN : COLORS.TEXT_MUTED));
  const fontSize = isActive ? 28 : 22;
  if (opacity <= 0) return null;
  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      color: textColor,
      fontFamily: "Share Tech Mono, monospace",
      fontSize,
      textAlign: "center",
      padding: "8px 20px",
    }}>
      {text}
    </div>
  );
};

const Particles = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {PARTICLE_POSITIONS.map((pos, i) => {
        const y = interpolate(frame, [4320, 4920], [pos.y, pos.y - 300], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute",
            left: pos.x,
            top: y,
            width: 4,
            height: 4,
            background: COLORS.ACCENT_LIME,
            borderRadius: "50%",
          }} />
        );
      })}
    </>
  );
};

const Scene1_SystemBoot = () => {
  const frame = useCurrentFrame();
  const flicker = interpolate(frame, [120, 130, 135, 140, 145], [1, 0, 1, 0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame: Math.max(0, frame - 150), fps: FPS, config: { damping: 12, stiffness: 100 } });
  const titleGlitch = interpolate(frame, [210, 220], [0, Math.sin(frame * 0.5) * 8], { extrapolateRight: "clamp" });
  const showCursor = frame >= 30 && frame < 90;
  const showPhorix = frame >= 60;
  const showInit = frame >= 90;
  const showTitle = frame >= 150;
  const showSubtitle = frame >= 180;
  return (
    <div style={{ opacity: flicker }}>
      <AnimatedGrid visible={frame >= 240} />
      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        {showCursor && <BlinkingCursor />}
        {showPhorix && <TypeWriterText text="PHORIX.SYS" startFrame={60} fontFamily="Share Tech Mono, monospace" fontSize={32} />}
        {showInit && <div><TypeWriterText text="INITIALIZING..." startFrame={90} fontFamily="Share Tech Mono, monospace" fontSize={24} color={COLORS.TEXT_MUTED} /></div>}
        {showTitle && (
          <div style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: 140,
            color: COLORS.ACCENT_LIME,
            transform: `translateX(${titleGlitch}px) scale(${titleScale})`,
            textShadow: "0 0 60px #c8ff00",
          }}>
            PHORIX
          </div>
        )}
        {showSubtitle && (
          <div style={{
            fontFamily: "Share Tech Mono, monospace",
            fontSize: 22,
            color: COLORS.TEXT_MUTED,
            letterSpacing: 8,
            opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            DEFAULT.EXE
          </div>
        )}
      </div>
    </div>
  );
};

const Scene2_Verse1 = () => {
  const frame = useCurrentFrame();
  const lyrics = [
    "Tu bolta Suno, jaise khud composer hai,",
    "Button dabaya aur bole 'main closer hai.'",
    "Template pe jeet ka sapna dekh raha,",
    "Par originality se tu roz bhaag raha.",
    "Ek click, ek track — waah bhai, kya art hai,",
    "Itna bhi nahi pata — yeh tune toh chart hai.",
    "Main system build karu, tu presets pe jee,",
    "Main logic likhu, tu bas copy-paste hi.",
    "Naam bada AI ka, par user wahi,",
    "Difference samajh — creator kaun, bhai?",
    "Tera process? Drag, drop, generate, share.",
    "Mera process? Think, break, rebuild, declare.",
  ];
  const punchlines = [false, true, false, false, false, false, false, true, false, true, false, false];
  const timings = [360, 430, 510, 580, 660, 720, 800, 870, 940, 1010, 1080, 1150];
  const activeIndex = timings.reduce((acc, t, i) => frame >= t ? i : acc, -1);
  return (
    <div style={{ position: "relative" }}>
      <AnimatedGrid />
      <ScanLine />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", textAlign: "center" }}>
        {lyrics.map((line, i) => (
          <LyricLine
            key={i}
            text={line}
            startFrame={timings[i]}
            isActive={i === activeIndex}
            isPunchline={punchlines[i]}
          />
        ))}
      </div>
    </div>
  );
};

const Scene3_Chorus = () => {
  const frame = useCurrentFrame();
  const pulseOpacity = Math.floor(frame / 15) % 2 === 0 ? 0.5 : 0.2;
  const lyrics = [
    { text: "Beta build tu… crash kare fast,", frame: 1440, red: ["crash kare fast"] },
    { text: "Phorix core chale… built to last.", frame: 1530, red: ["mid-tier"], lime: ["built to last"] },
    { text: "Tu output dikha, main process dikhaun,", frame: 1620, red: [] },
    { text: "Game samajh… warna fir se harun.", frame: 1710, red: [] },
    { text: "Tu tune generate kar, main tune dissect karu,", frame: 1800, red: [] },
    { text: "Tera AI tool hai — mera AI select karu.", frame: 1860, red: [] },
  ];
  const activeIndex = lyrics.reduce((acc, l, i) => frame >= l.frame ? i : acc, -1);
  return (
    <div style={{ position: "relative" }}>
      <AnimatedGrid />
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", fontFamily: "Bebas Neue, sans-serif", fontSize: 48, color: COLORS.ACCENT_LIME, opacity: 0.15 }}>PHORIX</div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: COLORS.ACCENT_LIME, opacity: pulseOpacity * 0.3 }} />
      {frame % 30 < 8 && <GlitchBar delay={0} />}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "85%", textAlign: "center" }}>
        {lyrics.map((l, i) => {
          const elapsed = Math.max(0, frame - l.frame);
          const opacity = i === activeIndex ? interpolate(elapsed, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;
          const scale = i === activeIndex && l.lime ? interpolate(elapsed, [0, 12], [1, 1.08], { extrapolateRight: "clamp" }) : 1;
          const displayText = l.text.replace("crash kare fast", "crash kare fast").replace("built to last", "built to last").replace("mid-tier", "mid-tier");
          let textColor = COLORS.TEXT_MAIN;
          if (i === activeIndex && l.red?.length) textColor = COLORS.ACCENT_RED;
          if (i === activeIndex && l.lime?.length) textColor = COLORS.ACCENT_LIME;
          return (
            <div key={i} style={{ opacity, transform: `scale(${scale})`, fontFamily: "Bebas Neue, sans-serif", fontSize: 44, color: textColor, margin: "10px 0" }}>
              {displayText}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Scene4_Verse2 = () => {
  const frame = useCurrentFrame();
  const lyrics = [
    { text: "Har baar excuse 'AI ne banaya' —", frame: 1920, punchline: false },
    { text: "Khud ka kya input? Kuch bhi nahi laya.", frame: 1990, punchline: false },
    { text: "Gaana clean, par feel kahan hai,", frame: 2070, punchline: true, accent: "red" },
    { text: "Algorithm jeeta… par tu kahan hai?", frame: 2140, punchline: true, accent: "red" },
    { text: "Emotion nahi, direction nahi, intention nahi,", frame: 2220, punchline: false },
    { text: "Sab kuch auto — tera khud ka mention nahi.", frame: 2290, punchline: false },
    { text: "Main tweak karu lines, tune kare flow,", frame: 2370, punchline: false },
    { text: "Tu same default pe hi chala raha show.", frame: 2440, punchline: false },
    { text: "Skill ko shortcut se replace kiya,", frame: 2510, punchline: false },
    { text: "Phir bolta 'bhai maine create kiya'?", frame: 2580, punchline: true, accent: "red", strikethrough: true },
    { text: "Creation mein sweat hota hai, blood hota hai,", frame: 2660, punchline: false },
    { text: "Tera track mein sirf prompt ka flood hota hai.", frame: 2740, punchline: true, accent: "cyan" },
  ];
  const activeIndex = lyrics.reduce((acc, l, i) => frame >= l.frame ? i : acc, -1);
  return (
    <div style={{ position: "relative" }}>
      <AnimatedGrid />
      <ScanLine />
      <DataStream />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", textAlign: "center" }}>
        {lyrics.map((l, i) => (
          <LyricLine
            key={i}
            text={l.text}
            startFrame={l.frame}
            isActive={i === activeIndex}
            isPunchline={l.punchline}
            color={l.accent === "red" ? COLORS.ACCENT_RED : l.accent === "cyan" ? COLORS.ACCENT_CYAN : undefined}
          />
        ))}
      </div>
    </div>
  );
};

const Scene5_RapidFire = () => {
  const frame = useCurrentFrame();
  const blackout = frame >= 3000 && frame < 3030;
  const flashFrame = frame >= 3030 && frame < 3032;
  const lyrics = [
    { text: "Phorix aa gaya, system overload —", frame: 3030, lime: true },
    { text: "Tu still loading, mujhe nahi tera error code,", frame: 3050, lime: false },
    { text: "Main iterate karta, tu sirf operate karta,", frame: 3080, lime: true },
    { text: "Tera output stale, mera blueprint update karta.", frame: 3110, lime: false },
    { text: "No lag, no cap, no latency —", frame: 3150, lime: true },
    { text: "Teri creativity sirf battery —", frame: 3170, lime: false },
    { text: "Main rewrite karta, tu recite karta,", frame: 3200, lime: true },
    { text: "Tu Suno ka user — main Phorix ka architect.", frame: 3230, lime: false },
    { text: "Plagiarism-free mindset, ownership claim karta,", frame: 3270, lime: true },
    { text: "Tu trend follow karta, main trend frame karta —", frame: 3310, lime: false },
    { text: "Samajh bhai, yeh rap nahi — system statement hai,", frame: 3350, lime: true },
    { text: "Phorix ek tool nahi — ek permanent placement hai.", frame: 3400, lime: false },
  ];
  const activeIndex = lyrics.reduce((acc, l, i) => frame >= l.frame ? i : acc, -1);
  const watermarkScale = 0.9 + Math.sin(frame * 0.15) * 0.1;
  return (
    <div style={{ position: "relative" }}>
      {blackout && <div style={{ position: "absolute", inset: 0, background: "#000" }} />}
      {flashFrame && <div style={{ position: "absolute", inset: 0, background: COLORS.ACCENT_LIME, opacity: 0.08 }} />}
      {[0, 1, 2, 3].map(i => <GlitchSlice key={i} index={i} />)}
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: `translateX(-50%) scale(${watermarkScale})`, fontFamily: "Bebas Neue, sans-serif", fontSize: 64, color: COLORS.ACCENT_LIME, opacity: 0.4 }}>PHORIX</div>
      <div style={{ position: "absolute", top: 40, right: 40, fontFamily: "Share Tech Mono, monospace", fontSize: 10, color: COLORS.ACCENT_RED, opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0 }}>SYS//OVERLOAD</div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "85%", textAlign: "center" }}>
        {lyrics.map((l, i) => {
          const elapsed = Math.max(0, frame - l.frame);
          const opacity = i === activeIndex ? interpolate(elapsed, [0, 2], [0, 1], { extrapolateRight: "clamp" }) : 0;
          return (
            <div key={i} style={{ opacity, fontFamily: "Share Tech Mono, monospace", fontSize: 24, color: l.lime ? COLORS.ACCENT_LIME : COLORS.TEXT_MAIN, margin: "6px 0" }}>
              {l.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Scene6_Bridge = () => {
  const frame = useCurrentFrame();
  const lyrics = [
    { text: "Sach kadwa hai, par sun le aaj —", frame: 3840 },
    { text: "Tool se upar hota creator ka raaj.", frame: 3960 },
    { text: "Kal tu seekh gaya toh respect milega,", frame: 4060 },
    { text: "Aaj ke liye — bas thoda sa jalega.", frame: 4160, jalega: true },
    { text: "Shortcut liya tune, destination bhool gaya,", frame: 4230 },
    { text: "Main destination tha — aur tu tool tha, bhool gaya.", frame: 4280 },
  ];
  const activeIndex = lyrics.reduce((acc, l, i) => frame >= l.frame ? i : acc, -1);
  const lineOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1, height: 200, background: COLORS.ACCENT_LIME, opacity: lineOpacity * 0.3 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        {lyrics.map((l, i) => {
          const elapsed = Math.max(0, frame - l.frame);
          const opacity = i === activeIndex ? interpolate(elapsed, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;
          return (
            <div key={i} style={{ opacity, fontFamily: "Bebas Neue, sans-serif", fontSize: l.jalega ? 28 : 36, color: l.jalega ? COLORS.ACCENT_RED : COLORS.TEXT_MAIN, margin: "20px 0" }}>
              {l.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Scene7_FinalChorus = () => {
  const frame = useCurrentFrame();
  const lyrics = [
    { text: "Beta build tu… update pending,", frame: 4320, lime: false },
    { text: "Phorix system… always trending.", frame: 4440, lime: true },
    { text: "AI sabke paas — par dimaag rare,", frame: 4560, lime: false },
    { text: "Isi liye bhai… tu abhi bhi mid-tier.", frame: 4680, lime: false, red: true },
    { text: "Version 2.0 mein bhi tu wahi —", frame: 4790, lime: false },
    { text: "Default settings pe, original nahi.", frame: 4860, lime: true },
  ];
  const activeIndex = lyrics.reduce((acc, l, i) => frame >= l.frame ? i : acc, -1);
  return (
    <div style={{ position: "relative" }}>
      <Particles />
      <AnimatedGrid />
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", fontFamily: "Bebas Neue, sans-serif", fontSize: 100, color: COLORS.ACCENT_LIME, textShadow: "0 0 40px #c8ff00" }}>PHORIX</div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "85%", textAlign: "center" }}>
        {lyrics.map((l, i) => {
          const elapsed = Math.max(0, frame - l.frame);
          const opacity = i === activeIndex ? interpolate(elapsed, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;
          const scale = i === activeIndex && l.lime ? interpolate(elapsed, [0, 12], [1, 1.1], { extrapolateRight: "clamp" }) : 1;
          let color = COLORS.TEXT_MAIN;
          if (l.red) color = COLORS.ACCENT_RED;
          if (l.lime) color = COLORS.ACCENT_LIME;
          return (
            <div key={i} style={{ opacity, transform: `scale(${scale})`, fontFamily: "Bebas Neue, sans-serif", fontSize: 44, color, margin: "10px 0" }}>
              {l.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Scene8_Outro = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [4920, 5200], [1, 0], { extrapolateRight: "clamp" });
  const blur = interpolate(frame, [4920, 5160], [0, 3], { extrapolateRight: "clamp" });
  const outroLines = [
    { text: "No hate… bas clarity.", frame: 4980 },
    { text: "Game seekh… phir aana.", frame: 5100 },
    { text: "System off.", frame: 5200 },
    { text: "…Phorix out.", frame: 5280, italic: true, small: true },
  ];
  const screenOff = frame >= 5300;
  const showSessionEnd = frame >= 5310;
  return (
    <div style={{ filter: `blur(${blur}px)` }}>
      {titleOpacity > 0 && (
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", opacity: titleOpacity, fontFamily: "Bebas Neue, sans-serif", fontSize: 120, color: COLORS.ACCENT_LIME }}>PHORIX</div>
      )}
      <div style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        {outroLines.map((l, i) => {
          const opacity = interpolate(Math.max(0, frame - l.frame), [0, 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ opacity, fontFamily: "Share Tech Mono, monospace", fontSize: l.small ? 18 : 24, color: COLORS.TEXT_MUTED, fontStyle: l.italic ? "italic" : "normal", margin: "10px 0" }}>
              {l.text}
            </div>
          );
        })}
      </div>
      {screenOff && <div style={{ position: "absolute", inset: 0, background: "#000", opacity: interpolate(frame, [5300, 5308], [0, 1], { extrapolateRight: "clamp" }) }} />}
      {showSessionEnd && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: interpolate(frame, [5310, 5350], [0, 1], { extrapolateRight: "clamp" }) }}>
          <TypeWriterText text="PHORIX.SYS — SESSION ENDED" startFrame={5310} fontFamily="Share Tech Mono, monospace" fontSize={14} color={COLORS.ACCENT_LIME} />
        </div>
      )}
    </div>
  );
};

export const DefaultExe: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
      `}</style>
      <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARK }}>
        <Sequence from={0} durationInFrames={360}>
          <Scene1_SystemBoot />
        </Sequence>
        <Sequence from={360} durationInFrames={1080}>
          <Scene2_Verse1 />
        </Sequence>
        <Sequence from={1440} durationInFrames={480}>
          <Scene3_Chorus />
        </Sequence>
        <Sequence from={1920} durationInFrames={1080}>
          <Scene4_Verse2 />
        </Sequence>
        <Sequence from={3000} durationInFrames={840}>
          <Scene5_RapidFire />
        </Sequence>
        <Sequence from={3840} durationInFrames={480}>
          <Scene6_Bridge />
        </Sequence>
        <Sequence from={4320} durationInFrames={600}>
          <Scene7_FinalChorus />
        </Sequence>
        <Sequence from={4920} durationInFrames={480}>
          <Scene8_Outro />
        </Sequence>
        <Scanlines />
        <Sequence from={0} durationInFrames={3840}>
          <CornerTags hide={false} />
        </Sequence>
        <Sequence from={3840} durationInFrames={480}>
          <CornerTags hide={true} />
        </Sequence>
        <Sequence from={4320} durationInFrames={600}>
          <CornerTags hide={false} />
        </Sequence>
        <Sequence from={4920} durationInFrames={480}>
          <CornerTags hide={false} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
