export const Folder = {
  extend: [
    'Pseudo',
  ],
  props: {
    width: '100%',
    maxWidth: 'J-default',
    padding: 'C 0 -',
    zIndex: 1,
    ':after': {
      content: '""',
      display: 'block',
      minWidth: '100%',
      minHeight: 'C2',
      '@tabletS': {
        display: 'none',
      },
    },
    '@screenS': {
      transform: 'translate3d(0, 0, 1px) !important',
    },
    '@tabletS': {
      padding: '0',
    },
    '@mobileL': {
      padding: 'A2 0 0',
    },
  },
  top: {
    extend: 'Pseudo',
    props: {
      flexFlow: 'row',
      position: 'sticky',
      top: 'D',
      style: {
        zIndex: 2,
      },
      borderRight: '1px, solid, gray',
      ':before': {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        left: '-1%',
        width: '102%',
        height: '49vh',
        background: 'darkgray',
      },
      '@tabletS': {
        top: 'B',
      },
    },
    l: {
      props: {
        background: 'darkgray',
        flex: '1',
        borderBottom: '1px, solid, gray',
        style: {
          marginLeft: -0.5,
        },
      },
    },
    r: {
      props: {
        overflow: 'hidden',
        width: '29.125em',
        margin: '0 -1px 0 0',
        '@tabletS': {
          fontSize: '.65em',
        },
        '@mobileM': {
          width: 'G1-default',
        },
      },
      svg: {
        extend: 'Svg',
        props: {
          src: '<svg fill="none" viewBox="0 0 466 48" id="folder-top-right" xmlns="http://www.w3.org/2000/svg"><g mask="url(#ha)"><path d="M60.64.5H465.5v121h4.5v-125H-67.206v51.144H.17L60.64.5z" fill="#161715"></path><path d="M465.5.5h.5V0h-.5v.5zM60.64.5V0h-.172l-.135.106.307.394zM.17 47.644v.5h.172l.135-.106-.307-.394zM465.5 121.5h-.5v.5h.5v-.5zM-67.206 47.644h-.5v.5h.5v-.5zm0-51.144V-4h-.5v.5h.5zM470-3.5h.5V-4h-.5v.5zm0 125v.5h.5v-.5h-.5zM465.5 0H60.64v1H465.5V0zM60.333.106L-.137 47.249l.614.79L60.947.893l-.614-.788zM466 121.5V.5h-1v121h1zM.17 47.144h-67.376v1H.17v-1zm-66.876.5V-3.5h-1v51.144h1zM-67.206-3H470v-1H-67.206v1zM469.5-3.5v125h1v-125h-1zM470 121h-4.5v1h4.5v-1z" fill="#756E6A"></path></g></svg>',
          aspectRatio: '466 / 48',
          display: 'block',
          '@tabletS': {
            margin: '0 -C2 0 0',
          },
          '@mobileM': {
            margin: '0 -F2-default 0 0',
          },
        },
      },
    },
  },
  cnt: {
    props: {
      minHeight: 'I',
      padding: 'A1',
      borderLeft: '1px, solid, gray',
      borderRight: '1px, solid, gray',
    },
  },
  bottom: {
    props: {
      flexFlow: 'row',
      position: 'sticky',
      top: '0',
    },
    l: {
      extend: 'Svg',
      props: {
        src: '<svg fill="none" height="78" viewBox="0 0 78 78" width="78" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path d="m0 0h78v78h-78z"/></clipPath><g clip-path="url(#a)"><path d="m.5-29.7998v30.024251l77.3 76.275549h8.2" stroke="#756e6a"/></g></svg>',
        width: '4.875em',
        aspectRatio: '1 / 1',
        '@tabletS': {
          fontSize: '.65em',
        },
      },
    },
    r: {
      props: {
        background: 'darkgray',
        flex: '1',
        borderBottom: '1px, solid, gray',
        borderRight: '1px, solid, gray',
      },
    },
  },
};