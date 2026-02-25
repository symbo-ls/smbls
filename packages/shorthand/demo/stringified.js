// ── Avatar ──
export const Avatar = {
  in: 'ext:smbls.Avatar bsz:C2'
}

// ── Field ──
export const Field = {
  Input: {
    phd: 'Placeholder',
    in: 'rnd:C p:Z2_C_Z2_A2 mnw:100%'
  },
  Icon: {
    in: 'ico:info fs:A2 lh:1em pos:absolute rgt:Z2 op:.45'
  },
  in: 'tg:label ext:Flex thm:field aln:center_flex-start rnd:D pos:relative'
}

// ── Stars ──
export const Stars = {
  ch: [
    {
      in: 'nm:star'
    },
    {
      in: 'nm:star'
    },
    {
      in: 'nm:star'
    },
    {
      in: 'nm:star'
    },
    {
      in: 'nm:star'
    }
  ],
  in: 'ext:Flex cex:Icon fs:B g:W'
}

// ── Pills ──
export const Pills = {
  cp: {
    tx: '',
    '.isActive': {
      in: 'thm:primary'
    },
    '!isActive': {
      in: 'thm:tertiary'
    },
    ':active': {
      in: 'thm:primary'
    },
    in: 'bsz:Z rnd:100% cur:pointer'
  },
  ch: [
    {},
    {
      in: 'isActive'
    }
  ],
  in: 'ext:Flex cex:Link g:C1 tg:nav'
}

// ── Modal ──
export const Modal = {
  Hgroup: {
    H: {
      in: 'tg:h5 fw:700'
    },
    P: {},
    in: 'g:X1'
  },
  IconButton: {
    $isSafari: {
      in: 'tp:Z2 rgt:Z2'
    },
    Icon: {
      in: 'nm:x'
    },
    in: 'pos:absolute rgt:X2 tp:X2 rnd:100%'
  },
  in: 'ext:Flex bsz:fit-content aln:stretch_flex-start mnw:G+B pos:relative rnd:B thm:dialog fl:y p:A2_A2_A1_A2 bdst:none'
}

// ── ButtonSet ──
export const ButtonSet = {
  cp: {
    in: 'thm:dialog p:A1_B2'
  },
  ch: [
    {
      tx: 'BUTTON 1'
    },
    {
      tx: 'BUTTEN 2'
    }
  ],
  in: 'ext:Flex cex:Button g:Z aln:center_flex-start'
}

// ── NumberPicker ──
export const NumberPicker = {
  st: {
    currentValue: 0
  },
  Minus: {
    Icon: {
      in: 'nm:minus'
    },
    '@ck': (event, element, state) => {
      if (state.currentValue <= 0) return
      state.update({
        currentValue: state.currentValue - 1
      })
    },
    in: 'ext:IconButton'
  },
  Value: {
    tx: '{{ currentValue }}'
  },
  Plus: {
    Icon: {
      in: 'nm:plus'
    },
    '@ck': (event, element, state) => {
      state.update({
        currentValue: state.currentValue + 1
      })
    },
    in: 'ext:IconButton'
  },
  '> button': {
    in: 'thm:transparent'
  },
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── Accordion ──
export const Accordion = {
  st: {
    activeAccordion: false
  },
  ButtonParagraph: {
    '@ck': (event, element, state) => {
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
        '.activeAccordion': {
          in: 'tf:rotate(-180deg)'
        },
        in: 'nm:chevronDown trn:transform_.3s_ease'
      }
    },
    in: 'cur:pointer g:D1'
  },
  P: {
    tx: 'Use a checkbox when users can select one option, multiple options, or no option from a list of a possible options',
    trn: 'min-height .3s ease, max-height .3s ease, opacity .3s ease',
    '.activeAccordion': {
      in: 'mnh:4em mxh:10em op:1'
    },
    '!activeAccordion': {
      in: 'mnh:0 mxh:0 op:0'
    },
    in: 'm:0 mxw:H mnw:H pos:absolute lft:0 tp:2em ov:hidden'
  },
  in: 'ext:Flex fl:y g:Y2 pos:relative'
}

