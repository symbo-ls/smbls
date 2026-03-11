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

// ── Avatar ──
export const Avatar = {
  extends: 'smbls.Avatar',
  boxSize: 'C2'
}

// ── AvatarBadgeHgroup ──
export const AvatarBadgeHgroup = {
  Avatar: {},
  Hgroup: {
    gap: 'V2',
    H: {
      display: 'flex',
      alignItems: 'center',
      gap: 'Y',
      Badge: {}
    },
    P: {}
  },
  extends: 'AvatarHgroup'
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

// ── AvatarHeading ──
export const AvatarHeading = {
  Avatar: {},
  H: {
    tag: 'h6',
    lineHeight: '1em',
    text: 'Heading'
  },
  extends: 'Flex',
  gap: 'X2',
  align: 'center flex-start'
}

// ── AvatarHgroup ──
export const AvatarHgroup = {
  gap: 'Y2',
  align: 'center flex-start',
  Avatar: {
    margin: '-X - - -'
  },
  Hgroup: {
    gap: 'W2',
    H: {
      tag: 'h6'
    },
    P: {}
  }
}

// ── AvatarHgroupIconButton ──
export const AvatarHgroupIconButton = {
  Avatar: {},
  Hgroup: {
    H: {
      tag: 'h6'
    },
    P: {}
  },
  IconButton: {
    margin: '- - - auto',
    Icon: {
      name: 'copy'
    }
  },
  extends: 'AvatarHgroup',
  minWidth: 'G+Z2'
}

// ── AvatarHgroupSelect ──
export const AvatarHgroupSelect = {
  Avatar: {},
  Hgroup: {
    H: {},
    P: {}
  },
  SelectPicker: {
    margin: '- - - auto',
    Select: {
      "0": {
        value: 'Goat'
      },
      "1": {
        value: 'Icon'
      }
    }
  },
  extends: 'AvatarHgroup',
  minWidth: 'G1'
}

// ── AvatarParagraph ──
export const AvatarParagraph = {
  Avatar: {
    boxSize: 'B1'
  },
  P: {
    text: 'Can you join us today?',
    margin: '0'
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y1'
}

// ── AvatarSelectPicker ──
export const AvatarSelectPicker = {
  tag: 'label',
  Avatar: {},
  Select: {
    extends: 'Flex',
    fontSize: 'A',
    boxSize: '100%',
    padding: '- B+V2 - Z',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    flex: '1',
    zIndex: '2',
    lineHeight: 1,
    border: 'none',
    background: 'none',
    pointerEvents: 'All',
    color: 'title',
    ":focus-visible": {
      outline: 'none'
    },
    children: [
      {
        text: 'Nikoloza',
        value: 'Nikoloza'
      },
      {
        text: 'Svinchy',
        value: 'Svinchy'
      }
    ],
    childProps: {
      tag: 'option'
    }
  },
  Icon: {
    name: 'chevronDown',
    position: 'absolute',
    right: '0',
    margin: 'V - - -',
    fontSize: 'B'
  },
  extends: 'Flex',
  round: '0',
  align: 'center flex-start',
  position: 'relative'
}

// ── AvatarSet ──
export const AvatarSet = {
  extends: 'Flex',
  childExtends: 'Avatar',
  childProps: {
    border: 'solid, codGray',
    borderWidth: 'X+W',
    ":first-child": {
      margin: '0 -Z1 0 0'
    },
    ":nth-child(2)": {
      margin: '0 -Z1 0 0'
    }
  },
  children: [
    {},
    {},
    {}
  ]
}

// ── AvatarSetChatPreview ──
export const AvatarSetChatPreview = {
  AvatarSet: {
    position: 'relative',
    boxSize: 'fit-content C2',
    border: '1px solid red',
    margin: '-Y2 - - -',
    childProps: {
      boxSize: 'C C',
      borderWidth: 'W',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ":first-child": {
        margin: 'Z2 0 0 0'
      },
      ":nth-child(2)": {
        margin: '0 0 0 Z1'
      },
      ":nth-child(3)": {
        margin: '-W 0 0 -Z1'
      }
    }
  },
  Flex: {
    flow: 'y',
    flex: '1',
    gap: 'W2',
    "> *": {
      minWidth: '100%'
    },
    ValueHeading: {
      minWidth: '0',
      maxWidth: '100%',
      H: {
        text: 'Design'
      },
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
    Flex: {
      gap: 'X2',
      Caption: {
        text: 'nick:',
        color: 'paragraph'
      },
      NotCounterParagraph: {
        flex: '1',
        justifyContent: 'space-between',
        P: {
          maxWidth: 'F2',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        },
        NotificationCounter: {}
      }
    }
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start'
}

// ── AvatarStatus ──
export const AvatarStatus = {
  Avatar: {},
  StatusDot: {
    position: 'absolute',
    bottom: 'W2',
    right: '0'
  },
  extends: 'Flex',
  position: 'relative'
}

// ── AvatarStatusChatPreview ──
export const AvatarStatusChatPreview = {
  AvatarStatus: {
    Avatar: {},
    StatusDot: {}
  },
  Flex: {
    flow: 'y',
    flex: '1',
    gap: 'W2',
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
      P: {},
      NotificationCounter: {}
    }
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start'
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

// ── BadgeCaption ──
export const BadgeCaption = {
  Caption: {
    text: 'CAPTION'
  },
  Badge: {},
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y'
}

// ── BadgeParagraph ──
export const BadgeParagraph = {
  P: {
    margin: '0',
    text: 'Hey team, I\'ve finished the re...',
    color: 'paragraph'
  },
  Badge: {},
  extends: 'Flex',
  align: 'center space-between',
  gap: 'A'
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
    color: 'white.35',
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

// ── BulletCaption ──
export const BulletCaption = {
  tag: 'caption',
  text: 'Orders history',
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y1',
  ":before": {
    content: '""',
    boxSize: 'Z1',
    background: 'blue',
    round: 'A2'
  }
}

// ── ButtonHeading ──
export const ButtonHeading = {
  align: 'center flex-start',
  gap: 'Z',
  H: {
    tag: 'h6',
    text: 'Heading'
  },
  Button: {
    text: 'Button',
    theme: 'dialog'
  }
}

// ── ButtonHgroup ──
export const ButtonHgroup = {
  Hgroup: {
    gap: 'X2',
    H: {
      tag: 'h6',
      text: 'Heading'
    },
    P: {}
  },
  Button: {
    text: 'Button',
    theme: 'dialog'
  },
  extends: 'Flex',
  align: 'flex-start flex-start',
  gap: 'Z'
}

// ── ButtonParagraph ──
export const ButtonParagraph = {
  P: {
    text: 'Didn\'t get the code?',
    color: 'caption',
    margin: '0'
  },
  Button: {
    padding: '0',
    theme: 'transparent',
    text: 'Click to Resend'
  },
  extends: 'Flex',
  alignItems: 'center',
  gap: 'X2'
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

// ── Caption ──
export const Caption = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.Caption'
}

// ── CardNumberField ──
export const CardNumberField = {
  state: {
    value: 'XXXXXXXXXXXXXXXX'
  },
  extends: 'Flex',
  childExtends: 'FixedNumberField',
  gap: '0',
  childProps: {
    Input: {
      textAlign: 'center',
      padding: 'X2 X',
      round: '0',
      outline: 'none',
      value: (el, s) => {
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
        outline: 'none'
      },
      onUpdate: (el, s) => {
            el.node.value = el.props.value(el, s)
          },
      onInput: (ev, el, s, ctx) => {
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
      onPaste: (ev, el, s) => {
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
      padding: 'X2 X X2 A1',
      round: 'A 0 0 A'
    },
    ":last-child input": {
      padding: 'X2 A1 X2 X',
      round: '0 A A 0'
    }
  },
  children: [
    {},
    {},
    {},
    {}
  ]
}

// ── CheckCaption ──
export const CheckCaption = {
  Caption: {
    text: 'Caption'
  },
  Checkbox: {
    Input: {},
    Flex: {
      Icon: {
        name: 'check'
      }
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z'
}

// ── CheckCaptionList ──
export const CheckCaptionList = {
  extends: 'Flex',
  childExtends: 'CheckCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {},
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          name: 'check'
        }
      }
    }
  },
  children: [
    {},
    {}
  ]
}

// ── CheckHgroup ──
export const CheckHgroup = {
  Hgroup: {
    gap: 'W2',
    H: {
      tag: 'h6'
    },
    P: {}
  },
  Checkbox: {
    Input: {},
    Flex: {
      Icon: {
        name: 'check'
      }
    }
  },
  extends: 'Flex',
  gap: 'Z'
}

// ── CheckHgroupList ──
export const CheckHgroupList = {
  extends: 'Flex',
  childExtends: 'CheckHgroup',
  flow: 'y',
  gap: 'B',
  childProps: {
    Hgroup: {
      gap: 'W2',
      H: {
        tag: 'h6'
      },
      P: {}
    },
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          name: 'check'
        }
      }
    }
  },
  children: [
    {},
    {}
  ]
}

// ── CheckStep ──
export const CheckStep = {
  Icon: {
    name: 'check',
    theme: 'dialog',
    display: 'block',
    boxSizing: 'content-box',
    padding: 'Y2',
    round: '100%'
  },
  H6: {
    text: 'Step'
  },
  Progress: {
    minWidth: 'E',
    maxWidth: 'E',
    value: 0,
    height: 'V',
    ".isActive": {
      value: 1
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z'
}

// ── CheckStepSet ──
export const CheckStepSet = {
  extends: 'Flex',
  childExtends: 'CheckStep',
  gap: 'Z1',
  childProps: {
    Icon: {
      ".isActive": {
        theme: 'primary'
      }
    },
    Progress: {},
    ":last-child > progress": {
      hide: true
    }
  },
  children: [
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

// ── ConfirmationButtons ──
export const ConfirmationButtons = {
  extends: 'Flex',
  childExtends: 'Button',
  gap: 'Y1',
  childProps: {
    theme: 'dialog',
    padding: 'Z1 B1'
  },
  children: [
    {
      text: 'No'
    },
    {
      text: 'YES'
    }
  ]
}

// ── CounterButton ──
export const CounterButton = {
  extends: 'Button',
  position: 'relative',
  align: 'center space-between',
  padding: 'Z Z Z A1',
  minWidth: 'F',
  theme: 'field',
  Span: {
    text: 'Button'
  },
  NotificationCounter: {
    text: '7'
  }
}

// ── CounterIconButton ──
export const CounterIconButton = {
  Icon: {
    name: 'smile'
  },
  NotificationCounter: {
    position: 'absolute',
    right: '-Y',
    top: '-W2'
  },
  extends: 'IconButton',
  position: 'relative'
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

// ── FieldCaption ──
export const FieldCaption = {
  Caption: {
    tag: 'caption',
    text: 'Caption',
    lineHeight: '1em',
    fontSize: 'A',
    fontWeight: '400',
    padding: '- Y2 Z X',
    alignSelf: 'flex-start',
    whiteSpace: 'nowrap',
    textAlign: 'left'
  },
  Field: {
    width: '100%',
    Input: {},
    Icon: {}
  },
  extends: 'Flex',
  flow: 'column',
  boxSize: 'fit-content fit-content'
}

// ── FixedNumberField ──
export const FixedNumberField = {
  Input: {
    boxSize: 'B D',
    padding: 'X2 Z X2 A2',
    boxSizing: 'content-box',
    placeholder: '0000',
    letterSpacing: '.35em',
    maxlength: '4',
    textTransform: 'uppercase',
    style: {
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
    onInput: (event, element, state) => {
          if (element.node.value.length === 0) {
            element.parent.previousElement()?.Input?.node.focus()
          }
          if (element.node.value.length > 3) {
            element.parent.nextElement()?.Input?.node.focus()
          }
        }
  },
  extends: 'InputField'
}

// ── Footnote ──
export const Footnote = {
  text: 'Footnote',
  extends: 'smbls.Footnote'
}

// ── Group ──
export const Group = {
  Title: {
    text: 'Field Title',
    color: 'caption',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  extends: 'Flex',
  flow: 'y',
  align: 'flex-start',
  gap: 'Y1',
  minWidth: 'F',
  childProps: {
    width: '100%'
  }
}

// ── GroupField ──
export const GroupField = {
  tag: 'label',
  extends: 'Group'
}

// ── H1 ──
export const H1 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H1'
}

// ── H2 ──
export const H2 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H2'
}

// ── H3 ──
export const H3 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H3'
}

// ── H4 ──
export const H4 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H4'
}

// ── H5 ──
export const H5 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H5'
}

// ── H6 ──
export const H6 = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.H6'
}

// ── Headline ──
export const Headline = {
  text: 'Headline',
  extends: 'smbls.Headline'
}

// ── HgroupSteps ──
export const HgroupSteps = {
  Hgroup: {
    gap: 'Y1',
    H: {
      tag: 'h4',
      text: 'Symbols'
    },
    P: {
      text: 'The easiest way to build your own website'
    }
  },
  ProgressStepSet: {
    childProps: {
      flex: '1'
    }
  },
  extends: 'Flex',
  flow: 'column',
  gap: 'A1',
  minWidth: 'G1',
  maxWidth: 'H'
}

// ── Hr ──
export const Hr = {
  extends: 'smbls.Hr',
  minWidth: 'F'
}

// ── HrLegend ──
export const HrLegend = {
  text: 'Or',
  extends: 'Flex',
  minWidth: 'G',
  fontWeight: '500',
  alignItems: 'center',
  gap: 'A',
  ":before": {
    content: '""',
    height: 'V',
    theme: 'dialog',
    round: 'C',
    flex: '1'
  },
  ":after": {
    content: '""',
    height: 'V',
    theme: 'dialog',
    round: 'C',
    flex: '1'
  }
}

// ── IconButton ──
export const IconButton = {
  Icon: {
    name: 'smile',
    fontSize: 'A2'
  },
  extends: 'Button',
  padding: 'A',
  aspectRatio: '1 / 1',
  boxSize: 'fit-content fit-content',
  round: '100%',
  boxSizing: 'content-box',
  align: 'center center',
  theme: 'dialog'
}

// ── IconButtonHeading ──
export const IconButtonHeading = {
  H: {
    tag: 'h5',
    text: 'Heading'
  },
  IconButton: {},
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z'
}

// ── IconButtonHgroup ──
export const IconButtonHgroup = {
  Hgroup: {
    gap: 'X2',
    H: {
      tag: 'h6',
      text: 'Heading'
    },
    P: {}
  },
  IconButton: {
    theme: 'dialog'
  },
  extends: 'Flex',
  align: 'flex-start flex-start',
  gap: 'Z'
}

// ── IconButtonSet ──
export const IconButtonSet = {
  extends: 'Flex',
  childExtends: 'IconButton',
  gap: 'Z',
  childProps: {
    Icon: {}
  },
  children: [
    {
      Icon: {
        name: 'sun'
      }
    },
    {
      Icon: {
        name: 'moon'
      }
    }
  ]
}

// ── IconCounterButton ──
export const IconCounterButton = {
  extends: 'Button',
  position: 'relative',
  align: 'center flex-start',
  padding: 'Z Z Z Z1',
  minWidth: 'F',
  theme: 'field',
  gap: 'Z',
  Icon: {
    display: 'block',
    name: 'info'
  },
  Span: {
    text: 'Button'
  },
  NotificationCounter: {
    text: '7',
    margin: '- - - auto'
  }
}

// ── IconHeading ──
export const IconHeading = {
  Icon: {
    name: 'logo',
    fontSize: 'C'
  },
  H: {
    tag: 'h5',
    text: 'Heading',
    lineHeight: '1em',
    fontWeight: '700'
  },
  extends: 'Flex',
  gap: 'Z',
  align: 'center flex-start'
}

// ── IconHgroup ──
export const IconHgroup = {
  Icon: {
    name: 'logo',
    display: 'block',
    color: 'blue',
    margin: '- X - -',
    fontSize: 'E'
  },
  Hgroup: {
    gap: 'Y',
    H: {
      tag: 'h2'
    },
    P: {}
  },
  extends: 'Flex',
  gap: 'X',
  align: 'flex-start'
}

// ── IconInput ──
export const IconInput = {
  tag: 'label',
  Input: {
    flex: '1',
    round: 'C',
    placeholder: 'Placeholder',
    padding: 'Z2 C Z2 A2',
    maxHeight: '100%'
  },
  Icon: {
    name: 'info',
    position: 'absolute',
    zIndex: '2',
    right: 'Z2'
  },
  extends: 'Flex',
  minWidth: 'G',
  align: 'center flex-start',
  round: 'D',
  position: 'relative'
}

// ── IconTextSet ──
export const IconTextSet = {
  childExtends: [
    'IconText',
    'Flex'
  ],
  gap: 'A',
  childProps: {
    align: 'center flex-start',
    gap: 'Y1',
    Icon: {}
  },
  flexFlow: 'y',
  children: [
    {
      Icon: {
        name: 'smile'
      },
      text: '+1 (555) 123-4567'
    },
    {
      Icon: {
        name: 'logo'
      },
      text: 'example@mail.com'
    }
  ]
}

// ── IcontextLink ──
export const IcontextLink = {
  text: 'Follow Symbols',
  Icon: {
    fontSize: 'B',
    name: 'logo'
  },
  extends: [
    'Link',
    'IconText'
  ],
  gap: 'Y',
  maxHeight: '3em',
  cursor: 'pointer',
  round: 'D',
  fontWeight: '500'
}

// ── ImgButton ──
export const ImgButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    boxSize: 'C1 D2'
  },
  extends: 'Button',
  theme: 'transparent',
  padding: '0',
  round: 'Z2',
  overflow: 'hidden'
}

// ── ImgHeading ──
export const ImgHeading = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    widthL: 'auto',
    maxWidth: 'C',
    maxHeight: 'C',
    round: 'Z2'
  },
  H: {
    tag: 'h4',
    text: 'Heading'
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y1'
}

// ── ImgHeadingButton ──
export const ImgHeadingButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    boxSize: 'C1 D2',
    round: 'Z2'
  },
  H: {
    tag: 'h6',
    text: 'Heading'
  },
  extends: 'Button',
  theme: 'transparent',
  flow: 'y',
  gap: 'Z',
  padding: '0',
  round: '0'
}

