// ─── Stats ──────────────────────────────────────────────────────────────────

export const Stat = {
  padding: '28px 20px 28px 0',
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  borderRightColor: 'borderLight',

  Num: {
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '48px',
    fontWeight: '700',
    letterSpacing: '-0.05em',
    color: 'dark',
    lineHeight: '1',
    fontVariantNumeric: 'tabular-nums',
    '@mobile': { fontSize: '38px' }
  },
  Lbl: {
    fontSize: '11px',
    color: 'textTertiary',
    marginTop: '6px',
    letterSpacing: '0.04em',
    fontWeight: '400'
  }
}

export const StatsRow = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'borderLight',
  margin: '40px 0',
  '@mobile': {
    gridTemplateColumns: '1fr 1fr'
  },

  S1: {
    extends: 'Stat',
    Num: { extends: 'Stat.Num', text: '12+' },
    Lbl: { extends: 'Stat.Lbl', text: 'Years Experience' }
  },
  S2: {
    extends: 'Stat',
    Num: { extends: 'Stat.Num', text: '150+' },
    Lbl: { extends: 'Stat.Lbl', text: 'Startups Helped' },
    '@mobile': { borderRightWidth: '0' }
  },
  S3: {
    extends: 'Stat',
    borderRightWidth: '0',
    Num: { extends: 'Stat.Num', text: '2\u00d7' },
    Lbl: { extends: 'Stat.Lbl', text: 'Founder' },
    '@mobile': {
      gridColumn: 'span 2',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'borderLight'
    }
  }
}