// ── AvatarChatPreview ──
export const AvatarChatPreview = {
  Avatar: {},
  Flex: {
    '> *': {
      in: 'mnw:100%'
    },
    ValueHeading: {
      H: {},
      UnitValue: {
        Unit: {
          tx: 'am'
        },
        Value: {
          tx: '2:20'
        },
        in: 'fl:row-reverse'
      }
    },
    NotCounterParagraph: {
      P: {
        in: 'ws:nowrap ov:hidden mxw:F2'
      },
      NotificationCounter: {}
    },
    in: 'fl:y fx:1'
  },
  in: 'ext:Flex g:Z1 mnw:G3 aln:center_flex-start'
}

// ── SearchDropdown ──
export const SearchDropdown = {
  st: {
    isOpen: false,
    selected: 'Search and Select',
    data: ['Los Angeles', 'New York', 'San Fransisco', 'San Diego'],
    filtered: [],
    searchValue: ''
  },
  SelectedContainer: {
    tx: '{{ selected }}',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    '.isSelected': {
      in: 'c:blue'
    },
    '@ck': (e, el, s) => s.toggle('isOpen'),
    in: 'p:Z_A2 mnh:B2 pos:relative cur:pointer c:caption'
  },
  Options: {
    shw: (el, s) => s.isOpen,
    Input: {
      phd: 'Search and Select',
      '@ip': (e, el, state) => {
        const value = e.target.value.trim().toLowerCase()
        const filtered = state.data.filter((item) =>
          item.toLowerCase().includes(value)
        )
        state.replace({
          searchValue: value,
          filtered: filtered
        })
      },
      in: 'thm:field-dialog p:Y2_A m:-_-Y d:block mnw: bxs:border-box bd:none ol:none'
    },
    Results: {
      shw: (el, s) => !!s.searchValue && s.filtered.length,
      ch: (el, s) => s.filtered,
      cp: {
        tx: '{{ value }}',
        '@ck': (ev, el, s) => {
          s.parent.update({
            selected: s.value,
            isOpen: false,
            searchValue: ''
            //filtered: []
          })
        },
        in: 'p:Z'
      },
      in: 'mt:X cha:state'
    },
    Placeholder: {
      shw: (el, s) => !s.searchValue,
      tx: 'Enter name to search',
      in: 'p:Z c:disabled'
    },
    NoResults: {
      shw: (el, s) => !!s.searchValue && !s.filtered.length,
      tx: 'No results found',
      in: 'p:Z c:disabled'
    },
    in: 'bdw:1px_0_0_0 bdst:solid bdc:line_.35 p:Z_Z2 thm:dialog fxf:y rnd:0_0_A2_A2'
  },
  in: 'pos:relative w:G3 thm:field rnd:A2'
}

// ── Badge ──
export const Badge = {
  tx: '-2.902',
  in: 'tg:label ext:Flex aln:cemter_center thm:warning rnd:C lh:1em bxs:content-box p:X1_Z1 bgc: bdr:'
}

// ── Breadcrumb ──
export const Breadcrumb = {
  cp: {
    '&[href]': {
      '&:hover': {
        in: 'td:underline'
      },
      in: 'c:title'
    },
    '&:not([href])': {
      in: 'cur:default'
    },
    '&:not(:first-child):before': {
      cnt: '""',
      in: 'd:inline-block w:2px h:2px bdr:100% bg:white va:0.2em marginInline:.65em op:.5'
    },
    in: 'fw:400 td:none !scrollToTop c:white_0.35'
  },
  ch: (el, s, ctx) => {
    const routeArr = (s.root.route || window.top.location.pathname)
      .split('/')
      .slice(1)
    return routeArr
      .map((text, i) =>
        text === 'page'
          ? {
              href: '/pages',
              text: 'Page'
            }
          : el.getData('pages')['/' + text]
            ? {
                href: '/' + routeArr.slice(0, i + 1).join('/'),
                text: '/' + text
              }
            : {
                href: '/' + routeArr.slice(0, i + 1).join('/'),
                text: i === 0 ? ctx.utils.toTitleCase(text) : text
              }
      )
      .filter((_, k) => {
        const v = routeArr[k]
        return (
          !v.includes('-') && !v.includes('editor') && !v.includes('preview')
        )
      })
  },
  in: 'tg:nav cex:Link d:flex aln:center'
}

// ── TabSet ──
export const TabSet = {
  ch: [
    {
      tx: 'build',
      in: 'isActive thm:dialog-elevated'
    },
    {
      tx: 'test'
    }
  ],
  cp: {
    Icon: null,
    '.isActive': {
      in: 'thm:document'
    },
    in: 'rnd:D fw:400 p:Z_B1 tt:capitalize thm:transparent'
  },
  in: 'ext:Flex cex:Button p:V2+V2 rnd:D bg:gray_.1 w:fit-content'
}

