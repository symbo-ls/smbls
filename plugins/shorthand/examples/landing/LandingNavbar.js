export const LandingNavbar = {
  extends: 'Navbar',
  gap: 'A2',
  justifyContent: 'flex-start',
  align: 'center',
  left: '0',
  width: '50%',
  padding: 'Y1 D Y1 A',
  fontSize: 'Z2',
  userSelect: 'none',
  position: 'absolute',
  top: 'W1',
  zIndex: 9999999,

  '@tabletS': {
    width: '100%',
    padding: 'X2 B',
    justifyContent: 'space-between'
  },
  border: '0',
  theme: null,
  Logo: {
    position: 'relative',
    icon: 'logo',
    top: 'auto',
    left: 'auto',
    theme: 'transparent',
    margin: '- B - -',
    '@tabletS': {
      fontSize: 'E',
      margin: '- 0 - -',
      padding: '0'
    }
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'B',
    '@tabletS': {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'caption',
      fontWeight: '400',
      opacity: '.8',
      ':hover': {
        opacity: '1',
        color: 'title'
      }
    },
    children: [
      {
        href: '/solutions',
        text: 'Solutions'
      },
      {
        href: '/marketplace',
        text: 'Marketplace'
      },
      {
        href: '/about',
        text: 'About'
      },
      {
        href: '/developers',
        text: 'Developers'
      },
      {
        href: '/pricing',
        text: 'Pricing'
      }
    ]
  },
  MenuIcon: {
    display: 'none',
    '@tabletS': {
      display: 'flex'
    },
    onClick: (event, element, state) => state.toggle('activeMenu')
  }
}
