export default {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(16px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-8px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  pageEnter: {
    from: { opacity: 0, transform: 'translateY(14px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  bounce: {
    '0%': { transform: 'translateY(0)' },
    '55%': { transform: 'translateY(6px)' },
    '100%': { transform: 'translateY(0)' }
  }
}
