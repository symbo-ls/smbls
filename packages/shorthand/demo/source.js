// ── Avatar ──
export const Avatar = {
  extends: 'smbls.Avatar',
  boxSize: 'C2'
}

// ── Field ──
export const Field = {
  tag: 'label',
  Input: {
    round: 'C',
    padding: 'Z2 C Z2 A2',
    placeholder: 'Placeholder',
    minWidth: '100%'
  },
  Icon: {
    icon: 'info',
    fontSize: 'A2',
    lineHeight: '1em',
    position: 'absolute',
    right: 'Z2',
    opacity: '.45'
  },
  extends: 'Flex',
  theme: 'field',
  align: 'center flex-start',
  round: 'D',
  position: 'relative'
}

// ── Stars ──
export const Stars = {
  extends: 'Flex',
  childExtends: 'Icon',
  fontSize: 'B',
  gap: 'W',
  children: [
    {
      name: 'star'
    },
    {
      name: 'star'
    },
    {
      name: 'star'
    },
    {
      name: 'star'
    },
    {
      name: 'star'
    }
  ]
}

// ── Pills ──
export const Pills = {
  extends: 'Flex',
  childExtends: 'Link',
  gap: 'C1',
  childProps: {
    boxSize: 'Z',
    round: '100%',
    cursor: 'pointer',
    text: '',
    ".isActive": {
      theme: 'primary'
    },
    "!isActive": {
      theme: 'tertiary'
    },
    ":active": {
      theme: 'primary'
    }
  },
  children: [
    {},
    {
      isActive: true
    }
  ],
  tag: 'nav'
}

// ── Modal ──
export const Modal = {
  Hgroup: {
    gap: 'X1',
    H: {
      tag: 'h5',
      fontWeight: '700'
    },
    P: {}
  },
  IconButton: {
    position: 'absolute',
    right: 'X2',
    top: 'X2',
    round: '100%',
    $isSafari: {
      top: 'Z2',
      right: 'Z2'
    },
    Icon: {
      name: 'x'
    }
  },
  extends: 'Flex',
  boxSize: 'fit-content',
  align: 'stretch flex-start',
  minWidth: 'G+B',
  position: 'relative',
  round: 'B',
  theme: 'dialog',
  flow: 'y',
  padding: 'A2 A2 A1 A2',
  borderStyle: 'none'
}

// ── ButtonSet ──
export const ButtonSet = {
  extends: 'Flex',
  childExtends: 'Button',
  gap: 'Z',
  align: 'center flex-start',
  childProps: {
    theme: 'dialog',
    padding: 'A1 B2'
  },
  children: [
    {
      text: 'BUTTON 1'
    },
    {
      text: 'BUTTEN 2'
    }
  ]
}

