export const Investors = {
  flow: 'y',
  gap: 'B',
  H6: {
    text: 'Investors:',
  },
  Grid: {
    templateColumns: 'repeat(3, 1fr)',
    '@tabletM': {
      templateColumns: 'repeat(2, 1fr)',
    },
    gap: 'B',
    childExtends: [
      'AvatarHgroup',
    ],
    childProps: {
      color: 'title',
      gap: 'Z2',
      align: 'start',
      href: '{{ href }}',
      Avatar: {
        margin: '0',
        boxSize: 'B',
        src: '{{ avatar }}',
      },
      Hgroup: {
        H: {
          tag: 'h6',
          fontSize: 'A1',
          fontWeight: '600',
          margin: '0',
          text: '{{ name }}',
        },
        P: {
          text: '{{ title }}',
        },
      },
    },
    childrenAs: 'state',
    children: [
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQG6VLe-hAv2HA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1621306128570?e=1759363200&v=beta&t=Z4SUlB9y2OqIjf9LbU7n0AH94wsMaTpvDsrm4qcb7bg',
        name: 'Matt Pallakoff',
        title: 'Innovative Product Design Leader | ex Apple, Nook, Suki',
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C4D03AQFbQdWExHLa6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1581961324261?e=1759363200&v=beta&t=0SudX05ax6HYAjQSOLkoC_wIXtRjC-TmjVzjwZe1eqE',
        name: 'Irakli Janiashvili',
        title: 'Software Engineer at Lightdash ⚡️',
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQFUHNpe3mba6A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1606841237051?e=1759363200&v=beta&t=Qt6Hy2Z0ZP69PxSknUmHhrP_xNJjy0ag8k-Hw7ftwpE',
        name: 'Tamar Chkhaidze',
        title: 'Senior Tax Consultant at PwC',
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        name: 'Natia Tsintsadze',
        title: 'Co-founder at Archy',
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5103AQExz0EA26jyFA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517614662229?e=2147483647&v=beta&t=RnmXzUwXGyhJkn1UiYbAmPfOULfSnyqk6FWqqweSnMw',
        name: 'Revaz Zakalashvili',
        title: 'Tech Lead & Senior Software Engineer',
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        name: 'Revaz Maisashvili',
        title: 'Financial Director',
      },
    ],
    '@mobileL': {
      templateColumns: 'repeat(1, 1fr)',
    },
  },
};