// ── CircleProgress ──
export const CircleProgress = {
  at: {
    max: ({ props }) => props.max,
    progress: ({ props }) => props.progress,
    value: ({ props }) => props.value
  },
  val: 0.73,
  '&::-webkit-progress-bar': {
    in: 'bg:gray'
  },
  '&::-webkit-progress-value': {
    in: 'thm:primary'
  },
  ':after': {
    cnt: '""',
    tf: 'translate(-50%, -50%)',
    in: 'pos:absolute w:B+B2 h:B+B2 rnd:100% tp:50% lft:50% bg:codGray'
  },
  in: 'tg:progress bsz:D_D rnd:100% ov:hidden pos:relative'
}

// ── Pagination ──
export const Pagination = {
  Left: {
    Icon: {
      in: 'nm:chevronLeft'
    },
    '@ck': (event, element, state) => {
      state.update({})
    },
    in: 'ext:IconButton'
  },
  Flex: {
    cp: {
      isActive: (element, state) => state.active === parseInt(element.key),
      '.isActive': {
        in: 'thm:primary'
      },
      in: 'ar:1_/_1 bsz:C+Y2_C+Y2 rnd:100% p:A thm:field'
    },
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
    ],
    in: 'g:Z cex:Button'
  },
  Right: {
    Icon: {
      in: 'nm:chevronRight'
    },
    '@ck': (event, element, state) => {
      state.update({})
    },
    in: 'ext:IconButton'
  },
  in: 'ext:Flex g:A aln:center_fllex-start'
}

// ── UserNavbar ──
export const UserNavbar = {
  AvatarStatus: {
    Avatar: {},
    Status: {},
    in: 'm:-W_-_-_-'
  },
  Hgroup: {
    H: {
      tx: 'Nika Tomadze',
      in: 'tg:h5'
    },
    P: {
      tx: 'active now'
    },
    in: 'g:W'
  },
  IconButtonSet: {
    cp: {
      Icon: {}
    },
    ch: () => [{}, {}],
    in: 'm:-_-_-_auto'
  },
  in: 'ext:Flex mnw:G2 aln:center_flex-start g:Z'
}

// ── StoryCard ──
export const StoryCard = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    in: 'bsz:100% zi:2 rnd:A'
  },
  Icon: {
    tf: 'translate(-50%, -50%)',
    in: 'ico:smile pos:absolute zi:2 tp:35% lft:50% fs:J1+F1 c:white'
  },
  HgroupSteps: {
    Hgroup: {
      H: {
        tx: 'Symbols'
      },
      P: {
        in: 'c:white_.65'
      }
    },
    ProgressStepSet: {
      cp: {
        in: 'thm:field-dialog'
      },
      ch: () => [{}, {}]
    },
    in: 'pos:absolute bot:0 lft:0 zi:2 mnw:100% mxw:100% rnd:0 p:B1 thm:field'
  },
  in: 'ext:Flex pos:relative rnd:B2 bsz:H1_G3 as:flex-start ov:hidden'
}

// ── Progress ──
export const Progress = {
  at: {
    max: ({ props }) => props.max,
    progress: ({ props }) => props.progress,
    value: ({ props }) => props.value
  },
  '::-webkit-progress-bar': {
    '@dark': {
      in: 'bg:gray'
    },
    '@light': {
      in: 'bg:hurricane'
    }
  },
  '::-webkit-progress-value': {
    in: 'bdr:Y thm:primary'
  },
  in: 'tg:progress ext:Flex h:X mnw:F3 rnd:Y ov:hidden'
}

