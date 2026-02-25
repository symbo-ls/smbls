// ── Avatar ──
export const Avatar = {
  ext: 'smbls.Avatar',
  bsz: 'C2'
}

// ── Field ──
export const Field = {
  tg: 'label',
  Input: {
    rnd: 'C',
    p: 'Z2 C Z2 A2',
    phd: 'Placeholder',
    mnw: '100%'
  },
  Icon: {
    ico: 'info',
    fs: 'A2',
    lh: '1em',
    pos: 'absolute',
    rgt: 'Z2',
    op: '.45'
  },
  ext: 'Flex',
  thm: 'field',
  aln: 'center flex-start',
  rnd: 'D',
  pos: 'relative'
}

// ── Stars ──
export const Stars = {
  ext: 'Flex',
  cex: 'Icon',
  fs: 'B',
  g: 'W',
  ch: [
    {
      nm: 'star'
    },
    {
      nm: 'star'
    },
    {
      nm: 'star'
    },
    {
      nm: 'star'
    },
    {
      nm: 'star'
    }
  ]
}

// ── Pills ──
export const Pills = {
  ext: 'Flex',
  cex: 'Link',
  g: 'C1',
  cp: {
    bsz: 'Z',
    rnd: '100%',
    cur: 'pointer',
    tx: '',
    ".isActive": {
      thm: 'primary'
    },
    "!isActive": {
      thm: 'tertiary'
    },
    ":active": {
      thm: 'primary'
    }
  },
  ch: [
    {},
    {
      isActive: true
    }
  ],
  tg: 'nav'
}

// ── Modal ──
export const Modal = {
  Hgroup: {
    g: 'X1',
    H: {
      tg: 'h5',
      fw: '700'
    },
    P: {}
  },
  IconButton: {
    pos: 'absolute',
    rgt: 'X2',
    tp: 'X2',
    rnd: '100%',
    $isSafari: {
      tp: 'Z2',
      rgt: 'Z2'
    },
    Icon: {
      nm: 'x'
    }
  },
  ext: 'Flex',
  bsz: 'fit-content',
  aln: 'stretch flex-start',
  mnw: 'G+B',
  pos: 'relative',
  rnd: 'B',
  thm: 'dialog',
  fl: 'y',
  p: 'A2 A2 A1 A2',
  bdst: 'none'
}

// ── ButtonSet ──
export const ButtonSet = {
  ext: 'Flex',
  cex: 'Button',
  g: 'Z',
  aln: 'center flex-start',
  cp: {
    thm: 'dialog',
    p: 'A1 B2'
  },
  ch: [
    {
      tx: 'BUTTON 1'
    },
    {
      tx: 'BUTTEN 2'
    }
  ]
}