// ── NumberPicker ──
export const NumberPicker = {
  state: {
    currentValue: 0
  },
  Minus: {
    extends: 'IconButton',
    Icon: {
      name: 'minus'
    },
    onClick: (event, element, state) => {
          if (state.currentValue <= 0) return
          state.update({
            currentValue: state.currentValue - 1
          })
        }
  },
  Value: {
    text: '{{ currentValue }}'
  },
  Plus: {
    extends: 'IconButton',
    Icon: {
      name: 'plus'
    },
    onClick: (event, element, state) => {
          state.update({
            currentValue: state.currentValue + 1
          })
        }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z',
  "> button": {
    theme: 'transparent'
  }
}

// ── Accordion ──
export const Accordion = {
  state: {
    activeAccordion: false
  },
  ButtonParagraph: {
    cursor: 'pointer',
    gap: 'D1',
    onClick: (event, element, state) => {
          state.update({
            activeAccordion: !state.activeAccordion
          })
    
        },
    P: {
      text: 'Question text one here'
    },
    Button: {
      text: '',
      Icon: {
        name: 'chevronDown',
        ".activeAccordion": {
          transform: 'rotate(-180deg)'
        },
        transition: 'transform .3s ease'
      }
    }
  },
  P: {
    text: 'Use a checkbox when users can select one option, multiple options, or no option from a list of a possible options',
    margin: '0',
    maxWidth: 'H',
    minWidth: 'H',
    position: 'absolute',
    left: '0',
    top: '2em',
    transition: 'min-height .3s ease, max-height .3s ease, opacity .3s ease',
    overflow: 'hidden',
    ".activeAccordion": {
      minHeight: '4em',
      maxHeight: '10em',
      opacity: '1'
    },
    "!activeAccordion": {
      minHeight: '0',
      maxHeight: '0',
      opacity: '0'
    }
  },
  extends: 'Flex',
  flow: 'y',
  gap: 'Y2',
  position: 'relative'
}

// ── AvatarChatPreview ──
export const AvatarChatPreview = {
  Avatar: {},
  Flex: {
    flow: 'y',
    flex: '1',
    "> *": {
      minWidth: '100%'
    },
    ValueHeading: {
      H: {},
      UnitValue: {
        flow: 'row-reverse',
        Unit: {
          text: 'am'
        },
        Value: {
          text: '2:20'
        }
      }
    },
    NotCounterParagraph: {
      P: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: 'F2'
      },
      NotificationCounter: {}
    }
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start'
}

// ── SearchDropdown ──
export const SearchDropdown = {
  state: {
    isOpen: false,
    selected: 'Search and Select',
    data: [
      'Los Angeles',
      'New York',
      'San Fransisco',
      'San Diego'
    ],
    filtered: [],
    searchValue: ''
  },
  SelectedContainer: {
    text: '{{ selected }}',
    padding: 'Z A2',
    minHeight: 'B2',
    position: 'relative',
    cursor: 'pointer',
    color: 'caption',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      color: 'blue'
    },
    onClick: (e, el, s) => s.toggle('isOpen')
  },
  Options: {
    show: (el, s) => s.isOpen,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: 'line .35',
    padding: 'Z Z2',
    theme: 'dialog',
    flexFlow: 'y',
    round: '0 0 A2 A2',
    Input: {
      theme: 'field-dialog',
      placeholder: 'Search and Select',
      padding: 'Y2 A',
      margin: '- -Y',
      display: 'block',
      minWidth: '',
      boxSizing: 'border-box',
      border: 'none',
      outline: 'none',
      onInput: (e, el, state) => {
                const value = e.target.value.trim().toLowerCase()
                const filtered = state.data.filter(item =>
                  item.toLowerCase().includes(value))
                state.replace({
                  searchValue: value,
                  filtered: filtered
                })
              }
    },
    Results: {
      marginTop: 'X',
      show: (el, s) => !!s.searchValue && s.filtered.length,
      children: (el, s) => s.filtered,
      childrenAs: 'state',
      childProps: {
        padding: 'Z',
        text: '{{ value }}',
        onClick: (ev, el, s) => {
                    s.parent.update({
                      selected: s.value,
                      isOpen: false,
                      searchValue: '',
                      //filtered: []
                    })
                  }
      }
    },
    Placeholder: {
      padding: 'Z',
      show: (el, s) => !s.searchValue,
      text: 'Enter name to search',
      color: 'disabled'
    },
    NoResults: {
      padding: 'Z',
      show: (el, s) => !!s.searchValue && !s.filtered.length,
      text: 'No results found',
      color: 'disabled'
    }
  },
  position: 'relative',
  width: 'G3',
  theme: 'field',
  round: 'A2'
}

// ── Badge ──
export const Badge = {
  tag: 'label',
  text: '-2.902',
  extends: 'Flex',
  align: 'cemter center',
  theme: 'warning',
  round: 'C',
  lineHeight: '1em',
  boxSizing: 'content-box',
  padding: 'X1 Z1',
  backgroundColor: '',
  borderRadius: ''
}

// ── Breadcrumb ──
export const Breadcrumb = {
  tag: 'nav',
  childExtends: 'Link',
  display: 'flex',
  align: 'center',
  childProps: {
    fontWeight: '400',
    textDecoration: 'none',
    scrollToTop: false,
    color: 'white 0.35',
    "&[href]": {
      color: 'title',
      "&:hover": {
        textDecoration: 'underline'
      }
    },
    "&:not([href])": {
      cursor: 'default'
    },
    "&:not(:first-child):before": {
      content: '""',
      display: 'inline-block',
      width: '2px',
      height: '2px',
      borderRadius: '100%',
      background: 'white',
      verticalAlign: '0.2em',
      marginInline: '.65em',
      opacity: '.5'
    }
  },
  children: (el, s, ctx) => {
    const routeArr = (s.root.route || window.top.location.pathname).split('/').slice(1)
    return routeArr
      .map((text, i) => text === 'page' ? ({
        href: '/pages',
        text: 'Page'
      }) : el.getData('pages')['/' + text] ? ({
        href: '/' + routeArr.slice(0, i + 1).join('/'),
        text: '/' + text
      }) : ({
        href: '/' + routeArr.slice(0, i + 1).join('/'),
        text: i === 0 ? ctx.utils.toTitleCase(text) : text
      }))
      .filter((_, k) => {
        const v = routeArr[k]
        return !v.includes('-') && !v.includes('editor') && !v.includes('preview')
      })
    }
}

