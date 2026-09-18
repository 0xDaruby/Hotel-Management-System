export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.26,
    media: 0.38,
    editorial: 0.5,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    state: [0.4, 0, 0.2, 1] as const,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  scale: {
    press: 0.98,
  },
} as const;