// ── ToggleCaption ──
export const ToggleCaption = {
  Caption: {
    tx: 'Caption'
  },
  Toggle: {
    Input: {},
    Flex: {
      ':after': {}
    }
  },
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── LandingNavbar ──
export const LandingNavbar = {
  zi: 9999999,
  '@tabletS': {
    in: 'w:100% p:X2_B jc:space-between'
  },
  thm: null,
  Logo: {
    '@tabletS': {
      in: 'fs:E m:-_0_-_- p:0'
    },
    in: 'pos:relative ico:logo tp:auto lft:auto thm:transparent m:-_B_-_-'
  },
  Nav_2: {
    '@tabletS': {
      in: 'd:none'
    },
    cp: {
      ':hover': {
        in: 'op:1 c:title'
      },
      in: 'c:caption fw:400 op:.8'
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
    ],
    in: 'fxf:x g:B cex:DocsLink'
  },
  MenuIcon: {
    '@tabletS': {
      in: 'd:flex'
    },
    '@ck': (event, element, state) => state.toggle('activeMenu'),
    in: 'd:none'
  },
  in: 'ext:Navbar g:A2 jc:flex-start aln:center lft:0 w:50% p:Y1_D_Y1_A fs:Z2 us:none pos:absolute tp:W1 bd:0'
}

// ── CTAButtons ──
export const CTAButtons = {
  ch: [
    {
      hrf: '/signup',
      tx: 'Get Started',
      in: 'ext:Link,Button thm:primary c:title fw:700 mnh:42px mxh:42px p:-_D+W'
    }
  ],
  in: 'g:D aln:center'
}

// ── FeatureItem ──
export const FeatureItem = {
  trnp: 'color, background, border',
  '@mobileS': {
    sy: {
      minWidth: '100% !important',
      maxWidth: '100% !important',
      scrollSnapAlign: 'start'
    }
  },
  ':hover': {
    '& span': {
      in: 'c:highlight_.9'
    },
    in: 'c:title bdc:line-highlight'
  },
  H3: {
    Span: {
      in: 'trn:A_defaultBezier_color fw:100'
    },
    in: 'trn:A_defaultBezier_color fw:700 c:title fs:A2+X'
  },
  Icon: {
    in: 'pos:absolute fs:D1 tp:A1 lft:A1'
  },
  in: 'ext:Link bdst:solid bdw:1px bdc:line pos:relative wr:G1 trn:A_defaultBezier p:F1_B1_C1 rnd:B2'
}

// ── TestimonialCard ──
export const TestimonialCard = {
  '@mobileL': {
    sy: {
      scrollSnapAlign: 'start'
    },
    in: 'mnw:85vw mxw:85vw'
  },
  P: {
    tx: '',
    in: 'c:title m:0 lh:1.5 fw:400 fs:Z1'
  },
  Flex: {
    Avatar: {
      src: 'james.svg',
      in: 'bsz:B2_B2'
    },
    Flex_2: {
      Strong: {
        tx: '',
        in: 'c:title fs:Z1 fw:600'
      },
      Caption: {
        tx: '',
        in: 'fs:Z fw:300 c:caption'
      },
      in: 'aln:start fl:y g:0'
    },
    in: 'fl:x g:Z1 aln:center_flex-start m:Y1_-_-_-'
  },
  in: 'fl:y g:Z2 p:A_B mnw:G mxw:G rnd:A thm:field trn:A_defaultBezier_opacity'
}

// ── Banner ──
export const Banner = {
  '@heightM': {},
  '@heightL': {
    in: 'p:D2_-_-_-'
  },
  ':after': {
    cnt: '""',
    in: 'bsz:60%_100% pos:absolute bot:0 lft:0 zi:2'
  },
  '@dark': {
    ':after': {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  '@light': {
    ':after': {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    },
    in: 'bg:gray15'
  },
  '> *:not(:first-child)': {
    in: 'zi:2'
  },
  Scene: {
    '@light': {
      ':after': {
        cnt: '""',
        in: 'bsz:100%_100% pos:absolute tp:0 lft:0 bg:gray15_.75'
      },
      in: 'bg:gray15'
    },
    in: 'pos:absolute tp:0 lft:0 zi:1'
  },
  BannerHgroup: {
    in: 'zi:2'
  },
  TabSet: {
    '@heightM': {
      in: 'm:C2_-_B2+W_-'
    },
    in: 'm:D2+Y2_-_B2+W_- bg:black_.25'
  },
  BannerImg: {
    in: 'w:96%'
  },
  TabSetTwo: {
    cp: {
      ':first-child': {
        bg: 'linear-gradient(to right,  #00A2E7, #185DF3, #1E54F0, #8B4CCA, #8B4CCA)'
      },
      '@light': {
        ':first-child': {
          in: 'c:white'
        }
      }
    },
    in: 'pos:absolute bot:C zi:10_!important'
  },
  in: 'p:F+X2_-_-_- fl:y pos:relative ai:center w:100% mxh:100%'
}
