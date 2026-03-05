// ─── Service Item Card (for sub-pages grid items) ───────────────────────────

export const ServiceItemCard = {
  background: 'white',
  padding: '32px',
  transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { background: 'bgSubtle' },

  Number: {
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '10px',
    fontWeight: '500',
    color: 'textTertiary',
    letterSpacing: '0.10em',
    marginBottom: '20px',
    fontVariantNumeric: 'tabular-nums'
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
    fontWeight: '300'
  }
}

// ─── Items Grid (for sub-pages) ─────────────────────────────────────────────

export const ItemsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  background: 'borderLight',
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
    width: '18px',
    height: '18px',
    flexShrink: '0',
    marginTop: '2px',
    fontSize: '11px',
    color: 'dark',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    fontSize: '14px',
    color: 'textSecondary',
    lineHeight: '1.68',
    fontWeight: '300'
  }
}
