'use strict'

export const DefaultBlock = {
  tag: 'section',
  extends: 'Hgroup',
  gap: 'A',

  Title: {
    tag: 'h5',
    fontSize: 'A',
    fontWeight: '500',
    '@tabletS<': { alignItems: 'flex-end' },
    letterSpacing: '.2em',
    padding: '- Z1',
    textTransform: 'uppercase'
  }
}
