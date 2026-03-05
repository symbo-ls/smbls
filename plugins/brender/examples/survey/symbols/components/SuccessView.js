export const SuccessView = {
  extends: 'Flex',
  flow: 'y',
  flexAlign: 'center center',
  gap: 'B2',
  padding: 'D2',
  background: 'white',
  round: 'C2',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'slate200',

  IconWrap: {
    extends: 'Flex',
    flexAlign: 'center center',
    boxSize: 'E',
    round: '100%',
    background: 'emerald100',
    Svg: {
      viewBox: '0 0 24 24',
      width: '48',
      height: '48',
      html: '<path d="M20 6L9 17l-5-5" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
    }
  },

  Title: {
    extends: 'Flex',
    tag: 'h2',
    text: 'Report Synced!',
    fontSize: 'D',
    fontWeight: '900',
    color: 'slate900'
  },

  Subtitle: {
    extends: 'Flex',
    tag: 'p',
    text: 'Your data is now visible in the results dashboard.',
    fontSize: 'B',
    color: 'slate600',
    fontWeight: '500'
  },

  Actions: {
    extends: 'Flex',
    gap: 'A',
    marginTop: 'A',

    DashboardBtn: {
      extends: 'Flex',
      tag: 'button',
      type: 'button',
      text: 'View Dashboard',
      padding: 'A C',
      round: 'B',
      cursor: 'pointer',
      borderWidth: '0',
      background: 'indigo600',
      color: 'white',
      fontWeight: '700',
      fontSize: 'B',
      onClick: (e, el, s) => {
        el.call('switchView', s, 'dashboard')
      }
    },

    NewEntryBtn: {
      extends: 'Flex',
      tag: 'button',
      type: 'button',
      text: 'New Entry',
      padding: 'A C',
      round: 'B',
      cursor: 'pointer',
      borderWidth: '0',
      background: 'slate100',
      color: 'slate700',
      fontWeight: '700',
      fontSize: 'B',
      onClick: (e, el, s) => {
        s.update({ isSubmitted: false, phase: 1 })
        el.call('switchView', s, 'survey')
        el.call('switchPhase', s, 1)
      }
    }
  }
}
