export const FooteLanding = {
  align: 'center space-between',
  padding: 'X2 A X2 A2',
  width: '100%',
  margin: '- auto',
  gap: 'B',
  '@mobileL': {
    flow: 'column',
    align: 'center center',
    gap: 'B2',
  },
  childProps: {
    '@mobileL': {
      align: 'center center',
      textAlign: 'center',
      width: '100%',
      padding: '0',
    },
  },
  Copy: {
    gap: 'X2',
    lineHeight: '1',
    '@dark': {
      color: 'gray8',
    },
    '@light': {
      color: 'gray5',
    },
    DocsLink: {
      target: '_blank',
      href: 'https://symbols.app',
      text: 'Symbols',
    },
    Year: {
      text: ' © Since 2021',
    },
    extends: 'Flex',
  },
  Flex: {
    tag: 'nav',
    childExtends: 'MenuItem',
    gap: 'Z',
    Discord: {
      target: '_blank',
      href: 'https://discord.com/invite/crdFSkapFY',
      icon: 'discord',
    },
    Github: {
      target: '_blank',
      href: 'https://github.com/symbo-ls/',
      icon: 'github',
    },
    X: {
      target: '_blank',
      href: 'https://twitter.com/symbo_ls',
      icon: 'xcom',
    },
    Linkedin: {
      target: '_blank',
      href: 'https://www.linkedin.com/company/symbo-ls/',
      icon: 'linkedin',
    },
  },
};