export const Packages = {
  extend: 'Box',
  props: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: 'fit-content',
    position: 'relative',
    ':before': {
      content: `''`,
      boxSize: '100% D',
      position: 'absolute',
      top: '0',
      left: '0',
      background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      pointerEvents: 'none',
      display: 'none',
      '@tabletS': {
        display: 'block',
      },
    },
    ':after': {
      content: `''`,
      boxSize: '100% D',
      background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      position: 'absolute',
      top: '0',
      right: '0',
      pointerEvents: 'none',
      display: 'none',
      '@tabletS': {
        display: 'block',
      },
    },
    '@tabletS': {
      overflowX: 'hidden',
    },
  },
  Grid: {
    columns: '2fr 3fr 3fr',
    childExtends: 'Flex',
    '@tabletL': {
      columns: 'repeat(2, auto)',
      rowGap: 'E',
    },
    '@tabletS': {
      display: 'flex',
      overflow: 'auto',
      padding: '- E - D',
    },
    '@mobileM': {
      padding: '- C',
    },
    '@mobileS': {
      padding: '- B2 - B2',
    },
    childProps: {
      tag: 'form',
      flow: 'y',
      align: 'flex-start flex-start',
      Hgroup: {
        gap: 'Z1',
        H: {
          tag: 'h6',
          fontSize: 'C1',
          fontWeight: '700',
        },
        P: {
          color: 'title',
        },
      },
    },
    children: [
      {
        padding: '- D - -',
        '@mobileS': {
          padding: '- B2 - -',
        },
        Hgroup: {
          H: {
            text: 'Free',
          },
          P: {
            text: 'Unlimited members plan',
          },
        },
        IconText: {
          gap: 'Z',
          margin: 'C - - -',
          text: 'Your current plan',
          fontWeight: '900',
          Icon: {
            attr: {
              name: 'check',
            },
          },
        },
        P: {
          margin: 'A2 - D -',
          maxWidth: 'G',
          text: 'Collaborate and launch your project free with your team.',
        },
        PackageIncludes: {
          children: null,
        },
      },
      {
        padding: '- D - C1',
        borderStyle: 'solid',
        borderColor: 'blue.25',
        borderWidth: '0 1px 0',
        '@tabletL': {
          borderWidth: '0 0 0 1px',
        },
        '@tabletS': {
          borderWidth: '0 1px 0',
        },
        '@mobileS': {
          padding: '- B2 - B2',
        },
        onSubmit: null,
        Hgroup: {
          H: {
            text: 'Starter',
          },
          P: {
            text: 'Limited offer infinite members - available now in beta',
          },
        },
        PriceOptions: {
          margin: 'C - B2 -',
          '@mobileM': {
            flow: 'y',
            gap: 'B',
          },
          childProps: {
            Radio: {
              checked: null,
              name: 'starter',
              Input: {
                name: 'starter',
              },
            },
          },
        },
        Button: {
          theme: 'primary',
          text: 'Upgrade',
          flow: 'row-reverse',
          padding: 'Z1 C',
          fontWeight: '700',
          gap: 'Y1',
          type: 'submit',
          Icon: {
            name: 'chevronUp',
          },
        },
        PackageIncludes: {
          margin: 'B2+W1 - - -',
          children: null,
        },
        AsteriskParagraph: {
          margin: 'C - 0 -',
        },
      },
      {
        padding: '- - - C1',
        '@tabletL': {
          padding: '- - - 0',
          gridColumn: 'span 2',
          maxWidth: 'fit-content',
        },
        '@tabletS': {
          padding: '- - - C1',
        },
        '@mobileS': {
          padding: '- - - B2',
        },
        onSubmit: null,
        Hgroup: {
          H: {
            text: 'Experts',
          },
          P: {
            text: 'Get a custom UI—built by Symbols experts',
          },
        },
        PriceOptions: {
          margin: 'C - B2 -',
          '@mobileM': {
            flow: 'y',
            gap: 'B',
          },
          childProps: {
            Radio: {
              checked: null,
              name: 'experts',
              Input: {
                name: 'experts',
              },
            },
          },
          children: null,
        },
        IconButton: {
          margin: '-D+Z1 0 C1+Y A2',
          alignSelf: 'end',
          theme: 'transparent',
          padding: '0',
          '@screenMS': {
            margin: '-D+Z1 -B2 C1+Y A2',
          },
          '@screenS': {
            margin: '-D+Z1 -A1 C1+Y A2',
          },
          '@tabletL': {
            margin: '-D+Z1 0 C1+Y A2',
          },
          '@tabletS': {
            margin: '-D+Z1 -C C1+Y A2',
          },
          '@mobileM': {
            margin: '-D+Z1 C C1+Y A2',
          },
          Icon: {
            name: null,
            fontSize: 'B',
          },
          onClick: null,
        },
        PriceOptions_2: {
          hide: null,
          margin: '- - B2 -',
          '@mobileM': {
            flow: 'y',
            gap: 'B',
          },
          childProps: {
            Radio: {
              name: 'experts',
              Input: {
                name: 'experts',
              },
            },
          },
          children: null,
        },
        Button: {
          theme: 'primary',
          text: 'Hire Experts',
          flow: 'row-reverse',
          padding: 'Z1 C',
          type: 'submit',
          fontWeight: '700',
          gap: 'Y1',
          Icon: {
            name: 'chevronUp',
            transform: 'rotate(45deg)',
            display: 'block',
            margin: '-W2 - - -',
          },
        },
        PackageIncludes: {
          margin: 'B2+W1 - - -',
          children: null,
        },
        Flex: {
          align: 'flex-start flex-start',
          gap: 'D2',
          margin: 'auto - - -',
          '@tabletL': {
            margin: 'D - - -',
          },
          '@mobileM': {
            flow: 'y',
            gap: 'B1',
          },
          AsteriskParagraph: {
            Span: {},
            Span_2: {
              text: `To hear more pricing options or custom inquiries
              book 30 minutes free call with our sales`,
              maxWidth: 'G+D',
            },
          },
          Link: {
            href: 'https://cal.com/symbols-josh/early-access',
            whiteSpace: 'nowrap',
            text: 'Contact sales',
            padding: '0',
            fontWeight: '700',
            target: '_blank',
            color: 'title',
            '@mobileS': {
              margin: '- - - Z1',
            },
            ':hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    ],
  },
};