# Ohm's Law Animation - Kivora Educational Video

A cinematic 2D motion graphics animation explaining Ohm's Law for Kivora, an AI-powered education platform. Built with Remotion.

## Video Specs

- **Duration:** 120 seconds (3600 frames @ 30fps)
- **Resolution:** 1920x1080
- **Format:** MP4

## Project Structure

```
src/
├── OhmsLaw.tsx           # Main composition (scene sequencing)
├── Root.tsx              # Remotion composition registration
├── components/           # Reusable UI components
│   ├── Background.tsx    # Animated background with grid & particles
│   ├── Caption.tsx       # Subtitle system
│   ├── ElectronFlow.tsx  # Circuit & electron animation
│   ├── Formula.tsx       # Animated formula display
│   └── Glow.tsx         # Glow effects
├── scenes/              # Individual scenes
│   ├── Scene1.tsx       # Hook (0-10s) - Circuit reveal
│   ├── Scene2.tsx       # Introducing Ohm's Law (10-25s)
│   ├── Scene3.tsx       # Understanding Current (25-40s)
│   ├── Scene4.tsx       # Understanding Resistance (40-60s)
│   ├── Scene5.tsx       # Voltage Effect (60-80s)
│   ├── Scene6.tsx       # Equation Breakdown (80-100s)
│   └── Scene7.tsx       # Final Summary (100-120s)
└── utils/
    └── theme.ts         # Colors, fonts, animation utilities
```

## DO's ✅

### Easy to Modify:
- **Captions**: Edit text in each scene's `<Caption>` component
- **Colors**: Change values in `src/utils/theme.ts`
- **Animation timing**: Modify frame numbers in scenes
- **Add/remove scenes**: Edit `src/OhmsLaw.tsx` Sequence components
- **Visual effects**: Adjust parameters in component props

### How to Customize:

#### 1. Change Colors
Edit `src/utils/theme.ts`:
```typescript
colors: {
  background: '#0a0e1a',  // Dark navy
  cyan: '#00d4ff',       // Electric cyan
  // ... other colors
}
```

#### 2. Edit Captions
In any scene file (e.g., `scenes/Scene1.tsx`):
```tsx
<Caption
  text="Your new caption here"
  startFrame={90}
  duration={210}
/>
```

#### 3. Adjust Scene Timing
In `OhmsLaw.tsx`, modify the `from` prop:
```tsx
<Sequence from={0} name="Scene1">
  <Scene1 />
</Sequence>
```

#### 4. Add New Scenes
1. Create new file in `src/scenes/`
2. Import in `OhmsLaw.tsx`
3. Add `<Sequence>` with desired start frame

#### 5. Change Circuit/Visuals
In `ElectronFlow.tsx`, modify:
- `wirePath` for circuit shape
- `electronCount` for more/fewer electrons
- `bulbBrightness` for lighting effects

## DON'Ts ❌

- **Don't use CSS animations** - They don't render correctly in Remotion
- **Don't use external fonts without loading** - Use system fonts or load via Remotion
- **Don't use random positioning** - Always use frame-based calculations
- **Don't hardcode frame numbers in components** - Pass as props for reusability
- **Don't forget `useCurrentFrame()`** - All animations must use frame-based timing

## Common Issues & Fixes

### Module Not Found Errors
- Check import paths: use `./` for same-level, `../` for parent
- Example: `import { Something } from './components/Something'`

### Animation Not Playing
- Ensure you're using `useCurrentFrame()` from remotion
- All timing must be in frames (30fps), not seconds

### Build/Render Fails
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors with `npx tsc --noEmit`

## Rendering

### Local Render:
```bash
npm run build
# Output: Outputs/output.mp4
```

### GitHub Actions (Cloud Render):
1. Push changes to GitHub
2. Go to Actions tab
3. Run "Render Ohm's Law Animation" workflow
4. Download artifact or check committed video

## Technical Notes

- All animations are frame-based using `useCurrentFrame()`
- No CSS keyframe animations
- SVG used for crisp vector graphics
- Glow effects via CSS filters and radial gradients
- Smooth transitions via opacity interpolation

## Dependencies

- @remotion/cli
- react
- remotion
- typescript

## License

MIT