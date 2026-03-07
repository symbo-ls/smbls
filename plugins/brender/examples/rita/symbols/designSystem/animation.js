export default {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-8px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  pageEnter: {
    from: { opacity: 0, transform: 'translateY(16px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  slideInRight: {
    from: { opacity: 0, transform: 'translateX(24px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  slideInLeft: {
    from: { opacity: 0, transform: 'translateX(-24px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.97)' },
    to: { opacity: 1, transform: 'scale(1)' }
  },
  revealUp: {
    from: { opacity: 0, transform: 'translateY(40px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  revealScale: {
    from: { opacity: 0, transform: 'scale(0.92) translateY(20px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' }
  },
  heroImageZoom: {
    from: { transform: 'scale(1.08)' },
    to: { transform: 'scale(1)' }
  },
  shimmer: {
    '0%': { backgroundPosition: '-200% center' },
    '100%': { backgroundPosition: '200% center' }
  },
  bounce: {
    '0%': { transform: 'translateY(0)' },
    '55%': { transform: 'translateY(6px)' },
    '100%': { transform: 'translateY(0)' }
  },
  pulse: {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.6 },
    '100%': { opacity: 1 }
  },
  widthExpand: {
    from: { width: '0%', opacity: 0 },
    to: { width: '48px', opacity: 1 }
  }
}