// ── NumberPicker ──
export const NumberPicker = {
  st: {
    currentValue: 0
  },
  Minus: {
    ext: 'IconButton',
    Icon: {
      nm: 'minus'
    },
    "@ck": (event, element, state) => {
          if (state.currentValue <= 0) return
          state.update({
            currentValue: state.currentValue - 1
          })
        }
  },
  Value: {
    tx: '{{ currentValue }}'
  },
  Plus: {
    ext: 'IconButton',
    Icon: {
      nm: 'plus'
    },
    "@ck": (event, element, state) => {
          state.update({
            currentValue: state.currentValue + 1
          })
        }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z',
  "> button": {
    thm: 'transparent'
  }
}

// ── Accordion ──
export const Accordion = {
  st: {
    activeAccordion: false
  },
  ButtonParagraph: {
    cur: 'pointer',
    g: 'D1',
    "@ck": (event, element, state) => {
          state.update({
            activeAccordion: !state.activeAccordion
          })
    
        },
    P: {
      tx: 'Question text one here'
    },
    Button: {
      tx: '',
      Icon: {
        nm: 'chevronDown',
        ".activeAccordion": {
          tf: 'rotate(-180deg)'
        },
        trn: 'transform .3s ease'
      }
    }
  },
  P: {
    tx: 'Use a checkbox when users can select one option, multiple options, or no option from a list of a possible options',
    m: '0',
    mxw: 'H',
    mnw: 'H',
    pos: 'absolute',
    lft: '0',
    tp: '2em',
    trn: 'min-height .3s ease, max-height .3s ease, opacity .3s ease',
    ov: 'hidden',
    ".activeAccordion": {
      mnh: '4em',
      mxh: '10em',
      op: '1'
    },
    "!activeAccordion": {
      mnh: '0',
      mxh: '0',
      op: '0'
    }
  },
  ext: 'Flex',
  fl: 'y',
  g: 'Y2',
  pos: 'relative'
}

// ── AvatarChatPreview ──
export const AvatarChatPreview = {
  Avatar: {},
  Flex: {
    fl: 'y',
    fx: '1',
    "> *": {
      mnw: '100%'
    },
    ValueHeading: {
      H: {},
      UnitValue: {
        fl: 'row-reverse',
        Unit: {
          tx: 'am'
        },
        Value: {
          tx: '2:20'
        }
      }
    },
    NotCounterParagraph: {
      P: {
        ws: 'nowrap',
        ov: 'hidden',
        mxw: 'F2'
      },
      NotificationCounter: {}
    }
  },
  ext: 'Flex',
  g: 'Z1',
  mnw: 'G3',
  aln: 'center flex-start'
}

// ── SearchDropdown ──
export const SearchDropdown = {
  st: {
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
    tx: '{{ selected }}',
    p: 'Z A2',
    mnh: 'B2',
    pos: 'relative',
    cur: 'pointer',
    c: 'caption',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      c: 'blue'
    },
    "@ck": (e, el, s) => s.toggle('isOpen')
  },
  Options: {
    shw: (el, s) => s.isOpen,
    bdw: '1px 0 0 0',
    bdst: 'solid',
    bdc: 'line .35',
    p: 'Z Z2',
    thm: 'dialog',
    fxf: 'y',
    rnd: '0 0 A2 A2',
    Input: {
      thm: 'field-dialog',
      phd: 'Search and Select',
      p: 'Y2 A',
      m: '- -Y',
      d: 'block',
      mnw: '',
      bxs: 'border-box',
      bd: 'none',
      ol: 'none',
      "@ip": (e, el, state) => {
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
      mt: 'X',
      shw: (el, s) => !!s.searchValue && s.filtered.length,
      ch: (el, s) => s.filtered,
      cha: 'state',
      cp: {
        p: 'Z',
        tx: '{{ value }}',
        "@ck": (ev, el, s) => {
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
      p: 'Z',
      shw: (el, s) => !s.searchValue,
      tx: 'Enter name to search',
      c: 'disabled'
    },
    NoResults: {
      p: 'Z',
      shw: (el, s) => !!s.searchValue && !s.filtered.length,
      tx: 'No results found',
      c: 'disabled'
    }
  },
  pos: 'relative',
  w: 'G3',
  thm: 'field',
  rnd: 'A2'
}

// ── Badge ──
export const Badge = {
  tg: 'label',
  tx: '-2.902',
  ext: 'Flex',
  aln: 'cemter center',
  thm: 'warning',
  rnd: 'C',
  lh: '1em',
  bxs: 'content-box',
  p: 'X1 Z1',
  bgc: '',
  bdr: ''
}

// ── Breadcrumb ──
export const Breadcrumb = {
  tg: 'nav',
  cex: 'Link',
  d: 'flex',
  aln: 'center',
  cp: {
    fw: '400',
    td: 'none',
    scrollToTop: false,
    c: 'white 0.35',
    "&[href]": {
      c: 'title',
      "&:hover": {
        td: 'underline'
      }
    },
    "&:not([href])": {
      cur: 'default'
    },
    "&:not(:first-child):before": {
      cnt: '""',
      d: 'inline-block',
      w: '2px',
      h: '2px',
      bdr: '100%',
      bg: 'white',
      va: '0.2em',
      marginInline: '.65em',
      op: '.5'
    }
  },
  ch: (el, s, ctx) => {
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
  ext: 'Flex',
  cex: 'Button',
  p: 'V2+V2',
  rnd: 'D',
  bg: 'gray .1',
  w: 'fit-content',
  ch: [
    {
      tx: 'build',
      isActive: true,
      thm: 'dialog-elevated'
    },
    {
      tx: 'test'
    }
  ],
  cp: {
    Icon: null,
    rnd: 'D',
    fw: '400',
    p: 'Z B1',
    tt: 'capitalize',
    ".isActive": {
      thm: 'document'
    },
    thm: 'transparent'
  }
}

// ── CircleProgress ──
export const CircleProgress = {
  tg: 'progress',
  at: {
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
  bsz: 'D D',
  val: 0.73,
  rnd: '100%',
  ov: 'hidden',
  pos: 'relative',
  "&::-webkit-progress-bar": {
    bg: 'gray'
  },
  "&::-webkit-progress-value": {
    thm: 'primary'
  },
  ":after": {
    cnt: '""',
    pos: 'absolute',
    w: 'B+B2',
    h: 'B+B2',
    rnd: '100%',
    tp: '50%',
    lft: '50%',
    tf: 'translate(-50%, -50%)',
    bg: 'codGray'
  }
}

// ── Pagination ──
export const Pagination = {
  Left: {
    ext: 'IconButton',
    Icon: {
      nm: 'chevronLeft'
    },
    "@ck": (event, element, state) => {
          state.update({})
        }
  },
  Flex: {
    g: 'Z',
    cp: {
      ar: '1 / 1',
      bsz: 'C+Y2 C+Y2',
      rnd: '100%',
      p: 'A',
      thm: 'field',
      isActive: (element, state) => state.active === parseInt(element.key),
      ".isActive": {
        thm: 'primary'
      }
    },
    cex: 'Button',
    ch: [
      {
        tx: '1'
      },
      {
        tx: '2'
      },
      {
        tx: '3'
      },
      {
        tx: '4'
      },
      {
        tx: '5'
      }
    ]
  },
  Right: {
    ext: 'IconButton',
    Icon: {
      nm: 'chevronRight'
    },
    "@ck": (event, element, state) => {
          state.update({})
        }
  },
  ext: 'Flex',
  g: 'A',
  aln: 'center fllex-start'
}

// ── UserNavbar ──
export const UserNavbar = {
  AvatarStatus: {
    m: '-W - - -',
    Avatar: {},
    Status: {}
  },
  Hgroup: {
    g: 'W',
    H: {
      tg: 'h5',
      tx: 'Nika Tomadze'
    },
    P: {
      tx: 'active now'
    }
  },
  IconButtonSet: {
    m: '- - - auto',
    cp: {
      Icon: {}
    },
    ch: () => [{}, {}]
  },
  ext: 'Flex',
  mnw: 'G2',
  aln: 'center flex-start',
  g: 'Z'
}

// ── StoryCard ──
export const StoryCard = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    bsz: '100%',
    zi: '2',
    rnd: 'A'
  },
  Icon: {
    ico: 'smile',
    pos: 'absolute',
    zi: '2',
    tp: '35%',
    lft: '50%',
    fs: 'J1+F1',
    tf: 'translate(-50%, -50%)',
    c: 'white'
  },
  HgroupSteps: {
    pos: 'absolute',
    bot: '0',
    lft: '0',
    zi: '2',
    mnw: '100%',
    mxw: '100%',
    rnd: '0',
    p: 'B1',
    thm: 'field',
    Hgroup: {
      H: {
        tx: 'Symbols'
      },
      P: {
        c: 'white .65'
      }
    },
    ProgressStepSet: {
      cp: {
        thm: 'field-dialog'
      },
      ch: () => [{}, {}]
    }
  },
  ext: 'Flex',
  pos: 'relative',
  rnd: 'B2',
  bsz: 'H1 G3',
  as: 'flex-start',
  ov: 'hidden'
}

// ── Progress ──
export const Progress = {
  tg: 'progress',
  at: {
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
  ext: 'Flex',
  h: 'X',
  mnw: 'F3',
  rnd: 'Y',
  ov: 'hidden',
  "::-webkit-progress-bar": {
    "@dark": {
      bg: 'gray'
    },
    "@light": {
      bg: 'hurricane'
    }
  },
  "::-webkit-progress-value": {
    bdr: 'Y',
    thm: 'primary'
  }
}

// ── ToggleCaption ──
export const ToggleCaption = {
  Caption: {
    tx: 'Caption'
  },
  Toggle: {
    Input: {},
    Flex: {
      ":after": {}
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z'
}

// ── LandingNavbar ──
export const LandingNavbar = {
  ext: 'Navbar',
  g: 'A2',
  jc: 'flex-start',
  aln: 'center',
  lft: '0',
  w: '50%',
  p: 'Y1 D Y1 A',
  fs: 'Z2',
  us: 'none',
  pos: 'absolute',
  tp: 'W1',
  zi: 9999999,
  "@tabletS": {
    w: '100%',
    p: 'X2 B',
    jc: 'space-between'
  },
  bd: '0',
  thm: null,
  Logo: {
    pos: 'relative',
    ico: 'logo',
    tp: 'auto',
    lft: 'auto',
    thm: 'transparent',
    m: '- B - -',
    "@tabletS": {
      fs: 'E',
      m: '- 0 - -',
      p: '0'
    }
  },
  Nav_2: {
    fxf: 'x',
    g: 'B',
    "@tabletS": {
      d: 'none'
    },
    cex: 'DocsLink',
    cp: {
      c: 'caption',
      fw: '400',
      op: '.8',
      ":hover": {
        op: '1',
        c: 'title'
      }
    },
    ch: [
      {
        hrf: '/solutions',
        tx: 'Solutions'
      },
      {
        hrf: '/marketplace',
        tx: 'Marketplace'
      },
      {
        hrf: '/about',
        tx: 'About'
      },
      {
        hrf: '/developers',
        tx: 'Developers'
      },
      {
        hrf: '/pricing',
        tx: 'Pricing'
      }
    ]
  },
  MenuIcon: {
    d: 'none',
    "@tabletS": {
      d: 'flex'
    },
    "@ck": (event, element, state) => state.toggle('activeMenu')
  }
}

// ── CTAButtons ──
export const CTAButtons = {
  g: 'D',
  aln: 'center',
  ch: [
    {
      ext: [
        'Link',
        'Button'
      ],
      hrf: '/signup',
      tx: 'Get Started',
      thm: 'primary',
      c: 'title',
      fw: '700',
      mnh: '42px',
      mxh: '42px',
      p: '- D+W'
    }
  ]
}

// ── FeatureItem ──
export const FeatureItem = {
  ext: 'Link',
  bdst: 'solid',
  bdw: '1px',
  bdc: 'line',
  pos: 'relative',
  wr: 'G1',
  trn: 'A defaultBezier',
  trnp: 'color, background, border',
  p: 'F1 B1 C1',
  rnd: 'B2',
  "@mobileS": {
    sy: {
      minWidth: '100% !important',
      maxWidth: '100% !important',
      scrollSnapAlign: 'start'
    }
  },
  ":hover": {
    c: 'title',
    bdc: 'line-highlight',
    "& span": {
      c: 'highlight .9'
    }
  },
  H3: {
    trn: 'A defaultBezier color',
    fw: '700',
    c: 'title',
    fs: 'A2+X',
    Span: {
      trn: 'A defaultBezier color',
      fw: '100'
    }
  },
  Icon: {
    pos: 'absolute',
    fs: 'D1',
    tp: 'A1',
    lft: 'A1'
  }
}

// ── TestimonialCard ──
export const TestimonialCard = {
  fl: 'y',
  g: 'Z2',
  p: 'A B',
  mnw: 'G',
  mxw: 'G',
  rnd: 'A',
  thm: 'field',
  trn: 'A defaultBezier opacity',
  "@mobileL": {
    mnw: '85vw',
    mxw: '85vw',
    sy: {
      scrollSnapAlign: 'start'
    }
  },
  P: {
    tx: '',
    c: 'title',
    m: '0',
    lh: '1.5',
    fw: '400',
    fs: 'Z1'
  },
  Flex: {
    fl: 'x',
    g: 'Z1',
    aln: 'center flex-start',
    m: 'Y1 - - -',
    Avatar: {
      src: 'james.svg',
      bsz: 'B2 B2'
    },
    Flex_2: {
      aln: 'start',
      fl: 'y',
      g: '0',
      Strong: {
        tx: '',
        c: 'title',
        fs: 'Z1',
        fw: '600'
      },
      Caption: {
        tx: '',
        fs: 'Z',
        fw: '300',
        c: 'caption'
      }
    }
  }
}

// ── Banner ──
export const Banner = {
  p: 'F+X2 - - -',
  fl: 'y',
  pos: 'relative',
  ai: 'center',
  w: '100%',
  mxh: '100%',
  "@heightM": {},
  "@heightL": {
    p: 'D2 - - -'
  },
  ":after": {
    cnt: '""',
    bsz: '60% 100%',
    pos: 'absolute',
    bot: '0',
    lft: '0',
    zi: '2'
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    bg: 'gray15',
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  "> *:not(:first-child)": {
    zi: '2'
  },
  Scene: {
    pos: 'absolute',
    tp: '0',
    lft: '0',
    zi: '1',
    "@light": {
      bg: 'gray15',
      ":after": {
        cnt: '""',
        bsz: '100% 100%',
        pos: 'absolute',
        tp: '0',
        lft: '0',
        bg: 'gray15 .75'
      }
    }
  },
  BannerHgroup: {
    zi: '2'
  },
  TabSet: {
    m: 'D2+Y2 - B2+W -',
    bg: 'black .25',
    "@heightM": {
      m: 'C2 - B2+W -'
    }
  },
  BannerImg: {
    w: '96%'
  },
  TabSetTwo: {
    pos: 'absolute',
    bot: 'C',
    zi: '10 !important',
    cp: {
      ":first-child": {
        bg: 'linear-gradient(to right,  #00A2E7, #185DF3, #1E54F0, #8B4CCA, #8B4CCA)'
      },
      "@light": {
        ":first-child": {
          c: 'white'
        }
      }
    }
  }
}

