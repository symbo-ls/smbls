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

// ── Avatar ──
export const Avatar = {
  ext: 'smbls.Avatar',
  bsz: 'C2'
}

// ── AvatarBadgeHgroup ──
export const AvatarBadgeHgroup = {
  Avatar: {},
  Hgroup: {
    g: 'V2',
    H: {
      d: 'flex',
      ai: 'center',
      g: 'Y',
      Badge: {}
    },
    P: {}
  },
  ext: 'AvatarHgroup'
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

// ── AvatarHeading ──
export const AvatarHeading = {
  Avatar: {},
  H: {
    tg: 'h6',
    lh: '1em',
    tx: 'Heading'
  },
  ext: 'Flex',
  g: 'X2',
  aln: 'center flex-start'
}

// ── AvatarHgroup ──
export const AvatarHgroup = {
  g: 'Y2',
  aln: 'center flex-start',
  Avatar: {
    m: '-X - - -'
  },
  Hgroup: {
    g: 'W2',
    H: {
      tg: 'h6'
    },
    P: {}
  }
}

// ── AvatarHgroupIconButton ──
export const AvatarHgroupIconButton = {
  Avatar: {},
  Hgroup: {
    H: {
      tg: 'h6'
    },
    P: {}
  },
  IconButton: {
    m: '- - - auto',
    Icon: {
      nm: 'copy'
    }
  },
  ext: 'AvatarHgroup',
  mnw: 'G+Z2'
}

// ── AvatarHgroupSelect ──
export const AvatarHgroupSelect = {
  Avatar: {},
  Hgroup: {
    H: {},
    P: {}
  },
  SelectPicker: {
    m: '- - - auto',
    Select: {
      "0": {
        val: 'Goat'
      },
      "1": {
        val: 'Icon'
      }
    }
  },
  ext: 'AvatarHgroup',
  mnw: 'G1'
}

// ── AvatarParagraph ──
export const AvatarParagraph = {
  Avatar: {
    bsz: 'B1'
  },
  P: {
    tx: 'Can you join us today?',
    m: '0'
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y1'
}

// ── AvatarSelectPicker ──
export const AvatarSelectPicker = {
  tg: 'label',
  Avatar: {},
  Select: {
    ext: 'Flex',
    fs: 'A',
    bsz: '100%',
    p: '- B+V2 - Z',
    cur: 'pointer',
    ol: 'none',
    appearance: 'none',
    fx: '1',
    zi: '2',
    lh: 1,
    bd: 'none',
    bg: 'none',
    pe: 'All',
    c: 'title',
    ":focus-visible": {
      ol: 'none'
    },
    ch: [
      {
        tx: 'Nikoloza',
        val: 'Nikoloza'
      },
      {
        tx: 'Svinchy',
        val: 'Svinchy'
      }
    ],
    cp: {
      tg: 'option'
    }
  },
  Icon: {
    nm: 'chevronDown',
    pos: 'absolute',
    rgt: '0',
    m: 'V - - -',
    fs: 'B'
  },
  ext: 'Flex',
  rnd: '0',
  aln: 'center flex-start',
  pos: 'relative'
}

// ── AvatarSet ──
export const AvatarSet = {
  ext: 'Flex',
  cex: 'Avatar',
  cp: {
    bd: 'solid, codGray',
    bdw: 'X+W',
    ":first-child": {
      m: '0 -Z1 0 0'
    },
    ":nth-child(2)": {
      m: '0 -Z1 0 0'
    }
  },
  ch: [
    {},
    {},
    {}
  ]
}

// ── AvatarSetChatPreview ──
export const AvatarSetChatPreview = {
  AvatarSet: {
    pos: 'relative',
    bsz: 'fit-content C2',
    bd: '1px solid red',
    m: '-Y2 - - -',
    cp: {
      bsz: 'C C',
      bdw: 'W',
      d: 'block',
      pos: 'absolute',
      tp: '50%',
      lft: '50%',
      tf: 'translate(-50%, -50%)',
      ":first-child": {
        m: 'Z2 0 0 0'
      },
      ":nth-child(2)": {
        m: '0 0 0 Z1'
      },
      ":nth-child(3)": {
        m: '-W 0 0 -Z1'
      }
    }
  },
  Flex: {
    fl: 'y',
    fx: '1',
    g: 'W2',
    "> *": {
      mnw: '100%'
    },
    ValueHeading: {
      mnw: '0',
      mxw: '100%',
      H: {
        tx: 'Design'
      },
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
    Flex: {
      g: 'X2',
      Caption: {
        tx: 'nick:',
        c: 'paragraph'
      },
      NotCounterParagraph: {
        fx: '1',
        jc: 'space-between',
        P: {
          mxw: 'F2',
          ws: 'nowrap',
          ov: 'hidden'
        },
        NotificationCounter: {}
      }
    }
  },
  ext: 'Flex',
  g: 'Z1',
  mnw: 'G3',
  aln: 'center flex-start'
}

// ── AvatarStatus ──
export const AvatarStatus = {
  Avatar: {},
  StatusDot: {
    pos: 'absolute',
    bot: 'W2',
    rgt: '0'
  },
  ext: 'Flex',
  pos: 'relative'
}

// ── AvatarStatusChatPreview ──
export const AvatarStatusChatPreview = {
  AvatarStatus: {
    Avatar: {},
    StatusDot: {}
  },
  Flex: {
    fl: 'y',
    fx: '1',
    g: 'W2',
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
      P: {},
      NotificationCounter: {}
    }
  },
  ext: 'Flex',
  g: 'Z1',
  mnw: 'G3',
  aln: 'center flex-start'
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

// ── BadgeCaption ──
export const BadgeCaption = {
  Caption: {
    tx: 'CAPTION'
  },
  Badge: {},
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y'
}

// ── BadgeParagraph ──
export const BadgeParagraph = {
  P: {
    m: '0',
    tx: 'Hey team, I\'ve finished the re...',
    c: 'paragraph'
  },
  Badge: {},
  ext: 'Flex',
  aln: 'center space-between',
  g: 'A'
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
    c: 'white.35',
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

// ── BulletCaption ──
export const BulletCaption = {
  tg: 'caption',
  tx: 'Orders history',
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y1',
  ":before": {
    cnt: '""',
    bsz: 'Z1',
    bg: 'blue',
    rnd: 'A2'
  }
}

// ── ButtonHeading ──
export const ButtonHeading = {
  aln: 'center flex-start',
  g: 'Z',
  H: {
    tg: 'h6',
    tx: 'Heading'
  },
  Button: {
    tx: 'Button',
    thm: 'dialog'
  }
}

// ── ButtonHgroup ──
export const ButtonHgroup = {
  Hgroup: {
    g: 'X2',
    H: {
      tg: 'h6',
      tx: 'Heading'
    },
    P: {}
  },
  Button: {
    tx: 'Button',
    thm: 'dialog'
  },
  ext: 'Flex',
  aln: 'flex-start flex-start',
  g: 'Z'
}

// ── ButtonParagraph ──
export const ButtonParagraph = {
  P: {
    tx: 'Didn\'t get the code?',
    c: 'caption',
    m: '0'
  },
  Button: {
    p: '0',
    thm: 'transparent',
    tx: 'Click to Resend'
  },
  ext: 'Flex',
  ai: 'center',
  g: 'X2'
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

// ── Caption ──
export const Caption = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.Caption'
}

// ── CardNumberField ──
export const CardNumberField = {
  st: {
    value: 'XXXXXXXXXXXXXXXX'
  },
  ext: 'Flex',
  cex: 'FixedNumberField',
  g: '0',
  cp: {
    Input: {
      ta: 'center',
      p: 'X2 X',
      rnd: '0',
      ol: 'none',
      val: (el, s) => {
            const index = parseInt(el.parent.key)
            const valueArray = s.value
            const inputValue = el.node.value.split('')
            for (let i = 0; i < 4; i++) {
              const charIndex = index * 4 + i
              const numericPattern = /^\d$/
              const char = valueArray[charIndex]
              const isNumeric = numericPattern.test(char)
              if (isNumeric) inputValue[i] = char
            }
            return inputValue.join('')
          },
      ":focus-visible": {
        ol: 'none'
      },
      "@up": (el, s) => {
            el.node.value = el.props.value(el, s)
          },
      "@ip": (ev, el, s, ctx) => {
            const index = parseInt(el.parent.key)
            const valueArray = s.value.split('')
            const inputValue = el.node.value
            for (let i = 0; i < 4; i++) {
              const charIndex = index * 4 + i
              valueArray[charIndex] = inputValue[i] || 'X'
            }
            s.update({
              value: valueArray.join('')
            })
            ctx.components.FixedNumberField.Input.onInput(ev, el, s, ctx)
          },
      "@pt": (ev, el, s) => {
            console.log(ev)
            const handlePastedInput = (event, validationFn) => {
              // Prevent default paste behavior
              event.preventDefault()
      
              // Get pasted text from clipboard
              const pastedText = event.clipboardData.getData('text/plain')
      
              // Apply custom validation/transformation function
              const value = validationFn ? validationFn(pastedText) : pastedText
      
              // Insert processed value into the input
              s.update({
                value
              })
            }
      
            // Example usage:
            const numericOnlyPaste = (input) => {
              // Remove any non-numeric characters
              return input.replace(/[^\d]/g, '')
            }
      
            const maxLengthPaste = (input, maxLength = 12) => {
              // Truncate input to maximum length
              return input.slice(0, maxLength)
            }
      
            return handlePastedInput(ev, (text) => {
              // Chain multiple transformations if needed
              return maxLengthPaste(numericOnlyPaste(text));
            });
          }
    },
    ":first-child input": {
      p: 'X2 X X2 A1',
      rnd: 'A 0 0 A'
    },
    ":last-child input": {
      p: 'X2 A1 X2 X',
      rnd: '0 A A 0'
    }
  },
  ch: [
    {},
    {},
    {},
    {}
  ]
}

// ── CheckCaption ──
export const CheckCaption = {
  Caption: {
    tx: 'Caption'
  },
  Checkbox: {
    Input: {},
    Flex: {
      Icon: {
        nm: 'check'
      }
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z'
}

// ── CheckCaptionList ──
export const CheckCaptionList = {
  ext: 'Flex',
  cex: 'CheckCaption',
  fl: 'y',
  g: 'B',
  cp: {
    Caption: {},
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          nm: 'check'
        }
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── CheckHgroup ──
export const CheckHgroup = {
  Hgroup: {
    g: 'W2',
    H: {
      tg: 'h6'
    },
    P: {}
  },
  Checkbox: {
    Input: {},
    Flex: {
      Icon: {
        nm: 'check'
      }
    }
  },
  ext: 'Flex',
  g: 'Z'
}

// ── CheckHgroupList ──
export const CheckHgroupList = {
  ext: 'Flex',
  cex: 'CheckHgroup',
  fl: 'y',
  g: 'B',
  cp: {
    Hgroup: {
      g: 'W2',
      H: {
        tg: 'h6'
      },
      P: {}
    },
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          nm: 'check'
        }
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── CheckStep ──
export const CheckStep = {
  Icon: {
    nm: 'check',
    thm: 'dialog',
    d: 'block',
    bxs: 'content-box',
    p: 'Y2',
    rnd: '100%'
  },
  H6: {
    tx: 'Step'
  },
  Progress: {
    mnw: 'E',
    mxw: 'E',
    val: 0,
    h: 'V',
    ".isActive": {
      val: 1
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z'
}

// ── CheckStepSet ──
export const CheckStepSet = {
  ext: 'Flex',
  cex: 'CheckStep',
  g: 'Z1',
  cp: {
    Icon: {
      ".isActive": {
        thm: 'primary'
      }
    },
    Progress: {},
    ":last-child > progress": {
      hd: true
    }
  },
  ch: [
    {
      Icon: {
        isActive: true
      }
    },
    {}
  ]
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

// ── ConfirmationButtons ──
export const ConfirmationButtons = {
  ext: 'Flex',
  cex: 'Button',
  g: 'Y1',
  cp: {
    thm: 'dialog',
    p: 'Z1 B1'
  },
  ch: [
    {
      tx: 'No'
    },
    {
      tx: 'YES'
    }
  ]
}

// ── CounterButton ──
export const CounterButton = {
  ext: 'Button',
  pos: 'relative',
  aln: 'center space-between',
  p: 'Z Z Z A1',
  mnw: 'F',
  thm: 'field',
  Span: {
    tx: 'Button'
  },
  NotificationCounter: {
    tx: '7'
  }
}

// ── CounterIconButton ──
export const CounterIconButton = {
  Icon: {
    nm: 'smile'
  },
  NotificationCounter: {
    pos: 'absolute',
    rgt: '-Y',
    tp: '-W2'
  },
  ext: 'IconButton',
  pos: 'relative'
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

// ── FieldCaption ──
export const FieldCaption = {
  Caption: {
    tg: 'caption',
    tx: 'Caption',
    lh: '1em',
    fs: 'A',
    fw: '400',
    p: '- Y2 Z X',
    as: 'flex-start',
    ws: 'nowrap',
    ta: 'left'
  },
  Field: {
    w: '100%',
    Input: {},
    Icon: {}
  },
  ext: 'Flex',
  fl: 'column',
  bsz: 'fit-content fit-content'
}

// ── FixedNumberField ──
export const FixedNumberField = {
  Input: {
    bsz: 'B D',
    p: 'X2 Z X2 A2',
    bxs: 'content-box',
    phd: '0000',
    ls: '.35em',
    maxlength: '4',
    tt: 'uppercase',
    sy: {
      fontFamily: 'Courier, monospace'
    },
    onKeydown: (event, element, state) => {
          const numericPattern = /^\d$/;
          const navigationKeys = [
            "Backspace", "ArrowLeft", "ArrowRight", "Tab",
            "Delete", "Home", "End", "Enter", "Escape"
          ];
          const ctrlShortcuts = ["a", "c", "v", "x"];
    
          const isNumeric = numericPattern.test(event.key);
          const isNavigationKey = navigationKeys.includes(event.key);
          const isCtrlShortcut = (event.metaKey || event.ctrlKey) && ctrlShortcuts.includes(event.key);
    
          // Allow only numeric input, navigation keys, and Ctrl shortcuts
          if (!isNumeric && !isNavigationKey && !isCtrlShortcut) {
            event.preventDefault();
          }
        },
    "@ip": (event, element, state) => {
          if (element.node.value.length === 0) {
            element.parent.previousElement()?.Input?.node.focus()
          }
          if (element.node.value.length > 3) {
            element.parent.nextElement()?.Input?.node.focus()
          }
        }
  },
  ext: 'InputField'
}

// ── Footnote ──
export const Footnote = {
  tx: 'Footnote',
  ext: 'smbls.Footnote'
}

// ── Group ──
export const Group = {
  Title: {
    tx: 'Field Title',
    c: 'caption',
    us: 'none',
    ws: 'nowrap'
  },
  ext: 'Flex',
  fl: 'y',
  aln: 'flex-start',
  g: 'Y1',
  mnw: 'F',
  cp: {
    w: '100%'
  }
}

// ── GroupField ──
export const GroupField = {
  tg: 'label',
  ext: 'Group'
}

// ── H1 ──
export const H1 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H1'
}

// ── H2 ──
export const H2 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H2'
}

// ── H3 ──
export const H3 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H3'
}

// ── H4 ──
export const H4 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H4'
}

// ── H5 ──
export const H5 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H5'
}

// ── H6 ──
export const H6 = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.H6'
}

// ── Headline ──
export const Headline = {
  tx: 'Headline',
  ext: 'smbls.Headline'
}

// ── HgroupSteps ──
export const HgroupSteps = {
  Hgroup: {
    g: 'Y1',
    H: {
      tg: 'h4',
      tx: 'Symbols'
    },
    P: {
      tx: 'The easiest way to build your own website'
    }
  },
  ProgressStepSet: {
    cp: {
      fx: '1'
    }
  },
  ext: 'Flex',
  fl: 'column',
  g: 'A1',
  mnw: 'G1',
  mxw: 'H'
}

// ── Hr ──
export const Hr = {
  ext: 'smbls.Hr',
  mnw: 'F'
}

// ── HrLegend ──
export const HrLegend = {
  tx: 'Or',
  ext: 'Flex',
  mnw: 'G',
  fw: '500',
  ai: 'center',
  g: 'A',
  ":before": {
    cnt: '""',
    h: 'V',
    thm: 'dialog',
    rnd: 'C',
    fx: '1'
  },
  ":after": {
    cnt: '""',
    h: 'V',
    thm: 'dialog',
    rnd: 'C',
    fx: '1'
  }
}

// ── IconButton ──
export const IconButton = {
  Icon: {
    nm: 'smile',
    fs: 'A2'
  },
  ext: 'Button',
  p: 'A',
  ar: '1 / 1',
  bsz: 'fit-content fit-content',
  rnd: '100%',
  bxs: 'content-box',
  aln: 'center center',
  thm: 'dialog'
}

// ── IconButtonHeading ──
export const IconButtonHeading = {
  H: {
    tg: 'h5',
    tx: 'Heading'
  },
  IconButton: {},
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z'
}

// ── IconButtonHgroup ──
export const IconButtonHgroup = {
  Hgroup: {
    g: 'X2',
    H: {
      tg: 'h6',
      tx: 'Heading'
    },
    P: {}
  },
  IconButton: {
    thm: 'dialog'
  },
  ext: 'Flex',
  aln: 'flex-start flex-start',
  g: 'Z'
}

// ── IconButtonSet ──
export const IconButtonSet = {
  ext: 'Flex',
  cex: 'IconButton',
  g: 'Z',
  cp: {
    Icon: {}
  },
  ch: [
    {
      Icon: {
        nm: 'sun'
      }
    },
    {
      Icon: {
        nm: 'moon'
      }
    }
  ]
}

// ── IconCounterButton ──
export const IconCounterButton = {
  ext: 'Button',
  pos: 'relative',
  aln: 'center flex-start',
  p: 'Z Z Z Z1',
  mnw: 'F',
  thm: 'field',
  g: 'Z',
  Icon: {
    d: 'block',
    nm: 'info'
  },
  Span: {
    tx: 'Button'
  },
  NotificationCounter: {
    tx: '7',
    m: '- - - auto'
  }
}

// ── IconHeading ──
export const IconHeading = {
  Icon: {
    nm: 'logo',
    fs: 'C'
  },
  H: {
    tg: 'h5',
    tx: 'Heading',
    lh: '1em',
    fw: '700'
  },
  ext: 'Flex',
  g: 'Z',
  aln: 'center flex-start'
}

// ── IconHgroup ──
export const IconHgroup = {
  Icon: {
    nm: 'logo',
    d: 'block',
    c: 'blue',
    m: '- X - -',
    fs: 'E'
  },
  Hgroup: {
    g: 'Y',
    H: {
      tg: 'h2'
    },
    P: {}
  },
  ext: 'Flex',
  g: 'X',
  aln: 'flex-start'
}

// ── IconInput ──
export const IconInput = {
  tg: 'label',
  Input: {
    fx: '1',
    rnd: 'C',
    phd: 'Placeholder',
    p: 'Z2 C Z2 A2',
    mxh: '100%'
  },
  Icon: {
    nm: 'info',
    pos: 'absolute',
    zi: '2',
    rgt: 'Z2'
  },
  ext: 'Flex',
  mnw: 'G',
  aln: 'center flex-start',
  rnd: 'D',
  pos: 'relative'
}

// ── IconTextSet ──
export const IconTextSet = {
  cex: [
    'IconText',
    'Flex'
  ],
  g: 'A',
  cp: {
    aln: 'center flex-start',
    g: 'Y1',
    Icon: {}
  },
  fxf: 'y',
  ch: [
    {
      Icon: {
        nm: 'smile'
      },
      tx: '+1 (555) 123-4567'
    },
    {
      Icon: {
        nm: 'logo'
      },
      tx: 'example@mail.com'
    }
  ]
}

// ── IcontextLink ──
export const IcontextLink = {
  tx: 'Follow Symbols',
  Icon: {
    fs: 'B',
    nm: 'logo'
  },
  ext: [
    'Link',
    'IconText'
  ],
  g: 'Y',
  mxh: '3em',
  cur: 'pointer',
  rnd: 'D',
  fw: '500'
}

// ── ImgButton ──
export const ImgButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    bsz: 'C1 D2'
  },
  ext: 'Button',
  thm: 'transparent',
  p: '0',
  rnd: 'Z2',
  ov: 'hidden'
}

// ── ImgHeading ──
export const ImgHeading = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    widthL: 'auto',
    mxw: 'C',
    mxh: 'C',
    rnd: 'Z2'
  },
  H: {
    tg: 'h4',
    tx: 'Heading'
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y1'
}

// ── ImgHeadingButton ──
export const ImgHeadingButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    bsz: 'C1 D2',
    rnd: 'Z2'
  },
  H: {
    tg: 'h6',
    tx: 'Heading'
  },
  ext: 'Button',
  thm: 'transparent',
  fl: 'y',
  g: 'Z',
  p: '0',
  rnd: '0'
}

// ── ImgHgroup ──
export const ImgHgroup = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    bsz: 'C+Y1 C2',
    rnd: 'Z',
    m: '-Y - - -'
  },
  Hgroup: {
    g: 'W2',
    H: {
      tg: 'h5'
    },
    P: {}
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y1'
}

