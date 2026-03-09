export const ListingItem = {
  IconText: {
    color: 'paragraph',
    flow: 'column',
    gap: 'Z',
    padding: '0',
    tag: 'button',
    background: 'transparent',
    border: '0',
    fontSize: 'A',
    cursor: 'pointer',
    margin: 'W - -',
    Icon: {
      name: 'check',
      color: 'dim',
      '.isActive': {
        color: 'orange',
      },
    },
    '!isActive': {
      ':hover svg': {
        color: 'disabled',
      },
    },
    onClick: (ev, el, s) => {
      const isActive = s.isActive
      s.update({
        isActive: !isActive,
        upvotes: isActive ? s.upvotes - 1 : s.upvotes + 1
      })
    },
  },
  Hgroup: {
    H: {
      extends: 'Link',
      tag: 'h6',
      text: 'Flexbox in Editor',
      fontWeight: '700',
    },
    P: {
      text: null,
      childProps: {
        display: 'inline',
      },
      children: [
        'by ',
        {
          Link: {
            text: 'kiaynwang',
          },
        },
        ' ',
        {
          Link: {
            text: '3 hours ago',
          },
        },
        ' ・ ',
        {
          Link: {
            text: '49 commnts',
          },
        },
      ],
    },
  },
  extends: 'Flex',
  gap: 'A2',
  alignItems: 'flex-start',
};