// ── ImgHgroup ──
export const ImgHgroup = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    boxSize: 'C+Y1 C2',
    round: 'Z',
    margin: '-Y - - -'
  },
  Hgroup: {
    gap: 'W2',
    H: {
      tag: 'h5'
    },
    P: {}
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y1'
}

// ── InputButton ──
export const InputButton = {
  Input: {
    placeholder: 'Enter your email',
    minWidth: 'G+B1'
  },
  Button: {
    text: 'Sign up',
    theme: 'primary'
  },
  extends: 'Flex',
  gap: 'Y2',
  align: 'center flex-start',
  height: 'C+X',
  "> *": {
    height: '100%',
    minHeight: '100%',
    maxHeight: '100%'
  }
}

// ── Italic ──
export const Italic = {
  text: 'Italic text',
  extends: 'smbls.Italic'
}

// ── LayerSimple ──
export const LayerSimple = {
  Title: {
    text: 'Checklist'
  },
  Flex: {
    flow: 'column',
    gap: 'A',
    childProps: {
      gap: 'X',
      flexAlign: 'center'
    },
    childExtends: {
      Icon: {
        color: 'inactive',
        gap: 'Y1'
      },
      Span: {
        color: 'white',
        padding: '- - - X2'
      }
    },
    children: () => [{
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
  extends: 'Group',
  padding: 'Z A A A',
  margin: 'C -',
  round: 'Z',
  gap: 'A',
  width: 'F1',
  background: 'gray'
}

// ── Link ──
export const Link = {
  text: 'Link',
  extends: 'smbls.Link'
}

// ── LinkHgroup ──
export const LinkHgroup = {
  Hgroup: {
    gap: 'X2',
    H: {
      tag: 'h2',
      text: 'Tbilisi'
    },
    P: {
      text: '35 Vazha-pshavela avenue.'
    }
  },
  Link: {
    text: 'Get direction'
  },
  extends: 'Flex',
  flow: 'y',
  gap: 'Z'
}

// ── LinkParagraph ──
export const LinkParagraph = {
  P: {
    text: 'You are agree',
    color: 'caption',
    margin: '0'
  },
  Link: {
    padding: '0',
    theme: 'transparent',
    text: 'Privacy policy',
    textDecoration: 'underline',
    fontWeight: '400'
  },
  extends: 'Flex',
  alignItems: 'center',
  gap: 'X2'
}

// ── LinkSet ──
export const LinkSet = {
  tag: 'nav',
  extends: 'Flex',
  childExtends: 'Link',
  align: 'center flex-start',
  gap: 'A',
  childProps: {
    cursor: 'pointer'
  },
  children: [
    {
      text: 'Link 1'
    },
    {
      text: 'Link 2'
    }
  ]
}

// ── ListingItem ──
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
      ".isActive": {
        color: 'orange'
      }
    },
    "!isActive": {
      ":hover svg": {
        color: 'disabled'
      }
    },
    onClick: (ev, el, s) => {
          const isActive = s.isActive
          s.update({
            isActive: !isActive,
            upvotes: isActive ? s.upvotes - 1 : s.upvotes + 1
          })
        }
  },
  Hgroup: {
    H: {
      extends: 'Link',
      tag: 'h6',
      text: 'Flexbox in Editor',
      fontWeight: '700'
    },
    P: {
      text: null,
      childProps: {
        display: 'inline'
      },
      children: [
        'by ',
        {
          Link: {
            text: 'kiaynwang'
          }
        },
        ' ',
        {
          Link: {
            text: '3 hours ago'
          }
        },
        ' ・ ',
        {
          Link: {
            text: '49 commnts'
          }
        }
      ]
    }
  },
  extends: 'Flex',
  gap: 'A2',
  alignItems: 'flex-start'
}

// ── LoadingGif ──
export const LoadingGif = {
  extends: 'Img',
  src: 'https://assets.symbo.ls/loading.gif',
  width: '3.2em',
  pointerEvents: 'none',
  opacity: '.35',
  zIndex: '-1',
  inCenter: true,
  ".inCenter": {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)'
  }
}