// ── InputButton ──
export const InputButton = {
  Input: {
    phd: 'Enter your email',
    mnw: 'G+B1'
  },
  Button: {
    tx: 'Sign up',
    thm: 'primary'
  },
  ext: 'Flex',
  g: 'Y2',
  aln: 'center flex-start',
  h: 'C+X',
  "> *": {
    h: '100%',
    mnh: '100%',
    mxh: '100%'
  }
}

// ── Italic ──
export const Italic = {
  tx: 'Italic text',
  ext: 'smbls.Italic'
}

// ── LayerSimple ──
export const LayerSimple = {
  Title: {
    tx: 'Checklist'
  },
  Flex: {
    fl: 'column',
    g: 'A',
    cp: {
      g: 'X',
      flexAlign: 'center'
    },
    cex: {
      Icon: {
        c: 'inactive',
        g: 'Y1'
      },
      Span: {
        c: 'white',
        p: '- - - X2'
      }
    },
    ch: () => [{
            Icon: {
              icon: 'check',
            },
            Span: {
              text: 'Sun',
            },
          },
          {
            Icon: {
              icon: 'check',
            },
            Span: {
              text: 'Moon',
            },
          },
        ]
  },
  ext: 'Group',
  p: 'Z A A A',
  m: 'C -',
  rnd: 'Z',
  g: 'A',
  w: 'F1',
  bg: 'gray'
}

// ── Link ──
export const Link = {
  tx: 'Link',
  ext: 'smbls.Link'
}

// ── LinkHgroup ──
export const LinkHgroup = {
  Hgroup: {
    g: 'X2',
    H: {
      tg: 'h2',
      tx: 'Tbilisi'
    },
    P: {
      tx: '35 Vazha-pshavela avenue.'
    }
  },
  Link: {
    tx: 'Get direction'
  },
  ext: 'Flex',
  fl: 'y',
  g: 'Z'
}

// ── LinkParagraph ──
export const LinkParagraph = {
  P: {
    tx: 'You are agree',
    c: 'caption',
    m: '0'
  },
  Link: {
    p: '0',
    thm: 'transparent',
    tx: 'Privacy policy',
    td: 'underline',
    fw: '400'
  },
  ext: 'Flex',
  ai: 'center',
  g: 'X2'
}

// ── LinkSet ──
export const LinkSet = {
  tg: 'nav',
  ext: 'Flex',
  cex: 'Link',
  aln: 'center flex-start',
  g: 'A',
  cp: {
    cur: 'pointer'
  },
  ch: [
    {
      tx: 'Link 1'
    },
    {
      tx: 'Link 2'
    }
  ]
}

// ── ListingItem ──
export const ListingItem = {
  IconText: {
    c: 'paragraph',
    fl: 'column',
    g: 'Z',
    p: '0',
    tg: 'button',
    bg: 'transparent',
    bd: '0',
    fs: 'A',
    cur: 'pointer',
    m: 'W - -',
    Icon: {
      nm: 'check',
      c: 'dim',
      ".isActive": {
        c: 'orange'
      }
    },
    "!isActive": {
      ":hover svg": {
        c: 'disabled'
      }
    },
    "@ck": (ev, el, s) => {
          const isActive = s.isActive
          s.update({
            isActive: !isActive,
            upvotes: isActive ? s.upvotes - 1 : s.upvotes + 1
          })
        }
  },
  Hgroup: {
    H: {
      ext: 'Link',
      tg: 'h6',
      tx: 'Flexbox in Editor',
      fw: '700'
    },
    P: {
      tx: null,
      cp: {
        d: 'inline'
      },
      ch: [
        'by ',
        {
          Link: {
            tx: 'kiaynwang'
          }
        },
        ' ',
        {
          Link: {
            tx: '3 hours ago'
          }
        },
        ' ・ ',
        {
          Link: {
            tx: '49 commnts'
          }
        }
      ]
    }
  },
  ext: 'Flex',
  g: 'A2',
  ai: 'flex-start'
}

// ── LoadingGif ──
export const LoadingGif = {
  ext: 'Img',
  src: 'https://assets.symbo.ls/loading.gif',
  w: '3.2em',
  pe: 'none',
  op: '.35',
  zi: '-1',
  inCenter: true,
  ".inCenter": {
    pos: 'absolute',
    tp: '50%',
    lft: '50%',
    tf: 'translate3d(-50%, -50%, 0)'
  }
}

