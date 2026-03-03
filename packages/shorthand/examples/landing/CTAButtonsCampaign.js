export const CTAButtonsCampaign = {
  gap: 'D',
  align: 'center',
  children: [
    {
      extends: [
        'Link',
        'Button',
      ],
      href: '/signup',
      text: 'Start for free',
      theme: 'primary',
      fontWeight: '700',
      minHeight: '42px',
      maxHeight: '42px',
      padding: '- D+W',
    },
    {
      extends: [
        'DocsLink',
      ],
      href: 'https://cal.com/symbols-josh/early-access',
      target: '_blank',
      text: 'Book a demo',
      theme: 'transparent',
      fontWeight: '400',
      flow: 'row-reverse',
      color: 'title',
      gap: 'Z',
      Icon: {
        name: 'arrowUpRight',
        fontSize: 'A',
        margin: '- - -W2 X1',
      },
    },
  ],
};