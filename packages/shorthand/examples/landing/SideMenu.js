export const SideMenu = {
  extends: 'LandingCampaignHeader',
  minWidth: '0',
  flow: 'y',
  gap: 'B',
  padding: 'F1 0 0 0',
  alignItems: 'flex-end',
  background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
  position: 'fixed',
  backdropFilter: 'blur(5px)',
  top: '0',
  right: '0',
  zIndex: '99999998',
  minHeight: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  maxWidth: '0',
  opacity: '0',
  '.activeMenu': {
    minWidth: '100%',
    opacity: '1',
    transition: 'min-width .15s ease',
  },
  '!activeMenu': {},
  '> nav > a': {
    fontSize: 'F2',
    fontWeight: '100',
  },
  '@mobileM': {
    alignItems: 'center',
    textAlign: 'center',
  },
  childProps: {
    childProps: {
      onClick: (event, element, state) => {
        state.update({
          activeMenu: false
        })
      },
    },
  },
  tag: 'aside',
  Logo: null,
  Nav: {
    flexFlow: 'column',
    gap: 'B',
    padding: '- E - -',
    '@tabletS': {
      display: 'flex',
    },
    '@mobileM': {
      padding: '- 0 - -',
    },
    childProps: {
      Strong: {
        fontWeight: '100',
      },
    },
  },
  P: null,
  Nav_2: {
    flexFlow: 'column',
    padding: '- C - -',
    gap: 'B',
    '@tabletS': {
      display: 'flex',
    },
    '@mobileM': {
      padding: '0 0 0 0',
    },
    childProps: {
      fontWeight: '100',
      Strong: {
        fontWeight: '100',
      },
    },
  },
  MenuIcon: null,
};