// ── TabSet ──
export const TabSet = {
  extends: 'Flex',
  childExtends: 'Button',
  padding: 'V2+V2',
  round: 'D',
  background: 'gray .1',
  width: 'fit-content',
  children: [
    {
      text: 'build',
      isActive: true,
      theme: 'dialog-elevated'
    },
    {
      text: 'test'
    }
  ],
  childProps: {
    Icon: null,
    round: 'D',
    fontWeight: '400',
    padding: 'Z B1',
    textTransform: 'capitalize',
    ".isActive": {
      theme: 'document'
    },
    theme: 'transparent'
  }
}

// ── CircleProgress ──
export const CircleProgress = {
  tag: 'progress',
  attr: {
    max: ({
          props
        }) => props.max,
    progress: ({
          props
        }) => props.progress,
    value: ({
          props
        }) => props.value
  },
  boxSize: 'D D',
  value: 0.73,
  round: '100%',
  overflow: 'hidden',
  position: 'relative',
  "&::-webkit-progress-bar": {
    background: 'gray'
  },
  "&::-webkit-progress-value": {
    theme: 'primary'
  },
  ":after": {
    content: '""',
    position: 'absolute',
    width: 'B+B2',
    height: 'B+B2',
    round: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'codGray'
  }
}

// ── Pagination ──
export const Pagination = {
  Left: {
    extends: 'IconButton',
    Icon: {
      name: 'chevronLeft'
    },
    onClick: (event, element, state) => {
          state.update({})
        }
  },
  Flex: {
    gap: 'Z',
    childProps: {
      aspectRatio: '1 / 1',
      boxSize: 'C+Y2 C+Y2',
      round: '100%',
      padding: 'A',
      theme: 'field',
      isActive: (element, state) => state.active === parseInt(element.key),
      ".isActive": {
        theme: 'primary'
      }
    },
    childExtends: 'Button',
    children: [
      {
        text: '1'
      },
      {
        text: '2'
      },
      {
        text: '3'
      },
      {
        text: '4'
      },
      {
        text: '5'
      }
    ]
  },
  Right: {
    extends: 'IconButton',
    Icon: {
      name: 'chevronRight'
    },
    onClick: (event, element, state) => {
          state.update({})
        }
  },
  extends: 'Flex',
  gap: 'A',
  align: 'center fllex-start'
}

// ── UserNavbar ──
export const UserNavbar = {
  AvatarStatus: {
    margin: '-W - - -',
    Avatar: {},
    Status: {}
  },
  Hgroup: {
    gap: 'W',
    H: {
      tag: 'h5',
      text: 'Nika Tomadze'
    },
    P: {
      text: 'active now'
    }
  },
  IconButtonSet: {
    margin: '- - - auto',
    childProps: {
      Icon: {}
    },
    children: () => [{}, {}]
  },
  extends: 'Flex',
  minWidth: 'G2',
  align: 'center flex-start',
  gap: 'Z'
}

// ── StoryCard ──
export const StoryCard = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    boxSize: '100%',
    zIndex: '2',
    round: 'A'
  },
  Icon: {
    icon: 'smile',
    position: 'absolute',
    zIndex: '2',
    top: '35%',
    left: '50%',
    fontSize: 'J1+F1',
    transform: 'translate(-50%, -50%)',
    color: 'white'
  },
  HgroupSteps: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    zIndex: '2',
    minWidth: '100%',
    maxWidth: '100%',
    round: '0',
    padding: 'B1',
    theme: 'field',
    Hgroup: {
      H: {
        text: 'Symbols'
      },
      P: {
        color: 'white .65'
      }
    },
    ProgressStepSet: {
      childProps: {
        theme: 'field-dialog'
      },
      children: () => [{}, {}]
    }
  },
  extends: 'Flex',
  position: 'relative',
  round: 'B2',
  boxSize: 'H1 G3',
  alignSelf: 'flex-start',
  overflow: 'hidden'
}

// ── Progress ──
export const Progress = {
  tag: 'progress',
  attr: {
    max: ({
          props
        }) => props.max,
    progress: ({
          props
        }) => props.progress,
    value: ({
          props
        }) => props.value
  },
  extends: 'Flex',
  height: 'X',
  minWidth: 'F3',
  round: 'Y',
  overflow: 'hidden',
  "::-webkit-progress-bar": {
    "@dark": {
      background: 'gray'
    },
    "@light": {
      background: 'hurricane'
    }
  },
  "::-webkit-progress-value": {
    borderRadius: 'Y',
    theme: 'primary'
  }
}