// ── MessageModal ──
export const MessageModal = {
  Hgroup: {
    gap: 'A',
    H: {
      text: 'Message'
    },
    P: {
      text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.'
    }
  },
  IconButton: {
    Icon: {
      name: 'x'
    }
  },
  extends: 'Modal',
  maxWidth: 'H'
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

// ── NavigationArrows ──
export const NavigationArrows = {
  extends: 'Flex',
  childExtends: 'IconButton',
  gap: 'Z',
  childProps: {
    round: '100%'
  },
  children: [
    {
      Icon: {
        name: 'chevronLeft'
      }
    },
    {
      Icon: {
        name: 'chevronRight'
      }
    }
  ]
}

// ── NavigationDots ──
export const NavigationDots = {
  tag: 'nav',
  extends: 'Flex',
  childExtends: 'Link',
  gap: 'C1',
  childProps: {
    boxSize: 'Z',
    theme: 'dialog',
    round: '100%',
    cursor: 'pointer',
    text: '',
    ".isActive": {
      theme: 'primary'
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
  ]
}

// ── NotCounterParagraph ──
export const NotCounterParagraph = {
  P: {
    margin: '0',
    text: 'Hey team, I\'ve finished the re...',
    color: 'paragraph',
    maxWidth: 'E3+D1',
    overflow: 'hidden'
  },
  NotificationCounter: {},
  extends: 'Flex',
  align: 'center space-between',
  gap: 'B'
}

// ── NotificationCounter ──
export const NotificationCounter = {
  text: '3',
  extends: 'Flex',
  widthRange: 'A',
  theme: 'primary',
  round: '100%',
  aspectRatio: '1 / 1',
  padding: 'W2',
  lineHeight: '1em',
  boxSizing: 'content-box',
  align: 'center center'
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

// ── P ──
export const P = {
  text: 'It was the last day for our tribe, the year ends',
  extends: 'smbls.P'
}

// ── PackageFeatureItem ──
export const PackageFeatureItem = {
  tag: 'label',
  Input: {
    display: 'none',
    type: 'checkbox',
    ":checked + hgroup": {
      outline: '1.5px solid #0079FD'
    }
  },
  Hgroup: {
    width: '100%',
    padding: 'A1',
    round: 'A1',
    outline: '1.5px, solid, --color-line-dark',
    Icon: {
      order: '-1',
      margin: '- - A2',
      name: 'logo'
    }
  },
  extends: 'Flex',
  cursor: 'pointer'
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

// ── ProgressStepSet ──
export const ProgressStepSet = {
  extends: 'Flex',
  childExtends: 'Progress',
  gap: 'A',
  childProps: {
    minWidth: 'C'
  },
  children: [
    {
      value: 0.7
    },
    {}
  ]
}

// ── RadioCaption ──
export const RadioCaption = {
  Caption: {
    text: 'Caption'
  },
  Radio: {
    Input: {},
    FLex: {
      ":after": {}
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z'
}

// ── RadioCaptionList ──
export const RadioCaptionList = {
  extends: 'Flex',
  childExtends: 'RadioCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {
      text: 'Caption'
    },
    Radio: {
      Input: {},
      FLex: {
        ":after": {}
      }
    }
  },
  children: [
    {},
    {}
  ]
}

// ── RadioHgroup ──
export const RadioHgroup = {
  Hgroup: {
    gap: 'W2',
    H: {
      tag: 'h6'
    },
    P: {}
  },
  Radio: {
    Input: {},
    FLex: {
      ":after": {}
    }
  },
  extends: 'Flex',
  gap: 'Z'
}

// ── RadioHgroupList ──
export const RadioHgroupList = {
  extends: 'Flex',
  childExtends: 'RadioHgroup',
  flow: 'y',
  gap: 'B',
  childProps: {
    Hgroup: {
      gap: 'W2',
      H: {
        tag: 'h6'
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
  children: [
    {},
    {}
  ]
}

// ── RadioMark ──
export const RadioMark = {
  padding: 'Z1',
  theme: 'primary',
  round: '100%',
  boxSize: 'fit-content',
  ":after": {
    content: '""',
    boxSize: 'Z1',
    background: 'white',
    round: '100%',
    display: 'block'
  }
}

// ── RadioStep ──
export const RadioStep = {
  RadioMark: {
    theme: 'field',
    ".isActive": {
      theme: 'primary'
    },
    ":after": {}
  },
  H6: {
    text: 'Step'
  },
  Progress: {
    minWidth: 'E',
    maxWidth: 'E',
    value: 0,
    height: 'V',
    margin: '- - - W',
    ".isActive": {
      value: 1
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y2'
}

// ── RadioSteps ──
export const RadioSteps = {
  extends: 'Flex',
  childExtends: 'RadioStep',
  gap: 'Z1',
  childProps: {
    RadioMark: {},
    Progress: {},
    ":last-child > progress": {
      hide: true
    }
  },
  children: [
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
  tag: 'nav',
  Flex: {
    maxHeight: 'D2',
    overflowY: 'auto',
    flow: 'y',
    padding: 'Z -',
    style: {
      listStyleType: 'none',
      "::-webkit-scrollbar": {
        display: 'none'
      }
    },
    childProps: {
      padding: 'Y1 A',
      cursor: 'pointer',
      align: 'flrx-start',
      textAlign: 'left',
      fontWeight: '700',
      round: '0',
      theme: 'dialog',
      fontSize: 'C',
      ":hover": {
        theme: 'dialog-elevated'
      }
    },
    childExtends: 'Button',
    children: [
      {
        text: 'Item One'
      },
      {
        text: 'Item Two'
      }
    ]
  },
  position: 'relative',
  overflow: 'hidden',
  theme: 'field',
  round: 'A2',
  minWidth: 'F1',
  ":before, &:after": {
    content: '""',
    position: 'absolute',
    boxSize: 'B 100%',
    zIndex: '2',
    left: '0',
    pointerEvents: 'none'
  },
  ":before": {
    top: '0',
    "@light": {
      background: 'linear-gradient(to bottom,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      background: 'linear-gradient(to bottom, #171717 0%, transparent 100%)'
    }
  },
  ":after": {
    bottom: '-3px',
    "@light": {
      background: 'linear-gradient(to top,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      background: 'linear-gradient(to top, #171717 0%, transparent 100%)'
    }
  }
}

// ── Scrollbar ──
export const Scrollbar = {
  TrackContainer: {
    opacity: 1,
    transition: 'A defaultBezier opacity',
    flex: '1',
    margin: '- C1 - -',
    position: 'relative',
    background: 'red',
    height: 'fit-content',
    alignSelf: 'center',
    Track: {
      position: 'absolute',
      theme: 'field',
      round: 'A',
      height: '2px',
      background: '#d9d7d7 .5',
      left: '0',
      transformOrigin: 'left',
      width: '15%'
    }
  },
  NavigationArrows: {
    childProps: {
      padding: 'Z Z',
      Icon: {
        fontSize: 'B1'
      }
    }
  },
  extends: 'Flex',
  minWidth: 'I'
}

// ── Search ──
export const Search = {
  tag: 'search',
  Input: {
    type: 'search',
    placeholder: 'Type a command or search',
    width: '100%',
    padding: 'Z2 C+W2 Z2 A2',
    theme: 'transparent',
    ":focus ~ button": {
      opacity: '1'
    }
  },
  Icon: {
    name: 'search',
    position: 'absolute',
    right: 'Z+W2',
    fontSize: 'B'
  },
  extends: 'Flex',
  minWidth: 'G+A2',
  gap: 'Z',
  theme: 'field',
  round: 'D2',
  align: 'center flex-start',
  position: 'relative'
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
    borderColor: 'line.35',
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

// ── SearchDropdown_copy ──
export const SearchDropdown_copy = {
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
    background: '#f5f5f5',
    color: 'black',
    borderBottom: '1px solid #ccc',
    minHeight: 'B2',
    position: 'relative',
    cursor: 'pointer',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      color: 'title'
    },
    onClick: (e, el, s) => s.toggle('isOpen')
  },
  Options: {
    show: (el, s) => s.isOpen,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: 'line.35',
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
  color: 'black',
  position: 'relative',
  width: 'G3',
  theme: 'field',
  round: 'A2'
}

// ── SectionHeader ──
export const SectionHeader = {
  tag: 'header',
  Hgroup: {},
  IconButtonSet: {},
  extends: 'Flex',
  gap: 'C1'
}

// ── Select ──
export const Select = {
  extends: 'smbls.Select'
}

// ── SelectField ──
export const SelectField = {
  Select: {
    children: [
      {
        value: '',
        text: 'Select one...'
      },
      {
        value: 'mazda',
        text: 'Mazda'
      },
      {
        value: 'bmw',
        text: 'BMW'
      }
    ]
  },
  Icon: {
    margin: '- Z2 - -'
  },
  extends: 'SelectPicker',
  theme: 'field',
  minWidth: 'G',
  padding: 'A A1',
  round: 'D'
}

// ── SelectHgroup ──
export const SelectHgroup = {
  Hgroup: {
    gap: 'V2',
    H: {
      tag: 'h6'
    },
    P: {}
  },
  SelectPicker: {
    margin: '- - - auto',
    Select: {
      children: () => [{
                value: 'Goat',
              },
              {
                value: 'Icon',
              },
            ]
    }
  },
  extends: 'Flex',
  gap: 'C'
}

// ── SelectPicker ──
export const SelectPicker = {
  tag: 'label',
  extends: 'Flex',
  round: '0',
  align: 'center flex-start',
  position: 'relative',
  Select: {
    extends: 'Flex',
    fontSize: 'A',
    boxSize: '100%',
    padding: '- B+V2 - -',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    flex: '1',
    zIndex: '2',
    lineHeight: 1,
    border: 'none',
    background: 'none',
    pointerEvents: 'All',
    color: 'title',
    ":focus-visible": {
      outline: 'none'
    },
    children: [
      {
        text: 'Nikoloza',
        value: 'Nikoloza'
      },
      {
        text: 'Svinchy',
        value: 'Svinchy'
      }
    ],
    childProps: {
      tag: 'option'
    }
  },
  Icon: {
    name: 'chevronDown',
    position: 'absolute',
    right: '0',
    margin: 'V - - -',
    fontSize: 'B'
  }
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

// ── StatusDot ──
export const StatusDot = {
  widthRange: 'A',
  aspectRatio: '1/1',
  round: '100%',
  theme: 'success',
  "@light": {
    border: 'solid, gray+170',
    borderWidth: 'X'
  },
  "@dark": {
    border: 'solid, black',
    borderWidth: 'X'
  }
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
        color: 'white.65'
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

// ── Strong ──
export const Strong = {
  text: 'Strong text',
  extends: 'smbls.Strong'
}

// ── Subhead ──
export const Subhead = {
  text: 'Subhead',
  extends: 'smbls.Subhead'
}

// ── SubmitButton ──
export const SubmitButton = {
  extends: 'Input',
  type: 'submit',
  value: 'Submit',
  padding: 'Z2 B'
}

// ── TabSet ──
export const TabSet = {
  flow: 'x',
  childExtends: 'Button',
  padding: 'V2+V2',
  round: 'D',
  background: 'gray.1',
  width: 'fit-content',
  children: [
    {
      text: 'build',
      isActive: true,
      theme: 'dialog-elevated'
    },
    {
      text: 'test'
    },
    {
      text: 'publish'
    }
  ],
  childrenAs: 'props',
  childProps: {
    Icon: null,
    round: 'D',
    theme: 'transparent',
    padding: 'Z B1',
    textTransform: 'capitalize',
    ".isActive": {
      theme: 'document'
    },
    onClick: null
  }
}

// ── TextareaIconButton ──
export const TextareaIconButton = {
  Textarea: {
    minHeight: 'C+Y',
    maxHeight: 'C+Y',
    minWidth: 'G1',
    round: 'D',
    padding: 'A A A A2'
  },
  IconButton: {
    theme: 'primary',
    Icon: {
      name: 'send'
    }
  },
  extends: 'Flex',
  gap: 'Y1'
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

// ── ToggleCaptionList ──
export const ToggleCaptionList = {
  extends: 'Flex',
  childExtends: 'ToggleCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {
      text: 'Caption'
    },
    Toggle: {
      Input: {},
      Flex: {
        ":after": {}
      }
    }
  },
  children: [
    {},
    {}
  ]
}

// ── ToggleHgroup ──
export const ToggleHgroup = {
  Hgroup: {
    gap: 'W2',
    H: {
      tag: 'h6'
    },
    P: {}
  },
  Toggle: {
    margin: '- - - auto',
    Input: {},
    Flex: {
      after: {}
    }
  },
  extends: 'Flex',
  gap: 'Z'
}

// ── ToggleHgroupList ──
export const ToggleHgroupList = {
  extends: 'Flex',
  childExtends: 'ToggleHgroup',
  flow: 'y',
  gap: 'B',
  childProps: {
    Hgroup: {
      gap: 'W2',
      H: {
        tag: 'h6'
      },
      P: {}
    },
    Toggle: {
      margin: '- - - auto',
      Input: {},
      Flex: {
        after: {}
      }
    }
  },
  children: [
    {},
    {}
  ]
}

// ── U ──
export const U = {
  text: 'Underlined text',
  extends: 'smbls.Underline'
}

// ── UnitValue ──
export const UnitValue = {
  Unit: {
    text: '$'
  },
  Value: {
    text: '73'
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'V',
  childProps: {
    lineHeight: '1em',
    color: 'title'
  }
}

// ── UploadButton ──
export const UploadButton = {
  text: 'Choose file',
  Input: {
    type: 'file',
    padding: '0',
    inset: '0 0 0 0',
    position: 'absolute',
    boxSize: '100% 100%',
    cursor: 'pointer',
    top: '0',
    left: '0',
    opacity: '0'
  },
  extends: 'Button',
  position: 'relative',
  padding: '0',
  cursor: 'pointer',
  theme: 'transparent',
  color: 'blue'
}

// ── UploadIconButton ──
export const UploadIconButton = {
  Icon: {
    name: 'upload'
  },
  Input: {
    type: 'file',
    padding: '0',
    inset: '0 0 0 0',
    position: 'absolute',
    boxSize: '100% 100%',
    cursor: 'pointer',
    top: '0',
    left: '0',
    opacity: '0'
  },
  extends: 'IconButton',
  position: 'relative',
  padding: '0',
  cursor: 'pointer'
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

// ── ValueCircleProgress ──
export const ValueCircleProgress = {
  CircleProgress: {
    ":after": {}
  },
  UnitValue: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    flow: 'row-reverse',
    zIndex: '5',
    gap: 'V',
    Value: {
      text: '73'
    },
    Unit: {
      text: '%'
    }
  },
  border: '2'
}

// ── ValueHeading ──
export const ValueHeading = {
  H: {
    tag: 'h6',
    text: 'Kobe Bryant'
  },
  UnitValue: {
    margin: '- - - auto',
    Unit: {},
    Value: {}
  },
  extends: 'Flex',
  minWidth: 'F3',
  align: 'center space-between'
}

// ── ValueProgress ──
export const ValueProgress = {
  Progress: {
    maxWidth: '100%',
    flex: '1',
    value: 0.73
  },
  UnitValue: {
    flow: 'row-reverse',
    color: 'paragraph',
    Value: {
      text: '73'
    },
    Unit: {
      text: '%'
    }
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y2'
}

// ── AsciiMouse ──
export const AsciiMouse = {
  tag: 'canvas',
  scope: {},
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: '-1',
  display: 'block',
  onRender: (el) => {
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
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  pointerEvents: 'none',
  zIndex: '-1',
  display: 'block',
  onRender: (el) => {
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
  tag: 'canvas',
  scope: {}
}

// ── AsteriskParagraph ──
export const AsteriskParagraph = {
  extend: 'P',
  props: {
    display: 'Flex',
    fontSize: 'Z',
    text: '',
    align: 'flex-start flex-start',
    margin: '0',
    Span: {
      text: '*',
      fontSize: 'B',
      display: 'block',
      margin: '-V - - -',
      color: 'blue'
    },
    Span_2: {
      text: 'Frozen price on renewal until cancelled - 
      will be priced $588/year per seat after beta',
      color: 'title',
      padding: '- - - Y2',
      maxWidth: 'G+B1'
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
        background: 'gray15.75'
      }
    }
  },
  BannerHgroup: {
    zIndex: '2'
  },
  TabSet: {
    margin: 'D2+Y2 - B2+W -',
    background: 'black.25',
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

// ── BannerButton ──
export const BannerButton = {
  tag: 'label',
  flow: 'y',
  width: '95%',
  theme: 'primary',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'fit-content',
  padding: 'B1 B2 B C',
  maxWidth: 'J1',
  gap: 'C',
  "@tabletS": {
    margin: 'F1 - -'
  },
  "@mobileS": {
    margin: 'D - D -',
    padding: 'C B B2 B'
  },
  "@mobileXS": {
    padding: 'C A B2 A'
  },
  round: 'A2',
  ":hover, &:focus-within": {
    "> h1": {
      textShadow: 'gray1, 6px, 6px',
      transform: 'translate3d(-0.5%, -1%, 1px)'
    }
  },
  Icon: {
    name: 'arrowUpRight',
    position: 'absolute',
    top: '-E2+B2',
    right: '-F+A2',
    boxSize: 'I1+A ',
    opacity: '.4',
    style: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    }
  },
  H1: {
    lineHeight: '1em',
    padding: '- - X2 -',
    color: 'white',
    fontWeight: '700',
    fontSize: 'K',
    transition: 'A defaultBezier',
    transitionProperty: 'text-shadow, transform',
    "@mobileS": {
      textAlign: 'center',
      lineHeight: '1.2em',
      padding: '- Z'
    },
    text: 'Join the waitlist',
    textShadow: 'none',
    transform: 'none'
  },
  Flex: {
    align: 'end space-between',
    "@tabletS": {
      flow: 'y',
      align: 'start space-between',
      gap: 'D'
    },
    Flex_1: {
      flow: 'y',
      gap: 'A',
      JoinWaitlist: {
        position: 'relative',
        theme: 'document',
        margin: '- - - -Z',
        Button: {
          theme: '',
          "@mobileS": {
            align: 'center center',
            minWidth: '100%'
          }
        },
        "@mobileS": {
          margin: '0',
          flow: 'y',
          round: 'B',
          gap: 'A',
          minWidth: '100%',
          align: 'center flex-start'
        }
      },
      Asterisk: {
        "@mobileS": {
          textAlign: 'center',
          padding: '- Z'
        },
        text: '* We\'ll only email you about invitation'
      },
      "@mobileS": {
        align: 'center flex-start',
        minWidth: '100%'
      }
    },
    Flex_2: {
      gap: 'A2',
      align: 'center',
      position: 'relative',
      "@tabletS": {
        alignSelf: 'flex-end'
      },
      "@mobileL": {
        alignSelf: 'flex-start'
      },
      "@mobileS": {
        flow: 'y',
        align: 'center flex-start',
        gap: 'B',
        alignSelf: 'center'
      },
      P: {
        margin: '0',
        text: 'Want to skip the queue?',
        fontWeight: '400',
        color: 'title',
        "@mobileS": {
          margin: '0'
        }
      },
      Link: {
        "@tabletS": {
          padding: '0'
        },
        extends: [
          'Link',
          'Button'
        ],
        text: 'Book a demo',
        gap: 'X',
        href: 'https://cal.com/symbols-josh/early-access',
        target: '_blank',
        theme: null,
        background: 'none',
        color: 'title',
        textDecoration: 'none',
        ":hover": {
          textDecoration: 'underline'
        },
        Icon: {
          name: 'arrowUpRight'
        },
        "@mobileM": {
          padding: '0'
        },
        style: {
          color: 'white'
        }
      }
    },
    "@mobileS": {
      align: 'flex-start flex-start'
    }
  }
}

// ── BannerButtonCopy ──
export const BannerButtonCopy = {
  extends: 'Link',
  width: '95%',
  theme: 'primary',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'fit-content',
  href: '/pricing',
  padding: 'C B2 B2 B2',
  maxWidth: 'J1',
  margin: 'E2 - D -',
  "@tabletS": {
    margin: 'F1 - -'
  },
  "@mobileS": {
    margin: 'D - D -'
  },
  "@mobileXS": {
    padding: 'C B B2 B'
  },
  round: 'A2',
  ":hover": {
    "> h1": {
      textShadow: 'gray1, 10px, 10px',
      transform: 'translate3d(-1%, -2%, 1px)'
    }
  },
  "@mobileL": {},
  H1: {
    lineHeight: '1em',
    padding: '- - X -',
    color: 'white',
    fontWeight: '700',
    fontSize: 'K',
    maxWidth: 'D3',
    transition: 'A defaultBezier',
    transitionProperty: 'text-shadow, transform',
    text: 'Get lifetime access now',
    "@mobileL": {}
  },
  Flex: {
    gap: 'A2',
    padding: 'B - - -',
    "@mobileS": {
      flow: 'y',
      align: 'flex-start flex-start',
      gap: 'A'
    },
    P: {
      text: 'Need a personalized invite?',
      fontWeight: '400',
      "@mobileS": {
        margin: '0'
      }
    },
    DocsLink: {
      extends: [
        'DocsLink',
        'Button'
      ],
      text: 'Book a demo',
      gap: 'X',
      href: 'https://cal.com/symbols-josh/early-access',
      target: '_blank',
      background: 'none',
      color: 'white',
      textDecoration: 'none',
      Icon: {
        name: 'arrowUpRight'
      },
      "@mobileM": {
        padding: '0'
      }
    }
  },
  Icon: {
    name: 'arrowUpRight',
    position: 'absolute',
    top: '-E2+B2',
    right: '-F+A2',
    boxSize: 'I1+A ',
    "@mobileL": {
      opacity: '.4'
    },
    style: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    }
  }
}

// ── BannerHgroup ──
export const BannerHgroup = {
  extends: 'Hgroup',
  alignItems: 'center',
  textAlign: 'center',
  gap: 'A',
  H: {
    extends: 'Flex',
    align: 'center flex-start',
    flow: 'row-reverse',
    tag: 'h2',
    fontSize: 'F1',
    text: 'Canvas where the code meets design.',
    color: 'title',
    fontWeight: '100',
    gap: 'W2',
    Span: {
      text: 'Symbols.',
      fontWeight: '700'
    }
  },
  P: {
    text: 'Work seamlessly with your team or clients in real-time. Build, test, and document apps with our streamlined platform, designed for developers.',
    maxWidth: 'H2',
    fontSize: 'A2'
  }
}

// ── BannerImg ──
export const BannerImg = {
  maxHeight: 'H+B',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  Img: {
    src: 'platform.svg',
    width: '100%'
  },
  Img_2: {
    src: 'play.svg',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: '-B - - -'
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

// ── CTAButtonsCampaign ──
export const CTAButtonsCampaign = {
  gap: 'D',
  align: 'center',
  children: [
    {
      extends: [
        'Link',
        'Button'
      ],
      href: '/signup',
      text: 'Start for free',
      theme: 'primary',
      fontWeight: '700',
      minHeight: '42px',
      maxHeight: '42px',
      padding: '- D+W'
    },
    {
      extends: [
        'DocsLink'
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
        margin: '- - -W2 X1'
      }
    }
  ]
}

// ── CalBooking ──
export const CalBooking = {
  columnGap: 'C',
  padding: 'D C2',
  rowGap: 'C2',
  minWidth: 'G',
  minHeight: 'G',
  onInit: () => {
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
  onRender: (el, s) => {
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
    gap: 'B2',
    cursor: 'pointer',
    ":hover": {
      "> div > div": {
        opacity: '1'
      },
      "> div > div:after": {
        width: '75%',
        opacity: '1'
      },
      "> div > div > svg": {
        transform: 'rotate(90deg)'
      }
    }
  },
  Img: {
    src: 'bitmap.svg',
    boxSize: 'F2 G1',
    objectFit: 'fill'
  },
  Flex: {
    flow: 'y',
    align: 'flex-start space-between',
    padding: 'Z -',
    H2: {
      text: 'How did BCW improve infra and management reporting in just 3 days',
      fontWeight: '100',
      fontSize: 'B2+X1',
      minWidth: 'F+B',
      maxWidth: 'F+B',
      lineHeight: '1.3em',
      color: 'title'
    },
    IconText: {
      align: 'center flex-start',
      fontSize: 'A1',
      fontWeight: '100',
      gap: 'Y2',
      position: 'relative',
      maxWidth: 'fit-content',
      padding: '- - X2 -',
      opacity: '.8',
      Icon: {
        name: 'chevronUp',
        transition: 'transform .5s ease',
        transform: 'rotate(45deg)'
      },
      text: 'Read more',
      ":after": {
        content: '""',
        height: '.5px',
        width: '0',
        opacity: '0',
        transition: 'width .3s ease, opacity .5s ease',
        background: 'white.75',
        position: 'absolute',
        bottom: '0',
        left: 'B-V'
      }
    }
  }
}

// ── CompaniesUsing ──
export const CompaniesUsing = {
  flow: 'x',
  gap: 'D',
  align: 'center flex-start',
  "@tabletS": {
    flow: 'y',
    gap: 'C2',
    align: 'center'
  },
  "@light": {},
  Caption: {
    text: 'By team that previously contributed to:',
    color: 'caption',
    fontSize: 'Z',
    whiteSpace: 'nowrap'
  },
  Flex: {
    gap: 'D',
    flow: 'x',
    align: 'center',
    "@mobileS": {
      padding: '- C2'
    },
    childExtends: 'Img',
    "@tabletL": {
      flexWrap: 'wrap',
      padding: '- C2',
      align: 'center center'
    },
    childProps: {
      "@light": {
        ":nth-child(odd)": {
          display: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          display: 'none'
        }
      }
    },
    children: [
      {
        height: 'A2',
        src: 'nike_light.svg'
      },
      {
        height: 'A2',
        src: 'nike_dark.svg'
      },
      {
        height: 'A1',
        src: 'sony_light.svg'
      },
      {
        height: 'A1',
        src: 'sony_dark.svg'
      },
      {
        height: 'A1',
        src: 'siemens.svg'
      },
      {
        height: 'A1',
        src: 'siemens.svg'
      },
      {
        height: 'B+X',
        src: 'apple_light.svg'
      },
      {
        height: 'B+X',
        src: 'apple_dark.svg'
      },
      {
        height: 'A2',
        src: 'microsoft_light.svg'
      },
      {
        height: 'A2',
        src: 'microsoft_dark.svg'
      },
      {
        height: 'A2',
        src: 'mtv.svg'
      },
      {
        height: 'A2',
        src: 'mtv.svg'
      },
      {
        height: 'A2',
        src: 'nokia.svg'
      },
      {
        height: 'A2',
        src: 'nokia.svg'
      },
      {
        height: 'A2',
        src: 'paypal.svg'
      },
      {
        height: 'A2',
        src: 'paypal.svg'
      },
      {
        height: 'A2',
        src: 'samsung_light.svg'
      },
      {
        height: 'A2',
        src: 'samsung_dark.svg'
      }
    ]
  }
}

// ── CreateFeature ──
export const CreateFeature = {
  flow: 'x',
  minWidth: '320px',
  maxWidth: '1560px',
  position: 'relative',
  margin: '- auto',
  width: '100%',
  alignSelf: 'flex-start',
  padding: '- - E -',
  Flex: {
    flow: 'y',
    minWidth: '50%',
    childProps: {
      padding: 'D2 - D2 D2',
      boxSizing: 'border-box',
      position: 'relative',
      "@mobileL": {
        padding: 'D'
      },
      "@mobileM": {
        padding: 'C B C B'
      },
      ":before": {
        content: '""',
        boxSize: '1px 200%',
        position: 'absolute',
        top: '0',
        left: '0',
        background: 'line',
        zIndex: '0'
      },
      ":last-child": {
        ":after": {
          content: '""',
          boxSize: '1px 200%',
          position: 'absolute',
          bottom: '0',
          left: '0',
          background: 'line',
          zIndex: '0'
        }
      },
      Img: {},
      Hgroup: {
        "@mobileS": {
          fontSize: 'Z1'
        }
      },
      Button: {
        "@mobileXS": {
          minWidth: '100%',
          maxWidth: '100%'
        }
      }
    },
    childExtends: 'CreateFeatureItem',
    children: [
      {},
      {
        Img: {
          src: 'users.svg'
        },
        Hgroup: {
          H: {
            maxWidth: 'F',
            Span: {
              text: 'Turn team work into'
            },
            Span_2: {
              text: ' features, pages, apps'
            },
            Span_3: null,
            Span_4: null
          },
          P: {}
        },
        Button: {
          text: 'Start creating features'
        },
        P: {}
      },
      {
        Img: {
          src: 'rebrand.webp'
        },
        Hgroup: {
          H: {
            maxWidth: 'F',
            Span: {
              text: 'Rebrand easily, export and publish',
              fontWeight: '700'
            },
            Span_2: null,
            Span_3: null,
            Span_4: null
          },
          P: {}
        },
        Button: {
          text: 'Start creating features'
        }
      }
    ]
  },
  Box: {
    extends: 'Flex',
    align: 'center center',
    boxSize: 'H2 50%',
    minHeight: 'H2',
    position: 'sticky',
    left: '0',
    top: '50%',
    right: '0',
    zIndex: '5',
    "@tabletS": {
      display: 'none'
    },
    Img: {
      objectFit: 'scale-down',
      boxSize: '100%',
      src: 'landing.gif'
    },
    onRender: (el) => {
          const top = el.call('getCenteredTopOffset')
          el.setProps({
            top: top / 2
          })
        }
  }
}

// ── CreateFeatureItem ──
export const CreateFeatureItem = {
  flow: 'y',
  align: 'flex-start flex-start',
  Img: {
    src: 'comps.svg',
    boxSize: 'E2 F2',
    margin: '- - C -'
  },
  Hgroup: {
    gap: 'A',
    H: {
      text: '',
      fontSize: 'E1',
      maxWidth: 'F',
      lineHeight: '1.3em',
      color: 'title',
      Span: {
        text: 'Access',
        fontWeight: '300'
      },
      Span_2: {
        text: ' 3000+ features'
      },
      Span_3: {
        text: ', or ',
        fontWeight: '300'
      },
      Span_4: {
        text: 'generate with AI'
      }
    },
    P: {
      text: 'Invite team members, share and collaborate all-in-one realtime canvas',
      fontSize: 'A2+X',
      fontWeight: '100',
      maxWidth: 'G+B2',
      color: 'title'
    }
  },
  Button: {
    extends: [
      'DocsLink',
      'Button'
    ],
    href: '/signup',
    text: 'Create features',
    fontWeight: '700',
    flow: 'row-reverse',
    align: 'center center',
    gap: 'A2',
    padding: 'Z2 -',
    minWidth: 'F3+B2',
    maxWidth: 'F3+B2',
    theme: null,
    color: 'highlight-reversed',
    background: 'highlight',
    margin: 'E - - -',
    Icon: {
      name: 'chevronUp',
      fontSize: 'B',
      transform: 'rotate(45deg)',
      margin: '-W - - -'
    },
    border: '0'
  },
  P: {
    text: '* Learning, creating and sharing is free of charge',
    fontWeight: '100',
    margin: 'B2 - - -'
  }
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
      color: 'highlight.9'
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

// ── FeatureStory ──
export const FeatureStory = {
  extend: 'Flex',
  props: {
    flow: 'y',
    align: 'center flex-start',
    minWidth: '320px',
    margin: '- auto',
    width: '100%',
    maxWidth: 'J1'
  },
  Hgroup: {
    textAlign: 'center',
    align: 'center flex-start',
    gap: 'Z',
    padding: '- - C2 -',
    "@tabletS": {
      padding: '- B C2 B'
    },
    H: {
      color: 'title',
      text: 'Turning ideas into',
      fontWeight: '400',
      fontSize: 'E1',
      lineHeight: '1.3em',
      Strong: {
        text: ' features'
      }
    },
    P: {
      text: 'Read our case studies how you can bootstrap, grow and scale your product with Symbols',
      fontWeight: '400',
      fontSize: 'B',
      maxWidth: 'G3+B',
      color: 'title'
    }
  },
  Grid: {
    borderStyle: 'solid',
    borderColor: 'line',
    borderWidth: '1px',
    margin: 'C - - -',
    width: '100%',
    overflow: 'hidden',
    columns: 'repeat(3, 1fr)',
    "@tabletL": {
      columns: '100%',
      padding: 'C',
      gap: 'D1'
    },
    "@mobileM": {
      padding: '0',
      gap: '0'
    },
    childProps: {
      position: 'relative',
      padding: 'C1 B1 C C1',
      "@tabletL": {
        boxSize: 'H2 100%',
        gap: 'B1',
        padding: '0 0 D C'
      },
      "@tabletS": {
        boxSize: 'H 100%',
        padding: '0 0 B1 B1'
      },
      "@mobileL": {
        boxSize: 'G1 100%',
        padding: '0 0 A1 B'
      },
      "@mobileM": {
        padding: 'C B1',
        boxSize: 'fit-content 100%'
      },
      "@mobileS": {
        padding: 'B'
      },
      ":before": {
        content: '""',
        boxSize: '.8px 130%',
        background: 'line',
        zIndex: '4',
        position: 'absolute',
        top: '-C',
        left: '-D1',
        display: 'none',
        "@tabletL": {
          display: 'block'
        },
        "@mobileM": {
          display: 'none'
        }
      },
      ":after": {
        content: '""',
        boxSize: '100% 100%',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'none',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%)',
        zIndex: '2',
        "@tabletL": {
          display: 'block'
        },
        "@mobileM": {
          display: 'none'
        }
      },
      ":hover": {
        background: 'line.35'
      },
      ":first-child": {
        ":before": {
          display: 'none'
        }
      },
      ":not(:last-child)": {
        borderWidth: '0 1px 0 0',
        borderStyle: 'solid',
        borderColor: 'line',
        "@tabletL": {
          borderWidth: '0 0 0 0'
        },
        "@mobileM": {
          borderWidth: '0 0 1px 0'
        }
      },
      Box: {
        "@tabletL": {
          boxSize: '100% 100%',
          position: 'absolute',
          top: '0',
          left: '0'
        },
        "@mobileM": {
          position: 'relative',
          boxSize: 'F1 100%'
        },
        "@mobileXS": {
          boxSize: 'F 100%'
        },
        Img: {
          "@tabletL": {
            opacity: '.7'
          },
          "@mobileM": {
            opacity: '1'
          }
        },
        Icon: {
          "@tabletL": {
            fontSize: 'E2',
            top: '40%'
          },
          "@mobileL": {
            fontSize: 'E',
            top: '38%'
          },
          "@mobileM": {
            fontSize: 'C',
            top: '50%'
          }
        }
      },
      H3: {
        "@tabletL": {
          zIndex: '3',
          fontSize: 'F1',
          lineHeight: '1.4em',
          margin: 'auto 0 0 0',
          maxWidth: 'F+B1'
        },
        "@tabletS": {
          fontSize: 'E2'
        },
        "@mobileL": {
          fontSize: 'D',
          maxWidth: 'F+A'
        },
        "@mobileM": {
          fontSize: 'B2+X1',
          maxWidth: 'F',
          margin: 'Z2 - B2 -',
          lineHeight: '1.3em'
        },
        "@mobileS": {
          fontSize: 'D',
          margin: '0 - B -'
        },
        "@mobileXS": {
          padding: '- A - -'
        }
      },
      IconText: {
        "@tabletL": {
          zIndex: '3',
          ":after": {
            display: 'none'
          }
        }
      }
    },
    childExtends: 'StoryItem',
    children: [
      {
        href: '/docs/intro'
      },
      {
        Box: {
          Img: {
            src: 'frame2.svg'
          }
        },
        H3: {
          text: 'Inspect your existing website and customize'
        },
        IconText: {
          text: 'Coming soon'
        }
      },
      {
        Box: {
          Img: {
            src: 'frame.png'
          }
        },
        H3: {
          text: 'Turn your user stories and meetings into features',
          maxWidth: 'F1'
        },
        IconText: {
          text: 'Coming soon'
        }
      }
    ]
  },
  CaseStudies: {
    hide: true,
    extends: 'Flex',
    margin: 'D - - -',
    width: '100%',
    flow: 'y',
    gap: 'A',
    align: 'flex-start flex-start',
    overflow: 'hidden',
    H6: {
      text: 'Case studies',
      fontSize: 'A2',
      fontWeight: '100'
    },
    Box: {
      overflow: 'hidden',
      maxWidth: '100%',
      padding: 'B2 -',
      position: 'relative',
      borderStyle: 'solid',
      borderColor: 'line',
      borderWidth: '1px',
      "@tabletS": {
        padding: 'Z - - -'
      },
      "@mobileM": {
        padding: 'A2 - - -'
      },
      "@mobileS": {
        padding: 'A - A1 -'
      },
      ":after": {
        content: '""',
        boxSize: '100% C1',
        background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        position: 'absolute',
        top: '0',
        right: '0',
        pointerEvents: 'none',
        "@mobileM": {
          display: 'none'
        }
      },
      Flex: {
        gap: 'D',
        maxWidth: '100%',
        overflow: 'auto',
        padding: '- B',
        "@tabletS": {
          gap: 'B2',
          padding: '- B2',
          style: {
            scrollSnapType: 'x mandatory'
          },
          scrollPadding: 'B2'
        },
        "@mobileS": {
          padding: '- A',
          scrollPadding: 'A'
        },
        "::-webkit-scrollbar": {
          display: 'none'
        },
        childProps: {
          flow: 'x',
          padding: '0',
          "@tabletS": {
            minWidth: '100%',
            maxWidth: '100%',
            flow: 'y',
            gap: '0',
            align: 'flex-start flex-start',
            style: {
              scrollSnapAlign: 'start'
            }
          },
          Img: {
            "@tabletS": {
              boxSize: 'G1 H'
            },
            "@mobileL": {
              boxSize: 'G G2'
            },
            "@mobileM": {
              boxSize: 'auto 100%'
            }
          },
          Flex: {
            H2: {
              "@tabletS": {
                minWidth: 'D',
                maxWidth: 'G2',
                padding: '- A B -'
              },
              "@mobileM": {
                fontSize: 'D',
                padding: 'A A C Y'
              },
              "@mobileXS": {
                fontSize: 'C1',
                padding: 'A Y C Y'
              }
            },
            IconText: {
              "@mobileM": {
                padding: '- - - Z',
                margin: 'A - - -'
              }
            }
          }
        },
        childExtends: 'CaseItem',
        children: [
          {},
          {
            Img: {
              src: 'bitmap2.svg'
            },
            Flex: {
              H2: {
                text: 'Delivering ecommerce that does not look like others - the Mankanet story',
                minWidth: 'F+C1',
                maxWidth: 'F+C1'
              }
            }
          }
        ]
      },
      Scrollbar: {
        margin: 'C - - -',
        minWidth: '100%',
        maxWidth: '100%',
        padding: '- B - B2',
        "@mobileS": {
          margin: 'A2 - - -',
          padding: '- A - B'
        },
        TrackContainer: {
          Track: {
            background: 'gray3',
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
          childProps: {
            theme: 'transparent',
            onClick: (ev, el) => {
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
  flow: 'y',
  gap: 'E',
  boxSizing: 'content-box',
  position: 'relative',
  align: 'center flex-start',
  minHeight: 'fit-content',
  maxWidth: '100%',
  "@tabletS": {
    overflow: 'hidden'
  },
  "@mobileM": {
    gap: 'D1'
  },
  ":before": {
    content: '""',
    boxSize: '100% B2',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '2',
    pointerEvents: 'none',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    "@tabletS": {
      display: 'block'
    }
  },
  ":after": {
    content: '""',
    boxSize: '100% D1',
    position: 'absolute',
    top: '0',
    right: '-X',
    pointerEvents: 'none',
    zIndex: '2',
    background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    "@tabletS": {
      display: 'block'
    }
  },
  "@dark": {
    ":after": {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    background: 'gray15',
    color: 'gray1',
    ":after": {
      background: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  Hgroup: {
    align: 'center flex-start',
    gap: 'A2',
    H: {
      "@mobileM": {
        padding: '- B1',
        textAlign: 'center',
        lineHeight: '1.3em'
      },
      ":before, &:after": {
        content: '\'"\'',
        fontWeight: '400'
      },
      text: 'This feels like a magical software',
      fontSize: 'E2',
      color: 'title'
    },
    P: {
      textAlign: 'center',
      text: '- Mike Minciotti',
      color: 'title',
      fontWeight: '700',
      Div: {
        fontWeight: '300',
        text: 'Agency founder'
      }
    }
  },
  Grid: {
    maxWidth: '100%',
    margin: '- auto',
    columns: 'repeat(3, 1fr)',
    gap: 'F G',
    "@screenL": {
      gap: 'F2',
      fontSize: 'A2'
    },
    "@screenM": {
      gap: 'F1',
      fontSize: 'A1'
    },
    "@tabletM": {
      columns: 'repeat(2, 1fr)',
      gap: 'E'
    },
    "@tabletS": {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '100%',
      overflowX: 'auto',
      padding: '- B2',
      gap: 'D1',
      "::-webkit-scrollbar": {
        display: 'none'
      }
    },
    "@mobileM": {
      gap: 'C',
      padding: '- B'
    },
    position: 'relative',
    childExtends: 'UserFeedBack',
    children: [
      {
        transform: 'translateX(100px)',
        "@tabletM": {
          transform: 'translateX(0px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        }
      },
      {
        transform: 'translate(-30px, 105px)',
        "@tabletM": {
          transform: 'translate(0, 70px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'arthur.svg'
        },
        Flex: {
          Strong: {
            text: 'Arthur Beckett'
          },
          Caption: {
            text: 'Full Stack Developer'
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        transform: 'translate(-200px, -54px)',
        "@tabletM": {
          transform: 'translate(50px, 0px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'joe.svg'
        },
        Flex: {
          Strong: {
            text: 'Joe Mallory-Skinner'
          },
          Caption: {
            text: 'Design System Designer'
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        transform: 'translate(130px, -50px)',
        "@tabletM": {
          transform: 'translate(100px, 50px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'mike.svg'
        },
        Flex: {
          Strong: {
            text: 'Mike Minciotti'
          },
          Caption: {
            text: 'Agency Owner'
          },
          P: {
            text: 'What you guys have built is really cool. I definitely see a use for this.'
          }
        }
      },
      {
        transform: 'translate(60px, -24px)',
        "@tabletM": {
          transform: 'translate(-50px, 30px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'derek.svg'
        },
        Flex: {
          Strong: {
            text: 'Derek Onay'
          },
          Caption: {
            text: 'Senior Product Designer'
          },
          P: {
            text: 'Symbols is definitely more advanced than Storybook'
          }
        }
      },
      {
        transform: 'translate(-110px, -170px)',
        "@tabletM": {
          transform: 'translate(0, -10px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'aaron.svg'
        },
        Flex: {
          Strong: {
            text: 'Aaron Fagan'
          },
          Caption: {
            text: 'Enterprise Architect'
          },
          P: {
            text: 'Symbols is miles ahead of what my company uses to manage UIkits'
          }
        }
      },
      {
        transform: 'translate(100px, -50px)',
        "@tabletM": {
          transform: 'translate(0px, 0)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'matt.svg'
        },
        Flex: {
          Strong: {
            text: 'Matt Vaccaro'
          },
          Caption: {
            text: 'Product Engineer'
          },
          P: {
            text: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.'
          }
        }
      },
      {
        transform: 'translate(-20px, -135px)',
        "@tabletM": {
          transform: 'translate(70px, -30px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'chirag.svg'
        },
        Flex: {
          Strong: {
            text: 'Chirag Thesia'
          },
          Caption: {
            text: 'Software Engineer'
          },
          P: {
            text: '👍  Great product. I will for sure be a customr. Also excited to see where you guys take it.'
          }
        }
      },
      {
        transform: 'translate(-100px, -230px)',
        "@tabletM": {
          transform: 'translate(0, 0)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'enes.svg'
        },
        Flex: {
          Strong: {
            text: 'Enes Tufekci'
          },
          Caption: {
            text: 'Owner of UIAgents'
          },
          P: {
            text: 'I’m very impressed with the overall product. Very useful.'
          }
        }
      },
      {
        position: 'absolute',
        right: 'E1',
        bottom: '-C',
        "@tabletM": {
          position: 'initial',
          transform: 'translate(30px, -30px)',
          right: 'initial',
          bottom: 'initial'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'andrew.svg'
        },
        Flex: {
          Strong: {
            text: 'Andrew Smith'
          },
          Caption: {
            text: 'Product Director'
          },
          P: {
            text: 'It looks like it will solve the big issue with tech stack fragmentation.'
          }
        }
      }
    ],
    "@screenS": {
      fontSize: 'A'
    }
  }
}

// ── FeedbacksShort ──
export const FeedbacksShort = {
  flow: 'y',
  gap: 'D3',
  boxSizing: 'content-box',
  position: 'relative',
  align: 'center flex-start',
  minHeight: 'fit-content',
  maxWidth: '100%',
  "@tabletS": {
    overflow: 'hidden'
  },
  "@mobileM": {
    gap: 'D1'
  },
  ":before": {
    content: '""',
    boxSize: '100% B2',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '2',
    pointerEvents: 'none',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    "@tabletS": {
      display: 'block'
    }
  },
  ":after": {
    content: '""',
    boxSize: '100% D1',
    position: 'absolute',
    top: '0',
    right: '-X',
    pointerEvents: 'none',
    zIndex: '2',
    background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    "@tabletS": {
      display: 'block'
    }
  },
  "@dark": {
    ":after": {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    background: 'gray15',
    color: 'gray1',
    ":after": {
      background: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    }
  },
  Hgroup: {
    align: 'center flex-start',
    gap: 'A2',
    H: {
      "@mobileM": {
        padding: '- B1',
        textAlign: 'center',
        lineHeight: '1.3em'
      },
      ":before, &:after": {
        content: '\'"\'',
        fontWeight: '400'
      },
      text: 'This feels like a magical software',
      fontSize: 'E2',
      color: 'title'
    },
    P: {
      textAlign: 'center',
      text: '- Mike Minciotti',
      color: 'title',
      fontWeight: '700',
      Div: {
        fontWeight: '300',
        text: 'Agency founder'
      }
    }
  },
  Grid: {
    maxWidth: '100%',
    margin: '- auto',
    columns: 'repeat(3, 1fr)',
    gap: 'F G',
    "@screenL": {
      gap: 'F2',
      fontSize: 'A2'
    },
    "@screenM": {
      gap: 'F1',
      fontSize: 'A1'
    },
    "@tabletM": {
      columns: 'repeat(2, 1fr)',
      gap: 'E'
    },
    "@tabletS": {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '100%',
      overflowX: 'auto',
      padding: '- B2',
      gap: 'D1',
      "::-webkit-scrollbar": {
        display: 'none'
      }
    },
    "@mobileM": {
      gap: 'C',
      padding: '- B'
    },
    position: 'relative',
    childExtends: 'UserFeedBack',
    children: [
      {
        transform: 'translate(110px, -25px)',
        "@tabletM": {
          transform: 'translateX(0px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        }
      },
      {
        transform: 'translate(-30px, 65px)',
        "@tabletM": {
          transform: 'translate(0, 70px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'arthur.svg'
        },
        Flex: {
          Strong: {
            text: 'Arthur Beckett'
          },
          Caption: {
            text: 'Full Stack Developer'
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        transform: 'translate(-220px, -34px)',
        "@tabletM": {
          transform: 'translate(50px, 0px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'joe.svg'
        },
        Flex: {
          Strong: {
            text: 'Joe Mallory-Skinner'
          },
          Caption: {
            text: 'Design System Designer'
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.'
          }
        }
      },
      {
        transform: 'translate(230px, -180px)',
        "@tabletM": {
          transform: 'translate(100px, 50px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'mike.svg'
        },
        Flex: {
          Strong: {
            text: 'Mike Minciotti'
          },
          Caption: {
            text: 'Agency Owner'
          },
          P: {
            text: 'What you guys have built is really cool. I definitely see a use for this.'
          }
        }
      },
      {
        transform: 'translate(360px, -150px)',
        "@tabletM": {
          transform: 'translate(-50px, 30px)'
        },
        "@tabletS": {
          transform: 'translate(0px, 0px)'
        },
        Avatar: {
          src: 'derek.svg'
        },
        Flex: {
          Strong: {
            text: 'Derek Onay'
          },
          Caption: {
            text: 'Senior Product Designer'
          },
          P: {
            text: 'Symbols is definitely more advanced than Storybook'
          }
        }
      }
    ],
    "@screenS": {
      fontSize: 'A'
    },
    childProps: {
      fontSize: 'Z2'
    }
  }
}

// ── FooteLanding ──
export const FooteLanding = {
  align: 'center space-between',
  padding: 'X2 A X2 A2',
  width: '100%',
  margin: '- auto',
  gap: 'B',
  "@mobileL": {
    flow: 'column',
    align: 'center center',
    gap: 'B2'
  },
  childProps: {
    "@mobileL": {
      align: 'center center',
      textAlign: 'center',
      width: '100%',
      padding: '0'
    }
  },
  Copy: {
    gap: 'X2',
    lineHeight: '1',
    "@dark": {
      color: 'gray8'
    },
    "@light": {
      color: 'gray5'
    },
    DocsLink: {
      target: '_blank',
      href: 'https://symbols.app',
      text: 'Symbols'
    },
    Year: {
      text: ' © Since 2021'
    },
    extends: 'Flex'
  },
  Flex: {
    tag: 'nav',
    childExtends: 'MenuItem',
    gap: 'Z',
    Discord: {
      target: '_blank',
      href: 'https://discord.com/invite/crdFSkapFY',
      icon: 'discord'
    },
    Github: {
      target: '_blank',
      href: 'https://github.com/symbo-ls/',
      icon: 'github'
    },
    X: {
      target: '_blank',
      href: 'https://twitter.com/symbo_ls',
      icon: 'xcom'
    },
    Linkedin: {
      target: '_blank',
      href: 'https://www.linkedin.com/company/symbo-ls/',
      icon: 'linkedin'
    }
  }
}

// ── FrontendUnified ──
export const FrontendUnified = {
  maxWidth: 'J2',
  margin: '- auto',
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1em',
      "@mobileL": {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Strong: {
        text: 'Make Reusable Features'
      },
      Text: {
        fontWeight: '300',
        text: 'in minutes',
        "@mobileL": {
          display: 'none'
        }
      }
    },
    H6: {
      color: 'title',
      fontWeight: '100',
      maxWidth: 'G3+C',
      text: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.'
    }
  },
  WatchVideo: {
    border: '0',
    borderStyle: 'none',
    margin: 'E1 auto D3',
    padding: 'X2 X1'
  },
  WhatIsSymbols: {
    margin: 'E3 auto'
  }
}

// ── FrontendUnifiedCopy ──
export const FrontendUnifiedCopy = {
  Flex: {
    zIndex: '2',
    flow: 'y',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1em',
      "@mobileL": {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Strong: {
        text: 'Make Reusable Features'
      },
      Text: {
        fontWeight: '300',
        text: 'in minutes',
        "@mobileL": {
          display: 'none'
        }
      }
    },
    H6: {
      color: 'title',
      fontWeight: '100',
      maxWidth: 'G3+C',
      text: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.'
    },
    align: 'center'
  },
  WatchVideo: {
    border: '0',
    borderStyle: 'none',
    margin: 'E1 auto D3',
    padding: 'X2 X1'
  }
}

// ── Hero ──
export const Hero = {
  flow: 'y',
  width: '100%',
  padding: '0',
  gap: '0',
  position: 'relative',
  Main: {
    flow: 'x',
    width: '100%',
    height: '70dvh',
    align: 'stretch',
    "@tabletS": {
      flow: 'y',
      height: 'auto'
    },
    Flex: {
      flow: 'y',
      flex: '1',
      width: '50%',
      padding: 'G D E',
      justifyContent: 'center',
      display: 'flex',
      gap: 'D',
      maxWidth: 'I2',
      margin: '- - - auto',
      height: '100%',
      "@tabletS": {
        width: '100%',
        padding: 'E B',
        height: 'auto'
      },
      Header: {
        tag: 'header',
        flow: 'y',
        gap: 'A',
        H1: {
          text: null,
          color: 'title',
          lineHeight: '1.2',
          maxWidth: 'K',
          "@tabletS": {
            fontSize: 'G'
          },
          "@mobileM": {
            fontSize: 'F'
          },
          Span: {
            fontWeight: '300',
            text: 'Infra and workspace for',
            display: 'block'
          },
          Strong: {
            fontWeight: '700',
            text: 'Interface Engineers',
            color: 'white'
          }
        },
        P: {
          margin: 'A - - -',
          color: 'gray8',
          fontWeight: '400',
          maxWidth: 'H2',
          lineHeight: '1.6',
          fontSize: 'Z1',
          text: 'Make interfaces once. Reuse them across products, brands, and platforms — without rebuilding UI every time.'
        }
      },
      Nav: {
        tag: 'nav',
        flow: 'y',
        gap: 'A',
        width: '100%',
        maxWidth: 'I',
        margin: 'C - - -B',
        padding: 'C',
        theme: 'dots',
        Label: {
          tag: 'label',
          text: 'CREATE WITH',
          fontSize: 'Z',
          letterSpacing: '1px',
          color: 'gray6',
          fontWeight: '500',
          padding: '- - A -'
        },
        Flex: {
          flow: 'x',
          gap: 'Z2',
          flexWrap: 'nowrap',
          childExtends: [
            'Link',
            'Flex'
          ],
          childProps: {
            align: 'center',
            gap: 'Z2',
            padding: 'Y1 Z2',
            round: 'C',
            cursor: 'pointer',
            fontSize: 'Y2',
            fontWeight: '500',
            flex: '1',
            justifyContent: 'space-between',
            transition: 'opacity .3s ease, border .3s ease',
            theme: 'quaternary',
            whiteSpace: 'nowrap'
          },
          children: [
            {
              Icon: {
                name: 'claude',
                fontSize: 'B1',
                color: '#D97757'
              },
              Text: {
                text: 'Claude Code'
              },
              Icon_2: {
                name: 'downloadOutline',
                fontSize: 'Z',
                color: 'gray6'
              },
              href: '/docs/claude-code'
            },
            {
              Icon: {
                name: 'vscode',
                fontSize: 'A',
                color: '#007ACC'
              },
              Text: {
                text: 'VSCode'
              },
              Icon_2: {
                name: 'downloadOutline',
                fontSize: 'Z',
                color: 'gray6'
              },
              href: '/docs/vscode'
            },
            {
              Icon: {
                name: 'cursorEditor',
                fontSize: 'B'
              },
              Text: {
                text: 'Cursor'
              },
              Icon_2: {
                name: 'downloadOutline',
                fontSize: 'Z',
                color: 'gray6'
              },
              href: '/docs/cursor'
            },
            {
              Icon: {
                name: 'symbols',
                fontSize: 'B',
                color: 'blue'
              },
              Text: {
                text: 'Web'
              },
              Icon_2: {
                name: 'arrowUpRight',
                fontSize: 'Z',
                color: 'gray6'
              },
              href: '/signup'
            }
          ]
        }
      }
    },
    CanvasEmbed: {
      flex: '1',
      width: '50%',
      maxWidth: '50%',
      height: '100%',
      background: 'gray6',
      round: '0',
      padding: '0',
      project: '/nikoloza/default-flattened',
      "@tabletS": {
        width: '100%',
        height: '50vh'
      }
    }
  }
}

// ── HeroTitle ──
export const HeroTitle = {
  flow: 'y',
  align: 'center',
  textAlign: 'center',
  color: 'title',
  gap: 'A',
  "@mobileL": {
    gap: 'B',
    padding: '- B2'
  },
  H1: {
    Writing: {
      speed: 30,
      lineHeight: '0.9',
      height: 'A+X',
      minWidth: 'X',
      "@mobileS": {
        lineHeight: '1.1em'
      },
      text: 'Interface Engineering '
    },
    Writing_2: {
      "@mobileS": {
        margin: 'A2 - - -'
      },
      tag: 'span',
      speed: 30,
      delay: 1200,
      lineHeight: '0.9',
      height: 'A+X',
      minWidth: 'X',
      fontWeight: '200',
      afterText: 'starts here'
    },
    flexFlow: 'column',
    color: 'title',
    "@mobileS": {
      maxWidth: 'E'
    },
    text: null,
    fontSize: 'K',
    "@mobileM": {
      fontSize: 'J2'
    }
  },
  H6: {
    margin: 'X - -',
    height: 'C',
    extends: 'Writing',
    delay: 2000,
    speed: 5,
    color: 'title',
    fontWeight: '400',
    maxWidth: 'H3',
    afterText: 'Symbols Suite helps you expand your skills to build and manage entire interfaces — from design systems to delivery and integrations.'
  },
  props: {}
}

// ── HeroTitleCopy ──
export const HeroTitleCopy = {
  props: {},
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1.2',
      maxWidth: 'G',
      "@mobileL": {
        lineHeight: '1.3em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      children: [
        {
          fontWeight: '300',
          text: 'Your browser tab is now '
        },
        {
          text: ' IDE, framework and deployment'
        }
      ]
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H',
      text: 'Rebuilding features wastes time. Ship or enhance production ready web projects in record time.'
    }
  }
}

// ── HeroTitleCopyCopy1 ──
export const HeroTitleCopyCopy1 = {
  props: {},
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'I',
      lineHeight: '1.2',
      maxWidth: 'G',
      "@mobileL": {
        lineHeight: '1.3em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Span: {
        fontWeight: '300',
        text: 'Instantly turn your ideas'
      },
      Div: {
        fontWeight: '300',
        text: 'into',
        Strong: {
          text: ' features'
        }
      }
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H',
      childProps: {},
      children: [
        {
          text: 'Your browser tab is now IDE, framework and deployment.'
        },
        {
          text: 'You can build infinite frontend with single codebase. '
        }
      ]
    }
  }
}

// ── HeroTitleCopyCopy1Copy2 ──
export const HeroTitleCopyCopy1Copy2 = {
  props: {},
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'I',
      lineHeight: '1.2',
      maxWidth: 'G',
      "@mobileL": {
        lineHeight: '1.3em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Span: {
        fontWeight: '300',
        text: 'Extend your apps with features,'
      },
      Div: {
        fontWeight: '300',
        Strong: {
          text: 'instantly'
        }
      }
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H',
      childProps: {},
      children: [
        {
          text: 'Your apps now have huge uikit, design system and AI editor.'
        },
        {
          text: 'You can reuse it to infinite apps with a single codebase. '
        }
      ]
    }
  }
}

// ── HgroupImg ──
export const HgroupImg = {
  extend: 'Flex',
  props: {
    gap: 'F1+X',
    maxWidth: 'fit-content',
    "@tabletM": {
      gap: 'C'
    },
    "@tabletS": {
      flow: 'y',
      gap: 'D',
      align: 'center flex-start'
    },
    "@mobileM": {
      gap: 'F',
      maxWidth: '100%'
    }
  },
  Hgroup: {
    gap: 'B',
    "@tabletS": {},
    "@mobileM": {
      padding: '- B2'
    },
    H: {
      tag: 'h1',
      text: 'Lifetime access is available now',
      fontSize: 'G1',
      fontWeight: '700',
      maxWidth: 'E+A',
      lineHeight: '1.2em',
      "@tabletM": {
        fontSize: 'G'
      },
      "@mobileL": {
        fontSize: 'F'
      }
    },
    P: {
      display: 'Flex',
      fontSize: 'X1+X',
      maxWidth: 'G2+Z',
      text: '',
      fontWeight: '300',
      align: 'flex-start flex-start',
      Span: {
        text: '*',
        fontSize: 'B',
        display: 'block',
        margin: '-X - - -',
        color: 'blue'
      },
      Span_2: {
        text: 'The lifetime offer is limited to the beta release and  will switch to monthly pricing once fulfilled.',
        color: 'title',
        padding: '- - - Y2'
      }
    }
  },
  Img: {
    src: 'infinite.svg',
    display: 'block',
    maxHeight: 'fit-content',
    "@mobileM": {
      transform: 'rotate(90deg)'
    }
  }
}

// ── Investors ──
export const Investors = {
  flow: 'y',
  gap: 'B',
  H6: {
    text: 'Investors:'
  },
  Grid: {
    templateColumns: 'repeat(3, 1fr)',
    "@tabletM": {
      templateColumns: 'repeat(2, 1fr)'
    },
    gap: 'B',
    childExtends: [
      'AvatarHgroup'
    ],
    childProps: {
      color: 'title',
      gap: 'Z2',
      align: 'start',
      href: '{{ href }}',
      Avatar: {
        margin: '0',
        boxSize: 'B',
        src: '{{ avatar }}'
      },
      Hgroup: {
        H: {
          tag: 'h6',
          fontSize: 'A1',
          fontWeight: '600',
          margin: '0',
          text: '{{ name }}'
        },
        P: {
          text: '{{ title }}'
        }
      }
    },
    childrenAs: 'state',
    children: [
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQG6VLe-hAv2HA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1621306128570?e=1759363200&v=beta&t=Z4SUlB9y2OqIjf9LbU7n0AH94wsMaTpvDsrm4qcb7bg',
        name: 'Matt Pallakoff',
        title: 'Innovative Product Design Leader | ex Apple, Nook, Suki'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C4D03AQFbQdWExHLa6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1581961324261?e=1759363200&v=beta&t=0SudX05ax6HYAjQSOLkoC_wIXtRjC-TmjVzjwZe1eqE',
        name: 'Irakli Janiashvili',
        title: 'Software Engineer at Lightdash ⚡️'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQFUHNpe3mba6A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1606841237051?e=1759363200&v=beta&t=Qt6Hy2Z0ZP69PxSknUmHhrP_xNJjy0ag8k-Hw7ftwpE',
        name: 'Tamar Chkhaidze',
        title: 'Senior Tax Consultant at PwC'
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        name: 'Natia Tsintsadze',
        title: 'Co-founder at Archy'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5103AQExz0EA26jyFA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517614662229?e=2147483647&v=beta&t=RnmXzUwXGyhJkn1UiYbAmPfOULfSnyqk6FWqqweSnMw',
        name: 'Revaz Zakalashvili',
        title: 'Tech Lead & Senior Software Engineer'
      },
      {
        avatar: 'https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q',
        name: 'Revaz Maisashvili',
        title: 'Financial Director'
      }
    ],
    "@mobileL": {
      templateColumns: 'repeat(1, 1fr)'
    }
  }
}

// ── JoinWaitlist ──
export const JoinWaitlist = {
  tag: 'form',
  flow: 'x',
  theme: 'field',
  round: 'C1',
  overflow: 'hidden',
  padding: 'X2',
  gap: 'X2',
  position: 'relative',
  maxWidth: 'G3+C1',
  width: '100%',
  onSubmit: async (ev, el, s) => {
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
  state: {
    status: 'idle',
    error: ''
  },
  LoadingGifSection: {
    position: 'absolute',
    inset: '0',
    theme: 'document',
    isActive: (el, s) => s.status === 'loading',
    transition: 'C, defaultBezier',
    transitionProperty: 'opacity, visibility',
    "!isActive": {
      opacity: 0,
      visibility: 'hidden'
    }
  },
  Success: {
    position: 'absolute',
    inset: '0',
    theme: 'document',
    flexAlign: 'center center',
    isActive: (el, s) => s.status === 'success',
    transition: 'C, defaultBezier',
    transitionProperty: 'opacity, visibility',
    "!isActive": {
      opacity: 0,
      visibility: 'hidden'
    },
    IconText: {
      gap: 'Z',
      icon: 'check',
      color: 'title',
      text: 'Thanks for registering your interest.',
      Icon: {
        color: 'green'
      }
    }
  },
  Input: {
    width: '100%',
    theme: 'transparent',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
    onInput: (ev, el, s) => {
          s.quietUpdate({
            email: el.node.value
          })
        },
    color: 'title'
  },
  Button: {
    theme: 'primary',
    text: 'Get notified',
    icon: 'checkmark',
    gap: 'X2',
    padding: 'Z2 B Z2 B2',
    align: 'center',
    type: 'submit',
    Icon: {
      order: 2,
      fontSize: 'B'
    }
  }
}

// ── LandingAIPrompt ──
export const LandingAIPrompt = {
  flow: 'y',
  width: 'I2+D1',
  Box: {
    boxSize: 'E2 100%',
    minHeight: 'E2',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: 'line',
    borderWidth: '1px',
    position: 'relative',
    round: 'A2',
    Textarea: {
      minWidth: '100%',
      minHeight: '100%',
      maxHeight: '100%',
      theme: 'transparent',
      border: '0',
      borderWidth: '0',
      value: 'As an user, I need...',
      attr: {
        placeholder: '"As an user, I need..."'
      },
      padding: 'B - - B1',
      style: {
        borderWidth: '0'
      }
    },
    Flex: {
      position: 'absolute',
      top: 'A1',
      right: 'B1',
      gap: 'A2',
      childExtends: 'IconButton',
      childProps: {
        padding: 'X',
        theme: 'transparent'
      },
      children: [
        {
          Icon: {
            name: 'upload'
          }
        },
        {
          Icon: {
            name: 'chevronUp'
          }
        }
      ]
    },
    Button: {
      text: 'Create a feature',
      position: 'absolute',
      padding: 'Z2 C+X1',
      right: 'A1',
      bottom: 'A1',
      flow: 'row-reverse',
      gap: 'Y2',
      theme: 'blackWhite',
      fontWeight: '600',
      Icon: {
        name: 'chevronUp',
        fontSize: 'B',
        transform: 'rotate(45deg)',
        margin: '-W - - -'
      }
    }
  },
  Flex: {
    align: 'center space-between',
    padding: '- X',
    Button: {
      theme: 'transparent',
      padding: '0',
      text: 'Explore Marketplace',
      gap: 'X2',
      fontWeight: '500',
      color: 'title',
      Icon: {
        name: 'chevronUp',
        transform: 'rotate(45deg)',
        fontSize: 'B'
      }
    },
    Button_2: {
      theme: 'transparent',
      padding: '0',
      text: 'More Ideas',
      gap: 'W2',
      fontWeight: '400',
      margin: '- auto - B',
      Icon: {
        name: 'chevronDown',
        fontSize: 'B'
      }
    },
    P: {
      text: '* No black-box, you can build it once, and take to everywhere',
      fontWeight: '100'
    }
  }
}

// ── LandingCampaignHeader ──
export const LandingCampaignHeader = {
  flow: 'x',
  padding: 'X2 A X2 Z',
  alignItems: 'center',
  minWidth: '100%',
  border: 'none',
  fontSize: '1rem',
  theme: 'header',
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@tabletS": {
    padding: 'A1 A'
  },
  "@mobileM": {},
  "@mobileXS": {
    padding: 'A1 Z'
  },
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
  Nav: {
    flexFlow: 'x',
    gap: 'C',
    "@tabletS": {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    children: [
      {
        href: '/explore',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'explore'
        }
      },
      {
        href: '/developers',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'developers'
        }
      },
      {
        href: '/pricing',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'pricing'
        }
      }
    ]
  },
  P: {
    extends: 'Flex',
    text: 'of single source',
    fontWeight: '100',
    color: 'title',
    flow: 'row-reverse',
    margin: '0 auto',
    gap: 'W2',
    Span: {
      text: 'Symbols',
      fontWeight: '700',
      color: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'C',
    "@tabletS": {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    children: [
      {
        color: 'caption',
        fontWeight: '300',
        href: '/docs/resources',
        text: '/support'
      },
      {
        color: 'caption',
        fontWeight: '300',
        href: '/signin',
        text: '/signin'
      },
      {
        href: '/signup',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'create-account'
        }
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

// ── LandingFeatures ──
export const LandingFeatures = {
  width: 'I2+D1',
  flow: 'y',
  gap: 'X',
  round: 'A',
  padding: 'X',
  borderColor: 'line',
  borderStyle: 'solid',
  borderWidth: '1px',
  onClick: (ev, el, s) => {
      if (s.isVisible)
        el.node.scrollIntoView()
    },
  state: {
    src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4?'
  },
  Grid: {
    columns: 'repeat(4, 1fr)',
    childExtends: [
      'Flex',
      'CanvasButton'
    ],
    gap: '0 W2',
    childProps: {
      fontSize: 'Z2',
      round: 'Z2',
      align: 'center',
      padding: 'Z2 A2',
      gap: 'Z',
      flex: 1,
      isActive: (el, s) => el.props.src === s.src,
      Text: {
        text: '{{ text }}'
      },
      onClick: (ev, el, s) => {
              const isSame = el.props.src === s.src
              s.update({
                isVisible: !isSame,
                src: el.props.src
              })
            }
    },
    children: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        text: 'Agentic development'
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        text: 'Drag-and-drop features'
      },
      {
        text: 'Connect to your local IDE'
      },
      {
        text: 'Publish to domain'
      },
      {
        text: 'Present before saving'
      },
      {
        text: 'Two-click 3rd party integrations'
      },
      {
        text: 'Share in realtime sandbox isolation'
      },
      {
        text: 'Rewind changes instantly'
      }
    ]
  },
  Box: {
    theme: 'dialog',
    round: 'A',
    overflow: 'hidden',
    transition: 'C1 defaultBezier height',
    padding: 'Y',
    position: 'relative',
    ".isVisible": {
      height: 'H3'
    },
    "!isVisible": {
      height: 'F1'
    },
    onRender: el => {
          window.requestAnimationFrame(() => {
            const height = el.Video.node.scrollHeight
            el.props['.isVisible'].height = height + 16
          })
        },
    onClick: (ev, el, s) => {
          if (!s.isVisible) s.toggle('isVisible')
        },
    "@dark": {
      color: 'white',
      backgroundColor: 'gray4.9'
    },
    "@light": {
      color: 'black',
      backgroundColor: 'gray13.95'
    },
    Video: {
      src: '{{ src }}',
      width: '100%',
      zIndex: '2',
      round: 'Z2',
      aspectRatio: '11 / 7',
      objectFit: 'cover',
      autoplay: false,
      controls: false,
      loop: true,
      onMouseenter: (ev, el) => {
              el.node.play()
            },
      onMouseleave: (ev, el) => {
              el.node.pause()
            }
    },
    ":after": {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      boxSize: '50% 100%',
      zIndex: '2',
      background: 'linear-gradient(to top, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
      transition: 'Z defaultBezier',
      transitionProperty: 'opacity, transform',
      pointerEvents: 'none'
    }
  }
}

// ── LandingGetstarted ──
export const LandingGetstarted = {
  childExtends: [
    'Flex',
    'Link',
    'CanvasButton'
  ],
  round: 'Z2+W2',
  padding: 'W',
  margin: 'C1 - -',
  flow: 'x',
  gap: 'X2',
  childProps: {
    align: 'center',
    padding: 'Z A',
    cursor: 'pointer',
    round: 'Z2',
    gap: 'A',
    flex: 1
  },
  Create: {
    Img: {
      width: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbbc549b85e495f3c195f/download'
    },
    Text: {
      text: 'Build your frontend'
    },
    href: '/signup'
  },
  VerticalLine: {
    ignoreChildProps: true,
    ignoreChildExtend: true,
    margin: 'A1 0'
  },
  Demos: {
    href: '/docs/examples',
    Img: {
      width: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbafe49b85e495f3c140a/download'
    },
    Text: {
      text: 'Explore examples'
    }
  },
  VerticalLine_2: {
    ignoreChildProps: true,
    ignoreChildExtend: true,
    margin: 'A1 0'
  },
  Chrome: {
    href: '/docs/chrome-extension',
    Img: {
      width: 'C1',
      src: 'https://api.symbols.app/core/files/public/69284e6628a7fb3ff8d05c33/download'
    },
    Text: {
      text: 'Build using extension'
    }
  }
}

// ── LandingHeader ──
export const LandingHeader = {
  flow: 'x',
  padding: 'X2 A X2 Z',
  alignItems: 'center',
  minWidth: '100%',
  border: 'none',
  fontSize: '1rem',
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@mobileM": {},
  "@mobileXS": {
    padding: 'A1 Z'
  },
  "@tabletS": {
    padding: 'A1 A'
  },
  theme: 'header',
  Logo: {
    position: 'relative',
    icon: 'logo',
    top: 'auto',
    left: 'auto',
    margin: '- B - -',
    "@tabletS": {
      fontSize: 'E',
      margin: '- 0 - -',
      padding: '0'
    },
    theme: 'transparent'
  },
  Nav: {
    flexFlow: 'x',
    gap: 'C',
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    children: [
      {
        href: '/explore',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'explore'
        }
      },
      {
        href: '/developers',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'developers'
        }
      },
      {
        href: '/pricing',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'pricing'
        }
      }
    ],
    "@tabletS": {
      display: 'none'
    }
  },
  P: {
    extends: 'Flex',
    text: 'of single source',
    fontWeight: '100',
    color: 'title',
    flow: 'row-reverse',
    margin: '0 auto',
    gap: 'W2',
    Span: {
      text: 'Symbols',
      fontWeight: '700',
      color: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'C',
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    "@tabletS": {
      display: 'none'
    },
    children: [
      {
        color: 'caption',
        fontWeight: '300',
        href: '/docs/resources',
        text: '/support'
      },
      {
        color: 'caption',
        fontWeight: '300',
        href: '/signin',
        text: '/signin'
      },
      {
        href: '/signup',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'create-account'
        }
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

// ── LandingNavbarCopy ──
export const LandingNavbarCopy = {
  extends: 'Navbar',
  gap: 'A2',
  round: 'C1',
  padding: 'X2 Z2',
  fontSize: 'Z2',
  userSelect: 'none',
  theme: 'common-box',
  position: 'absolute',
  top: 'W1',
  left: 'X',
  right: 'X',
  zIndex: 9999999,
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
  Nav: {
    flexFlow: 'x',
    gap: 'C',
    "@tabletS": {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    children: [
      {
        href: '/explore',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'explore'
        }
      },
      {
        href: '/developers',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'developers'
        }
      },
      {
        href: '/pricing',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'pricing'
        }
      }
    ]
  },
  P: {
    extends: 'Flex',
    text: 'of single source',
    fontWeight: '100',
    color: 'title',
    flow: 'row-reverse',
    margin: '0 auto',
    gap: 'W2',
    Span: {
      text: 'Symbols',
      fontWeight: '700',
      color: 'title'
    },
    "@mobileS": {}
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'C',
    "@tabletS": {
      display: 'none'
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400'
    },
    children: [
      {
        color: 'caption',
        fontWeight: '300',
        href: '/docs/resources',
        text: '/support'
      },
      {
        color: 'caption',
        fontWeight: '300',
        href: '/signin',
        text: '/signin'
      },
      {
        href: '/signup',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'create-account'
        }
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

// ── Layout ──
export const Layout = {
  extend: 'Flex',
  props: {
    flow: 'y',
    overflow: 'hidden',
    overflowY: 'auto',
    maxHeight: '100%',
    padding: '- - C2 -',
    minWidth: 'J+F1',
    width: '100%',
    align: 'start start',
    "@dark": {
      background: 'black'
    },
    "@light": {
      background: 'gray15'
    },
    "@screenL": {
      fontSize: 'A2'
    },
    "@screenM": {
      fontSize: 'A1'
    },
    "@screenS": {
      fontSize: 'A'
    },
    "@tabletL": {
      fontSize: 'Z2'
    },
    "@tabletM": {
      fontSize: 'Z1'
    }
  },
  Header: {},
  Banner: {
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%'
  },
  Feedbacks: {
    padding: 'F1 - D2 -',
    minWidth: '100%',
    maxWidth: '100%'
  },
  BuiltScale: {
    margin: 'D - - -',
    minWidth: '100%',
    maxWidth: '100%'
  },
  GameChanging: {
    padding: 'E1 - E1 -',
    minWidth: '100%',
    maxWidth: '100%'
  },
  OpenSource: {
    minWidth: '100%',
    maxWidth: '100%'
  },
  Products: {
    margin: 'E2 auto'
  },
  Footer: {
    margin: '- auto'
  }
}

// ── MakeDesignWithCode ──
export const MakeDesignWithCode = {
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      margin: '- - -',
      lineHeight: 1.2,
      "@mobileL": {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1.2em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Strong: {
        text: 'Engineering the interface layer',
        "@mobileL": {
          display: 'none'
        }
      }
    },
    H6: {
      margin: 'X - -',
      color: 'title',
      fontWeight: '300',
      maxWidth: 'G3+C',
      text: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps in one go.'
    }
  }
}

// ── MakeDesignWithCodeCopy ──
export const MakeDesignWithCodeCopy = {
  props: {},
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1em',
      "@mobileL": {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1.2em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Strong: {
        text: 'The Most Advanced Front-end Editor'
      },
      Text: {
        fontWeight: '300',
        text: 'with no-code, marketplace and AI',
        margin: 'W - X',
        "@mobileL": {
          display: 'none'
        }
      }
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'G3+C',
      text: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps online.'
    }
  }
}

// ── MenuIcon ──
export const MenuIcon = {
  extends: 'Button',
  flow: 'y',
  padding: 'Y',
  gap: 'Y1',
  align: 'flex-end flex-start',
  background: 'transparent',
  childProps: {
    minHeight: 'V2',
    maxHeight: 'V2',
    height: 'V2',
    background: 'white',
    round: 'C',
    transition: 'transform .3s ease',
    ":first-child": {
      width: 'B',
      ".activeMenu": {
        transform: 'rotate(45deg) translate(2px, 0px)'
      },
      "!activeMenu": {
        transform: 'rotate(0deg)'
      }
    },
    ":last-child": {
      width: 'B',
      ".activeMenu": {
        transform: 'rotate(-45deg) translate(5px, -5px)'
      },
      "!activeMenu": {
        transform: 'rotate(0deg)'
      }
    }
  },
  children: [
    {},
    {}
  ],
  childrenAs: 'props'
}

// ── Numbers ──
export const Numbers = {
  flow: 'y',
  gap: 'A2',
  H6: {
    text: 'Quick stats:'
  },
  Grid: {
    flow: 'y',
    gap: 'C',
    margin: 'B 0 A',
    columns: 'repeat(4, 1fr)',
    "@mobileM": {
      columns: 'repeat(1, 1fr)'
    },
    "@tabletM": {
      columns: 'repeat(2, 1fr)'
    },
    childExtends: [
      'Hgroup'
    ],
    childProps: {
      color: 'title',
      gap: 'Z2',
      align: 'start',
      H: {
        tag: 'h6',
        fontWeight: '600',
        margin: '0',
        text: '{{ value }}'
      },
      P: {
        order: '-1',
        text: '{{ title }}'
      }
    },
    childrenAs: 'state',
    children: [
      {
        title: 'Investors',
        value: '8'
      },
      {
        title: 'Beta Users',
        value: '518'
      },
      {
        title: 'AI Models',
        value: '7'
      },
      {
        title: 'Marketplace items',
        value: '3,184'
      }
    ]
  }
}

// ── OpenSource ──
export const OpenSource = {
  flow: 'y',
  align: 'center flex-start',
  gap: 'D',
  Hgroup: {
    align: 'center flex-start',
    gap: 'B2',
    textAlign: 'center',
    H: {
      text: 'Open-Source Ecosystem',
      color: 'transparent',
      fontSize: 'A+I',
      fontWeight: '900',
      "-webkit-text-stroke": '2px #4A51FF'
    },
    P: {
      text: 'Develop with confidence, as Symbols is built from the ground up with open-source in mind.',
      maxWidth: 'H'
    }
  },
  TabSetTwo: {
    childProps: {
      ":first-child": {
        theme: 'primary'
      }
    }
  }
}

// ── PackageIncludes ──
export const PackageIncludes = {
  extend: 'Flex',
  props: {
    flow: 'y',
    align: 'flex-start flex-start',
    gap: 'A2',
    childExtends: 'IconText',
    childProps: {
      whiteSpace: 'nowrap',
      fontWeight: '300',
      gap: 'Y',
      fontSize: 'A',
      Icon: {
        name: 'check',
        fontSize: 'Z'
      }
    },
    children: [
      {
        text: 'Includes starter plan'
      },
      {
        text: 'custom UI building'
      },
      {
        text: 'Instant delivery'
      },
      {
        text: 'Custom animations'
      },
      {
        text: 'Realtime preview'
      },
      {
        text: 'Available paralel delivery'
      },
      {
        text: 'Custom plugins'
      },
      {
        text: 'Unlimited revisions'
      },
      {
        text: 'Private discord communication'
      },
      {
        text: 'Custom integrations'
      }
    ]
  }
}

// ── Packages ──
export const Packages = {
  extend: 'Box',
  props: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: 'fit-content',
    position: 'relative',
    ":before": {
      content: '\'\'',
      boxSize: '100% D',
      position: 'absolute',
      top: '0',
      left: '0',
      background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      pointerEvents: 'none',
      display: 'none',
      "@tabletS": {
        display: 'block'
      }
    },
    ":after": {
      content: '\'\'',
      boxSize: '100% D',
      background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      position: 'absolute',
      top: '0',
      right: '0',
      pointerEvents: 'none',
      display: 'none',
      "@tabletS": {
        display: 'block'
      }
    },
    "@tabletS": {
      overflowX: 'hidden'
    }
  },
  Grid: {
    columns: '2fr 3fr 3fr',
    childExtends: 'Flex',
    "@tabletL": {
      columns: 'repeat(2, auto)',
      rowGap: 'E'
    },
    "@tabletS": {
      display: 'flex',
      overflow: 'auto',
      padding: '- E - D'
    },
    "@mobileM": {
      padding: '- C'
    },
    "@mobileS": {
      padding: '- B2 - B2'
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
          fontWeight: '700'
        },
        P: {
          color: 'title'
        }
      }
    },
    children: [
      {
        padding: '- D - -',
        "@mobileS": {
          padding: '- B2 - -'
        },
        Hgroup: {
          H: {
            text: 'Free'
          },
          P: {
            text: 'Unlimited members plan'
          }
        },
        IconText: {
          gap: 'Z',
          margin: 'C - - -',
          text: 'Your current plan',
          fontWeight: '900',
          Icon: {
            attr: {
              name: 'check'
            }
          }
        },
        P: {
          margin: 'A2 - D -',
          maxWidth: 'G',
          text: 'Collaborate and launch your project free with your team.'
        },
        PackageIncludes: {
          children: null
        }
      },
      {
        padding: '- D - C1',
        borderStyle: 'solid',
        borderColor: 'blue.25',
        borderWidth: '0 1px 0',
        "@tabletL": {
          borderWidth: '0 0 0 1px'
        },
        "@tabletS": {
          borderWidth: '0 1px 0'
        },
        "@mobileS": {
          padding: '- B2 - B2'
        },
        onSubmit: null,
        Hgroup: {
          H: {
            text: 'Starter'
          },
          P: {
            text: 'Limited offer infinite members - available now in beta'
          }
        },
        PriceOptions: {
          margin: 'C - B2 -',
          "@mobileM": {
            flow: 'y',
            gap: 'B'
          },
          childProps: {
            Radio: {
              checked: null,
              name: 'starter',
              Input: {
                name: 'starter'
              }
            }
          }
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
            name: 'chevronUp'
          }
        },
        PackageIncludes: {
          margin: 'B2+W1 - - -',
          children: null
        },
        AsteriskParagraph: {
          margin: 'C - 0 -'
        }
      },
      {
        padding: '- - - C1',
        "@tabletL": {
          padding: '- - - 0',
          gridColumn: 'span 2',
          maxWidth: 'fit-content'
        },
        "@tabletS": {
          padding: '- - - C1'
        },
        "@mobileS": {
          padding: '- - - B2'
        },
        onSubmit: null,
        Hgroup: {
          H: {
            text: 'Experts'
          },
          P: {
            text: 'Get a custom UI—built by Symbols experts'
          }
        },
        PriceOptions: {
          margin: 'C - B2 -',
          "@mobileM": {
            flow: 'y',
            gap: 'B'
          },
          childProps: {
            Radio: {
              checked: null,
              name: 'experts',
              Input: {
                name: 'experts'
              }
            }
          },
          children: null
        },
        IconButton: {
          margin: '-D+Z1 0 C1+Y A2',
          alignSelf: 'end',
          theme: 'transparent',
          padding: '0',
          "@screenMS": {
            margin: '-D+Z1 -B2 C1+Y A2'
          },
          "@screenS": {
            margin: '-D+Z1 -A1 C1+Y A2'
          },
          "@tabletL": {
            margin: '-D+Z1 0 C1+Y A2'
          },
          "@tabletS": {
            margin: '-D+Z1 -C C1+Y A2'
          },
          "@mobileM": {
            margin: '-D+Z1 C C1+Y A2'
          },
          Icon: {
            name: null,
            fontSize: 'B'
          },
          onClick: null
        },
        PriceOptions_2: {
          hide: null,
          margin: '- - B2 -',
          "@mobileM": {
            flow: 'y',
            gap: 'B'
          },
          childProps: {
            Radio: {
              name: 'experts',
              Input: {
                name: 'experts'
              }
            }
          },
          children: null
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
            margin: '-W2 - - -'
          }
        },
        PackageIncludes: {
          margin: 'B2+W1 - - -',
          children: null
        },
        Flex: {
          align: 'flex-start flex-start',
          gap: 'D2',
          margin: 'auto - - -',
          "@tabletL": {
            margin: 'D - - -'
          },
          "@mobileM": {
            flow: 'y',
            gap: 'B1'
          },
          AsteriskParagraph: {
            Span: {},
            Span_2: {
              text: 'To hear more pricing options or custom inquiries
              book 30 minutes free call with our sales',
              maxWidth: 'G+D'
            }
          },
          Link: {
            href: 'https://cal.com/symbols-josh/early-access',
            whiteSpace: 'nowrap',
            text: 'Contact sales',
            padding: '0',
            fontWeight: '700',
            target: '_blank',
            color: 'title',
            "@mobileS": {
              margin: '- - - Z1'
            },
            ":hover": {
              textDecoration: 'underline'
            }
          }
        }
      }
    ]
  }
}

// ── ParagraphTransparency ──
export const ParagraphTransparency = {
  fontWeight: '300',
  textAlign: 'center',
  fontSize: 'A+X',
  color: 'title',
  maxWidth: 'H+C',
  padding: '- C',
  "@mobileM": {
    padding: '- B'
  },
  tag: 'p',
  Strong: {
    text: 'Whatever you create in Symbols'
  },
  Span: {
    text: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.'
  }
}

// ── PartnerSet ──
export const PartnerSet = {
  gap: 'C',
  align: 'center',
  "@light": {},
  Caption: {
    text: 'With partnership',
    fontWeight: '100',
    color: 'title'
  },
  Flex: {
    gap: 'C',
    childExtends: 'Img',
    childrenAs: 'props',
    childProps: {
      "@light": {
        ":nth-child(odd)": {
          display: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          display: 'none'
        }
      },
      ":nth-child(odd)": {},
      ":nth-child(even)": {}
    },
    children: [
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
    flow: 'y',
    align: 'flex-start flex-start',
    gap: 'C',
    maxWidth: 'fit-content',
    "@tabletS": {
      padding: '- B2',
      gap: 'D',
      alignSelf: 'center'
    }
  },
  H6: {
    text: 'Some perks also included',
    fontWeight: '300',
    fontSize: 'A'
  },
  Grid: {
    columns: 'repeat(3, 1fr)',
    columnGap: 'F+B',
    "@tabletM": {
      columnGap: 'E1'
    },
    "@tabletS": {
      columns: 'repeat(2, 1fr)',
      rowGap: 'D'
    },
    "@mobileL": {
      columnGap: 'D2'
    },
    "@mobileM": {
      columns: 'repeat(1, 1fr)',
      columnGap: '0',
      rowGap: 'C1'
    },
    childExtends: 'Flex',
    childProps: {
      flow: 'y',
      gap: 'B',
      align: 'flex-start flex-start',
      childExtends: 'IconText',
      childProps: {
        whiteSpace: 'nowrap',
        gap: 'Z',
        Icon: {
          name: 'check'
        }
      }
    },
    children: [
      {
        children: [
          {
            text: 'Open-source'
          },
          {
            text: 'Brandbook and preview'
          },
          {
            text: 'Developers documentation'
          }
        ]
      },
      {
        children: [
          {
            text: 'Design System'
          },
          {
            text: 'Realtime collaboartion'
          },
          {
            text: 'CLI tool'
          }
        ]
      },
      {
        children: [
          {
            text: '650+ Symbols components'
          },
          {
            text: '99.99% uptime'
          },
          {
            text: 'Help center'
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
    gap: 'C1',
    childProps: {
      tag: 'label',
      cursor: 'pointer',
      flexFlow: 'x',
      gap: 'Z',
      flow: 'row-reverse',
      Radio: {
        margin: '-W - - -',
        Input: {
          attr: {
            name: 'starter'
          },
          value: null,
          onChange: null,
          ":checked + div": {
            theme: 'transparent'
          },
          ":checked + div > svg": {
            opacity: '1'
          }
        },
        Flex: {
          border: 'solid, gray.5',
          borderWidth: '.5px',
          theme: 'transparent',
          padding: 'V',
          Icon: {
            name: 'check',
            opacity: '0',
            fontSize: 'Z2'
          },
          ":after": null
        }
      },
      Hgroup: {
        gap: 'X',
        H: {
          tag: 'strong',
          text: null,
          color: 'title',
          fontWeight: '700'
        },
        P: {
          fontSize: 'Z',
          fontWeight: '300',
          text: null,
          color: 'title'
        }
      }
    },
    childrenAs: 'state',
    children: [
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
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    "@mobileL": {
      gap: 'B',
      padding: '- B2'
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1.2',
      maxWidth: 'G',
      "@mobileL": {
        lineHeight: '1.3em'
      },
      "@mobileS": {
        fontSize: 'J2'
      },
      Span: {
        fontWeight: '300',
        text: 'Build reusable '
      },
      Strong: {
        text: 'web features '
      },
      Br: {},
      Strong_2: {
        text: 'in seconds'
      },
      Span_2: {
        fontWeight: '300',
        text: ', not days'
      }
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H2',
      text: 'Rebuilding features wastes time. Symbols enables frontend teams to build lego-like features. Ship or enhance production ready web projects in record time.'
    }
  }
}

// ── RemainingLine ──
export const RemainingLine = {
  gap: 'Z',
  align: 'center flex-start',
  position: 'relative',
  ":before": {
    content: '""',
    position: 'absolute',
    boxSize: 'C G2',
    background: 'linear-gradient(to right, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)'
  },
  minWidth: '100%',
  Flex: {
    align: 'center flex-start',
    width: '65%',
    onRender: (el, s) => {
          el.setProps({
            width: s.percent + '%'
          })
        },
    Line: {
      boxSize: '2px 100%',
      background: 'linear-gradient(to right, #0015FF, #0009FE)'
    },
    Dot: {
      boxSize: 'A2 A2',
      background: 'rgba(0, 9, 254, .35)',
      round: '100%',
      margin: '- - - -X',
      position: 'relative',
      ":after": {
        content: '""',
        boxSize: 'X1 X1',
        background: '#0085FE',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        round: '100%',
        opacity: '1',
        zIndex: '100'
      }
    }
  },
  Span: {
    text: '{{ percent }}% already raised',
    fontWeight: '300'
  }
}

// ── SideMenu ──
export const SideMenu = {
  extends: 'LandingCampaignHeader',
  minWidth: '0',
  flow: 'y',
  gap: 'B',
  padding: 'F1 0 0 0',
  alignItems: 'flex-end',
  background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
  position: 'fixed',
  backdropFilter: 'blur(5px)',
  top: '0',
  right: '0',
  zIndex: '99999998',
  minHeight: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  maxWidth: '0',
  opacity: '0',
  ".activeMenu": {
    minWidth: '100%',
    opacity: '1',
    transition: 'min-width .15s ease'
  },
  "!activeMenu": {},
  "> nav > a": {
    fontSize: 'F2',
    fontWeight: '100'
  },
  "@mobileM": {
    alignItems: 'center',
    textAlign: 'center'
  },
  childProps: {
    childProps: {
      onClick: (event, element, state) => {
              state.update({
                activeMenu: false
              })
            }
    }
  },
  tag: 'aside',
  Logo: null,
  Nav: {
    flexFlow: 'column',
    gap: 'B',
    padding: '- E - -',
    "@tabletS": {
      display: 'flex'
    },
    "@mobileM": {
      padding: '- 0 - -'
    },
    childProps: {
      Strong: {
        fontWeight: '100'
      }
    }
  },
  P: null,
  Nav_2: {
    flexFlow: 'column',
    padding: '- C - -',
    gap: 'B',
    "@tabletS": {
      display: 'flex'
    },
    "@mobileM": {
      padding: '0 0 0 0'
    },
    childProps: {
      fontWeight: '100',
      Strong: {
        fontWeight: '100'
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
    flow: 'y',
    cursor: 'pointer',
    ":hover": {
      "> h3 + div": {
        opacity: '1'
      },
      "> h3 + div:after": {
        width: '75%',
        opacity: '1'
      },
      "> h3 + div > svg": {
        transform: 'rotate(90deg)'
      }
    }
  },
  Box: {
    position: 'relative',
    boxSize: 'E3 F3',
    overflow: 'hidden',
    Img: {
      src: 'Frame.svg',
      boxSize: '100% 100%',
      objectFit: 'cover'
    },
    Icon: {
      name: 'play',
      fontSize: 'C',
      round: '100%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '3',
      background: 'black.8',
      boxSizing: 'content-box',
      padding: 'Z'
    }
  },
  H3: {
    text: 'Start creating features for your apps',
    fontSize: 'B2+X1',
    fontWeight: '100',
    maxWidth: 'F',
    margin: 'Z2 - B2 -',
    lineHeight: '1.3em'
  },
  IconText: {
    align: 'center flex-start',
    fontSize: 'A1',
    fontWeight: '600',
    gap: 'Y2',
    theme: 'transparent',
    position: 'relative',
    maxWidth: 'fit-content',
    padding: '0 0 X2 0',
    opacity: '.8',
    color: 'white',
    text: 'Get started',
    Icon: {
      name: 'chevronUp',
      transition: 'transform .5s ease',
      transform: 'rotate(45deg)'
    },
    ":after": {
      content: '""',
      height: '.5px',
      width: '0',
      opacity: '0',
      transition: 'width .3s ease, opacity .5s ease',
      background: 'white.75',
      position: 'absolute',
      bottom: '0',
      left: 'B-V'
    }
  }
}

// ── SupportedBy ──
export const SupportedBy = {
  gap: 'C',
  align: 'center',
  "@mobileL": {
    flow: 'y',
    align: 'center center',
    padding: '- B'
  },
  "@light": {},
  Caption: {
    text: 'Supported by',
    fontWeight: '200'
  },
  Flex: {
    gap: 'C',
    childExtends: 'Img',
    align: 'center center',
    "@mobileL": {
      flexWrap: 'wrap'
    },
    childProps: {
      "@light": {
        ":nth-child(odd)": {
          display: 'none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          display: 'none'
        }
      },
      ":nth-child(odd)": {},
      ":nth-child(even)": {}
    },
    children: [
      {
        maxWidth: 'F',
        src: 'google_for_startups_light.png'
      },
      {
        maxWidth: 'F',
        src: 'google_for_startups_dark.png'
      },
      {
        width: 'E+Z2',
        src: 'gh_for_startups_light.png'
      },
      {
        width: 'E+Z2',
        src: 'gh_for_startups_dark.png'
      },
      {
        width: 'E+A2',
        src: 'grafana_light.png'
      },
      {
        width: 'E+A2',
        src: 'grafana_dark.png'
      }
    ]
  }
}

// ── SurveyBanner ──
export const SurveyBanner = {
  flow: 'x',
  minHeight: 'G1',
  backgroundImage: 'banner.png',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  aspectRatio: '1149 / 432',
  border: '1px, solid',
  margin: 'A 0',
  "@dark": {
    borderColor: 'gray4'
  },
  "@light": {
    backgroundColor: 'white',
    borderColor: 'gray10'
  },
  Box: {
    alignSelf: 'flex-end',
    padding: 'C2 D',
    H1: {
      maxWidth: 'F',
      text: 'Only e2e tooling for Interface Engineers',
      lineHeight: 1.3
    },
    P: {
      maxWidth: 'G3+A',
      margin: 'Z1 0',
      text: 'AI driven, realtime and centralized platform to build products as easily as filling Typeform and Airtable, also as powerful as Bubble and Figma.'
    }
  }
}

// ── SurveyForm ──
export const SurveyForm = {
  extends: 'Grid',
  tag: 'form',
  position: 'relative',
  columnGap: 'C',
  padding: 'C2',
  rowGap: 'B2',
  "@mobileM": {
    rowGap: 'C',
    padding: 'B 0'
  },
  attr: {
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
      text: 'Investor (Legal entity name)'
    },
    Input: {
      value: '{{ name }}'
    }
  },
  "SurveyInput.email": {
    type: 'email',
    Title: {
      text: 'Investor email'
    },
    Input: {
      value: '{{ email }}'
    }
  },
  "SurveyTextarea.note": {
    Title: {
      text: 'Note (optional)'
    },
    Textarea: {
      border: '0'
    }
  },
  ContinueButton: {
    extends: [
      'Button',
      'ContinueButton'
    ],
    type: 'submit',
    text: 'Book a call',
    padding: 'Z2 D',
    margin: '- -Z',
    fontWeight: '700',
    style: {
      justifySelf: 'start'
    },
    "@mobileL": {
      width: '100%'
    }
  }
}

// ── SurveyInput ──
export const SurveyInput = {
  extends: 'SurveyLabel',
  position: 'relative',
  align: 'stretch flex-start',
  Title: {},
  Input: {
    theme: 'field',
    margin: '- -Z',
    style: {
      width: '-webkit-fill-available'
    },
    padding: 'Z1 A2',
    placeholder: 'Please specify',
    attr: {
      name: (el) => {
              const compRoot = el.parent
              const fieldKey = compRoot.key
              return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
            }
    },
    required: true,
    value: (el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          return s[key]
        },
    onChange: (ev, el, s) => {
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
  extends: 'GroupField',
  maxWidth: 'H'
}

// ── SurveySelect ──
export const SurveySelect = {
  extends: 'SurveyLabel',
  Title: {},
  DropdownField: {
    padding: '0',
    round: 'C1',
    tabIndex: '-1',
    margin: '- -Z',
    style: {
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
      attr: {
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
      children: ({
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
      position: 'absolute',
      right: 'Z',
      pointerEvents: 'none'
    }
  },
  SurveyOtherInput: {
    margin: '0 -Z'
  }
}

// ── SurveyTextarea ──
export const SurveyTextarea = {
  extends: 'SurveyLabel',
  width: '100%',
  position: 'relative',
  align: 'stretch flex-start',
  Title: {},
  Textarea: {
    theme: 'field',
    margin: '- -Z',
    style: {
      width: '-webkit-fill-available'
    },
    maxWidth: 'none',
    padding: 'Z1 A2',
    placeholder: 'Please specify',
    value: (el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          return s[key]
        },
    attr: {
      name: (el) => {
              const compRoot = el.parent
              const fieldKey = compRoot.key
              return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
            }
    },
    required: true,
    onChange: (ev, el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          s.update({
            [key]: ev.target.value
          })
        },
    border: '0'
  }
}

// ── SymbolsEditor ──
export const SymbolsEditor = {
  flow: 'y',
  align: 'flex-start flex-start',
  minWidth: '320px',
  width: '100%',
  margin: '- auto',
  maxWidth: '1560px',
  maxHeight: '100%',
  gap: 'D',
  MakeDesignWithCode: {
    margin: '- auto'
  },
  Grid: {
    width: '100%',
    maxWidth: '100%',
    columns: 'repeat(3, 1fr)',
    childExtends: 'Box',
    margin: '0 auto',
    gap: 'B',
    padding: '- B',
    "@tabletL": {
      columns: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      columns: '100%'
    },
    "@mobileS": {
      padding: '- A'
    },
    childProps: {
      height: 'G3+X',
      maxHeight: 'G3+X',
      position: 'relative',
      overflow: 'hidden',
      round: 'A',
      background: 'gray3.3',
      Hgroup: {
        position: 'absolute',
        zIndex: '3',
        gap: 'Y',
        padding: '- B - -',
        H: {
          color: 'title',
          fontSize: 'A'
        },
        P: {
          color: 'caption'
        }
      },
      Img: {
        display: 'block',
        position: 'absolute',
        zIndex: '1'
      }
    },
    children: [
      {
        gridColumn: 'span 2',
        "@mobileL": {
          gridColumn: 'span 1'
        },
        Hgroup: {
          top: 'B',
          left: 'B',
          "@mobileS": {
            top: 'A2',
            left: 'A2'
          },
          H: {
            text: 'Voice and text input'
          },
          P: {
            text: 'AI processing using GPT-4, Claude, Grok and more'
          }
        },
        Img: {
          src: 'ai.svg',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%, 0)'
        },
        Download: {
          text: 'Download',
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'electricBlue',
          color: 'title',
          padding: 'Z B',
          round: 'D',
          pointerEvent: 'none',
          "@mobileS": {
            top: '42%',
            fontSize: 'Z1'
          }
        },
        Flex: {
          position: 'absolute',
          bottom: 'B',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          maxWidth: '100%',
          align: 'center center',
          gap: 'A2',
          "@mobileL": {
            flow: 'y',
            bottom: 'B'
          },
          "@mobileM": {
            bottom: 'Y',
            gap: 'A'
          },
          IconText: {
            gap: 'Y',
            color: 'title',
            "@mobileM": {
              flow: 'y',
              gap: 'Y2',
              align: 'center flex-start',
              textAlign: 'center',
              padding: '- B',
              lineHeight: '1.3em'
            },
            "@mobileS": {
              fontSize: 'A2'
            },
            Icon: {
              name: 'microphone',
              fontSize: 'C'
            },
            text: '"Make this component wider, pink and add magic icon"',
            fontWeight: '500'
          },
          Button: {
            theme: 'transparent',
            padding: '0',
            text: 'Try it (soon)',
            color: 'title',
            fontWeight: '300',
            cursor: 'pointer'
          }
        }
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          "@mobileS": {
            bottom: 'A2',
            left: 'A2'
          },
          H: {
            text: 'Branding as Design System'
          },
          P: {
            text: 'Turn your branding into a system your apps use'
          }
        },
        Img: {
          src: 'designSystem.svg',
          width: '100%',
          top: 'B1',
          "@mobileL": {
            opacity: '.5'
          },
          "@mobileM": {
            opacity: '1'
          },
          "@mobileS": {
            top: 'C'
          }
        }
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          "@mobileS": {
            bottom: 'A2',
            left: 'A2'
          },
          H: {
            text: 'Version history'
          },
          P: {
            text: 'Time travel and individually compare your changes',
            "@screenS": {
              maxWidth: 'G'
            },
            "@mobileL": {
              maxWidth: 'fit-content'
            },
            "@mobileS": {
              maxWidth: 'F3'
            }
          }
        },
        Img: {
          src: 'versioning.svg',
          top: 'B2',
          right: 'B2',
          "@mobileS": {
            top: 'B1',
            right: 'B1'
          }
        }
      },
      {
        backgroundImage: 'scene.svg',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        gridColumn: 'span 2',
        "@mobileL": {
          gridColumn: 'span 1'
        },
        Hgroup: {
          top: 'B',
          left: 'B',
          "@mobileL": {
            top: 'A2',
            left: 'A2'
          },
          H: {
            text: 'Infinite Canvas'
          },
          P: {
            text: 'Put your resources in transparent and clear organization'
          }
        },
        Img: {
          src: 'canvas.svg',
          width: '100%',
          transform: 'scale(1.12)',
          top: 'E+A1',
          "@mobileL": {
            top: 'F'
          },
          "@mobileM": {
            top: 'F'
          }
        }
      },
      {
        Hgroup: {
          top: 'A2',
          left: 'B',
          "@mobileL": {
            top: 'A1',
            left: 'A'
          },
          H: {
            text: 'Customize without code'
          },
          P: {
            text: 'Online editor with and without coding changes'
          }
        },
        Img: {
          src: 'calculate.svg',
          top: 'E+Z',
          right: '-C',
          transform: 'scale(1.12)',
          "@mobileL": {
            transform: 'scale(1.3)',
            top: 'E3',
            right: '0'
          },
          "@mobileM": {
            transform: 'scale(1.2)',
            right: '-Z1'
          },
          "@mobileS": {
            transform: 'scale(1)',
            right: '-D1',
            top: 'E1'
          }
        }
      },
      {
        Hgroup: {
          top: 'A2',
          left: 'B',
          "@mobileL": {
            top: 'A1',
            left: 'A'
          },
          H: {
            text: 'Synchronisation'
          },
          P: {
            text: 'Get simultanious synchronisation to your local and to the live website',
            maxWidth: 'G1'
          }
        },
        Img: {
          src: 'rock.svg',
          top: 'E+A1',
          left: 'D1',
          "@screenS": {
            left: 'C2'
          },
          "@tabletL": {
            left: 'E2'
          },
          "@tabletM": {
            left: 'E'
          },
          "@tabletS": {
            left: 'C1'
          },
          "@mobileL": {
            left: 'E3'
          },
          "@mobileM": {
            left: 'D2'
          },
          "@mobileS": {
            left: '0',
            transform: 'scale(.8)'
          },
          "@mobileXS": {
            left: '-B1'
          }
        }
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          "@mobileL": {
            bottom: 'A2',
            left: 'A2'
          },
          H: {
            text: 'Cross Delivery'
          },
          P: {
            text: 'Universal by design, we support the most popular frameworks and tools to get your onboard faster',
            maxWidth: 'G2'
          }
        },
        ":after": {
          content: '""',
          position: 'absolute',
          boxSize: '100% 100%',
          zIndex: '2',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
        },
        Img: {
          src: 'platforms.svg',
          top: 'B',
          left: 'B',
          "@mobileL": {
            transform: 'scale(1.2)',
            top: 'D',
            left: 'E'
          },
          "@mobileM": {
            transform: 'scale(1)',
            top: 'B',
            left: 'B'
          }
        }
      }
    ]
  }
}

// ── SymbolsFeatures ──
export const SymbolsFeatures = {
  maxWidth: '100%',
  border: '1px solid transparent',
  padding: '0 !important',
  P: {
    fontSize: 'A2+X',
    textAlign: 'center',
    maxWidth: 'H+C',
    text: 'Whatever you create in Symbols',
    fontWeight: '700',
    padding: 'D2 -',
    color: 'title',
    margin: '- auto',
    Span: {
      text: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.',
      fontWeight: '100'
    },
    "@tabletS": {
      padding: 'D2 B1'
    },
    "@mobileL": {
      fontSize: 'B2'
    }
  },
  Scrollable: {
    maxWidth: '100%',
    overflowX: 'auto',
    gap: 'B2',
    padding: '- B A B',
    "::-webkit-scrollbar": {
      display: 'none'
    },
    align: 'start',
    "@tabletS": {
      padding: 'B'
    },
    "@mobileS": {
      gap: 'B1',
      padding: 'A1',
      style: {
        scrollSnapType: 'x mandatory'
      },
      scrollPadding: 'A1'
    },
    childProps: {
      "@mobileS": {
        padding: 'E2 B B B'
      },
      Icon: {},
      H3: {
        "@mobileS": {
          fontSize: 'D2'
        }
      }
    },
    childExtends: 'FeatureItem',
    children: [
      {
        href: '/docs/components',
        ":hover": {
          background: '#1E2397'
        },
        Icon: {
          name: 'grid'
        },
        H3: {
          text: 'Building reusable cloud components',
          Span: {
            text: ' with cross-framework distribution.'
          }
        }
      },
      {
        href: '/docs/design-system',
        ":hover": {
          background: '#FFF263',
          color: 'highlight-reversed',
          "& h3": {
            color: 'highlight-reversed'
          },
          "& span": {
            color: 'highlight-reversed'
          }
        },
        Icon: {
          name: 'tree'
        },
        H3: {
          text: 'Advanced design system ',
          Span: {
            text: ' for multi-branded websites and cross-device support, including TVs.'
          }
        }
      },
      {
        href: '/docs/functions',
        ":hover": {
          background: '#5FCCD6',
          color: 'highlight-reversed',
          "& h3": {
            color: 'highlight-reversed'
          },
          "& span": {
            color: 'highlight-reversed'
          }
        },
        Icon: {
          name: 'fn outline'
        },
        H3: {
          text: 'Frontend functions and dependencies ',
          Span: {
            text: 'reusable across projects and domains. Built on cloud, delegated using API.'
          }
        }
      },
      {
        href: '/docs/files',
        ":hover": {
          background: '#2127A7'
        },
        Icon: {
          name: 'folder outline'
        },
        H3: {
          text: 'Files and assets on the cloud - ',
          Span: {
            text: 'instant access in the code, no assets sharing anymore!'
          },
          padding: '- V2+V2 - -'
        }
      },
      {
        ":hover": {
          color: 'title-reversed',
          background: '#FFFFFF',
          "& h3": {
            color: 'title-reversed'
          },
          "& span": {
            color: 'title-reversed .9'
          }
        },
        Icon: {
          name: 'state'
        },
        H3: {
          text: 'Content and state management - in one',
          Span: {
            text: ' CMS unifies content and state driven flows into one dashboard.'
          },
          padding: '- W - -'
        }
      },
      {
        href: '/docs/pages',
        ":hover": {
          background: '#A823F6'
        },
        Icon: {
          name: 'content'
        },
        H3: {
          text: 'SEO-friendly pages and flows',
          Span: {
            text: ' including backend rendered markup and multi-level routing.'
          }
        }
      },
      {
        href: '/docs/testing',
        ":hover": {
          background: '#BC0025'
        },
        Icon: {
          name: 'bug'
        },
        H3: {
          text: 'Visual testing',
          Span: {
            text: ' - environment to visually test screens across devices, covering any kind of E2E tests.'
          }
        }
      },
      {
        href: '/docs/framework',
        ":hover": {
          background: 'line'
        },
        Icon: {
          name: 'api'
        },
        H3: {
          text: 'Symbols is an ecosystem ',
          Span: {
            text: ' single source of truth to build frontend locally and in cloud - in realtime.',
            display: 'block'
          }
        }
      }
    ]
  },
  Scrollbar: {
    extends: 'Scrollbar.scrollable',
    maxWidth: '95%',
    minWidth: '95%',
    margin: '- auto',
    "@mobileS": {
      maxWidth: '88%',
      minWidth: '88%'
    }
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

// ── Testimonials ──
export const Testimonials = {
  flow: 'y',
  gap: 'C',
  width: '100%',
  position: 'relative',
  Hgroup: {
    tag: 'header',
    flow: 'y',
    gap: 'A',
    padding: '- D',
    width: '100%',
    margin: '- auto',
    maxWidth: 'I2*2',
    "@mobileL": {
      padding: '- B'
    },
    H: {
      tag: 'h6',
      text: 'What people say',
      fontWeight: '600',
      margin: '0',
      color: 'title'
    },
    P: {
      color: 'caption',
      fontWeight: '400',
      text: 'Trusted by engineers, designers, and teams worldwide.'
    }
  },
  Scrollable: {
    gap: 'B',
    padding: 'A B',
    "@mobileL": {
      padding: 'A B',
      style: {
        scrollSnapType: 'x mandatory'
      }
    },
    align: 'flex-start',
    childExtends: 'TestimonialCard',
    children: [
      {
        P: {
          text: 'This is awesome. I love it. Symbols is doing great work.'
        },
        Flex: {
          Avatar: {
            src: 'james.svg'
          },
          Flex_2: {
            Strong: {
              text: 'James Harris'
            },
            Caption: {
              text: 'Frontend Developer'
            }
          }
        }
      },
      {
        P: {
          text: 'This would definitely streamline the process for my web dev agency.'
        },
        Flex: {
          Avatar: {
            src: 'joe.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Joe Mallory-Skinner'
            },
            Caption: {
              text: 'Design System Designer'
            }
          }
        }
      },
      {
        P: {
          text: 'This would definitely streamline the process for my web dev agency.'
        },
        Flex: {
          Avatar: {
            src: 'arthur.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Arthur Beckett'
            },
            Caption: {
              text: 'Full Stack Developer'
            }
          }
        }
      },
      {
        P: {
          text: 'What you guys have built is really cool. I definitely see a use for this.'
        },
        Flex: {
          Avatar: {
            src: 'mike.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Mike Minciotti'
            },
            Caption: {
              text: 'Agency Owner'
            }
          }
        }
      },
      {
        P: {
          text: 'Symbols is miles ahead of what my company uses to manage UIkits.'
        },
        Flex: {
          Avatar: {
            src: 'aaron.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Aaron Fagan'
            },
            Caption: {
              text: 'Enterprise Architect'
            }
          }
        }
      },
      {
        P: {
          text: 'Symbols is definitely more advanced than Storybook.'
        },
        Flex: {
          Avatar: {
            src: 'derek.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Derek Onay'
            },
            Caption: {
              text: 'Senior Product Designer'
            }
          }
        }
      },
      {
        P: {
          text: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.'
        },
        Flex: {
          Avatar: {
            src: 'matt.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Matt Vaccaro'
            },
            Caption: {
              text: 'Product Engineer'
            }
          }
        }
      },
      {
        P: {
          text: 'Great product. I will for sure be a customer. Also excited to see where you guys take it.'
        },
        Flex: {
          Avatar: {
            src: 'chirag.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Chirag Thesia'
            },
            Caption: {
              text: 'Software Engineer'
            }
          }
        }
      },
      {
        P: {
          text: 'I\'m very impressed with the overall product. Very useful.'
        },
        Flex: {
          Avatar: {
            src: 'enes.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Enes Tufekci'
            },
            Caption: {
              text: 'Owner of UIAgents'
            }
          }
        }
      },
      {
        P: {
          text: 'It looks like it will solve the big issue with tech stack fragmentation.'
        },
        Flex: {
          Avatar: {
            src: 'andrew.svg'
          },
          Flex_2: {
            Strong: {
              text: 'Andrew Smith'
            },
            Caption: {
              text: 'Product Director'
            }
          }
        }
      }
    ]
  }
}

// ── ThankYou ──
export const ThankYou = {
  padding: 'C2',
  H2: {
    fontWeight: '300',
    text: 'Thank you',
    lineHeight: 1
  },
  Grid: {
    margin: 'B 0 D',
    gap: 'B 7%',
    columns: 'repeat(2, 1fr)',
    childProps: {
      margin: '0'
    },
    children: [
      {
        text: 'Thanks for scrolling that far. We are open to answer your questions. Just talk to us to personalise your experience.'
      }
    ],
    childExtends: 'P'
  }
}

// ── UserFeedBack ──
export const UserFeedBack = {
  flow: 'x',
  gap: 'Z1',
  Avatar: {
    src: 'james.svg',
    boxSize: 'C2+Y2 C2+Y2'
  },
  Flex: {
    flow: 'y',
    alignItems: 'flex-start',
    Strong: {
      text: 'James Harris',
      color: 'title'
    },
    Caption: {
      text: 'Frontend Developer',
      fontWeight: '100'
    },
    P: {
      text: 'This is awesome. I love it. Symbols is doing great work.',
      margin: 'Y1 - - -',
      maxWidth: 'F2',
      minWidth: 'F2',
      padding: 'Y1 Y2 Z Z2',
      theme: 'field',
      color: 'title',
      round: 'Y2 A A A'
    }
  }
}

// ── UserStoryDone ──
export const UserStoryDone = {
  flow: 'y',
  align: 'center flex-start',
  gap: 'D',
  "@mobileM": {
    padding: 'F B1 E B1'
  },
  Hgroup: {
    align: 'center flex-start',
    textAlign: 'center',
    gap: 'A1',
    H: {
      text: 'User Story?',
      color: 'title',
      fontWeight: '100',
      tag: 'h1',
      "@mobileXS": {
        display: 'flex',
        flexFlow: 'column',
        gap: 'Y'
      },
      Strong: {
        text: ' boom, done!'
      }
    },
    P: {
      text: 'You have all the power to close tickets in minutes now. With help of AI and marketplace, you can drag and drop, prompt features and customize as you want.',
      fontSize: 'A2',
      fontWeight: '300',
      maxWidth: 'G3+B'
    }
  },
  Button: {
    extends: [
      'DocsLink',
      'Button'
    ],
    href: '/signup',
    text: 'Try it out',
    fontWeight: '700',
    theme: 'field',
    border: 'solid, gray, 1px',
    padding: 'Z1 D+Y2'
  }
}

// ── WaitlistForm ──
export const WaitlistForm = {
  tag: 'form',
  state: {
    status: 'idle',
    error: ''
  },
  theme: 'field',
  round: 'C1',
  flow: 'x',
  padding: 'X',
  onSubmit: async (ev, el, s) => {
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
    width: 'G',
    theme: 'transparent',
    placeholder: 'Enter your email',
    type: 'email',
    required: true
  },
  Button: {
    theme: 'primary',
    text: 'Get notified',
    icon: 'arrow up right',
    gap: 'X2',
    padding: 'Z2 B Z2 B2',
    Icon: {
      order: 2,
      fontSize: 'B'
    }
  }
}

// ── WhatIsSymbols ──
export const WhatIsSymbols = {
  flow: 'y',
  align: 'center center',
  gap: 'B2',
  H2: {
    textAlign: 'center',
    margin: '- auto A',
    color: 'title',
    text: null,
    lineHeight: '1.3em',
    Strong: {
      text: 'Industry leading benefits'
    },
    Text: {
      fontWeight: '100',
      text: 'Game changing ways of building features'
    }
  },
  Grid: {
    gap: 'A',
    margin: '0 auto',
    align: 'center center',
    templateColumns: 'repeat(3, 1fr)',
    "@tabletM": {
      templateColumns: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      templateColumns: 'repeat(1, 1fr)'
    },
    childExtends: 'Flex',
    childProps: {
      position: 'relative',
      flow: 'y',
      flex: 1,
      ":hover": {
        "& h5, &:after": {
          opacity: 0,
          transform: 'translate3d(0, 35%, 0)'
        }
      },
      Video: {
        src: '{{ src }}',
        width: '100%',
        zIndex: '2',
        round: 'A',
        aspectRatio: '11 / 7',
        objectFit: 'cover',
        autoplay: false,
        controls: false,
        loop: true,
        onMouseenter: (ev, el) => {
                  el.node.play()
                },
        onMouseleave: (ev, el) => {
                  el.node.pause()
                }
      },
      ":after": {
        content: '""',
        position: 'absolute',
        bottom: '0',
        boxSize: '50% 100%',
        zIndex: '2',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        transition: 'Z defaultBezier',
        transitionProperty: 'opacity, transform',
        pointerEvents: 'none'
      },
      H5: {
        position: 'absolute',
        bottom: '0',
        width: '90%',
        color: 'title',
        fontWeight: 'bold',
        zIndex: '3',
        padding: 'A',
        text: '{{ text }}',
        transition: 'Z defaultBezier',
        transitionProperty: 'opacity, transform',
        pointerEvents: 'none'
      }
    },
    childrenAs: 'state',
    children: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        text: 'Build infinitely. With infinite possibilities'
      },
      {
        src: 'https://framerusercontent.com/assets/g40v2j6gQHNy81TmYS2jWmTP2yI.mp4',
        text: 'Build apps, websites, tools, dashboards—visually or in code.'
      },
      {
        src: 'https://framerusercontent.com/assets/y37VYVYGJsvMeQl181rP9AA17Hs.mp4',
        text: 'Reusable components rendered to React, email, PDF, TV all at once'
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        text: 'Test your UI kit. Gain reassurance. '
      },
      {
        src: 'https://framerusercontent.com/assets/UctQMqXDGpt2mDjYj9lTXvT0hbQ.mov',
        text: 'Document for consistency. Unify your design system.'
      },
      {
        src: 'https://framerusercontent.com/assets/mQtIYUDHDQaFBgosfuigjoL6Psk.mp4',
        text: 'Publish as a website. Or export to your existing tech stack.'
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

