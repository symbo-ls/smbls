// ─── Service Item Card (for sub-pages grid items) ───────────────────────────

export const ServiceItemCard = {
  background: 'warmWhite',
  padding: '36px',
  transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { background: 'bgSubtle' },

  Number: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    fontWeight: '400',
    color: 'accent',
    letterSpacing: '0.06em',
    marginBottom: '20px',
    fontVariantNumeric: 'tabular-nums',
    opacity: '0.7'
  },
  Title: {
    tag: 'h3',
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '-0.018em',
    color: 'dark',
    marginBottom: '10px'
  },
  Text: {
    tag: 'p',
    fontSize: '13px',
    color: 'textSecondary',
    lineHeight: '1.72',
    fontWeight: '400'
  }
}

// ─── Items Grid (for sub-pages) ─────────────────────────────────────────────

export const ItemsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  background: 'borderLight',
  borderRadius: '12px',
  overflow: 'hidden',
  '@tablet': { gridTemplateColumns: '1fr 1fr' },
  '@mobile': { gridTemplateColumns: '1fr' }
}

// ─── Criterion (for angel page) ─────────────────────────────────────────────

export const Criterion = {
  extends: 'Flex',
  alignItems: 'flex-start',
  gap: '16px',
  padding: '22px 0',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'borderLight',

  Check: {
    width: '20px',
    height: '20px',
    flexShrink: '0',
    marginTop: '2px',
    fontSize: '12px',
    color: 'accent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  },
  Text: {
    fontSize: '14px',
    color: 'textSecondary',
    lineHeight: '1.68',
    fontWeight: '400'
  }
}