// ── MessageModal ──
export const MessageModal = {
  Hgroup: {
    g: 'A',
    H: {
      tx: 'Message'
    },
    P: {
      tx: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.'
    }
  },
  IconButton: {
    Icon: {
      nm: 'x'
    }
  },
  ext: 'Modal',
  mxw: 'H'
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

// ── NavigationArrows ──
export const NavigationArrows = {
  ext: 'Flex',
  cex: 'IconButton',
  g: 'Z',
  cp: {
    rnd: '100%'
  },
  ch: [
    {
      Icon: {
        nm: 'chevronLeft'
      }
    },
    {
      Icon: {
        nm: 'chevronRight'
      }
    }
  ]
}

// ── NavigationDots ──
export const NavigationDots = {
  tg: 'nav',
  ext: 'Flex',
  cex: 'Link',
  g: 'C1',
  cp: {
    bsz: 'Z',
    thm: 'dialog',
    rnd: '100%',
    cur: 'pointer',
    tx: '',
    ".isActive": {
      thm: 'primary'
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
  ]
}

// ── NotCounterParagraph ──
export const NotCounterParagraph = {
  P: {
    m: '0',
    tx: 'Hey team, I\'ve finished the re...',
    c: 'paragraph',
    mxw: 'E3+D1',
    ov: 'hidden'
  },
  NotificationCounter: {},
  ext: 'Flex',
  aln: 'center space-between',
  g: 'B'
}

// ── NotificationCounter ──
export const NotificationCounter = {
  tx: '3',
  ext: 'Flex',
  wr: 'A',
  thm: 'primary',
  rnd: '100%',
  ar: '1 / 1',
  p: 'W2',
  lh: '1em',
  bxs: 'content-box',
  aln: 'center center'
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

// ── P ──
export const P = {
  tx: 'It was the last day for our tribe, the year ends',
  ext: 'smbls.P'
}

// ── PackageFeatureItem ──
export const PackageFeatureItem = {
  tg: 'label',
  Input: {
    d: 'none',
    typ: 'checkbox',
    ":checked + hgroup": {
      ol: '1.5px solid #0079FD'
    }
  },
  Hgroup: {
    w: '100%',
    p: 'A1',
    rnd: 'A1',
    ol: '1.5px, solid, --color-line-dark',
    Icon: {
      od: '-1',
      m: '- - A2',
      nm: 'logo'
    }
  },
  ext: 'Flex',
  cur: 'pointer'
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

// ── ProgressStepSet ──
export const ProgressStepSet = {
  ext: 'Flex',
  cex: 'Progress',
  g: 'A',
  cp: {
    mnw: 'C'
  },
  ch: [
    {
      val: 0.7
    },
    {}
  ]
}

// ── RadioCaption ──
export const RadioCaption = {
  Caption: {
    tx: 'Caption'
  },
  Radio: {
    Input: {},
    FLex: {
      ":after": {}
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Z'
}

// ── RadioCaptionList ──
export const RadioCaptionList = {
  ext: 'Flex',
  cex: 'RadioCaption',
  fl: 'y',
  g: 'B',
  cp: {
    Caption: {
      tx: 'Caption'
    },
    Radio: {
      Input: {},
      FLex: {
        ":after": {}
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── RadioHgroup ──
export const RadioHgroup = {
  Hgroup: {
    g: 'W2',
    H: {
      tg: 'h6'
    },
    P: {}
  },
  Radio: {
    Input: {},
    FLex: {
      ":after": {}
    }
  },
  ext: 'Flex',
  g: 'Z'
}

// ── RadioHgroupList ──
export const RadioHgroupList = {
  ext: 'Flex',
  cex: 'RadioHgroup',
  fl: 'y',
  g: 'B',
  cp: {
    Hgroup: {
      g: 'W2',
      H: {
        tg: 'h6'
      },
      P: {}
    },
    Radio: {
      Input: {},
      FLex: {
        ":after": {}
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── RadioMark ──
export const RadioMark = {
  p: 'Z1',
  thm: 'primary',
  rnd: '100%',
  bsz: 'fit-content',
  ":after": {
    cnt: '""',
    bsz: 'Z1',
    bg: 'white',
    rnd: '100%',
    d: 'block'
  }
}

// ── RadioStep ──
export const RadioStep = {
  RadioMark: {
    thm: 'field',
    ".isActive": {
      thm: 'primary'
    },
    ":after": {}
  },
  H6: {
    tx: 'Step'
  },
  Progress: {
    mnw: 'E',
    mxw: 'E',
    val: 0,
    h: 'V',
    m: '- - - W',
    ".isActive": {
      val: 1
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y2'
}

// ── RadioSteps ──
export const RadioSteps = {
  ext: 'Flex',
  cex: 'RadioStep',
  g: 'Z1',
  cp: {
    RadioMark: {},
    Progress: {},
    ":last-child > progress": {
      hd: true
    }
  },
  ch: [
    {
      RadioMark: {
        isActive: true
      }
    },
    {}
  ]
}

// ── ScrollableList ──
export const ScrollableList = {
  tg: 'nav',
  Flex: {
    mxh: 'D2',
    ovy: 'auto',
    fl: 'y',
    p: 'Z -',
    sy: {
      listStyleType: 'none',
      "::-webkit-scrollbar": {
        display: 'none'
      }
    },
    cp: {
      p: 'Y1 A',
      cur: 'pointer',
      aln: 'flrx-start',
      ta: 'left',
      fw: '700',
      rnd: '0',
      thm: 'dialog',
      fs: 'C',
      ":hover": {
        thm: 'dialog-elevated'
      }
    },
    cex: 'Button',
    ch: [
      {
        tx: 'Item One'
      },
      {
        tx: 'Item Two'
      }
    ]
  },
  pos: 'relative',
  ov: 'hidden',
  thm: 'field',
  rnd: 'A2',
  mnw: 'F1',
  ":before, &:after": {
    cnt: '""',
    pos: 'absolute',
    bsz: 'B 100%',
    zi: '2',
    lft: '0',
    pe: 'none'
  },
  ":before": {
    tp: '0',
    "@light": {
      bg: 'linear-gradient(to bottom,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      bg: 'linear-gradient(to bottom, #171717 0%, transparent 100%)'
    }
  },
  ":after": {
    bot: '-3px',
    "@light": {
      bg: 'linear-gradient(to top,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      bg: 'linear-gradient(to top, #171717 0%, transparent 100%)'
    }
  }
}

// ── Scrollbar ──
export const Scrollbar = {
  TrackContainer: {
    op: 1,
    trn: 'A defaultBezier opacity',
    fx: '1',
    m: '- C1 - -',
    pos: 'relative',
    bg: 'red',
    h: 'fit-content',
    as: 'center',
    Track: {
      pos: 'absolute',
      thm: 'field',
      rnd: 'A',
      h: '2px',
      bg: '#d9d7d7 .5',
      lft: '0',
      tfo: 'left',
      w: '15%'
    }
  },
  NavigationArrows: {
    cp: {
      p: 'Z Z',
      Icon: {
        fs: 'B1'
      }
    }
  },
  ext: 'Flex',
  mnw: 'I'
}

// ── Search ──
export const Search = {
  tg: 'search',
  Input: {
    typ: 'search',
    phd: 'Type a command or search',
    w: '100%',
    p: 'Z2 C+W2 Z2 A2',
    thm: 'transparent',
    ":focus ~ button": {
      op: '1'
    }
  },
  Icon: {
    nm: 'search',
    pos: 'absolute',
    rgt: 'Z+W2',
    fs: 'B'
  },
  ext: 'Flex',
  mnw: 'G+A2',
  g: 'Z',
  thm: 'field',
  rnd: 'D2',
  aln: 'center flex-start',
  pos: 'relative'
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
    bdc: 'line.35',
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

// ── SearchDropdown_copy ──
export const SearchDropdown_copy = {
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
    bg: '#f5f5f5',
    c: 'black',
    bdb: '1px solid #ccc',
    mnh: 'B2',
    pos: 'relative',
    cur: 'pointer',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      c: 'title'
    },
    "@ck": (e, el, s) => s.toggle('isOpen')
  },
  Options: {
    shw: (el, s) => s.isOpen,
    bdw: '1px 0 0 0',
    bdst: 'solid',
    bdc: 'line.35',
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
  c: 'black',
  pos: 'relative',
  w: 'G3',
  thm: 'field',
  rnd: 'A2'
}

// ── SectionHeader ──
export const SectionHeader = {
  tg: 'header',
  Hgroup: {},
  IconButtonSet: {},
  ext: 'Flex',
  g: 'C1'
}

// ── Select ──
export const Select = {
  ext: 'smbls.Select'
}

// ── SelectField ──
export const SelectField = {
  Select: {
    ch: [
      {
        val: '',
        tx: 'Select one...'
      },
      {
        val: 'mazda',
        tx: 'Mazda'
      },
      {
        val: 'bmw',
        tx: 'BMW'
      }
    ]
  },
  Icon: {
    m: '- Z2 - -'
  },
  ext: 'SelectPicker',
  thm: 'field',
  mnw: 'G',
  p: 'A A1',
  rnd: 'D'
}

// ── SelectHgroup ──
export const SelectHgroup = {
  Hgroup: {
    g: 'V2',
    H: {
      tg: 'h6'
    },
    P: {}
  },
  SelectPicker: {
    m: '- - - auto',
    Select: {
      ch: () => [{
                value: 'Goat',
              },
              {
                value: 'Icon',
              },
            ]
    }
  },
  ext: 'Flex',
  g: 'C'
}

// ── SelectPicker ──
export const SelectPicker = {
  tg: 'label',
  ext: 'Flex',
  rnd: '0',
  aln: 'center flex-start',
  pos: 'relative',
  Select: {
    ext: 'Flex',
    fs: 'A',
    bsz: '100%',
    p: '- B+V2 - -',
    cur: 'pointer',
    ol: 'none',
    appearance: 'none',
    fx: '1',
    zi: '2',
    lh: 1,
    bd: 'none',
    bg: 'none',
    pe: 'All',
    c: 'title',
    ":focus-visible": {
      ol: 'none'
    },
    ch: [
      {
        tx: 'Nikoloza',
        val: 'Nikoloza'
      },
      {
        tx: 'Svinchy',
        val: 'Svinchy'
      }
    ],
    cp: {
      tg: 'option'
    }
  },
  Icon: {
    nm: 'chevronDown',
    pos: 'absolute',
    rgt: '0',
    m: 'V - - -',
    fs: 'B'
  }
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

// ── StatusDot ──
export const StatusDot = {
  wr: 'A',
  ar: '1/1',
  rnd: '100%',
  thm: 'success',
  "@light": {
    bd: 'solid, gray+170',
    bdw: 'X'
  },
  "@dark": {
    bd: 'solid, black',
    bdw: 'X'
  }
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
        c: 'white.65'
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

// ── Strong ──
export const Strong = {
  tx: 'Strong text',
  ext: 'smbls.Strong'
}

// ── Subhead ──
export const Subhead = {
  tx: 'Subhead',
  ext: 'smbls.Subhead'
}

// ── SubmitButton ──
export const SubmitButton = {
  ext: 'Input',
  typ: 'submit',
  val: 'Submit',
  p: 'Z2 B'
}

// ── TabSet ──
export const TabSet = {
  fl: 'x',
  cex: 'Button',
  p: 'V2+V2',
  rnd: 'D',
  bg: 'gray.1',
  w: 'fit-content',
  ch: [
    {
      tx: 'build',
      isActive: true,
      thm: 'dialog-elevated'
    },
    {
      tx: 'test'
    },
    {
      tx: 'publish'
    }
  ],
  cha: 'props',
  cp: {
    Icon: null,
    rnd: 'D',
    thm: 'transparent',
    p: 'Z B1',
    tt: 'capitalize',
    ".isActive": {
      thm: 'document'
    },
    "@ck": null
  }
}

// ── TextareaIconButton ──
export const TextareaIconButton = {
  Textarea: {
    mnh: 'C+Y',
    mxh: 'C+Y',
    mnw: 'G1',
    rnd: 'D',
    p: 'A A A A2'
  },
  IconButton: {
    thm: 'primary',
    Icon: {
      nm: 'send'
    }
  },
  ext: 'Flex',
  g: 'Y1'
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

// ── ToggleCaptionList ──
export const ToggleCaptionList = {
  ext: 'Flex',
  cex: 'ToggleCaption',
  fl: 'y',
  g: 'B',
  cp: {
    Caption: {
      tx: 'Caption'
    },
    Toggle: {
      Input: {},
      Flex: {
        ":after": {}
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── ToggleHgroup ──
export const ToggleHgroup = {
  Hgroup: {
    g: 'W2',
    H: {
      tg: 'h6'
    },
    P: {}
  },
  Toggle: {
    m: '- - - auto',
    Input: {},
    Flex: {
      after: {}
    }
  },
  ext: 'Flex',
  g: 'Z'
}

// ── ToggleHgroupList ──
export const ToggleHgroupList = {
  ext: 'Flex',
  cex: 'ToggleHgroup',
  fl: 'y',
  g: 'B',
  cp: {
    Hgroup: {
      g: 'W2',
      H: {
        tg: 'h6'
      },
      P: {}
    },
    Toggle: {
      m: '- - - auto',
      Input: {},
      Flex: {
        after: {}
      }
    }
  },
  ch: [
    {},
    {}
  ]
}

// ── U ──
export const U = {
  tx: 'Underlined text',
  ext: 'smbls.Underline'
}

// ── UnitValue ──
export const UnitValue = {
  Unit: {
    tx: '$'
  },
  Value: {
    tx: '73'
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'V',
  cp: {
    lh: '1em',
    c: 'title'
  }
}

// ── UploadButton ──
export const UploadButton = {
  tx: 'Choose file',
  Input: {
    typ: 'file',
    p: '0',
    ist: '0 0 0 0',
    pos: 'absolute',
    bsz: '100% 100%',
    cur: 'pointer',
    tp: '0',
    lft: '0',
    op: '0'
  },
  ext: 'Button',
  pos: 'relative',
  p: '0',
  cur: 'pointer',
  thm: 'transparent',
  c: 'blue'
}

// ── UploadIconButton ──
export const UploadIconButton = {
  Icon: {
    nm: 'upload'
  },
  Input: {
    typ: 'file',
    p: '0',
    ist: '0 0 0 0',
    pos: 'absolute',
    bsz: '100% 100%',
    cur: 'pointer',
    tp: '0',
    lft: '0',
    op: '0'
  },
  ext: 'IconButton',
  pos: 'relative',
  p: '0',
  cur: 'pointer'
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

// ── ValueCircleProgress ──
export const ValueCircleProgress = {
  CircleProgress: {
    ":after": {}
  },
  UnitValue: {
    pos: 'absolute',
    tp: '50%',
    lft: '50%',
    tf: 'translate(-50%, -50%)',
    fl: 'row-reverse',
    zi: '5',
    g: 'V',
    Value: {
      tx: '73'
    },
    Unit: {
      tx: '%'
    }
  },
  bd: '2'
}

// ── ValueHeading ──
export const ValueHeading = {
  H: {
    tg: 'h6',
    tx: 'Kobe Bryant'
  },
  UnitValue: {
    m: '- - - auto',
    Unit: {},
    Value: {}
  },
  ext: 'Flex',
  mnw: 'F3',
  aln: 'center space-between'
}

// ── ValueProgress ──
export const ValueProgress = {
  Progress: {
    mxw: '100%',
    fx: '1',
    val: 0.73
  },
  UnitValue: {
    fl: 'row-reverse',
    c: 'paragraph',
    Value: {
      tx: '73'
    },
    Unit: {
      tx: '%'
    }
  },
  ext: 'Flex',
  aln: 'center flex-start',
  g: 'Y2'
}

// ── AsciiMouse ──
export const AsciiMouse = {
  tg: 'canvas',
  scp: {},
  pos: 'absolute',
  tp: '0',
  lft: '0',
  w: '100%',
  h: '100%',
  pe: 'none',
  zi: '-1',
  d: 'block',
  "@rn": (el) => {
      const canvas = el.node
      const ctx = canvas.getContext('2d', {
        alpha: true
      })
  
      if (el.scope.cleanup) el.scope.cleanup()
  
      const COLOR = [0, 89, 250]
      const TRAIL_DECAY = 0.10
  
      const BASE_ALPHA = 0.04
      const DOWN_ALPHA_BOOST = 0.085
      const DOWN_GROW = 1.22
      const DOWN_CORE_BOOST = 0.6
  
      const ACTIVATE_AFTER = 2000 // ⏱️ 2 seconds
  
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
  
      let w = 0,
        h = 0,
        dpr = 1
      let lastCssW = 0,
        lastCssH = 0
  
      const parent = canvas.parentElement || document.body
  
      const startTime = performance.now()
      let enabled = false
  
      const blob = {
        x: 0.5,
        y: 0.5,
        vx: 0,
        vy: 0,
        r: 0.22,
        rActive: 0.30,
        t: 0,
        presence: 0,
        press: 0,
      }
  
      const pointer = {
        x: 0.5,
        y: 0.5,
        active: false,
        down: false,
        lastClientX: window.innerWidth * 0.5,
        lastClientY: window.innerHeight * 0.5,
      }
  
      const parentContentSize = () => {
        if (parent === document.body || parent === document.documentElement) {
          const de = document.documentElement
          const body = document.body
          return {
            width: Math.max(de.scrollWidth, body?.scrollWidth || 0, de.clientWidth),
            height: Math.max(de.scrollHeight, body?.scrollHeight || 0, de.clientHeight),
          }
        }
        return {
          width: Math.max(parent.scrollWidth, parent.clientWidth, parent.offsetWidth || 1),
          height: Math.max(parent.scrollHeight, parent.clientHeight, parent.offsetHeight || 1),
        }
      }
  
      const updatePointerFromClient = (clientX, clientY) => {
        pointer.lastClientX = clientX
        pointer.lastClientY = clientY
  
        const rect = parent.getBoundingClientRect()
        const localX = clientX - rect.left
        const localY = clientY - rect.top
  
        const scrollLeft =
          parent === document.body || parent === document.documentElement ?
          window.scrollX || 0 :
          parent.scrollLeft || 0
  
        const scrollTop =
          parent === document.body || parent === document.documentElement ?
          window.scrollY || 0 :
          parent.scrollTop || 0
  
        const contentX = localX + scrollLeft
        const contentY = localY + scrollTop
  
        const cssW = Math.max(1, w / dpr)
        const cssH = Math.max(1, h / dpr)
  
        pointer.x = clamp(contentX / cssW, 0, 1)
        pointer.y = clamp(contentY / cssH, 0, 1)
        pointer.active = true
  
        if (enabled) {
          blob.vx += (pointer.x - blob.x) * 0.002
          blob.vy += (pointer.y - blob.y) * 0.002
        }
      }
  
      const resize = () => {
        dpr = window.devicePixelRatio || 1
        const {
          width,
          height
        } = parentContentSize()
        const cssW = Math.floor(width)
        const cssH = Math.floor(height)
  
        if (cssW === lastCssW && cssH === lastCssH) return
        lastCssW = cssW
        lastCssH = cssH
  
        canvas.style.width = cssW + 'px'
        canvas.style.height = cssH + 'px'
  
        w = canvas.width = Math.floor(cssW * dpr)
        h = canvas.height = Math.floor(cssH * dpr)
  
        updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
      }
  
      const ro = new ResizeObserver(resize)
      ro.observe(parent)
      resize()
  
      const onMove = (e) => updatePointerFromClient(e.clientX, e.clientY)
      const onLeave = () => {
        pointer.active = false
      }
      const onDown = (e) => {
        pointer.down = true
        updatePointerFromClient(e.clientX, e.clientY)
      }
      const onUp = () => {
        pointer.down = false
      }
  
      window.addEventListener('mousemove', onMove, {
        passive: true
      })
      window.addEventListener('mouseleave', onLeave, {
        passive: true
      })
      window.addEventListener('mousedown', onDown, {
        passive: true
      })
      window.addEventListener('mouseup', onUp, {
        passive: true
      })
      window.addEventListener('resize', resize, {
        passive: true
      })
  
      let raf = 0
      let last = performance.now()
  
      const frame = (now) => {
        resize()
  
        if (!enabled && now - startTime >= ACTIVATE_AFTER) {
          enabled = true
        }
  
        const dt = clamp((now - last) / 1000, 0.001, 0.05)
        last = now
  
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.globalAlpha = TRAIL_DECAY
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
  
        const targetPresence = enabled && pointer.active ? 1 : 0
        blob.presence += (targetPresence - blob.presence) * 0.22
        blob.press += ((enabled && pointer.down ? 1 : 0) - blob.press) * 0.3
  
        if (blob.presence < 0.01) {
          raf = requestAnimationFrame(frame)
          return
        }
  
        const stiffness = 48
        const damping = 8
  
        const ax = (pointer.x - blob.x) * stiffness - blob.vx * damping
        const ay = (pointer.y - blob.y) * stiffness - blob.vy * damping
        blob.vx += ax * dt
        blob.vy += ay * dt
        blob.x += blob.vx * dt
        blob.y += blob.vy * dt
  
        const speed = Math.hypot(blob.vx, blob.vy)
        const energy = clamp(speed * 2, 0, 1)
        blob.t += (1 + energy * 2) * dt
  
        const cx = blob.x * w
        const cy = blob.y * h
  
        const baseR =
          Math.min(w, h) *
          (blob.r + (blob.rActive - blob.r) * blob.presence)
  
        const r =
          baseR *
          (1 + Math.sin(blob.t * 2) * 0.01) *
          (1 + energy * 0.22) *
          (1 + blob.press * (DOWN_GROW - 1))
  
        const alpha =
          (BASE_ALPHA + blob.press * DOWN_ALPHA_BOOST) * blob.presence
  
        const [cr, cg, cb] = COLOR
  
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
  
        const g = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r)
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`)
        g.addColorStop(0.3, `rgba(${cr},${cg},${cb},${alpha * 0.55})`)
        g.addColorStop(0.6, `rgba(${cr},${cg},${cb},${alpha * 0.2})`)
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
  
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
  
        const coreStrength = (0.08 + blob.press * DOWN_CORE_BOOST) * alpha
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.35)
        core.addColorStop(0, `rgba(255,255,255,${coreStrength})`)
        core.addColorStop(1, `rgba(255,255,255,0)`)
  
        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2)
        ctx.fill()
  
        ctx.restore()
  
        raf = requestAnimationFrame(frame)
      }
  
      raf = requestAnimationFrame(frame)
  
      el.scope.cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('mousedown', onDown)
        window.removeEventListener('mouseup', onUp)
        window.removeEventListener('resize', resize)
        el.scope.cleanup = null
      }
    }
}

// ── AsciiMouseCopy ──
export const AsciiMouseCopy = {
  pos: 'absolute',
  tp: '0',
  lft: '0',
  w: '100%',
  pe: 'none',
  zi: '-1',
  d: 'block',
  "@rn": (el) => {
      const canvas = el.node
      const ctx = canvas.getContext('2d', {
        alpha: true
      })
  
      if (el.scope.cleanup) el.scope.cleanup()
  
      const RAMP = ' .,:;i1tfLCG08@'
      const COLOR = 'rgba(0, 89, 250, 0.1)' // #0059FA @ 10%
      const CELL = 14
      const MAX_GLYPHS_PER_FRAME = 4500
      const TRAIL_DECAY = 0.10
  
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
  
      let w = 0,
        h = 0,
        dpr = 1
      let cell = 14
      let fontPx = 14
  
      // Track last pointer in viewport coords so scroll can update page coords
      const pointer = {
        // normalized page coords
        x: 0.5,
        y: 0.5,
        active: false,
  
        // last viewport coords (client)
        lastClientX: window.innerWidth * 0.5,
        lastClientY: window.innerHeight * 0.5,
        // last scroll
        lastScrollX: window.scrollX || 0,
        lastScrollY: window.scrollY || 0,
      }
  
      const docSize = () => {
        const de = document.documentElement
        const body = document.body
        const height = Math.max(
          de.scrollHeight,
          body ? body.scrollHeight : 0,
          de.clientHeight
        )
        const width = Math.max(de.clientWidth, window.innerWidth)
        return {
          width,
          height
        }
      }
  
      const updatePointerFromClient = (clientX, clientY) => {
        pointer.lastClientX = clientX
        pointer.lastClientY = clientY
  
        const scrollX = window.scrollX || 0
        const scrollY = window.scrollY || 0
        pointer.lastScrollX = scrollX
        pointer.lastScrollY = scrollY
  
        const pageX = clientX + scrollX
        const pageY = clientY + scrollY
  
        // normalize to document/canvas size
        pointer.x = clamp(pageX / Math.max(1, (w / dpr)), 0, 1)
        pointer.y = clamp(pageY / Math.max(1, (h / dpr)), 0, 1)
        pointer.active = true
      }
  
      const resize = () => {
        dpr = window.devicePixelRatio || 1
        const {
          width,
          height
        } = docSize()
  
        // Set CSS size (document space)
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
  
        // Set backing store size (device space)
        w = canvas.width = Math.floor(width * dpr)
        h = canvas.height = Math.floor(height * dpr)
  
        cell = Math.max(10, Math.round(CELL * dpr))
        fontPx = Math.max(10, Math.round(cell * 1.05))
        ctx.font = `${fontPx}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
        ctx.textBaseline = 'top'
  
        // recompute pointer mapping after resize
        updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
      }
  
      resize()
  
      const onMove = (e) => {
        updatePointerFromClient(e.clientX, e.clientY)
      }
  
      const onLeave = () => {
        pointer.active = false
      }
  
      const onScroll = () => {
        // if scroll changed but mouse didn't move, update page coords
        updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
        pointer.active = true
      }
  
      window.addEventListener('mousemove', onMove, {
        passive: true
      })
      window.addEventListener('mouseleave', onLeave, {
        passive: true
      })
      window.addEventListener('resize', resize, {
        passive: true
      })
      window.addEventListener('scroll', onScroll, {
        passive: true
      })
  
      const blob = {
        x: 0.5,
        y: 0.5,
        vx: 0,
        vy: 0,
        r: 0.22,
        rActive: 0.30, // bigger while active
        t: 0,
        presence: 0,
      }
  
      let raf = 0
      let last = performance.now()
  
      ctx.clearRect(0, 0, w, h)
  
      const frame = (now) => {
        const dt = clamp((now - last) / 1000, 0.001, 0.05)
        last = now
  
        // transparent trail decay (no bg tint)
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.globalAlpha = TRAIL_DECAY
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
  
        blob.presence += ((pointer.active ? 1 : 0) - blob.presence) * 0.12
        if (blob.presence < 0.01) {
          raf = requestAnimationFrame(frame)
          return
        }
  
        // spring follow
        const stiffness = 26
        const damping = 10
  
        const ax = (pointer.x - blob.x) * stiffness - blob.vx * damping
        const ay = (pointer.y - blob.y) * stiffness - blob.vy * damping
        blob.vx += ax * dt
        blob.vy += ay * dt
        blob.x += blob.vx * dt
        blob.y += blob.vy * dt
  
        const speed = Math.hypot(blob.vx, blob.vy)
        const energy = clamp(speed * 2, 0, 1)
        blob.t += (1 + energy * 2) * dt
  
        // IMPORTANT: map to canvas device pixels
        const cx = blob.x * w
        const cy = blob.y * h
  
        const baseR =
          Math.min(w, h) *
          (blob.r + (blob.rActive - blob.r) * blob.presence)
  
        const wobble = 1 + Math.sin(blob.t * 2) * 0.01
        const r = baseR * wobble
  
        const reach = r * (1.6 + energy * 0.4)
        const x0 = Math.max(0, Math.floor((cx - reach) / cell))
        const x1 = Math.min(Math.ceil(w / cell), Math.ceil((cx + reach) / cell))
        const y0 = Math.max(0, Math.floor((cy - reach) / cell))
        const y1 = Math.min(Math.ceil(h / cell), Math.ceil((cy + reach) / cell))
  
        const sigma = r * (0.55 + energy * 0.15)
        const inv2s2 = 1 / (2 * sigma * sigma)
  
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = COLOR
  
        let glyphs = 0
        const rampMax = RAMP.length - 1
        const strength = 0.95 * blob.presence
  
        for (let gy = y0; gy < y1; gy++) {
          const py = gy * cell
          const dy = py - cy
          for (let gx = x0; gx < x1; gx++) {
            if (glyphs++ > MAX_GLYPHS_PER_FRAME) break
  
            const px = gx * cell
            const dx = px - cx
            const d2 = dx * dx + dy * dy
            const t = Math.exp(-d2 * inv2s2)
            if (t < 0.03) continue
  
            const idx = Math.min(rampMax, (t * rampMax) | 0)
            ctx.globalAlpha = Math.min(0.8, t) * strength
            ctx.fillText(RAMP[idx], px, py)
          }
          if (glyphs > MAX_GLYPHS_PER_FRAME) break
        }
  
        ctx.restore()
  
        raf = requestAnimationFrame(frame)
      }
  
      raf = requestAnimationFrame(frame)
  
      el.scope.cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('resize', resize)
        window.removeEventListener('scroll', onScroll)
        el.scope.cleanup = null
      }
    },
  tg: 'canvas',
  scp: {}
}

// ── AsteriskParagraph ──
export const AsteriskParagraph = {
  extend: 'P',
  props: {
    d: 'Flex',
    fs: 'Z',
    tx: '',
    aln: 'flex-start flex-start',
    m: '0',
    Span: {
      tx: '*',
      fs: 'B',
      d: 'block',
      m: '-V - - -',
      c: 'blue'
    },
    Span_2: {
      tx: 'Frozen price on renewal until cancelled - 
      will be priced $588/year per seat after beta',
      c: 'title',
      p: '- - - Y2',
      mxw: 'G+B1'
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
        bg: 'gray15.75'
      }
    }
  },
  BannerHgroup: {
    zi: '2'
  },
  TabSet: {
    m: 'D2+Y2 - B2+W -',
    bg: 'black.25',
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

// ── BannerButton ──
export const BannerButton = {
  tg: 'label',
  fl: 'y',
  w: '95%',
  thm: 'primary',
  pos: 'relative',
  ov: 'hidden',
  mnh: 'fit-content',
  p: 'B1 B2 B C',
  mxw: 'J1',
  g: 'C',
  "@tabletS": {
    m: 'F1 - -'
  },
  "@mobileS": {
    m: 'D - D -',
    p: 'C B B2 B'
  },
  "@mobileXS": {
    p: 'C A B2 A'
  },
  rnd: 'A2',
  ":hover, &:focus-within": {
    "> h1": {
      txsh: 'gray1, 6px, 6px',
      tf: 'translate3d(-0.5%, -1%, 1px)'
    }
  },
  Icon: {
    nm: 'arrowUpRight',
    pos: 'absolute',
    tp: '-E2+B2',
    rgt: '-F+A2',
    bsz: 'I1+A ',
    op: '.4',
    sy: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    }
  },
  H1: {
    lh: '1em',
    p: '- - X2 -',
    c: 'white',
    fw: '700',
    fs: 'K',
    trn: 'A defaultBezier',
    trnp: 'text-shadow, transform',
    "@mobileS": {
      ta: 'center',
      lh: '1.2em',
      p: '- Z'
    },
    tx: 'Join the waitlist',
    txsh: 'none',
    tf: 'none'
  },
  Flex: {
    aln: 'end space-between',
    "@tabletS": {
      fl: 'y',
      aln: 'start space-between',
      g: 'D'
    },
    Flex_1: {
      fl: 'y',
      g: 'A',
      JoinWaitlist: {
        pos: 'relative',
        thm: 'document',
        m: '- - - -Z',
        Button: {
          thm: '',
          "@mobileS": {
            aln: 'center center',
            mnw: '100%'
          }
        },
        "@mobileS": {
          m: '0',
          fl: 'y',
          rnd: 'B',
          g: 'A',
          mnw: '100%',
          aln: 'center flex-start'
        }
      },
      Asterisk: {
        "@mobileS": {
          ta: 'center',
          p: '- Z'
        },
        tx: '* We\'ll only email you about invitation'
      },
      "@mobileS": {
        aln: 'center flex-start',
        mnw: '100%'
      }
    },
    Flex_2: {
      g: 'A2',
      aln: 'center',
      pos: 'relative',
      "@tabletS": {
        as: 'flex-end'
      },
      "@mobileL": {
        as: 'flex-start'
      },
      "@mobileS": {
        fl: 'y',
        aln: 'center flex-start',
        g: 'B',
        as: 'center'
      },
      P: {
        m: '0',
        tx: 'Want to skip the queue?',
        fw: '400',
        c: 'title',
        "@mobileS": {
          m: '0'
        }
      },
      Link: {
        "@tabletS": {
          p: '0'
        },
        ext: [
          'Link',
          'Button'
        ],
        tx: 'Book a demo',
        g: 'X',
        hrf: 'https://cal.com/symbols-josh/early-access',
        tgt: '_blank',
        thm: null,
        bg: 'none',
        c: 'title',
        td: 'none',
        ":hover": {
          td: 'underline'
        },
        Icon: {
          nm: 'arrowUpRight'
        },
        "@mobileM": {
          p: '0'
        },
        sy: {
          color: 'white'
        }
      }
    },
    "@mobileS": {
      aln: 'flex-start flex-start'
    }
  }
}

// ── BannerButtonCopy ──
export const BannerButtonCopy = {
  ext: 'Link',
  w: '95%',
  thm: 'primary',
  pos: 'relative',
  ov: 'hidden',
  mnh: 'fit-content',
  hrf: '/pricing',
  p: 'C B2 B2 B2',
  mxw: 'J1',
  m: 'E2 - D -',
  "@tabletS": {
    m: 'F1 - -'
  },
  "@mobileS": {
    m: 'D - D -'
  },
  "@mobileXS": {
    p: 'C B B2 B'
  },
  rnd: 'A2',
  ":hover": {
    "> h1": {
      txsh: 'gray1, 10px, 10px',
      tf: 'translate3d(-1%, -2%, 1px)'
    }
  },
  "@mobileL": {},
  H1: {
    lh: '1em',
    p: '- - X -',
    c: 'white',
    fw: '700',
    fs: 'K',
    mxw: 'D3',
    trn: 'A defaultBezier',
    trnp: 'text-shadow, transform',
    tx: 'Get lifetime access now',
    "@mobileL": {}
  },
  Flex: {
    g: 'A2',
    p: 'B - - -',
    "@mobileS": {
      fl: 'y',
      aln: 'flex-start flex-start',
      g: 'A'
    },
    P: {
      tx: 'Need a personalized invite?',
      fw: '400',
      "@mobileS": {
        m: '0'
      }
    },
    DocsLink: {
      ext: [
        'DocsLink',
        'Button'
      ],
      tx: 'Book a demo',
      g: 'X',
      hrf: 'https://cal.com/symbols-josh/early-access',
      tgt: '_blank',
      bg: 'none',
      c: 'white',
      td: 'none',
      Icon: {
        nm: 'arrowUpRight'
      },
      "@mobileM": {
        p: '0'
      }
    }
  },
  Icon: {
    nm: 'arrowUpRight',
    pos: 'absolute',
    tp: '-E2+B2',
    rgt: '-F+A2',
    bsz: 'I1+A ',
    "@mobileL": {
      op: '.4'
    },
    sy: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    }
  }
}

// ── BannerHgroup ──
export const BannerHgroup = {
  ext: 'Hgroup',
  ai: 'center',
  ta: 'center',
  g: 'A',
  H: {
    ext: 'Flex',
    aln: 'center flex-start',
    fl: 'row-reverse',
    tg: 'h2',
    fs: 'F1',
    tx: 'Canvas where the code meets design.',
    c: 'title',
    fw: '100',
    g: 'W2',
    Span: {
      tx: 'Symbols.',
      fw: '700'
    }
  },
  P: {
    tx: 'Work seamlessly with your team or clients in real-time. Build, test, and document apps with our streamlined platform, designed for developers.',
    mxw: 'H2',
    fs: 'A2'
  }
}

// ── BannerImg ──
export const BannerImg = {
  mxh: 'H+B',
  ov: 'hidden',
  pos: 'relative',
  w: '100%',
  Img: {
    src: 'platform.svg',
    w: '100%'
  },
  Img_2: {
    src: 'play.svg',
    pos: 'absolute',
    tp: '50%',
    lft: '50%',
    tf: 'translate(-50%, -50%)',
    m: '-B - - -'
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

// ── CTAButtonsCampaign ──
export const CTAButtonsCampaign = {
  g: 'D',
  aln: 'center',
  ch: [
    {
      ext: [
        'Link',
        'Button'
      ],
      hrf: '/signup',
      tx: 'Start for free',
      thm: 'primary',
      fw: '700',
      mnh: '42px',
      mxh: '42px',
      p: '- D+W'
    },
    {
      ext: [
        'DocsLink'
      ],
      hrf: 'https://cal.com/symbols-josh/early-access',
      tgt: '_blank',
      tx: 'Book a demo',
      thm: 'transparent',
      fw: '400',
      fl: 'row-reverse',
      c: 'title',
      g: 'Z',
      Icon: {
        nm: 'arrowUpRight',
        fs: 'A',
        m: '- - -W2 X1'
      }
    }
  ]
}

// ── CalBooking ──
export const CalBooking = {
  cg: 'C',
  p: 'D C2',
  rg: 'C2',
  mnw: 'G',
  mnh: 'G',
  "@in": () => {
      (function(C, A, L) {
        const p = function(a, ar) {
          a.q.push(ar)
        }
        const d = C.document
        C.Cal = C.Cal || function() {
          const cal = C.Cal
          const ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement('script')).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api = function() {
              p(api, arguments)
            }
            const namespace = ar[1]
            api.q = api.q || []
            typeof namespace === 'string' ?
              (cal.ns[namespace] = api) && p(api, ar) :
              p(cal, ar)
            return
          }
          p(cal, ar)
        }
      })(window, 'https://cal.com/embed.js', 'init')
    },
  "@rn": (el, s) => {
      window.Cal('inline', {
        elementOrSelector: el.node, // You can also provide an element directly
        calLink: 'team/symbols', // The link that you want to embed. It would open https://cal.com/jane in embed
        config: {
          name: s.name, // Prefill Name
          email: s.email, // Prefill Email
          notes: 'Symbols Demo', // Prefill Notes
          // guests: ['janedoe@gmail.com', 'test@gmail.com'], // Prefill Guests
          theme: 'dark' // "dark" or "light" theme
        }
      })
    }
}

// ── CaseItem ──
export const CaseItem = {
  extend: [
    'Link',
    'Flex'
  ],
  props: {
    g: 'B2',
    cur: 'pointer',
    ":hover": {
      "> div > div": {
        op: '1'
      },
      "> div > div:after": {
        w: '75%',
        op: '1'
      },
      "> div > div > svg": {
        tf: 'rotate(90deg)'
      }
    }
  },
  Img: {
    src: 'bitmap.svg',
    bsz: 'F2 G1',
    obf: 'fill'
  },
  Flex: {
    fl: 'y',
    aln: 'flex-start space-between',
    p: 'Z -',
    H2: {
      tx: 'How did BCW improve infra and management reporting in just 3 days',
      fw: '100',
      fs: 'B2+X1',
      mnw: 'F+B',
      mxw: 'F+B',
      lh: '1.3em',
      c: 'title'
    },
    IconText: {
      aln: 'center flex-start',
      fs: 'A1',
      fw: '100',
      g: 'Y2',
      pos: 'relative',
      mxw: 'fit-content',
      p: '- - X2 -',
      op: '.8',
      Icon: {
        nm: 'chevronUp',
        trn: 'transform .5s ease',
        tf: 'rotate(45deg)'
      },
      tx: 'Read more',
      ":after": {
        cnt: '""',
        h: '.5px',
        w: '0',
        op: '0',
        trn: 'width .3s ease, opacity .5s ease',
        bg: 'white.75',
        pos: 'absolute',
        bot: '0',
        lft: 'B-V'
      }
    }
  }
}

// ── CompaniesUsing ──
export const CompaniesUsing = {
  fl: 'x',
  g: 'D',
  aln: 'center flex-start',
  "@tabletS": {
    fl: 'y',
    g: 'C2',
    aln: 'center'
  },
  "@light": {},
  Caption: {
    tx: 'By team that previously contributed to:',
    c: 'caption',
    fs: 'Z',
    ws: 'nowrap'
  },
  Flex: {
    g: 'D',
    fl: 'x',
    aln: 'center',
    "@mobileS": {
      p: '- C2'
    },
    cex: 'Img',
    "@tabletL": {
      fxw: 'wrap',
      p: '- C2',
      aln: 'center center'
    },
    cp: {
      "@light": {
        ":nth-child(odd)": {
          d: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          d: 'none'
        }
      }
    },
    ch: [
      {
        h: 'A2',
        src: 'nike_light.svg'
      },
      {
        h: 'A2',
        src: 'nike_dark.svg'
      },
      {
        h: 'A1',
        src: 'sony_light.svg'
      },
      {
        h: 'A1',
        src: 'sony_dark.svg'
      },
      {
        h: 'A1',
        src: 'siemens.svg'
      },
      {
        h: 'A1',
        src: 'siemens.svg'
      },
      {
        h: 'B+X',
        src: 'apple_light.svg'
      },
      {
        h: 'B+X',
        src: 'apple_dark.svg'
      },
      {
        h: 'A2',
        src: 'microsoft_light.svg'
      },
      {
        h: 'A2',
        src: 'microsoft_dark.svg'
      },
      {
        h: 'A2',
        src: 'mtv.svg'
      },
      {
        h: 'A2',
        src: 'mtv.svg'
      },
      {
        h: 'A2',
        src: 'nokia.svg'
      },
      {
        h: 'A2',
        src: 'nokia.svg'
      },
      {
        h: 'A2',
        src: 'paypal.svg'
      },
      {
        h: 'A2',
        src: 'paypal.svg'
      },
      {
        h: 'A2',
        src: 'samsung_light.svg'
      },
      {
        h: 'A2',
        src: 'samsung_dark.svg'
      }
    ]
  }
}

// ── CreateFeature ──
export const CreateFeature = {
  fl: 'x',
  mnw: '320px',
  mxw: '1560px',
  pos: 'relative',
  m: '- auto',
  w: '100%',
  as: 'flex-start',
  p: '- - E -',
  Flex: {
    fl: 'y',
    mnw: '50%',
    cp: {
      p: 'D2 - D2 D2',
      bxs: 'border-box',
      pos: 'relative',
      "@mobileL": {
        p: 'D'
      },
      "@mobileM": {
        p: 'C B C B'
      },
      ":before": {
        cnt: '""',
        bsz: '1px 200%',
        pos: 'absolute',
        tp: '0',
        lft: '0',
        bg: 'line',
        zi: '0'
      },
      ":last-child": {
        ":after": {
          cnt: '""',
          bsz: '1px 200%',
          pos: 'absolute',
          bot: '0',
          lft: '0',
          bg: 'line',
          zi: '0'
        }
      },
      Img: {},
      Hgroup: {
        "@mobileS": {
          fs: 'Z1'
        }
      },
      Button: {
        "@mobileXS": {
          mnw: '100%',
          mxw: '100%'
        }
      }
    },
    cex: 'CreateFeatureItem',
    ch: [
      {},
      {
        Img: {
          src: 'users.svg'
        },
        Hgroup: {
          H: {
            mxw: 'F',
            Span: {
              tx: 'Turn team work into'
            },
            Span_2: {
              tx: ' features, pages, apps'
            },
            Span_3: null,
            Span_4: null
          },
          P: {}
        },
        Button: {
          tx: 'Start creating features'
        },
        P: {}
      },
      {
        Img: {
          src: 'rebrand.webp'
        },
        Hgroup: {
          H: {
            mxw: 'F',
            Span: {
              tx: 'Rebrand easily, export and publish',
              fw: '700'
            },
            Span_2: null,
            Span_3: null,
            Span_4: null
          },
          P: {}
        },
        Button: {
          tx: 'Start creating features'
        }
      }
    ]
  },
  Box: {
    ext: 'Flex',
    aln: 'center center',
    bsz: 'H2 50%',
    mnh: 'H2',
    pos: 'sticky',
    lft: '0',
    tp: '50%',
    rgt: '0',
    zi: '5',
    "@tabletS": {
      d: 'none'
    },
    Img: {
      obf: 'scale-down',
      bsz: '100%',
      src: 'landing.gif'
    },
    "@rn": (el) => {
          const top = el.call('getCenteredTopOffset')
          el.setProps({
            top: top / 2
          })
        }
  }
}

// ── CreateFeatureItem ──
export const CreateFeatureItem = {
  fl: 'y',
  aln: 'flex-start flex-start',
  Img: {
    src: 'comps.svg',
    bsz: 'E2 F2',
    m: '- - C -'
  },
  Hgroup: {
    g: 'A',
    H: {
      tx: '',
      fs: 'E1',
      mxw: 'F',
      lh: '1.3em',
      c: 'title',
      Span: {
        tx: 'Access',
        fw: '300'
      },
      Span_2: {
        tx: ' 3000+ features'
      },
      Span_3: {
        tx: ', or ',
        fw: '300'
      },
      Span_4: {
        tx: 'generate with AI'
      }
    },
    P: {
      tx: 'Invite team members, share and collaborate all-in-one realtime canvas',
      fs: 'A2+X',
      fw: '100',
      mxw: 'G+B2',
      c: 'title'
    }
  },
  Button: {
    ext: [
      'DocsLink',
      'Button'
    ],
    hrf: '/signup',
    tx: 'Create features',
    fw: '700',
    fl: 'row-reverse',
    aln: 'center center',
    g: 'A2',
    p: 'Z2 -',
    mnw: 'F3+B2',
    mxw: 'F3+B2',
    thm: null,
    c: 'highlight-reversed',
    bg: 'highlight',
    m: 'E - - -',
    Icon: {
      nm: 'chevronUp',
      fs: 'B',
      tf: 'rotate(45deg)',
      m: '-W - - -'
    },
    bd: '0'
  },
  P: {
    tx: '* Learning, creating and sharing is free of charge',
    fw: '100',
    m: 'B2 - - -'
  }
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
      c: 'highlight.9'
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

// ── FeatureStory ──
export const FeatureStory = {
  extend: 'Flex',
  props: {
    fl: 'y',
    aln: 'center flex-start',
    mnw: '320px',
    m: '- auto',
    w: '100%',
    mxw: 'J1'
  },
  Hgroup: {
    ta: 'center',
    aln: 'center flex-start',
    g: 'Z',
    p: '- - C2 -',
    "@tabletS": {
      p: '- B C2 B'
    },
    H: {
      c: 'title',
      tx: 'Turning ideas into',
      fw: '400',
      fs: 'E1',
      lh: '1.3em',
      Strong: {
        tx: ' features'
      }
    },
    P: {
      tx: 'Read our case studies how you can bootstrap, grow and scale your product with Symbols',
      fw: '400',
      fs: 'B',
      mxw: 'G3+B',
      c: 'title'
    }
  },
  Grid: {
    bdst: 'solid',
    bdc: 'line',
    bdw: '1px',
    m: 'C - - -',
    w: '100%',
    ov: 'hidden',
    col: 'repeat(3, 1fr)',
    "@tabletL": {
      col: '100%',
      p: 'C',
      g: 'D1'
    },
    "@mobileM": {
      p: '0',
      g: '0'
    },
    cp: {
      pos: 'relative',
      p: 'C1 B1 C C1',
      "@tabletL": {
        bsz: 'H2 100%',
        g: 'B1',
        p: '0 0 D C'
      },
      "@tabletS": {
        bsz: 'H 100%',
        p: '0 0 B1 B1'
      },
      "@mobileL": {
        bsz: 'G1 100%',
        p: '0 0 A1 B'
      },
      "@mobileM": {
        p: 'C B1',
        bsz: 'fit-content 100%'
      },
      "@mobileS": {
        p: 'B'
      },
      ":before": {
        cnt: '""',
        bsz: '.8px 130%',
        bg: 'line',
        zi: '4',
        pos: 'absolute',
        tp: '-C',
        lft: '-D1',
        d: 'none',
        "@tabletL": {
          d: 'block'
        },
        "@mobileM": {
          d: 'none'
        }
      },
      ":after": {
        cnt: '""',
        bsz: '100% 100%',
        pos: 'absolute',
        tp: '0',
        lft: '0',
        d: 'none',
        bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%)',
        zi: '2',
        "@tabletL": {
          d: 'block'
        },
        "@mobileM": {
          d: 'none'
        }
      },
      ":hover": {
        bg: 'line.35'
      },
      ":first-child": {
        ":before": {
          d: 'none'
        }
      },
      ":not(:last-child)": {
        bdw: '0 1px 0 0',
        bdst: 'solid',
        bdc: 'line',
        "@tabletL": {
          bdw: '0 0 0 0'
        },
        "@mobileM": {
          bdw: '0 0 1px 0'
        }
      },
      Box: {
        "@tabletL": {
          bsz: '100% 100%',
          pos: 'absolute',
          tp: '0',
          lft: '0'
        },
        "@mobileM": {
          pos: 'relative',
          bsz: 'F1 100%'
        },
        "@mobileXS": {
          bsz: 'F 100%'
        },
        Img: {
          "@tabletL": {
            op: '.7'
          },
          "@mobileM": {
            op: '1'
          }
        },
        Icon: {
          "@tabletL": {
            fs: 'E2',
            tp: '40%'
          },
          "@mobileL": {
            fs: 'E',
            tp: '38%'
          },
          "@mobileM": {
            fs: 'C',
            tp: '50%'
          }
        }
      },
      H3: {
        "@tabletL": {
          zi: '3',
          fs: 'F1',
          lh: '1.4em',
          m: 'auto 0 0 0',
          mxw: 'F+B1'
        },
        "@tabletS": {
          fs: 'E2'
        },
        "@mobileL": {
          fs: 'D',
          mxw: 'F+A'
        },
        "@mobileM": {
          fs: 'B2+X1',
          mxw: 'F',
          m: 'Z2 - B2 -',
          lh: '1.3em'
        },
        "@mobileS": {
          fs: 'D',
          m: '0 - B -'
        },
        "@mobileXS": {
          p: '- A - -'
        }
      },
      IconText: {
        "@tabletL": {
          zi: '3',
          ":after": {
            d: 'none'
          }
        }
      }
    },
    cex: 'StoryItem',
    ch: [
      {
        hrf: '/docs/intro'
      },
      {
        Box: {
          Img: {
            src: 'frame2.svg'
          }
        },
        H3: {
          tx: 'Inspect your existing website and customize'
        },
        IconText: {
          tx: 'Coming soon'
        }
      },
      {
        Box: {
          Img: {
            src: 'frame.png'
          }
        },
        H3: {
          tx: 'Turn your user stories and meetings into features',
          mxw: 'F1'
        },
        IconText: {
          tx: 'Coming soon'
        }
      }
    ]
  },
  CaseStudies: {
    hd: true,
    ext: 'Flex',
    m: 'D - - -',
    w: '100%',
    fl: 'y',
    g: 'A',
    aln: 'flex-start flex-start',
    ov: 'hidden',
    H6: {
      tx: 'Case studies',
      fs: 'A2',
      fw: '100'
    },
    Box: {
      ov: 'hidden',
      mxw: '100%',
      p: 'B2 -',
      pos: 'relative',
      bdst: 'solid',
      bdc: 'line',
      bdw: '1px',
      "@tabletS": {
        p: 'Z - - -'
      },
      "@mobileM": {
        p: 'A2 - - -'
      },
      "@mobileS": {
        p: 'A - A1 -'
      },
      ":after": {
        cnt: '""',
        bsz: '100% C1',
        bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        pos: 'absolute',
        tp: '0',
        rgt: '0',
        pe: 'none',
        "@mobileM": {
          d: 'none'
        }
      },
      Flex: {
        g: 'D',
        mxw: '100%',
        ov: 'auto',
        p: '- B',
        "@tabletS": {
          g: 'B2',
          p: '- B2',
          sy: {
            scrollSnapType: 'x mandatory'
          },
          spd: 'B2'
        },
        "@mobileS": {
          p: '- A',
          spd: 'A'
        },
        "::-webkit-scrollbar": {
          d: 'none'
        },
        cp: {
          fl: 'x',
          p: '0',
          "@tabletS": {
            mnw: '100%',
            mxw: '100%',
            fl: 'y',
            g: '0',
            aln: 'flex-start flex-start',
            sy: {
              scrollSnapAlign: 'start'
            }
          },
          Img: {
            "@tabletS": {
              bsz: 'G1 H'
            },
            "@mobileL": {
              bsz: 'G G2'
            },
            "@mobileM": {
              bsz: 'auto 100%'
            }
          },
          Flex: {
            H2: {
              "@tabletS": {
                mnw: 'D',
                mxw: 'G2',
                p: '- A B -'
              },
              "@mobileM": {
                fs: 'D',
                p: 'A A C Y'
              },
              "@mobileXS": {
                fs: 'C1',
                p: 'A Y C Y'
              }
            },
            IconText: {
              "@mobileM": {
                p: '- - - Z',
                m: 'A - - -'
              }
            }
          }
        },
        cex: 'CaseItem',
        ch: [
          {},
          {
            Img: {
              src: 'bitmap2.svg'
            },
            Flex: {
              H2: {
                tx: 'Delivering ecommerce that does not look like others - the Mankanet story',
                mnw: 'F+C1',
                mxw: 'F+C1'
              }
            }
          }
        ]
      },
      Scrollbar: {
        m: 'C - - -',
        mnw: '100%',
        mxw: '100%',
        p: '- B - B2',
        "@mobileS": {
          m: 'A2 - - -',
          p: '- A - B'
        },
        TrackContainer: {
          Track: {
            bg: 'gray3',
            onFrame: el => {
                          const flexNode = el.lookup('Flex').node
                          const viewportRatio = flexNode.clientWidth / flexNode.scrollWidth
                          const scrollRatio =
                            flexNode.scrollLeft / (flexNode.scrollWidth - flexNode.clientWidth)
            
                          el.variables({
                            clientWidth: flexNode.clientWidth,
                            scrollWidth: flexNode.scrollWidth
                          }).changed(() => {
                            const ScrollBar = el.lookup('Scrollbar')
                            // Check if there's no scrollable area
                            if (flexNode.clientWidth >= flexNode.scrollWidth) {
                              ScrollBar.setNodeStyles({
                                display: 'none'
                              })
                            } else {
                              ScrollBar.setNodeStyles({
                                display: 'flex'
                              })
                            }
                          })
            
                          // Set width as percentage of viewport vs scrollable area
                          el.node.style.width = `${viewportRatio * 100}%`
                          el.node.style.transform = `translateX(${
                        scrollRatio * (100 - viewportRatio * 100)
                      }%)`
                        }
          }
        },
        NavigationArrows: {
          cp: {
            thm: 'transparent',
            "@ck": (ev, el) => {
                          const flexNode = el.lookup('Flex').node
                          const isLeft = el.key === '0'
                          const scrollAmount = flexNode.clientWidth * .65
            
                          flexNode.scrollBy({
                            left: isLeft ? -scrollAmount : scrollAmount,
                            behavior: 'smooth'
                          })
                        },
            Icon: {}
          }
        }
      }
    }
  }
}

// ── Feedbacks ──
export const Feedbacks = {
  fl: 'y',
  g: 'E',
  bxs: 'content-box',
  pos: 'relative',
  aln: 'center flex-start',
  mnh: 'fit-content',
  mxw: '100%',
  "@tabletS": {
    ov: 'hidden'
  },
  "@mobileM": {
    g: 'D1'
  },
  ":before": {
    cnt: '""',
    bsz: '100% B2',
    pos: 'absolute',
    tp: '0',
    lft: '0',
    zi: '2',
    pe: 'none',
    bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    d: 'none',
    "@tabletS": {
      d: 'block'
    }
  },
  ":after": {
    cnt: '""',
    bsz: '100% D1',
    pos: 'absolute',
    tp: '0',
    rgt: '-X',
    pe: 'none',
    zi: '2',
    bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    d: 'none',
    "@tabletS": {
      d: 'block'
    }
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    bg: 'gray15',
    c: 'gray1',
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  Hgroup: {
    aln: 'center flex-start',
    g: 'A2',
    H: {
      "@mobileM": {
        p: '- B1',
        ta: 'center',
        lh: '1.3em'
      },
      ":before, &:after": {
        cnt: '\'"\'',
        fw: '400'
      },
      tx: 'This feels like a magical software',
      fs: 'E2',
      c: 'title'
    },
    P: {
      ta: 'center',
      tx: '- Mike Minciotti',
      c: 'title',
      fw: '700',
      Div: {
        fw: '300',
        tx: 'Agency founder'
      }
    }
  },
  Grid: {
    mxw: '100%',
    m: '- auto',
    col: 'repeat(3, 1fr)',
    g: 'F G',
    "@screenL": {
      g: 'F2',
      fs: 'A2'
    },
    "@screenM": {
      g: 'F1',
      fs: 'A1'
    },
    "@tabletM": {
      col: 'repeat(2, 1fr)',
      g: 'E'
    },
    "@tabletS": {
      d: 'flex',
      ai: 'center',
      jc: 'flex-start',
      mxw: '100%',
      ovx: 'auto',
      p: '- B2',
      g: 'D1',
      "::-webkit-scrollbar": {
        d: 'none'
      }
    },
    "@mobileM": {
      g: 'C',
      p: '- B'
    },
    pos: 'relative',
    cex: 'UserFeedBack',
    ch: [
      {
        tf: 'translateX(100px)',
        "@tabletM": {
          tf: 'translateX(0px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        }
      },
      {
        tf: 'translate(-30px, 105px)',
        "@tabletM": {
          tf: 'translate(0, 70px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'arthur.svg'
        },
        Flex: {
          Strong: {
            tx: 'Arthur Beckett'
          },
          Caption: {
            tx: 'Full Stack Developer'
          },
          P: {
            tx: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        tf: 'translate(-200px, -54px)',
        "@tabletM": {
          tf: 'translate(50px, 0px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'joe.svg'
        },
        Flex: {
          Strong: {
            tx: 'Joe Mallory-Skinner'
          },
          Caption: {
            tx: 'Design System Designer'
          },
          P: {
            tx: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        tf: 'translate(130px, -50px)',
        "@tabletM": {
          tf: 'translate(100px, 50px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'mike.svg'
        },
        Flex: {
          Strong: {
            tx: 'Mike Minciotti'
          },
          Caption: {
            tx: 'Agency Owner'
          },
          P: {
            tx: 'What you guys have built is really cool. I definitely see a use for this.'
          }
        }
      },
      {
        tf: 'translate(60px, -24px)',
        "@tabletM": {
          tf: 'translate(-50px, 30px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'derek.svg'
        },
        Flex: {
          Strong: {
            tx: 'Derek Onay'
          },
          Caption: {
            tx: 'Senior Product Designer'
          },
          P: {
            tx: 'Symbols is definitely more advanced than Storybook'
          }
        }
      },
      {
        tf: 'translate(-110px, -170px)',
        "@tabletM": {
          tf: 'translate(0, -10px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'aaron.svg'
        },
        Flex: {
          Strong: {
            tx: 'Aaron Fagan'
          },
          Caption: {
            tx: 'Enterprise Architect'
          },
          P: {
            tx: 'Symbols is miles ahead of what my company uses to manage UIkits'
          }
        }
      },
      {
        tf: 'translate(100px, -50px)',
        "@tabletM": {
          tf: 'translate(0px, 0)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'matt.svg'
        },
        Flex: {
          Strong: {
            tx: 'Matt Vaccaro'
          },
          Caption: {
            tx: 'Product Engineer'
          },
          P: {
            tx: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.'
          }
        }
      },
      {
        tf: 'translate(-20px, -135px)',
        "@tabletM": {
          tf: 'translate(70px, -30px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'chirag.svg'
        },
        Flex: {
          Strong: {
            tx: 'Chirag Thesia'
          },
          Caption: {
            tx: 'Software Engineer'
          },
          P: {
            tx: '👍  Great product. I will for sure be a customr. Also excited to see where you guys take it.'
          }
        }
      },
      {
        tf: 'translate(-100px, -230px)',
        "@tabletM": {
          tf: 'translate(0, 0)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'enes.svg'
        },
        Flex: {
          Strong: {
            tx: 'Enes Tufekci'
          },
          Caption: {
            tx: 'Owner of UIAgents'
          },
          P: {
            tx: 'I’m very impressed with the overall product. Very useful.'
          }
        }
      },
      {
        pos: 'absolute',
        rgt: 'E1',
        bot: '-C',
        "@tabletM": {
          pos: 'initial',
          tf: 'translate(30px, -30px)',
          rgt: 'initial',
          bot: 'initial'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'andrew.svg'
        },
        Flex: {
          Strong: {
            tx: 'Andrew Smith'
          },
          Caption: {
            tx: 'Product Director'
          },
          P: {
            tx: 'It looks like it will solve the big issue with tech stack fragmentation.'
          }
        }
      }
    ],
    "@screenS": {
      fs: 'A'
    }
  }
}

// ── FeedbacksShort ──
export const FeedbacksShort = {
  fl: 'y',
  g: 'D3',
  bxs: 'content-box',
  pos: 'relative',
  aln: 'center flex-start',
  mnh: 'fit-content',
  mxw: '100%',
  "@tabletS": {
    ov: 'hidden'
  },
  "@mobileM": {
    g: 'D1'
  },
  ":before": {
    cnt: '""',
    bsz: '100% B2',
    pos: 'absolute',
    tp: '0',
    lft: '0',
    zi: '2',
    pe: 'none',
    bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    d: 'none',
    "@tabletS": {
      d: 'block'
    }
  },
  ":after": {
    cnt: '""',
    bsz: '100% D1',
    pos: 'absolute',
    tp: '0',
    rgt: '-X',
    pe: 'none',
    zi: '2',
    bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    d: 'none',
    "@tabletS": {
      d: 'block'
    }
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    bg: 'gray15',
    c: 'gray1',
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  Hgroup: {
    aln: 'center flex-start',
    g: 'A2',
    H: {
      "@mobileM": {
        p: '- B1',
        ta: 'center',
        lh: '1.3em'
      },
      ":before, &:after": {
        cnt: '\'"\'',
        fw: '400'
      },
      tx: 'This feels like a magical software',
      fs: 'E2',
      c: 'title'
    },
    P: {
      ta: 'center',
      tx: '- Mike Minciotti',
      c: 'title',
      fw: '700',
      Div: {
        fw: '300',
        tx: 'Agency founder'
      }
    }
  },
  Grid: {
    mxw: '100%',
    m: '- auto',
    col: 'repeat(3, 1fr)',
    g: 'F G',
    "@screenL": {
      g: 'F2',
      fs: 'A2'
    },
    "@screenM": {
      g: 'F1',
      fs: 'A1'
    },
    "@tabletM": {
      col: 'repeat(2, 1fr)',
      g: 'E'
    },
    "@tabletS": {
      d: 'flex',
      ai: 'center',
      jc: 'flex-start',
      mxw: '100%',
      ovx: 'auto',
      p: '- B2',
      g: 'D1',
      "::-webkit-scrollbar": {
        d: 'none'
      }
    },
    "@mobileM": {
      g: 'C',
      p: '- B'
    },
    pos: 'relative',
    cex: 'UserFeedBack',
    ch: [
      {
        tf: 'translate(110px, -25px)',
        "@tabletM": {
          tf: 'translateX(0px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        }
      },
      {
        tf: 'translate(-30px, 65px)',
        "@tabletM": {
          tf: 'translate(0, 70px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'arthur.svg'
        },
        Flex: {
          Strong: {
            tx: 'Arthur Beckett'
          },
          Caption: {
            tx: 'Full Stack Developer'
          },
          P: {
            tx: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        tf: 'translate(-220px, -34px)',
        "@tabletM": {
          tf: 'translate(50px, 0px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'joe.svg'
        },
        Flex: {
          Strong: {
            tx: 'Joe Mallory-Skinner'
          },
          Caption: {
            tx: 'Design System Designer'
          },
          P: {
            tx: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        tf: 'translate(230px, -180px)',
        "@tabletM": {
          tf: 'translate(100px, 50px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'mike.svg'
        },
        Flex: {
          Strong: {
            tx: 'Mike Minciotti'
          },
          Caption: {
            tx: 'Agency Owner'
          },
          P: {
            tx: 'What you guys have built is really cool. I definitely see a use for this.'
          }
        }
      },
      {
        tf: 'translate(360px, -150px)',
        "@tabletM": {
          tf: 'translate(-50px, 30px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'derek.svg'
        },
        Flex: {
          Strong: {
            tx: 'Derek Onay'
          },
          Caption: {
            tx: 'Senior Product Designer'
          },
          P: {
            tx: 'Symbols is definitely more advanced than Storybook'
          }
        }
      }
    ],
    "@screenS": {
      fs: 'A'
    },
    cp: {
      fs: 'Z2'
    }
  }
}

// ── FooteLanding ──
export const FooteLanding = {
  aln: 'center space-between',
  p: 'X2 A X2 A2',
  w: '100%',
  m: '- auto',
  g: 'B',
  "@mobileL": {
    fl: 'column',
    aln: 'center center',
    g: 'B2'
  },
  cp: {
    "@mobileL": {
      aln: 'center center',
      ta: 'center',
      w: '100%',
      p: '0'
    }
  },
  Copy: {
    g: 'X2',
    lh: '1',
    "@dark": {
      c: 'gray8'
    },
    "@light": {
      c: 'gray5'
    },
    DocsLink: {
      tgt: '_blank',
      hrf: 'https://symbols.app',
      tx: 'Symbols'
    },
    Year: {
      tx: ' © Since 2021'
    },
    ext: 'Flex'
  },
  Flex: {
    tg: 'nav',
    cex: 'MenuItem',
    g: 'Z',
    Discord: {
      tgt: '_blank',
      hrf: 'https://discord.com/invite/crdFSkapFY',
      ico: 'discord'
    },
    Github: {
      tgt: '_blank',
      hrf: 'https://github.com/symbo-ls/',
      ico: 'github'
    },
    X: {
      tgt: '_blank',
      hrf: 'https://twitter.com/symbo_ls',
      ico: 'xcom'
    },
    Linkedin: {
      tgt: '_blank',
      hrf: 'https://www.linkedin.com/company/symbo-ls/',
      ico: 'linkedin'
    }
  }
}

// ── FrontendUnified ──
export const FrontendUnified = {
  mxw: 'J2',
  m: '- auto',
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      lh: '1em',
      "@mobileL": {
        d: 'flex',
        fxf: 'y',
        lh: '1em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Strong: {
        tx: 'Make Reusable Features'
      },
      Text: {
        fw: '300',
        tx: 'in minutes',
        "@mobileL": {
          d: 'none'
        }
      }
    },
    H6: {
      c: 'title',
      fw: '100',
      mxw: 'G3+C',
      tx: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.'
    }
  },
  WatchVideo: {
    bd: '0',
    bdst: 'none',
    m: 'E1 auto D3',
    p: 'X2 X1'
  },
  WhatIsSymbols: {
    m: 'E3 auto'
  }
}

// ── FrontendUnifiedCopy ──
export const FrontendUnifiedCopy = {
  Flex: {
    zi: '2',
    fl: 'y',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      lh: '1em',
      "@mobileL": {
        d: 'flex',
        fxf: 'y',
        lh: '1em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Strong: {
        tx: 'Make Reusable Features'
      },
      Text: {
        fw: '300',
        tx: 'in minutes',
        "@mobileL": {
          d: 'none'
        }
      }
    },
    H6: {
      c: 'title',
      fw: '100',
      mxw: 'G3+C',
      tx: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.'
    },
    aln: 'center'
  },
  WatchVideo: {
    bd: '0',
    bdst: 'none',
    m: 'E1 auto D3',
    p: 'X2 X1'
  }
}

// ── Hero ──
export const Hero = {
  fl: 'y',
  w: '100%',
  p: '0',
  g: '0',
  pos: 'relative',
  Main: {
    fl: 'x',
    w: '100%',
    h: '70dvh',
    aln: 'stretch',
    "@tabletS": {
      fl: 'y',
      h: 'auto'
    },
    Flex: {
      fl: 'y',
      fx: '1',
      w: '50%',
      p: 'G D E',
      jc: 'center',
      d: 'flex',
      g: 'D',
      mxw: 'I2',
      m: '- - - auto',
      h: '100%',
      "@tabletS": {
        w: '100%',
        p: 'E B',
        h: 'auto'
      },
      Header: {
        tg: 'header',
        fl: 'y',
        g: 'A',
        H1: {
          tx: null,
          c: 'title',
          lh: '1.2',
          mxw: 'K',
          "@tabletS": {
            fs: 'G'
          },
          "@mobileM": {
            fs: 'F'
          },
          Span: {
            fw: '300',
            tx: 'Infra and workspace for',
            d: 'block'
          },
          Strong: {
            fw: '700',
            tx: 'Interface Engineers',
            c: 'white'
          }
        },
        P: {
          m: 'A - - -',
          c: 'gray8',
          fw: '400',
          mxw: 'H2',
          lh: '1.6',
          fs: 'Z1',
          tx: 'Make interfaces once. Reuse them across products, brands, and platforms — without rebuilding UI every time.'
        }
      },
      Nav: {
        tg: 'nav',
        fl: 'y',
        g: 'A',
        w: '100%',
        mxw: 'I',
        m: 'C - - -B',
        p: 'C',
        thm: 'dots',
        Label: {
          tg: 'label',
          tx: 'CREATE WITH',
          fs: 'Z',
          ls: '1px',
          c: 'gray6',
          fw: '500',
          p: '- - A -'
        },
        Flex: {
          fl: 'x',
          g: 'Z2',
          fxw: 'nowrap',
          cex: [
            'Link',
            'Flex'
          ],
          cp: {
            aln: 'center',
            g: 'Z2',
            p: 'Y1 Z2',
            rnd: 'C',
            cur: 'pointer',
            fs: 'Y2',
            fw: '500',
            fx: '1',
            jc: 'space-between',
            trn: 'opacity .3s ease, border .3s ease',
            thm: 'quaternary',
            ws: 'nowrap'
          },
          ch: [
            {
              Icon: {
                nm: 'claude',
                fs: 'B1',
                c: '#D97757'
              },
              Text: {
                tx: 'Claude Code'
              },
              Icon_2: {
                nm: 'downloadOutline',
                fs: 'Z',
                c: 'gray6'
              },
              hrf: '/docs/claude-code'
            },
            {
              Icon: {
                nm: 'vscode',
                fs: 'A',
                c: '#007ACC'
              },
              Text: {
                tx: 'VSCode'
              },
              Icon_2: {
                nm: 'downloadOutline',
                fs: 'Z',
                c: 'gray6'
              },
              hrf: '/docs/vscode'
            },
            {
              Icon: {
                nm: 'cursorEditor',
                fs: 'B'
              },
              Text: {
                tx: 'Cursor'
              },
              Icon_2: {
                nm: 'downloadOutline',
                fs: 'Z',
                c: 'gray6'
              },
              hrf: '/docs/cursor'
            },
            {
              Icon: {
                nm: 'symbols',
                fs: 'B',
                c: 'blue'
              },
              Text: {
                tx: 'Web'
              },
              Icon_2: {
                nm: 'arrowUpRight',
                fs: 'Z',
                c: 'gray6'
              },
              hrf: '/signup'
            }
          ]
        }
      }
    },
    CanvasEmbed: {
      fx: '1',
      w: '50%',
      mxw: '50%',
      h: '100%',
      bg: 'gray6',
      rnd: '0',
      p: '0',
      project: '/nikoloza/default-flattened',
      "@tabletS": {
        w: '100%',
        h: '50vh'
      }
    }
  }
}

// ── HeroTitle ──
export const HeroTitle = {
  fl: 'y',
  aln: 'center',
  ta: 'center',
  c: 'title',
  g: 'A',
  "@mobileL": {
    g: 'B',
    p: '- B2'
  },
  H1: {
    Writing: {
      speed: 30,
      lh: '0.9',
      h: 'A+X',
      mnw: 'X',
      "@mobileS": {
        lh: '1.1em'
      },
      tx: 'Interface Engineering '
    },
    Writing_2: {
      "@mobileS": {
        m: 'A2 - - -'
      },
      tg: 'span',
      speed: 30,
      delay: 1200,
      lh: '0.9',
      h: 'A+X',
      mnw: 'X',
      fw: '200',
      afterText: 'starts here'
    },
    fxf: 'column',
    c: 'title',
    "@mobileS": {
      mxw: 'E'
    },
    tx: null,
    fs: 'K',
    "@mobileM": {
      fs: 'J2'
    }
  },
  H6: {
    m: 'X - -',
    h: 'C',
    ext: 'Writing',
    delay: 2000,
    speed: 5,
    c: 'title',
    fw: '400',
    mxw: 'H3',
    afterText: 'Symbols Suite helps you expand your skills to build and manage entire interfaces — from design systems to delivery and integrations.'
  },
  props: {}
}

// ── HeroTitleCopy ──
export const HeroTitleCopy = {
  props: {},
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      lh: '1.2',
      mxw: 'G',
      "@mobileL": {
        lh: '1.3em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      ch: [
        {
          fw: '300',
          tx: 'Your browser tab is now '
        },
        {
          tx: ' IDE, framework and deployment'
        }
      ]
    },
    H6: {
      c: 'title',
      fw: '300',
      mxw: 'H',
      tx: 'Rebuilding features wastes time. Ship or enhance production ready web projects in record time.'
    }
  }
}

// ── HeroTitleCopyCopy1 ──
export const HeroTitleCopyCopy1 = {
  props: {},
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'I',
      lh: '1.2',
      mxw: 'G',
      "@mobileL": {
        lh: '1.3em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Span: {
        fw: '300',
        tx: 'Instantly turn your ideas'
      },
      Div: {
        fw: '300',
        tx: 'into',
        Strong: {
          tx: ' features'
        }
      }
    },
    H6: {
      c: 'title',
      fw: '300',
      mxw: 'H',
      cp: {},
      ch: [
        {
          tx: 'Your browser tab is now IDE, framework and deployment.'
        },
        {
          tx: 'You can build infinite frontend with single codebase. '
        }
      ]
    }
  }
}

// ── HeroTitleCopyCopy1Copy2 ──
export const HeroTitleCopyCopy1Copy2 = {
  props: {},
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'I',
      lh: '1.2',
      mxw: 'G',
      "@mobileL": {
        lh: '1.3em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Span: {
        fw: '300',
        tx: 'Extend your apps with features,'
      },
      Div: {
        fw: '300',
        Strong: {
          tx: 'instantly'
        }
      }
    },
    H6: {
      c: 'title',
      fw: '300',
      mxw: 'H',
      cp: {},
      ch: [
        {
          tx: 'Your apps now have huge uikit, design system and AI editor.'
        },
        {
          tx: 'You can reuse it to infinite apps with a single codebase. '
        }
      ]
    }
  }
}

// ── HgroupImg ──
export const HgroupImg = {
  extend: 'Flex',
  props: {
    g: 'F1+X',
    mxw: 'fit-content',
    "@tabletM": {
      g: 'C'
    },
    "@tabletS": {
      fl: 'y',
      g: 'D',
      aln: 'center flex-start'
    },
    "@mobileM": {
      g: 'F',
      mxw: '100%'
    }
  },
  Hgroup: {
    g: 'B',
    "@tabletS": {},
    "@mobileM": {
      p: '- B2'
    },
    H: {
      tg: 'h1',
      tx: 'Lifetime access is available now',
      fs: 'G1',
      fw: '700',
      mxw: 'E+A',
      lh: '1.2em',
      "@tabletM": {
        fs: 'G'
      },
      "@mobileL": {
        fs: 'F'
      }
    },
    P: {
      d: 'Flex',
      fs: 'X1+X',
      mxw: 'G2+Z',
      tx: '',
      fw: '300',
      aln: 'flex-start flex-start',
      Span: {
        tx: '*',
        fs: 'B',
        d: 'block',
        m: '-X - - -',
        c: 'blue'
      },
      Span_2: {
        tx: 'The lifetime offer is limited to the beta release and  will switch to monthly pricing once fulfilled.',
        c: 'title',
        p: '- - - Y2'
      }
    }
  },
  Img: {
    src: 'infinite.svg',
    d: 'block',
    mxh: 'fit-content',
    "@mobileM": {
      tf: 'rotate(90deg)'
    }
  }
}

// ── Investors ──
export const Investors = {
  fl: 'y',
  g: 'B',
  H6: {
    tx: 'Investors:'
  },
  Grid: {
    tcol: 'repeat(3, 1fr)',
    "@tabletM": {
      tcol: 'repeat(2, 1fr)'
    },
    g: 'B',
    cex: [
      'AvatarHgroup'
    ],
    cp: {
      c: 'title',
      g: 'Z2',
      aln: 'start',
      hrf: '{{ href }}',
      Avatar: {
        m: '0',
        bsz: 'B',
        src: '{{ avatar }}'
      },
      Hgroup: {
        H: {
          tg: 'h6',
          fs: 'A1',
          fw: '600',
          m: '0',
          tx: '{{ name }}'
        },
        P: {
          tx: '{{ title }}'
        }
      }
    },
    cha: 'state',
    ch: [
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQG6VLe-hAv2HA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1621306128570?e=1759363200&v=beta&t=Z4SUlB9y2OqIjf9LbU7n0AH94wsMaTpvDsrm4qcb7bg',
        nm: 'Matt Pallakoff',
        ttl: 'Innovative Product Design Leader | ex Apple, Nook, Suki'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C4D03AQFbQdWExHLa6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1581961324261?e=1759363200&v=beta&t=0SudX05ax6HYAjQSOLkoC_wIXtRjC-TmjVzjwZe1eqE',
        nm: 'Irakli Janiashvili',
        ttl: 'Software Engineer at Lightdash ⚡️'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQFUHNpe3mba6A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1606841237051?e=1759363200&v=beta&t=Qt6Hy2Z0ZP69PxSknUmHhrP_xNJjy0ag8k-Hw7ftwpE',
        nm: 'Tamar Chkhaidze',
        ttl: 'Senior Tax Consultant at PwC'
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        nm: 'Natia Tsintsadze',
        ttl: 'Co-founder at Archy'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5103AQExz0EA26jyFA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517614662229?e=2147483647&v=beta&t=RnmXzUwXGyhJkn1UiYbAmPfOULfSnyqk6FWqqweSnMw',
        nm: 'Revaz Zakalashvili',
        ttl: 'Tech Lead & Senior Software Engineer'
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        nm: 'Revaz Maisashvili',
        ttl: 'Financial Director'
      }
    ],
    "@mobileL": {
      tcol: 'repeat(1, 1fr)'
    }
  }
}

// ── JoinWaitlist ──
export const JoinWaitlist = {
  tg: 'form',
  fl: 'x',
  thm: 'field',
  rnd: 'C1',
  ov: 'hidden',
  p: 'X2',
  g: 'X2',
  pos: 'relative',
  mxw: 'G3+C1',
  w: '100%',
  "@sm": async (ev, el, s) => {
      ev.preventDefault()
  
      const email = s.email.trim()
  
      if (!email) {
        s.update({
          status: 'error',
          error: 'Please enter an email.'
        })
        return
      }
  
      await s.update({
        status: 'loading',
        error: ''
      })
  
      const FORM_URL =
        'https://docs.google.com/forms/d/e/1FAIpQLScJzg36yk5Vy2gVBrL6TG4DgCA9CR2t00pDYqKniL9epZxSQQ/formResponse'
  
      const body = new URLSearchParams()
      body.set('entry.27167716', email)
  
      try {
        // In-browser: you may need mode:'no-cors' (you won't be able to read res status then)
        const res = await fetch(FORM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body,
          mode: 'no-cors'
        })
  
        el.call('openModal', '/thank-you-waitlist')
  
        s.update({
          status: 'success'
        })
        el.node.reset()
      } catch (err) {
        s.update({
          status: 'error',
          error: 'Something went wrong. Please try again.'
        })
      }
    },
  st: {
    status: 'idle',
    error: ''
  },
  LoadingGifSection: {
    pos: 'absolute',
    ist: '0',
    thm: 'document',
    isActive: (el, s) => s.status === 'loading',
    trn: 'C, defaultBezier',
    trnp: 'opacity, visibility',
    "!isActive": {
      op: 0,
      vis: 'hidden'
    }
  },
  Success: {
    pos: 'absolute',
    ist: '0',
    thm: 'document',
    flexAlign: 'center center',
    isActive: (el, s) => s.status === 'success',
    trn: 'C, defaultBezier',
    trnp: 'opacity, visibility',
    "!isActive": {
      op: 0,
      vis: 'hidden'
    },
    IconText: {
      g: 'Z',
      ico: 'check',
      c: 'title',
      tx: 'Thanks for registering your interest.',
      Icon: {
        c: 'green'
      }
    }
  },
  Input: {
    w: '100%',
    thm: 'transparent',
    phd: 'Enter your email',
    typ: 'email',
    req: true,
    "@ip": (ev, el, s) => {
          s.quietUpdate({
            email: el.node.value
          })
        },
    c: 'title'
  },
  Button: {
    thm: 'primary',
    tx: 'Get notified',
    ico: 'checkmark',
    g: 'X2',
    p: 'Z2 B Z2 B2',
    aln: 'center',
    typ: 'submit',
    Icon: {
      od: 2,
      fs: 'B'
    }
  }
}

// ── LandingAIPrompt ──
export const LandingAIPrompt = {
  fl: 'y',
  w: 'I2+D1',
  Box: {
    bsz: 'E2 100%',
    mnh: 'E2',
    ov: 'hidden',
    bdst: 'solid',
    bdc: 'line',
    bdw: '1px',
    pos: 'relative',
    rnd: 'A2',
    Textarea: {
      mnw: '100%',
      mnh: '100%',
      mxh: '100%',
      thm: 'transparent',
      bd: '0',
      bdw: '0',
      val: 'As an user, I need...',
      at: {
        placeholder: '"As an user, I need..."'
      },
      p: 'B - - B1',
      sy: {
        borderWidth: '0'
      }
    },
    Flex: {
      pos: 'absolute',
      tp: 'A1',
      rgt: 'B1',
      g: 'A2',
      cex: 'IconButton',
      cp: {
        p: 'X',
        thm: 'transparent'
      },
      ch: [
        {
          Icon: {
            nm: 'upload'
          }
        },
        {
          Icon: {
            nm: 'chevronUp'
          }
        }
      ]
    },
    Button: {
      tx: 'Create a feature',
      pos: 'absolute',
      p: 'Z2 C+X1',
      rgt: 'A1',
      bot: 'A1',
      fl: 'row-reverse',
      g: 'Y2',
      thm: 'blackWhite',
      fw: '600',
      Icon: {
        nm: 'chevronUp',
        fs: 'B',
        tf: 'rotate(45deg)',
        m: '-W - - -'
      }
    }
  },
  Flex: {
    aln: 'center space-between',
    p: '- X',
    Button: {
      thm: 'transparent',
      p: '0',
      tx: 'Explore Marketplace',
      g: 'X2',
      fw: '500',
      c: 'title',
      Icon: {
        nm: 'chevronUp',
        tf: 'rotate(45deg)',
        fs: 'B'
      }
    },
    Button_2: {
      thm: 'transparent',
      p: '0',
      tx: 'More Ideas',
      g: 'W2',
      fw: '400',
      m: '- auto - B',
      Icon: {
        nm: 'chevronDown',
        fs: 'B'
      }
    },
    P: {
      tx: '* No black-box, you can build it once, and take to everywhere',
      fw: '100'
    }
  }
}

// ── LandingCampaignHeader ──
export const LandingCampaignHeader = {
  fl: 'x',
  p: 'X2 A X2 Z',
  ai: 'center',
  mnw: '100%',
  bd: 'none',
  fs: '1rem',
  thm: 'header',
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@tabletS": {
    p: 'A1 A'
  },
  "@mobileM": {},
  "@mobileXS": {
    p: 'A1 Z'
  },
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
  Nav: {
    fxf: 'x',
    g: 'C',
    "@tabletS": {
      d: 'none'
    },
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'explore'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'developers'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'pricing'
        }
      }
    ]
  },
  P: {
    ext: 'Flex',
    tx: 'of single source',
    fw: '100',
    c: 'title',
    fl: 'row-reverse',
    m: '0 auto',
    g: 'W2',
    Span: {
      tx: 'Symbols',
      fw: '700',
      c: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    fxf: 'x',
    g: 'C',
    "@tabletS": {
      d: 'none'
    },
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    ch: [
      {
        c: 'caption',
        fw: '300',
        hrf: '/docs/resources',
        tx: '/support'
      },
      {
        c: 'caption',
        fw: '300',
        hrf: '/signin',
        tx: '/signin'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'create-account'
        }
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

// ── LandingFeatures ──
export const LandingFeatures = {
  w: 'I2+D1',
  fl: 'y',
  g: 'X',
  rnd: 'A',
  p: 'X',
  bdc: 'line',
  bdst: 'solid',
  bdw: '1px',
  "@ck": (ev, el, s) => {
      if (s.isVisible)
        el.node.scrollIntoView()
    },
  st: {
    src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4?'
  },
  Grid: {
    col: 'repeat(4, 1fr)',
    cex: [
      'Flex',
      'CanvasButton'
    ],
    g: '0 W2',
    cp: {
      fs: 'Z2',
      rnd: 'Z2',
      aln: 'center',
      p: 'Z2 A2',
      g: 'Z',
      fx: 1,
      isActive: (el, s) => el.props.src === s.src,
      Text: {
        tx: '{{ text }}'
      },
      "@ck": (ev, el, s) => {
              const isSame = el.props.src === s.src
              s.update({
                isVisible: !isSame,
                src: el.props.src
              })
            }
    },
    ch: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        tx: 'Agentic development'
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        tx: 'Drag-and-drop features'
      },
      {
        tx: 'Connect to your local IDE'
      },
      {
        tx: 'Publish to domain'
      },
      {
        tx: 'Present before saving'
      },
      {
        tx: 'Two-click 3rd party integrations'
      },
      {
        tx: 'Share in realtime sandbox isolation'
      },
      {
        tx: 'Rewind changes instantly'
      }
    ]
  },
  Box: {
    thm: 'dialog',
    rnd: 'A',
    ov: 'hidden',
    trn: 'C1 defaultBezier height',
    p: 'Y',
    pos: 'relative',
    ".isVisible": {
      h: 'H3'
    },
    "!isVisible": {
      h: 'F1'
    },
    "@rn": el => {
          window.requestAnimationFrame(() => {
            const height = el.Video.node.scrollHeight
            el.props['.isVisible'].height = height + 16
          })
        },
    "@ck": (ev, el, s) => {
          if (!s.isVisible) s.toggle('isVisible')
        },
    "@dark": {
      c: 'white',
      bgc: 'gray4.9'
    },
    "@light": {
      c: 'black',
      bgc: 'gray13.95'
    },
    Video: {
      src: '{{ src }}',
      w: '100%',
      zi: '2',
      rnd: 'Z2',
      ar: '11 / 7',
      obf: 'cover',
      autoplay: false,
      ctl: false,
      lp: true,
      onMouseenter: (ev, el) => {
              el.node.play()
            },
      onMouseleave: (ev, el) => {
              el.node.pause()
            }
    },
    ":after": {
      cnt: '""',
      pos: 'absolute',
      bot: '0',
      lft: '0',
      bsz: '50% 100%',
      zi: '2',
      bg: 'linear-gradient(to top, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
      trn: 'Z defaultBezier',
      trnp: 'opacity, transform',
      pe: 'none'
    }
  }
}

// ── LandingGetstarted ──
export const LandingGetstarted = {
  cex: [
    'Flex',
    'Link',
    'CanvasButton'
  ],
  rnd: 'Z2+W2',
  p: 'W',
  m: 'C1 - -',
  fl: 'x',
  g: 'X2',
  cp: {
    aln: 'center',
    p: 'Z A',
    cur: 'pointer',
    rnd: 'Z2',
    g: 'A',
    fx: 1
  },
  Create: {
    Img: {
      w: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbbc549b85e495f3c195f/download'
    },
    Text: {
      tx: 'Build your frontend'
    },
    hrf: '/signup'
  },
  VerticalLine: {
    ignoreChildProps: true,
    icex: true,
    m: 'A1 0'
  },
  Demos: {
    hrf: '/docs/examples',
    Img: {
      w: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbafe49b85e495f3c140a/download'
    },
    Text: {
      tx: 'Explore examples'
    }
  },
  VerticalLine_2: {
    ignoreChildProps: true,
    icex: true,
    m: 'A1 0'
  },
  Chrome: {
    hrf: '/docs/chrome-extension',
    Img: {
      w: 'C1',
      src: 'https://api.symbols.app/core/files/public/69284e6628a7fb3ff8d05c33/download'
    },
    Text: {
      tx: 'Build using extension'
    }
  }
}

// ── LandingHeader ──
export const LandingHeader = {
  fl: 'x',
  p: 'X2 A X2 Z',
  ai: 'center',
  mnw: '100%',
  bd: 'none',
  fs: '1rem',
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@mobileM": {},
  "@mobileXS": {
    p: 'A1 Z'
  },
  "@tabletS": {
    p: 'A1 A'
  },
  thm: 'header',
  Logo: {
    pos: 'relative',
    ico: 'logo',
    tp: 'auto',
    lft: 'auto',
    m: '- B - -',
    "@tabletS": {
      fs: 'E',
      m: '- 0 - -',
      p: '0'
    },
    thm: 'transparent'
  },
  Nav: {
    fxf: 'x',
    g: 'C',
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'explore'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'developers'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'pricing'
        }
      }
    ],
    "@tabletS": {
      d: 'none'
    }
  },
  P: {
    ext: 'Flex',
    tx: 'of single source',
    fw: '100',
    c: 'title',
    fl: 'row-reverse',
    m: '0 auto',
    g: 'W2',
    Span: {
      tx: 'Symbols',
      fw: '700',
      c: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    fxf: 'x',
    g: 'C',
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    "@tabletS": {
      d: 'none'
    },
    ch: [
      {
        c: 'caption',
        fw: '300',
        hrf: '/docs/resources',
        tx: '/support'
      },
      {
        c: 'caption',
        fw: '300',
        hrf: '/signin',
        tx: '/signin'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'create-account'
        }
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

// ── LandingNavbarCopy ──
export const LandingNavbarCopy = {
  ext: 'Navbar',
  g: 'A2',
  rnd: 'C1',
  p: 'X2 Z2',
  fs: 'Z2',
  us: 'none',
  thm: 'common-box',
  pos: 'absolute',
  tp: 'W1',
  lft: 'X',
  rgt: 'X',
  zi: 9999999,
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
  Nav: {
    fxf: 'x',
    g: 'C',
    "@tabletS": {
      d: 'none'
    },
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'explore'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'developers'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'pricing'
        }
      }
    ]
  },
  P: {
    ext: 'Flex',
    tx: 'of single source',
    fw: '100',
    c: 'title',
    fl: 'row-reverse',
    m: '0 auto',
    g: 'W2',
    Span: {
      tx: 'Symbols',
      fw: '700',
      c: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    fxf: 'x',
    g: 'C',
    "@tabletS": {
      d: 'none'
    },
    cex: 'DocsLink',
    cp: {
      c: 'title',
      fw: '400'
    },
    ch: [
      {
        c: 'caption',
        fw: '300',
        hrf: '/docs/resources',
        tx: '/support'
      },
      {
        c: 'caption',
        fw: '300',
        hrf: '/signin',
        tx: '/signin'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          c: 'title',
          fw: '600',
          tx: 'create-account'
        }
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

// ── Layout ──
export const Layout = {
  extend: 'Flex',
  props: {
    fl: 'y',
    ov: 'hidden',
    ovy: 'auto',
    mxh: '100%',
    p: '- - C2 -',
    mnw: 'J+F1',
    w: '100%',
    aln: 'start start',
    "@dark": {
      bg: 'black'
    },
    "@light": {
      bg: 'gray15'
    },
    "@screenL": {
      fs: 'A2'
    },
    "@screenM": {
      fs: 'A1'
    },
    "@screenS": {
      fs: 'A'
    },
    "@tabletL": {
      fs: 'Z2'
    },
    "@tabletM": {
      fs: 'Z1'
    }
  },
  Header: {},
  Banner: {
    mxh: '100%',
    mnw: '100%',
    mxw: '100%'
  },
  Feedbacks: {
    p: 'F1 - D2 -',
    mnw: '100%',
    mxw: '100%'
  },
  BuiltScale: {
    m: 'D - - -',
    mnw: '100%',
    mxw: '100%'
  },
  GameChanging: {
    p: 'E1 - E1 -',
    mnw: '100%',
    mxw: '100%'
  },
  OpenSource: {
    mnw: '100%',
    mxw: '100%'
  },
  Products: {
    m: 'E2 auto'
  },
  Footer: {
    m: '- auto'
  }
}

// ── MakeDesignWithCode ──
export const MakeDesignWithCode = {
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      m: '- - -',
      lh: 1.2,
      "@mobileL": {
        d: 'flex',
        fxf: 'y',
        lh: '1.2em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Strong: {
        tx: 'Engineering the interface layer',
        "@mobileL": {
          d: 'none'
        }
      }
    },
    H6: {
      m: 'X - -',
      c: 'title',
      fw: '300',
      mxw: 'G3+C',
      tx: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps in one go.'
    }
  }
}

// ── MakeDesignWithCodeCopy ──
export const MakeDesignWithCodeCopy = {
  props: {},
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      lh: '1em',
      "@mobileL": {
        d: 'flex',
        fxf: 'y',
        lh: '1.2em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Strong: {
        tx: 'The Most Advanced Front-end Editor'
      },
      Text: {
        fw: '300',
        tx: 'with no-code, marketplace and AI',
        m: 'W - X',
        "@mobileL": {
          d: 'none'
        }
      }
    },
    H6: {
      c: 'title',
      fw: '300',
      mxw: 'G3+C',
      tx: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps online.'
    }
  }
}

// ── MenuIcon ──
export const MenuIcon = {
  ext: 'Button',
  fl: 'y',
  p: 'Y',
  g: 'Y1',
  aln: 'flex-end flex-start',
  bg: 'transparent',
  cp: {
    mnh: 'V2',
    mxh: 'V2',
    h: 'V2',
    bg: 'white',
    rnd: 'C',
    trn: 'transform .3s ease',
    ":first-child": {
      w: 'B',
      ".activeMenu": {
        tf: 'rotate(45deg) translate(2px, 0px)'
      },
      "!activeMenu": {
        tf: 'rotate(0deg)'
      }
    },
    ":last-child": {
      w: 'B',
      ".activeMenu": {
        tf: 'rotate(-45deg) translate(5px, -5px)'
      },
      "!activeMenu": {
        tf: 'rotate(0deg)'
      }
    }
  },
  ch: [
    {},
    {}
  ],
  cha: 'props'
}

// ── Numbers ──
export const Numbers = {
  fl: 'y',
  g: 'A2',
  H6: {
    tx: 'Quick stats:'
  },
  Grid: {
    fl: 'y',
    g: 'C',
    m: 'B 0 A',
    col: 'repeat(4, 1fr)',
    "@mobileM": {
      col: 'repeat(1, 1fr)'
    },
    "@tabletM": {
      col: 'repeat(2, 1fr)'
    },
    cex: [
      'Hgroup'
    ],
    cp: {
      c: 'title',
      g: 'Z2',
      aln: 'start',
      H: {
        tg: 'h6',
        fw: '600',
        m: '0',
        tx: '{{ value }}'
      },
      P: {
        od: '-1',
        tx: '{{ title }}'
      }
    },
    cha: 'state',
    ch: [
      {
        ttl: 'Investors',
        val: '8'
      },
      {
        ttl: 'Beta Users',
        val: '518'
      },
      {
        ttl: 'AI Models',
        val: '7'
      },
      {
        ttl: 'Marketplace items',
        val: '3,184'
      }
    ]
  }
}

// ── OpenSource ──
export const OpenSource = {
  fl: 'y',
  aln: 'center flex-start',
  g: 'D',
  Hgroup: {
    aln: 'center flex-start',
    g: 'B2',
    ta: 'center',
    H: {
      tx: 'Open-Source Ecosystem',
      c: 'transparent',
      fs: 'A+I',
      fw: '900',
      "-webkit-text-stroke": '2px #4A51FF'
    },
    P: {
      tx: 'Develop with confidence, as Symbols is built from the ground up with open-source in mind.',
      mxw: 'H'
    }
  },
  TabSetTwo: {
    cp: {
      ":first-child": {
        thm: 'primary'
      }
    }
  }
}

// ── PackageIncludes ──
export const PackageIncludes = {
  extend: 'Flex',
  props: {
    fl: 'y',
    aln: 'flex-start flex-start',
    g: 'A2',
    cex: 'IconText',
    cp: {
      ws: 'nowrap',
      fw: '300',
      g: 'Y',
      fs: 'A',
      Icon: {
        nm: 'check',
        fs: 'Z'
      }
    },
    ch: [
      {
        tx: 'Includes starter plan'
      },
      {
        tx: 'custom UI building'
      },
      {
        tx: 'Instant delivery'
      },
      {
        tx: 'Custom animations'
      },
      {
        tx: 'Realtime preview'
      },
      {
        tx: 'Available paralel delivery'
      },
      {
        tx: 'Custom plugins'
      },
      {
        tx: 'Unlimited revisions'
      },
      {
        tx: 'Private discord communication'
      },
      {
        tx: 'Custom integrations'
      }
    ]
  }
}

// ── Packages ──
export const Packages = {
  extend: 'Box',
  props: {
    mnw: '100%',
    mxw: '100%',
    mnh: 'fit-content',
    pos: 'relative',
    ":before": {
      cnt: '\'\'',
      bsz: '100% D',
      pos: 'absolute',
      tp: '0',
      lft: '0',
      bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      pe: 'none',
      d: 'none',
      "@tabletS": {
        d: 'block'
      }
    },
    ":after": {
      cnt: '\'\'',
      bsz: '100% D',
      bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      pos: 'absolute',
      tp: '0',
      rgt: '0',
      pe: 'none',
      d: 'none',
      "@tabletS": {
        d: 'block'
      }
    },
    "@tabletS": {
      ovx: 'hidden'
    }
  },
  Grid: {
    col: '2fr 3fr 3fr',
    cex: 'Flex',
    "@tabletL": {
      col: 'repeat(2, auto)',
      rg: 'E'
    },
    "@tabletS": {
      d: 'flex',
      ov: 'auto',
      p: '- E - D'
    },
    "@mobileM": {
      p: '- C'
    },
    "@mobileS": {
      p: '- B2 - B2'
    },
    cp: {
      tg: 'form',
      fl: 'y',
      aln: 'flex-start flex-start',
      Hgroup: {
        g: 'Z1',
        H: {
          tg: 'h6',
          fs: 'C1',
          fw: '700'
        },
        P: {
          c: 'title'
        }
      }
    },
    ch: [
      {
        p: '- D - -',
        "@mobileS": {
          p: '- B2 - -'
        },
        Hgroup: {
          H: {
            tx: 'Free'
          },
          P: {
            tx: 'Unlimited members plan'
          }
        },
        IconText: {
          g: 'Z',
          m: 'C - - -',
          tx: 'Your current plan',
          fw: '900',
          Icon: {
            at: {
              name: 'check'
            }
          }
        },
        P: {
          m: 'A2 - D -',
          mxw: 'G',
          tx: 'Collaborate and launch your project free with your team.'
        },
        PackageIncludes: {
          ch: null
        }
      },
      {
        p: '- D - C1',
        bdst: 'solid',
        bdc: 'blue.25',
        bdw: '0 1px 0',
        "@tabletL": {
          bdw: '0 0 0 1px'
        },
        "@tabletS": {
          bdw: '0 1px 0'
        },
        "@mobileS": {
          p: '- B2 - B2'
        },
        "@sm": null,
        Hgroup: {
          H: {
            tx: 'Starter'
          },
          P: {
            tx: 'Limited offer infinite members - available now in beta'
          }
        },
        PriceOptions: {
          m: 'C - B2 -',
          "@mobileM": {
            fl: 'y',
            g: 'B'
          },
          cp: {
            Radio: {
              chk: null,
              nm: 'starter',
              Input: {
                nm: 'starter'
              }
            }
          }
        },
        Button: {
          thm: 'primary',
          tx: 'Upgrade',
          fl: 'row-reverse',
          p: 'Z1 C',
          fw: '700',
          g: 'Y1',
          typ: 'submit',
          Icon: {
            nm: 'chevronUp'
          }
        },
        PackageIncludes: {
          m: 'B2+W1 - - -',
          ch: null
        },
        AsteriskParagraph: {
          m: 'C - 0 -'
        }
      },
      {
        p: '- - - C1',
        "@tabletL": {
          p: '- - - 0',
          gc: 'span 2',
          mxw: 'fit-content'
        },
        "@tabletS": {
          p: '- - - C1'
        },
        "@mobileS": {
          p: '- - - B2'
        },
        "@sm": null,
        Hgroup: {
          H: {
            tx: 'Experts'
          },
          P: {
            tx: 'Get a custom UI—built by Symbols experts'
          }
        },
        PriceOptions: {
          m: 'C - B2 -',
          "@mobileM": {
            fl: 'y',
            g: 'B'
          },
          cp: {
            Radio: {
              chk: null,
              nm: 'experts',
              Input: {
                nm: 'experts'
              }
            }
          },
          ch: null
        },
        IconButton: {
          m: '-D+Z1 0 C1+Y A2',
          as: 'end',
          thm: 'transparent',
          p: '0',
          "@screenMS": {
            m: '-D+Z1 -B2 C1+Y A2'
          },
          "@screenS": {
            m: '-D+Z1 -A1 C1+Y A2'
          },
          "@tabletL": {
            m: '-D+Z1 0 C1+Y A2'
          },
          "@tabletS": {
            m: '-D+Z1 -C C1+Y A2'
          },
          "@mobileM": {
            m: '-D+Z1 C C1+Y A2'
          },
          Icon: {
            nm: null,
            fs: 'B'
          },
          "@ck": null
        },
        PriceOptions_2: {
          hd: null,
          m: '- - B2 -',
          "@mobileM": {
            fl: 'y',
            g: 'B'
          },
          cp: {
            Radio: {
              nm: 'experts',
              Input: {
                nm: 'experts'
              }
            }
          },
          ch: null
        },
        Button: {
          thm: 'primary',
          tx: 'Hire Experts',
          fl: 'row-reverse',
          p: 'Z1 C',
          typ: 'submit',
          fw: '700',
          g: 'Y1',
          Icon: {
            nm: 'chevronUp',
            tf: 'rotate(45deg)',
            d: 'block',
            m: '-W2 - - -'
          }
        },
        PackageIncludes: {
          m: 'B2+W1 - - -',
          ch: null
        },
        Flex: {
          aln: 'flex-start flex-start',
          g: 'D2',
          m: 'auto - - -',
          "@tabletL": {
            m: 'D - - -'
          },
          "@mobileM": {
            fl: 'y',
            g: 'B1'
          },
          AsteriskParagraph: {
            Span: {},
            Span_2: {
              tx: 'To hear more pricing options or custom inquiries
              book 30 minutes free call with our sales',
              mxw: 'G+D'
            }
          },
          Link: {
            hrf: 'https://cal.com/symbols-josh/early-access',
            ws: 'nowrap',
            tx: 'Contact sales',
            p: '0',
            fw: '700',
            tgt: '_blank',
            c: 'title',
            "@mobileS": {
              m: '- - - Z1'
            },
            ":hover": {
              td: 'underline'
            }
          }
        }
      }
    ]
  }
}

// ── ParagraphTransparency ──
export const ParagraphTransparency = {
  fw: '300',
  ta: 'center',
  fs: 'A+X',
  c: 'title',
  mxw: 'H+C',
  p: '- C',
  "@mobileM": {
    p: '- B'
  },
  tg: 'p',
  Strong: {
    tx: 'Whatever you create in Symbols'
  },
  Span: {
    tx: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.'
  }
}

// ── PartnerSet ──
export const PartnerSet = {
  g: 'C',
  aln: 'center',
  "@light": {},
  Caption: {
    tx: 'With partnership',
    fw: '100',
    c: 'title'
  },
  Flex: {
    g: 'C',
    cex: 'Img',
    cha: 'props',
    cp: {
      "@light": {
        ":nth-child(odd)": {
          d: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          d: 'none'
        }
      },
      ":nth-child(odd)": {},
      ":nth-child(even)": {}
    },
    ch: [
      {
        src: 'google.svg'
      },
      {
        src: 'googleDark.png'
      },
      {
        src: 'based.svg'
      },
      {
        src: 'basedDark.png'
      },
      {
        src: 'BCW.svg'
      },
      {
        src: 'bcwDark.png'
      }
    ]
  }
}

// ── PerksInclude ──
export const PerksInclude = {
  extend: 'Flex',
  props: {
    fl: 'y',
    aln: 'flex-start flex-start',
    g: 'C',
    mxw: 'fit-content',
    "@tabletS": {
      p: '- B2',
      g: 'D',
      as: 'center'
    }
  },
  H6: {
    tx: 'Some perks also included',
    fw: '300',
    fs: 'A'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    cg: 'F+B',
    "@tabletM": {
      cg: 'E1'
    },
    "@tabletS": {
      col: 'repeat(2, 1fr)',
      rg: 'D'
    },
    "@mobileL": {
      cg: 'D2'
    },
    "@mobileM": {
      col: 'repeat(1, 1fr)',
      cg: '0',
      rg: 'C1'
    },
    cex: 'Flex',
    cp: {
      fl: 'y',
      g: 'B',
      aln: 'flex-start flex-start',
      cex: 'IconText',
      cp: {
        ws: 'nowrap',
        g: 'Z',
        Icon: {
          nm: 'check'
        }
      }
    },
    ch: [
      {
        ch: [
          {
            tx: 'Open-source'
          },
          {
            tx: 'Brandbook and preview'
          },
          {
            tx: 'Developers documentation'
          }
        ]
      },
      {
        ch: [
          {
            tx: 'Design System'
          },
          {
            tx: 'Realtime collaboartion'
          },
          {
            tx: 'CLI tool'
          }
        ]
      },
      {
        ch: [
          {
            tx: '650+ Symbols components'
          },
          {
            tx: '99.99% uptime'
          },
          {
            tx: 'Help center'
          }
        ]
      }
    ]
  }
}

// ── PriceOptions ──
export const PriceOptions = {
  extend: 'Flex',
  props: {
    g: 'C1',
    cp: {
      tg: 'label',
      cur: 'pointer',
      fxf: 'x',
      g: 'Z',
      fl: 'row-reverse',
      Radio: {
        m: '-W - - -',
        Input: {
          at: {
            name: 'starter'
          },
          val: null,
          "@cg": null,
          ":checked + div": {
            thm: 'transparent'
          },
          ":checked + div > svg": {
            op: '1'
          }
        },
        Flex: {
          bd: 'solid, gray.5',
          bdw: '.5px',
          thm: 'transparent',
          p: 'V',
          Icon: {
            nm: 'check',
            op: '0',
            fs: 'Z2'
          },
          ":after": null
        }
      },
      Hgroup: {
        g: 'X',
        H: {
          tg: 'strong',
          tx: null,
          c: 'title',
          fw: '700'
        },
        P: {
          fs: 'Z',
          fw: '300',
          tx: null,
          c: 'title'
        }
      }
    },
    cha: 'state',
    ch: [
      {
        term: 'Monthly',
        price: 29
      },
      {
        term: 'Annual',
        price: 199
      },
      {
        term: 'Lifetime',
        price: 299
      }
    ]
  }
}

// ── QuickHeroTitle ──
export const QuickHeroTitle = {
  Flex: {
    zi: '2',
    fxf: 'y',
    flexAlign: 'center',
    ta: 'center',
    c: 'title',
    g: 'A',
    "@mobileL": {
      g: 'B',
      p: '- B2'
    },
    H1: {
      c: 'title',
      tx: null,
      fs: 'G+X',
      lh: '1.2',
      mxw: 'G',
      "@mobileL": {
        lh: '1.3em'
      },
      "@mobileS": {
        fs: 'J2'
      },
      Span: {
        fw: '300',
        tx: 'Build reusable '
      },
      Strong: {
        tx: 'web features '
      },
      Br: {},
      Strong_2: {
        tx: 'in seconds'
      },
      Span_2: {
        fw: '300',
        tx: ', not days'
      }
    },
    H6: {
      c: 'title',
      fw: '300',
      mxw: 'H2',
      tx: 'Rebuilding features wastes time. Symbols enables frontend teams to build lego-like features. Ship or enhance production ready web projects in record time.'
    }
  }
}

// ── RemainingLine ──
export const RemainingLine = {
  g: 'Z',
  aln: 'center flex-start',
  pos: 'relative',
  ":before": {
    cnt: '""',
    pos: 'absolute',
    bsz: 'C G2',
    bg: 'linear-gradient(to right, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)'
  },
  mnw: '100%',
  Flex: {
    aln: 'center flex-start',
    w: '65%',
    "@rn": (el, s) => {
          el.setProps({
            width: s.percent + '%'
          })
        },
    Line: {
      bsz: '2px 100%',
      bg: 'linear-gradient(to right, #0015FF, #0009FE)'
    },
    Dot: {
      bsz: 'A2 A2',
      bg: 'rgba(0, 9, 254, .35)',
      rnd: '100%',
      m: '- - - -X',
      pos: 'relative',
      ":after": {
        cnt: '""',
        bsz: 'X1 X1',
        bg: '#0085FE',
        pos: 'absolute',
        tp: '50%',
        lft: '50%',
        tf: 'translate(-50%, -50%)',
        rnd: '100%',
        op: '1',
        zi: '100'
      }
    }
  },
  Span: {
    tx: '{{ percent }}% already raised',
    fw: '300'
  }
}

// ── SideMenu ──
export const SideMenu = {
  ext: 'LandingCampaignHeader',
  mnw: '0',
  fl: 'y',
  g: 'B',
  p: 'F1 0 0 0',
  ai: 'flex-end',
  bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
  pos: 'fixed',
  bdf: 'blur(5px)',
  tp: '0',
  rgt: '0',
  zi: '99999998',
  mnh: '100%',
  mxh: '100%',
  ov: 'hidden',
  mxw: '0',
  op: '0',
  ".activeMenu": {
    mnw: '100%',
    op: '1',
    trn: 'min-width .15s ease'
  },
  "!activeMenu": {},
  "> nav > a": {
    fs: 'F2',
    fw: '100'
  },
  "@mobileM": {
    ai: 'center',
    ta: 'center'
  },
  cp: {
    cp: {
      "@ck": (event, element, state) => {
              state.update({
                activeMenu: false
              })
            }
    }
  },
  tg: 'aside',
  Logo: null,
  Nav: {
    fxf: 'column',
    g: 'B',
    p: '- E - -',
    "@tabletS": {
      d: 'flex'
    },
    "@mobileM": {
      p: '- 0 - -'
    },
    cp: {
      Strong: {
        fw: '100'
      }
    }
  },
  P: null,
  Nav_2: {
    fxf: 'column',
    p: '- C - -',
    g: 'B',
    "@tabletS": {
      d: 'flex'
    },
    "@mobileM": {
      p: '0 0 0 0'
    },
    cp: {
      fw: '100',
      Strong: {
        fw: '100'
      }
    }
  },
  MenuIcon: null
}

// ── StoryItem ──
export const StoryItem = {
  extend: [
    'Link',
    'Flex'
  ],
  props: {
    fl: 'y',
    cur: 'pointer',
    ":hover": {
      "> h3 + div": {
        op: '1'
      },
      "> h3 + div:after": {
        w: '75%',
        op: '1'
      },
      "> h3 + div > svg": {
        tf: 'rotate(90deg)'
      }
    }
  },
  Box: {
    pos: 'relative',
    bsz: 'E3 F3',
    ov: 'hidden',
    Img: {
      src: 'Frame.svg',
      bsz: '100% 100%',
      obf: 'cover'
    },
    Icon: {
      nm: 'play',
      fs: 'C',
      rnd: '100%',
      pos: 'absolute',
      tp: '50%',
      lft: '50%',
      tf: 'translate(-50%, -50%)',
      zi: '3',
      bg: 'black.8',
      bxs: 'content-box',
      p: 'Z'
    }
  },
  H3: {
    tx: 'Start creating features for your apps',
    fs: 'B2+X1',
    fw: '100',
    mxw: 'F',
    m: 'Z2 - B2 -',
    lh: '1.3em'
  },
  IconText: {
    aln: 'center flex-start',
    fs: 'A1',
    fw: '600',
    g: 'Y2',
    thm: 'transparent',
    pos: 'relative',
    mxw: 'fit-content',
    p: '0 0 X2 0',
    op: '.8',
    c: 'white',
    tx: 'Get started',
    Icon: {
      nm: 'chevronUp',
      trn: 'transform .5s ease',
      tf: 'rotate(45deg)'
    },
    ":after": {
      cnt: '""',
      h: '.5px',
      w: '0',
      op: '0',
      trn: 'width .3s ease, opacity .5s ease',
      bg: 'white.75',
      pos: 'absolute',
      bot: '0',
      lft: 'B-V'
    }
  }
}

// ── SupportedBy ──
export const SupportedBy = {
  g: 'C',
  aln: 'center',
  "@mobileL": {
    fl: 'y',
    aln: 'center center',
    p: '- B'
  },
  "@light": {},
  Caption: {
    tx: 'Supported by',
    fw: '200'
  },
  Flex: {
    g: 'C',
    cex: 'Img',
    aln: 'center center',
    "@mobileL": {
      fxw: 'wrap'
    },
    cp: {
      "@light": {
        ":nth-child(odd)": {
          d: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          d: 'none'
        }
      },
      ":nth-child(odd)": {},
      ":nth-child(even)": {}
    },
    ch: [
      {
        mxw: 'F',
        src: 'google_for_startups_light.png'
      },
      {
        mxw: 'F',
        src: 'google_for_startups_dark.png'
      },
      {
        w: 'E+Z2',
        src: 'gh_for_startups_light.png'
      },
      {
        w: 'E+Z2',
        src: 'gh_for_startups_dark.png'
      },
      {
        w: 'E+A2',
        src: 'grafana_light.png'
      },
      {
        w: 'E+A2',
        src: 'grafana_dark.png'
      }
    ]
  }
}

// ── SurveyBanner ──
export const SurveyBanner = {
  fl: 'x',
  mnh: 'G1',
  bgi: 'banner.png',
  bgr: 'no-repeat',
  bgs: 'cover',
  ar: '1149 / 432',
  bd: '1px, solid',
  m: 'A 0',
  "@dark": {
    bdc: 'gray4'
  },
  "@light": {
    bgc: 'white',
    bdc: 'gray10'
  },
  Box: {
    as: 'flex-end',
    p: 'C2 D',
    H1: {
      mxw: 'F',
      tx: 'Only e2e tooling for Interface Engineers',
      lh: 1.3
    },
    P: {
      mxw: 'G3+A',
      m: 'Z1 0',
      tx: 'AI driven, realtime and centralized platform to build products as easily as filling Typeform and Airtable, also as powerful as Bubble and Figma.'
    }
  }
}

// ── SurveyForm ──
export const SurveyForm = {
  ext: 'Grid',
  tg: 'form',
  pos: 'relative',
  cg: 'C',
  p: 'C2',
  rg: 'B2',
  "@mobileM": {
    rg: 'C',
    p: 'B 0'
  },
  at: {
    action: 'https://formsubmit.co/hello@symbols.app',
    method: 'POST'
  },
  "SurveySelect.type": () => ({
      position: 'relative',
      Title: {
        text: 'Investor type'
      },
      options: [{
          text: 'Please specify',
          props: {
            selected: true,
            disabled: true
          }
        },
        {
          text: 'Individual'
        },
        {
          text: 'Venture Fund (LP)'
        },
        {
          text: 'Other Entity (Trust, LLC, Corporation, etc.)'
        },
      ]
    }),
  "SurveyInput.name": {
    Title: {
      tx: 'Investor (Legal entity name)'
    },
    Input: {
      val: '{{ name }}'
    }
  },
  "SurveyInput.email": {
    typ: 'email',
    Title: {
      tx: 'Investor email'
    },
    Input: {
      val: '{{ email }}'
    }
  },
  "SurveyTextarea.note": {
    Title: {
      tx: 'Note (optional)'
    },
    Textarea: {
      bd: '0'
    }
  },
  ContinueButton: {
    ext: [
      'Button',
      'ContinueButton'
    ],
    typ: 'submit',
    tx: 'Book a call',
    p: 'Z2 D',
    m: '- -Z',
    fw: '700',
    sy: {
      justifySelf: 'start'
    },
    "@mobileL": {
      w: '100%'
    }
  }
}

// ── SurveyInput ──
export const SurveyInput = {
  ext: 'SurveyLabel',
  pos: 'relative',
  aln: 'stretch flex-start',
  Title: {},
  Input: {
    thm: 'field',
    m: '- -Z',
    sy: {
      width: '-webkit-fill-available'
    },
    p: 'Z1 A2',
    phd: 'Please specify',
    at: {
      name: (el) => {
              const compRoot = el.parent
              const fieldKey = compRoot.key
              return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
            }
    },
    req: true,
    val: (el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          return s[key]
        },
    "@cg": (ev, el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          s.update({
            [key]: ev.target.value
          })
        }
  }
}

// ── SurveyLabel ──
export const SurveyLabel = {
  ext: 'GroupField',
  mxw: 'H'
}

// ── SurveySelect ──
export const SurveySelect = {
  ext: 'SurveyLabel',
  Title: {},
  DropdownField: {
    p: '0',
    rnd: 'C1',
    tbi: '-1',
    m: '- -Z',
    sy: {
      width: '-webkit-fill-available'
    },
    Value: null,
    Select: {
      props: ({
              state
            }) => {
              return {
                outline: 'none',
                border: 'none',
                background: 'transparent',
                color: 'currentColor',
                padding: 'Z1 A2',
                round: 'C1',
                width: '100%',
                appearance: 'none',
              }
            },
      at: {
        name: (el) => {
                  const compRoot = el.parent.parent
                  const fieldKey = compRoot.key
                  return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
                }
      },
      childExtend: {
        props: (el, s) => {
                  const compRoot = el.parent.parent.parent.parent
                  const fieldKey = compRoot.key
                  const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
                  const value = el.text
                  const stateValue = s[key]
                  if (el.key === '0' && !stateValue) return {
                    selected: true
                  }
                  return {
                    selected: value === stateValue
                  }
                }
      },
      $setCollection: ({
              parent
            }) => {
              return parent.parent.props.options
            },
      on: {
        change: (ev, el, s) => {
                  const compRoot = el.parent.parent
                  const fieldKey = compRoot.key
                  const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
                  const value = ev.target.value
                  if (value === 'Other') {
                    s[key] = 'Other'
                    return compRoot.setProps({
                      SurveyOtherInput: {
                        hide: !compRoot.SurveyOtherInput.props.hide
                      }
                    })
                  }
                  compRoot.setProps({
                    SurveyOtherInput: {
                      hide: true
                    }
                  }, {
                    preventUpdate: true
                  })
                  s.update({
                    [key]: ev.target.value
                  })
                }
      }
    },
    Buttons: {
      pos: 'absolute',
      rgt: 'Z',
      pe: 'none'
    }
  },
  SurveyOtherInput: {
    m: '0 -Z'
  }
}

// ── SurveyTextarea ──
export const SurveyTextarea = {
  ext: 'SurveyLabel',
  w: '100%',
  pos: 'relative',
  aln: 'stretch flex-start',
  Title: {},
  Textarea: {
    thm: 'field',
    m: '- -Z',
    sy: {
      width: '-webkit-fill-available'
    },
    mxw: 'none',
    p: 'Z1 A2',
    phd: 'Please specify',
    val: (el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          return s[key]
        },
    at: {
      name: (el) => {
              const compRoot = el.parent
              const fieldKey = compRoot.key
              return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
            }
    },
    req: true,
    "@cg": (ev, el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          s.update({
            [key]: ev.target.value
          })
        },
    bd: '0'
  }
}

// ── SymbolsEditor ──
export const SymbolsEditor = {
  fl: 'y',
  aln: 'flex-start flex-start',
  mnw: '320px',
  w: '100%',
  m: '- auto',
  mxw: '1560px',
  mxh: '100%',
  g: 'D',
  MakeDesignWithCode: {
    m: '- auto'
  },
  Grid: {
    w: '100%',
    mxw: '100%',
    col: 'repeat(3, 1fr)',
    cex: 'Box',
    m: '0 auto',
    g: 'B',
    p: '- B',
    "@tabletL": {
      col: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      col: '100%'
    },
    "@mobileS": {
      p: '- A'
    },
    cp: {
      h: 'G3+X',
      mxh: 'G3+X',
      pos: 'relative',
      ov: 'hidden',
      rnd: 'A',
      bg: 'gray3.3',
      Hgroup: {
        pos: 'absolute',
        zi: '3',
        g: 'Y',
        p: '- B - -',
        H: {
          c: 'title',
          fs: 'A'
        },
        P: {
          c: 'caption'
        }
      },
      Img: {
        d: 'block',
        pos: 'absolute',
        zi: '1'
      }
    },
    ch: [
      {
        gc: 'span 2',
        "@mobileL": {
          gc: 'span 1'
        },
        Hgroup: {
          tp: 'B',
          lft: 'B',
          "@mobileS": {
            tp: 'A2',
            lft: 'A2'
          },
          H: {
            tx: 'Voice and text input'
          },
          P: {
            tx: 'AI processing using GPT-4, Claude, Grok and more'
          }
        },
        Img: {
          src: 'ai.svg',
          pos: 'absolute',
          bot: '0',
          lft: '50%',
          tf: 'translate(-50%, 0)'
        },
        Download: {
          tx: 'Download',
          pos: 'absolute',
          tp: '52%',
          lft: '50%',
          tf: 'translate(-50%, -50%)',
          bg: 'electricBlue',
          c: 'title',
          p: 'Z B',
          rnd: 'D',
          pointerEvent: 'none',
          "@mobileS": {
            tp: '42%',
            fs: 'Z1'
          }
        },
        Flex: {
          pos: 'absolute',
          bot: 'B',
          lft: '50%',
          tf: 'translate(-50%, -50%)',
          mnw: '100%',
          mxw: '100%',
          aln: 'center center',
          g: 'A2',
          "@mobileL": {
            fl: 'y',
            bot: 'B'
          },
          "@mobileM": {
            bot: 'Y',
            g: 'A'
          },
          IconText: {
            g: 'Y',
            c: 'title',
            "@mobileM": {
              fl: 'y',
              g: 'Y2',
              aln: 'center flex-start',
              ta: 'center',
              p: '- B',
              lh: '1.3em'
            },
            "@mobileS": {
              fs: 'A2'
            },
            Icon: {
              nm: 'microphone',
              fs: 'C'
            },
            tx: '"Make this component wider, pink and add magic icon"',
            fw: '500'
          },
          Button: {
            thm: 'transparent',
            p: '0',
            tx: 'Try it (soon)',
            c: 'title',
            fw: '300',
            cur: 'pointer'
          }
        }
      },
      {
        Hgroup: {
          bot: 'B',
          lft: 'B',
          "@mobileS": {
            bot: 'A2',
            lft: 'A2'
          },
          H: {
            tx: 'Branding as Design System'
          },
          P: {
            tx: 'Turn your branding into a system your apps use'
          }
        },
        Img: {
          src: 'designSystem.svg',
          w: '100%',
          tp: 'B1',
          "@mobileL": {
            op: '.5'
          },
          "@mobileM": {
            op: '1'
          },
          "@mobileS": {
            tp: 'C'
          }
        }
      },
      {
        Hgroup: {
          bot: 'B',
          lft: 'B',
          "@mobileS": {
            bot: 'A2',
            lft: 'A2'
          },
          H: {
            tx: 'Version history'
          },
          P: {
            tx: 'Time travel and individually compare your changes',
            "@screenS": {
              mxw: 'G'
            },
            "@mobileL": {
              mxw: 'fit-content'
            },
            "@mobileS": {
              mxw: 'F3'
            }
          }
        },
        Img: {
          src: 'versioning.svg',
          tp: 'B2',
          rgt: 'B2',
          "@mobileS": {
            tp: 'B1',
            rgt: 'B1'
          }
        }
      },
      {
        bgi: 'scene.svg',
        bgs: 'cover',
        bgr: 'no-repeat',
        bgp: 'center center',
        gc: 'span 2',
        "@mobileL": {
          gc: 'span 1'
        },
        Hgroup: {
          tp: 'B',
          lft: 'B',
          "@mobileL": {
            tp: 'A2',
            lft: 'A2'
          },
          H: {
            tx: 'Infinite Canvas'
          },
          P: {
            tx: 'Put your resources in transparent and clear organization'
          }
        },
        Img: {
          src: 'canvas.svg',
          w: '100%',
          tf: 'scale(1.12)',
          tp: 'E+A1',
          "@mobileL": {
            tp: 'F'
          },
          "@mobileM": {
            tp: 'F'
          }
        }
      },
      {
        Hgroup: {
          tp: 'A2',
          lft: 'B',
          "@mobileL": {
            tp: 'A1',
            lft: 'A'
          },
          H: {
            tx: 'Customize without code'
          },
          P: {
            tx: 'Online editor with and without coding changes'
          }
        },
        Img: {
          src: 'calculate.svg',
          tp: 'E+Z',
          rgt: '-C',
          tf: 'scale(1.12)',
          "@mobileL": {
            tf: 'scale(1.3)',
            tp: 'E3',
            rgt: '0'
          },
          "@mobileM": {
            tf: 'scale(1.2)',
            rgt: '-Z1'
          },
          "@mobileS": {
            tf: 'scale(1)',
            rgt: '-D1',
            tp: 'E1'
          }
        }
      },
      {
        Hgroup: {
          tp: 'A2',
          lft: 'B',
          "@mobileL": {
            tp: 'A1',
            lft: 'A'
          },
          H: {
            tx: 'Synchronisation'
          },
          P: {
            tx: 'Get simultanious synchronisation to your local and to the live website',
            mxw: 'G1'
          }
        },
        Img: {
          src: 'rock.svg',
          tp: 'E+A1',
          lft: 'D1',
          "@screenS": {
            lft: 'C2'
          },
          "@tabletL": {
            lft: 'E2'
          },
          "@tabletM": {
            lft: 'E'
          },
          "@tabletS": {
            lft: 'C1'
          },
          "@mobileL": {
            lft: 'E3'
          },
          "@mobileM": {
            lft: 'D2'
          },
          "@mobileS": {
            lft: '0',
            tf: 'scale(.8)'
          },
          "@mobileXS": {
            lft: '-B1'
          }
        }
      },
      {
        Hgroup: {
          bot: 'B',
          lft: 'B',
          "@mobileL": {
            bot: 'A2',
            lft: 'A2'
          },
          H: {
            tx: 'Cross Delivery'
          },
          P: {
            tx: 'Universal by design, we support the most popular frameworks and tools to get your onboard faster',
            mxw: 'G2'
          }
        },
        ":after": {
          cnt: '""',
          pos: 'absolute',
          bsz: '100% 100%',
          zi: '2',
          bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
        },
        Img: {
          src: 'platforms.svg',
          tp: 'B',
          lft: 'B',
          "@mobileL": {
            tf: 'scale(1.2)',
            tp: 'D',
            lft: 'E'
          },
          "@mobileM": {
            tf: 'scale(1)',
            tp: 'B',
            lft: 'B'
          }
        }
      }
    ]
  }
}

// ── SymbolsFeatures ──
export const SymbolsFeatures = {
  mxw: '100%',
  bd: '1px solid transparent',
  p: '0 !important',
  P: {
    fs: 'A2+X',
    ta: 'center',
    mxw: 'H+C',
    tx: 'Whatever you create in Symbols',
    fw: '700',
    p: 'D2 -',
    c: 'title',
    m: '- auto',
    Span: {
      tx: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.',
      fw: '100'
    },
    "@tabletS": {
      p: 'D2 B1'
    },
    "@mobileL": {
      fs: 'B2'
    }
  },
  Scrollable: {
    mxw: '100%',
    ovx: 'auto',
    g: 'B2',
    p: '- B A B',
    "::-webkit-scrollbar": {
      d: 'none'
    },
    aln: 'start',
    "@tabletS": {
      p: 'B'
    },
    "@mobileS": {
      g: 'B1',
      p: 'A1',
      sy: {
        scrollSnapType: 'x mandatory'
      },
      spd: 'A1'
    },
    cp: {
      "@mobileS": {
        p: 'E2 B B B'
      },
      Icon: {},
      H3: {
        "@mobileS": {
          fs: 'D2'
        }
      }
    },
    cex: 'FeatureItem',
    ch: [
      {
        hrf: '/docs/components',
        ":hover": {
          bg: '#1E2397'
        },
        Icon: {
          nm: 'grid'
        },
        H3: {
          tx: 'Building reusable cloud components',
          Span: {
            tx: ' with cross-framework distribution.'
          }
        }
      },
      {
        hrf: '/docs/design-system',
        ":hover": {
          bg: '#FFF263',
          c: 'highlight-reversed',
          "& h3": {
            c: 'highlight-reversed'
          },
          "& span": {
            c: 'highlight-reversed'
          }
        },
        Icon: {
          nm: 'tree'
        },
        H3: {
          tx: 'Advanced design system ',
          Span: {
            tx: ' for multi-branded websites and cross-device support, including TVs.'
          }
        }
      },
      {
        hrf: '/docs/functions',
        ":hover": {
          bg: '#5FCCD6',
          c: 'highlight-reversed',
          "& h3": {
            c: 'highlight-reversed'
          },
          "& span": {
            c: 'highlight-reversed'
          }
        },
        Icon: {
          nm: 'fn outline'
        },
        H3: {
          tx: 'Frontend functions and dependencies ',
          Span: {
            tx: 'reusable across projects and domains. Built on cloud, delegated using API.'
          }
        }
      },
      {
        hrf: '/docs/files',
        ":hover": {
          bg: '#2127A7'
        },
        Icon: {
          nm: 'folder outline'
        },
        H3: {
          tx: 'Files and assets on the cloud - ',
          Span: {
            tx: 'instant access in the code, no assets sharing anymore!'
          },
          p: '- V2+V2 - -'
        }
      },
      {
        ":hover": {
          c: 'title-reversed',
          bg: '#FFFFFF',
          "& h3": {
            c: 'title-reversed'
          },
          "& span": {
            c: 'title-reversed .9'
          }
        },
        Icon: {
          nm: 'state'
        },
        H3: {
          tx: 'Content and state management - in one',
          Span: {
            tx: ' CMS unifies content and state driven flows into one dashboard.'
          },
          p: '- W - -'
        }
      },
      {
        hrf: '/docs/pages',
        ":hover": {
          bg: '#A823F6'
        },
        Icon: {
          nm: 'content'
        },
        H3: {
          tx: 'SEO-friendly pages and flows',
          Span: {
            tx: ' including backend rendered markup and multi-level routing.'
          }
        }
      },
      {
        hrf: '/docs/testing',
        ":hover": {
          bg: '#BC0025'
        },
        Icon: {
          nm: 'bug'
        },
        H3: {
          tx: 'Visual testing',
          Span: {
            tx: ' - environment to visually test screens across devices, covering any kind of E2E tests.'
          }
        }
      },
      {
        hrf: '/docs/framework',
        ":hover": {
          bg: 'line'
        },
        Icon: {
          nm: 'api'
        },
        H3: {
          tx: 'Symbols is an ecosystem ',
          Span: {
            tx: ' single source of truth to build frontend locally and in cloud - in realtime.',
            d: 'block'
          }
        }
      }
    ]
  },
  Scrollbar: {
    ext: 'Scrollbar.scrollable',
    mxw: '95%',
    mnw: '95%',
    m: '- auto',
    "@mobileS": {
      mxw: '88%',
      mnw: '88%'
    }
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

// ── Testimonials ──
export const Testimonials = {
  fl: 'y',
  g: 'C',
  w: '100%',
  pos: 'relative',
  Hgroup: {
    tg: 'header',
    fl: 'y',
    g: 'A',
    p: '- D',
    w: '100%',
    m: '- auto',
    mxw: 'I2*2',
    "@mobileL": {
      p: '- B'
    },
    H: {
      tg: 'h6',
      tx: 'What people say',
      fw: '600',
      m: '0',
      c: 'title'
    },
    P: {
      c: 'caption',
      fw: '400',
      tx: 'Trusted by engineers, designers, and teams worldwide.'
    }
  },
  Scrollable: {
    g: 'B',
    p: 'A B',
    "@mobileL": {
      p: 'A B',
      sy: {
        scrollSnapType: 'x mandatory'
      }
    },
    aln: 'flex-start',
    cex: 'TestimonialCard',
    ch: [
      {
        P: {
          tx: 'This is awesome. I love it. Symbols is doing great work.'
        },
        Flex: {
          Avatar: {
            src: 'james.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'James Harris'
            },
            Caption: {
              tx: 'Frontend Developer'
            }
          }
        }
      },
      {
        P: {
          tx: 'This would definitely streamline the process for my web dev agency.'
        },
        Flex: {
          Avatar: {
            src: 'joe.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Joe Mallory-Skinner'
            },
            Caption: {
              tx: 'Design System Designer'
            }
          }
        }
      },
      {
        P: {
          tx: 'This would definitely streamline the process for my web dev agency.'
        },
        Flex: {
          Avatar: {
            src: 'arthur.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Arthur Beckett'
            },
            Caption: {
              tx: 'Full Stack Developer'
            }
          }
        }
      },
      {
        P: {
          tx: 'What you guys have built is really cool. I definitely see a use for this.'
        },
        Flex: {
          Avatar: {
            src: 'mike.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Mike Minciotti'
            },
            Caption: {
              tx: 'Agency Owner'
            }
          }
        }
      },
      {
        P: {
          tx: 'Symbols is miles ahead of what my company uses to manage UIkits.'
        },
        Flex: {
          Avatar: {
            src: 'aaron.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Aaron Fagan'
            },
            Caption: {
              tx: 'Enterprise Architect'
            }
          }
        }
      },
      {
        P: {
          tx: 'Symbols is definitely more advanced than Storybook.'
        },
        Flex: {
          Avatar: {
            src: 'derek.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Derek Onay'
            },
            Caption: {
              tx: 'Senior Product Designer'
            }
          }
        }
      },
      {
        P: {
          tx: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.'
        },
        Flex: {
          Avatar: {
            src: 'matt.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Matt Vaccaro'
            },
            Caption: {
              tx: 'Product Engineer'
            }
          }
        }
      },
      {
        P: {
          tx: 'Great product. I will for sure be a customer. Also excited to see where you guys take it.'
        },
        Flex: {
          Avatar: {
            src: 'chirag.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Chirag Thesia'
            },
            Caption: {
              tx: 'Software Engineer'
            }
          }
        }
      },
      {
        P: {
          tx: 'I\'m very impressed with the overall product. Very useful.'
        },
        Flex: {
          Avatar: {
            src: 'enes.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Enes Tufekci'
            },
            Caption: {
              tx: 'Owner of UIAgents'
            }
          }
        }
      },
      {
        P: {
          tx: 'It looks like it will solve the big issue with tech stack fragmentation.'
        },
        Flex: {
          Avatar: {
            src: 'andrew.svg'
          },
          Flex_2: {
            Strong: {
              tx: 'Andrew Smith'
            },
            Caption: {
              tx: 'Product Director'
            }
          }
        }
      }
    ]
  }
}

// ── ThankYou ──
export const ThankYou = {
  p: 'C2',
  H2: {
    fw: '300',
    tx: 'Thank you',
    lh: 1
  },
  Grid: {
    m: 'B 0 D',
    g: 'B 7%',
    col: 'repeat(2, 1fr)',
    cp: {
      m: '0'
    },
    ch: [
      {
        tx: 'Thanks for scrolling that far. We are open to answer your questions. Just talk to us to personalise your experience.'
      }
    ],
    cex: 'P'
  }
}

// ── UserFeedBack ──
export const UserFeedBack = {
  fl: 'x',
  g: 'Z1',
  Avatar: {
    src: 'james.svg',
    bsz: 'C2+Y2 C2+Y2'
  },
  Flex: {
    fl: 'y',
    ai: 'flex-start',
    Strong: {
      tx: 'James Harris',
      c: 'title'
    },
    Caption: {
      tx: 'Frontend Developer',
      fw: '100'
    },
    P: {
      tx: 'This is awesome. I love it. Symbols is doing great work.',
      m: 'Y1 - - -',
      mxw: 'F2',
      mnw: 'F2',
      p: 'Y1 Y2 Z Z2',
      thm: 'field',
      c: 'title',
      rnd: 'Y2 A A A'
    }
  }
}

// ── UserStoryDone ──
export const UserStoryDone = {
  fl: 'y',
  aln: 'center flex-start',
  g: 'D',
  "@mobileM": {
    p: 'F B1 E B1'
  },
  Hgroup: {
    aln: 'center flex-start',
    ta: 'center',
    g: 'A1',
    H: {
      tx: 'User Story?',
      c: 'title',
      fw: '100',
      tg: 'h1',
      "@mobileXS": {
        d: 'flex',
        fxf: 'column',
        g: 'Y'
      },
      Strong: {
        tx: ' boom, done!'
      }
    },
    P: {
      tx: 'You have all the power to close tickets in minutes now. With help of AI and marketplace, you can drag and drop, prompt features and customize as you want.',
      fs: 'A2',
      fw: '300',
      mxw: 'G3+B'
    }
  },
  Button: {
    ext: [
      'DocsLink',
      'Button'
    ],
    hrf: '/signup',
    tx: 'Try it out',
    fw: '700',
    thm: 'field',
    bd: 'solid, gray, 1px',
    p: 'Z1 D+Y2'
  }
}

// ── WaitlistForm ──
export const WaitlistForm = {
  tg: 'form',
  st: {
    status: 'idle',
    error: ''
  },
  thm: 'field',
  rnd: 'C1',
  fl: 'x',
  p: 'X',
  "@sm": async (ev, el, s) => {
      ev.preventDefault()
  
      const input = el.querySelector('input[type="email"]')
      const email = (input?.value || '').trim()
  
      if (!email) {
        s.status = 'error'
        s.error = 'Please enter an email.'
        return
      }
  
      s.status = 'loading'
      s.error = ''
  
      const FORM_URL =
        'https://docs.google.com/forms/d/e/1FAIpQLScJzg36yk5Vy2gVBrL6TG4DgCA9CR2t00pDYqKniL9epZxSQQ/formResponse'
  
      const body = new URLSearchParams()
      body.set('entry.27167716', email)
  
      try {
        // In-browser: you may need mode:'no-cors' (you won't be able to read res status then)
        await fetch(FORM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body,
          mode: 'no-cors'
        })
  
        s.status = 'success'
        if (input) input.value = ''
  
        el.call('openModal', '/thank-you-waitlist')
      } catch (err) {
        s.status = 'error'
        s.error = 'Something went wrong. Please try again.'
      }
    },
  Input: {
    w: 'G',
    thm: 'transparent',
    phd: 'Enter your email',
    typ: 'email',
    req: true
  },
  Button: {
    thm: 'primary',
    tx: 'Get notified',
    ico: 'arrow up right',
    g: 'X2',
    p: 'Z2 B Z2 B2',
    Icon: {
      od: 2,
      fs: 'B'
    }
  }
}

// ── WhatIsSymbols ──
export const WhatIsSymbols = {
  fl: 'y',
  aln: 'center center',
  g: 'B2',
  H2: {
    ta: 'center',
    m: '- auto A',
    c: 'title',
    tx: null,
    lh: '1.3em',
    Strong: {
      tx: 'Industry leading benefits'
    },
    Text: {
      fw: '100',
      tx: 'Game changing ways of building features'
    }
  },
  Grid: {
    g: 'A',
    m: '0 auto',
    aln: 'center center',
    tcol: 'repeat(3, 1fr)',
    "@tabletM": {
      tcol: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      tcol: 'repeat(1, 1fr)'
    },
    cex: 'Flex',
    cp: {
      pos: 'relative',
      fl: 'y',
      fx: 1,
      ":hover": {
        "& h5, &:after": {
          op: 0,
          tf: 'translate3d(0, 35%, 0)'
        }
      },
      Video: {
        src: '{{ src }}',
        w: '100%',
        zi: '2',
        rnd: 'A',
        ar: '11 / 7',
        obf: 'cover',
        autoplay: false,
        ctl: false,
        lp: true,
        onMouseenter: (ev, el) => {
                  el.node.play()
                },
        onMouseleave: (ev, el) => {
                  el.node.pause()
                }
      },
      ":after": {
        cnt: '""',
        pos: 'absolute',
        bot: '0',
        bsz: '50% 100%',
        zi: '2',
        bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        trn: 'Z defaultBezier',
        trnp: 'opacity, transform',
        pe: 'none'
      },
      H5: {
        pos: 'absolute',
        bot: '0',
        w: '90%',
        c: 'title',
        fw: 'bold',
        zi: '3',
        p: 'A',
        tx: '{{ text }}',
        trn: 'Z defaultBezier',
        trnp: 'opacity, transform',
        pe: 'none'
      }
    },
    cha: 'state',
    ch: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        tx: 'Build infinitely. With infinite possibilities'
      },
      {
        src: 'https://framerusercontent.com/assets/g40v2j6gQHNy81TmYS2jWmTP2yI.mp4',
        tx: 'Build apps, websites, tools, dashboards—visually or in code.'
      },
      {
        src: 'https://framerusercontent.com/assets/y37VYVYGJsvMeQl181rP9AA17Hs.mp4',
        tx: 'Reusable components rendered to React, email, PDF, TV all at once'
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        tx: 'Test your UI kit. Gain reassurance. '
      },
      {
        src: 'https://framerusercontent.com/assets/UctQMqXDGpt2mDjYj9lTXvT0hbQ.mov',
        tx: 'Document for consistency. Unify your design system.'
      },
      {
        src: 'https://framerusercontent.com/assets/mQtIYUDHDQaFBgosfuigjoL6Psk.mp4',
        tx: 'Publish as a website. Or export to your existing tech stack.'
      }
    ]
  }
}

// ── Writing ──
export const Writing = {
  delay: 0,
  speed: 25,
  onAttachNode: (el) => {
      const text = el.props.text || el.props.afterText || el.text
      // text = 'Interface Engineering'
      let index = 0
      el.node.textContent = ''
  
      const t = setTimeout(() => {
        const typeCharacter = () => {
          if (index < text.length) {
            el.node.textContent = text.slice(0, index + 1)
            index++
            setTimeout(typeCharacter, el.props.speed)
          }
        }
        typeCharacter()
        clearTimeout(t)
      }, el.props.delay)
    }
}

