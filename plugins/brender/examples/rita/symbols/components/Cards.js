// ─── Card Link (shared) ─────────────────────────────────────────────────────

export const CardLink = {
  extends: 'Link',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  fontWeight: '500',
  fontFamily: "'DM Mono', monospace",
  color: 'accent',
  marginTop: '24px',
  opacity: '0.7',
  transition: 'opacity 160ms cubic-bezier(0.0, 0.0, 0.2, 1), gap 160ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { opacity: '1', gap: '9px' }
}

// ─── Service Card (light) ───────────────────────────────────────────────────

export const ServiceCard = {
  tag: 'article',
  background: 'warmWhite',
  padding: '40px',
  borderRadius: '8px',
  transition: 'background 200ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { background: 'bgSubtle' },

  Icon: {
    fontSize: '18px',
    marginBottom: '24px',
    display: 'block',
    lineHeight: '1',
    opacity: '0.6'
  },
  Title: {
    tag: 'h3',
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    color: 'dark',
    marginBottom: '10px'
  },
  Text: {
    tag: 'p',
    fontSize: '14px',
    color: 'textSecondary',
    lineHeight: '1.72',
    fontWeight: '400'
  },
  Link: {
    extends: 'CardLink',
  }
}

// ─── Service Card variants ──────────────────────────────────────────────────

export const CoachingCard = {
  extends: 'ServiceCard',
  Icon: { extends: 'ServiceCard.Icon', text: '\uD83C\uDFAF' },
  Title: { extends: 'ServiceCard.Title', text: 'Coaching & Workshops' },
  Text: { extends: 'ServiceCard.Text', text: "Nurturing your startup's journey: Deep-dive conversations, practical workshops, and personalised coaching for business growth." },
  Link: { extends: 'ServiceCard.Link', href: '/from-workshops-to-1-on-1s', text: 'Learn more \u2192' }
}

export const FreelanceCard = {
  extends: 'ServiceCard',
  Icon: { extends: 'ServiceCard.Icon', text: '\uD83D\uDE80' },
  Title: { extends: 'ServiceCard.Title', text: 'Freelance Services' },
  Text: { extends: 'ServiceCard.Text', text: 'Hands-on, operative help with sales and marketing. Impactful strategies and hands-on execution to level up your digital presence.' },
  Link: { extends: 'ServiceCard.Link', href: '/hire-me-as-a-freelancer', text: 'Learn more \u2192' }
}

export const ReferencesCard = {
  extends: 'ServiceCard',
  Icon: { extends: 'ServiceCard.Icon', text: '\u2b50' },
  Title: { extends: 'ServiceCard.Title', text: 'References & Partners' },
  Text: { extends: 'ServiceCard.Text', text: 'Read about my previous engagements, success stories and references and what partners say about our joint successes.' },
  Link: { extends: 'ServiceCard.Link', href: '/references-and-partners', text: 'Learn more \u2192' }
}

export const AngelCard = {
  extends: 'ServiceCard',
  Icon: { extends: 'ServiceCard.Icon', text: '\uD83D\uDCA1' },
  Title: { extends: 'ServiceCard.Title', text: 'Angel Investment' },
  Text: { extends: 'ServiceCard.Text', text: "As part of the Wise Angels Network, I'm always on the lookout for tech startups to invest in as well as offer my support on growth-related topics." },
  Link: { extends: 'ServiceCard.Link', href: '/angel-investment', text: 'Learn more \u2192' }
}

// ─── Dark Service Card Link ─────────────────────────────────────────────────

export const DarkCardLink = {
  extends: 'Link',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  fontWeight: '500',
  fontFamily: "'DM Mono', monospace",
  color: 'darkWhite68',
  marginTop: '24px',
  transition: 'color 160ms cubic-bezier(0.0, 0.0, 0.2, 1), gap 160ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { color: 'cream92', gap: '9px' }
}
