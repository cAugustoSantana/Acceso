# GSAP Animation Plan for Signup Page

## Overview
Transform the static signup page into a dynamic, engaging experience using GSAP (GreenSock Animation Platform) animations.

## Phase 1: Setup & Installation

### 1.1 Install GSAP
```bash
npm install gsap
# or
pnpm add gsap
```

### 1.2 Create Animation Utilities
- Create `app/utils/animations.ts` or `app/hooks/useAnimations.ts`
- Set up reusable animation functions
- Configure GSAP ScrollTrigger plugin (if needed)

## Phase 2: Hero Section Animations

### 2.1 Title Animation
- **Entrance**: Fade in + scale up from 0.8 to 1.0
- **Timing**: 0.8s duration, ease: "power2.out"
- **Effect**: Remove Tailwind `animate-pulse`, replace with GSAP pulse animation

### 2.2 Image & Card Stagger Animation
- **Entrance**: Slide in from opposite sides
  - Card: Slide from left (-100px) with fade
  - Image: Slide from right (100px) with fade
- **Timing**: Stagger by 0.2s between elements
- **Effect**: Smooth, coordinated entrance

### 2.3 Background Gradient Animation
- **Effect**: Subtle color shift or wave animation
- **Timing**: Continuous, slow animation loop

## Phase 3: Form Animations

### 3.1 Form Container Entrance
- **Entrance**: Fade in + slide up from bottom (20px)
- **Timing**: Triggered after hero section animations complete
- **Delay**: 0.3s after hero animations

### 3.2 Input Fields Stagger Animation
- **Entrance**: Each input slides in from left with fade
- **Stagger**: 0.1s delay between each input
- **Effect**: Sequential reveal (name → email → password → button)

### 3.3 Input Focus Animations
- **On Focus**: 
  - Scale up slightly (1.02)
  - Border color transition
  - Shadow enhancement
- **On Blur**: Smooth return to original state

### 3.4 Button Animations
- **Hover**: 
  - Scale up (1.05)
  - Shadow increase
  - Color transition
- **Click**: 
  - Scale down (0.95) then bounce back
  - Ripple effect (optional)
- **Loading State**: Pulsing animation during submission

## Phase 4: Interactive Elements

### 4.1 Link Hover Effects
- **Login/Signup Links**: 
  - Underline slide-in animation
  - Color transition
  - Slight scale on hover

### 4.2 Footer Animation
- **Entrance**: Fade in on scroll
- **Trigger**: ScrollTrigger when footer enters viewport

## Phase 5: Form Submission States

### 5.1 Success Animation
- **Effect**: 
  - Form slides out/fades out
  - Success message slides in from top
  - Confetti animation (optional)
  - Checkmark icon animation

### 5.2 Error Animation
- **Effect**: 
  - Shake animation on form
  - Error message slides in
  - Input fields highlight with shake

## Phase 6: Performance Optimization

### 6.1 Client-Side Only
- Use `'use client'` directive for animated components
- Ensure animations only run in browser

### 6.2 Cleanup & Memory Management
- Proper useEffect cleanup
- Use refs for GSAP targets
- Disable animations on reduced motion preference

### 6.3 Animation Timing
- Keep total animation time under 2s for initial load
- Use `will-change` CSS property for animated elements
- Consider `transform` and `opacity` only (GPU accelerated)

## Implementation Structure

```
app/
├── page.tsx (main page - add 'use client')
├── components/
│   ├── HeroSection.tsx (with GSAP animations)
│   ├── AnimatedForm.tsx (form with animations)
│   └── AnimatedCard.tsx (party details card)
└── utils/
    └── animations.ts (GSAP animation functions)
```

## Animation Timeline Example

```
0.0s - Page loads
0.2s - Title fades in + scales up
0.6s - Card slides in from left
0.8s - Image slides in from right
1.2s - Form container fades in
1.3s - Name input slides in
1.4s - Email input slides in
1.5s - Password input slides in
1.6s - Submit button slides in
```

## Key GSAP Features to Use

1. **gsap.to()** - For most animations
2. **gsap.from()** - For entrance animations
3. **gsap.timeline()** - For coordinated sequences
4. **ScrollTrigger** - For scroll-based animations (optional)
5. **Easing functions**: "power2.out", "elastic.out", "bounce.out"

## Accessibility Considerations

- Respect `prefers-reduced-motion` media query
- Provide fallback for users with motion sensitivity
- Ensure animations don't interfere with form functionality

## Testing Checklist

- [ ] Animations work on page load
- [ ] Form interactions are smooth
- [ ] No layout shift during animations
- [ ] Performance is acceptable (60fps)
- [ ] Works on mobile devices
- [ ] Reduced motion preference is respected
- [ ] Animations don't block user interaction