// ── ToggleCaption ──
export const ToggleCaption = {
  Caption: {
    text: 'Caption'
  },
  Toggle: {
    Input: {},
    Flex: {
      ":after": {}
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z'
}

// ── LandingNavbar ──
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
  "@tabletS": {
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
    "@tabletS": {
      fontSize: 'E',
      margin: '- 0 - -',
      padding: '0'
    }
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'B',
    "@tabletS": {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'caption',
      fontWeight: '400',
      opacity: '.8',
      ":hover": {
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
    "@tabletS": {
      display: 'flex'
    },
    onClick: (event, element, state) => state.toggle('activeMenu')
  }
}

// ── CTAButtons ──
export const CTAButtons = {
  gap: 'D',
  align: 'center',
  children: [
    {
      extends: [
        'Link',
        'Button'
      ],
      href: '/signup',
      text: 'Get Started',
      theme: 'primary',
      color: 'title',
      fontWeight: '700',
      minHeight: '42px',
      maxHeight: '42px',
      padding: '- D+W'
    }
  ]
}

// ── FeatureItem ──
export const FeatureItem = {
  extends: 'Link',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'line',
  position: 'relative',
  widthRange: 'G1',
  transition: 'A defaultBezier',
  transitionProperty: 'color, background, border',
  padding: 'F1 B1 C1',
  round: 'B2',
  "@mobileS": {
    style: {
      minWidth: '100% !important',
      maxWidth: '100% !important',
      scrollSnapAlign: 'start'
    }
  },
  ":hover": {
    color: 'title',
    borderColor: 'line-highlight',
    "& span": {
      color: 'highlight .9'
    }
  },
  H3: {
    transition: 'A defaultBezier color',
    fontWeight: '700',
    color: 'title',
    fontSize: 'A2+X',
    Span: {
      transition: 'A defaultBezier color',
      fontWeight: '100'
    }
  },
  Icon: {
    position: 'absolute',
    fontSize: 'D1',
    top: 'A1',
    left: 'A1'
  }
}

// ── TestimonialCard ──
export const TestimonialCard = {
  flow: 'y',
  gap: 'Z2',
  padding: 'A B',
  minWidth: 'G',
  maxWidth: 'G',
  round: 'A',
  theme: 'field',
  transition: 'A defaultBezier opacity',
  "@mobileL": {
    minWidth: '85vw',
    maxWidth: '85vw',
    style: {
      scrollSnapAlign: 'start'
    }
  },
  P: {
    text: '',
    color: 'title',
    margin: '0',
    lineHeight: '1.5',
    fontWeight: '400',
    fontSize: 'Z1'
  },
  Flex: {
    flow: 'x',
    gap: 'Z1',
    align: 'center flex-start',
    margin: 'Y1 - - -',
    Avatar: {
      src: 'james.svg',
      boxSize: 'B2 B2'
    },
    Flex_2: {
      align: 'start',
      flow: 'y',
      gap: '0',
      Strong: {
        text: '',
        color: 'title',
        fontSize: 'Z1',
        fontWeight: '600'
      },
      Caption: {
        text: '',
        fontSize: 'Z',
        fontWeight: '300',
        color: 'caption'
      }
    }
  }
}

// ── Banner ──
export const Banner = {
  padding: 'F+X2 - - -',
  flow: 'y',
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  maxHeight: '100%',
  "@heightM": {},
  "@heightL": {
    padding: 'D2 - - -'
  },
  ":after": {
    content: '""',
    boxSize: '60% 100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    zIndex: '2'
  },
  "@dark": {
    ":after": {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    background: 'gray15',
    ":after": {
      background: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  "> *:not(:first-child)": {
    zIndex: '2'
  },
  Scene: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1',
    "@light": {
      background: 'gray15',
      ":after": {
        content: '""',
        boxSize: '100% 100%',
        position: 'absolute',
        top: '0',
        left: '0',
        background: 'gray15 .75'
      }
    }
  },
  BannerHgroup: {
    zIndex: '2'
  },
  TabSet: {
    margin: 'D2+Y2 - B2+W -',
    background: 'black .25',
    "@heightM": {
      margin: 'C2 - B2+W -'
    }
  },
  BannerImg: {
    width: '96%'
  },
  TabSetTwo: {
    position: 'absolute',
    bottom: 'C',
    zIndex: '10 !important',
    childProps: {
      ":first-child": {
        background: 'linear-gradient(to right,  #00A2E7, #185DF3, #1E54F0, #8B4CCA, #8B4CCA)'
      },
      "@light": {
        ":first-child": {
          color: 'white'
        }
      }
    }
  }
}

