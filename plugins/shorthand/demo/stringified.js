// ── Accordion ──
export const Accordion = {
  st: {
    activeAccordion: false
  },
  ButtonParagraph: {
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
        ".activeAccordion": {
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
    ".activeAccordion": {
      in: 'mnh:4em mxh:10em op:1'
    },
    "!activeAccordion": {
      in: 'mnh:0 mxh:0 op:0'
    },
    in: 'm:0 mxw:H mnw:H pos:absolute lft:0 tp:2em ov:hidden'
  },
  in: 'ext:Flex fl:y g:Y2 pos:relative'
}

// ── Avatar ──
export const Avatar = {
  in: 'ext:smbls.Avatar bsz:C2'
}

// ── AvatarBadgeHgroup ──
export const AvatarBadgeHgroup = {
  Avatar: {},
  Hgroup: {
    H: {
      Badge: {},
      in: 'd:flex ai:center g:Y'
    },
    P: {},
    in: 'g:V2'
  },
  in: 'ext:AvatarHgroup'
}

// ── AvatarChatPreview ──
export const AvatarChatPreview = {
  Avatar: {},
  Flex: {
    "> *": {
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

// ── AvatarHeading ──
export const AvatarHeading = {
  Avatar: {},
  H: {
    tx: 'Heading',
    in: 'tg:h6 lh:1em'
  },
  in: 'ext:Flex g:X2 aln:center_flex-start'
}

// ── AvatarHgroup ──
export const AvatarHgroup = {
  Avatar: {
    in: 'm:-X_-_-_-'
  },
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {},
    in: 'g:W2'
  },
  in: 'g:Y2 aln:center_flex-start'
}

// ── AvatarHgroupIconButton ──
export const AvatarHgroupIconButton = {
  Avatar: {},
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {}
  },
  IconButton: {
    Icon: {
      in: 'nm:copy'
    },
    in: 'm:-_-_-_auto'
  },
  in: 'ext:AvatarHgroup mnw:G+Z2'
}

// ── AvatarHgroupSelect ──
export const AvatarHgroupSelect = {
  Avatar: {},
  Hgroup: {
    H: {},
    P: {}
  },
  SelectPicker: {
    Select: {
      "0": {
        in: 'val:Goat'
      },
      "1": {
        in: 'val:Icon'
      }
    },
    in: 'm:-_-_-_auto'
  },
  in: 'ext:AvatarHgroup mnw:G1'
}

// ── AvatarParagraph ──
export const AvatarParagraph = {
  Avatar: {
    in: 'bsz:B1'
  },
  P: {
    tx: 'Can you join us today?',
    in: 'm:0'
  },
  in: 'ext:Flex aln:center_flex-start g:Y1'
}

// ── AvatarSelectPicker ──
export const AvatarSelectPicker = {
  Avatar: {},
  Select: {
    lh: 1,
    ":focus-visible": {
      in: 'ol:none'
    },
    ch: [
      {
        tx: 'Nikoloza',
        in: 'val:Nikoloza'
      },
      {
        tx: 'Svinchy',
        in: 'val:Svinchy'
      }
    ],
    cp: {
      in: 'tg:option'
    },
    in: 'ext:Flex fs:A bsz:100% p:-_B+V2_-_Z cur:pointer ol:none appearance:none fx:1 zi:2 bd:none bg:none pe:All c:title'
  },
  Icon: {
    in: 'nm:chevronDown pos:absolute rgt:0 m:V_-_-_- fs:B'
  },
  in: 'tg:label ext:Flex rnd:0 aln:center_flex-start pos:relative'
}

// ── AvatarSet ──
export const AvatarSet = {
  cp: {
    bd: 'solid, codGray',
    ":first-child": {
      in: 'm:0_-Z1_0_0'
    },
    ":nth-child(2)": {
      in: 'm:0_-Z1_0_0'
    },
    in: 'bdw:X+W'
  },
  ch: [
    {},
    {},
    {}
  ],
  in: 'ext:Flex cex:Avatar'
}

// ── AvatarSetChatPreview ──
export const AvatarSetChatPreview = {
  AvatarSet: {
    cp: {
      tf: 'translate(-50%, -50%)',
      ":first-child": {
        in: 'm:Z2_0_0_0'
      },
      ":nth-child(2)": {
        in: 'm:0_0_0_Z1'
      },
      ":nth-child(3)": {
        in: 'm:-W_0_0_-Z1'
      },
      in: 'bsz:C_C bdw:W d:block pos:absolute tp:50% lft:50%'
    },
    in: 'pos:relative bsz:fit-content_C2 bd:1px_solid_red m:-Y2_-_-_-'
  },
  Flex: {
    "> *": {
      in: 'mnw:100%'
    },
    ValueHeading: {
      H: {
        tx: 'Design'
      },
      UnitValue: {
        Unit: {
          tx: 'am'
        },
        Value: {
          tx: '2:20'
        },
        in: 'fl:row-reverse'
      },
      in: 'mnw:0 mxw:100%'
    },
    Flex: {
      Caption: {
        tx: 'nick:',
        in: 'c:paragraph'
      },
      NotCounterParagraph: {
        P: {
          in: 'mxw:F2 ws:nowrap ov:hidden'
        },
        NotificationCounter: {},
        in: 'fx:1 jc:space-between'
      },
      in: 'g:X2'
    },
    in: 'fl:y fx:1 g:W2'
  },
  in: 'ext:Flex g:Z1 mnw:G3 aln:center_flex-start'
}

// ── AvatarStatus ──
export const AvatarStatus = {
  Avatar: {},
  StatusDot: {
    in: 'pos:absolute bot:W2 rgt:0'
  },
  in: 'ext:Flex pos:relative'
}

// ── AvatarStatusChatPreview ──
export const AvatarStatusChatPreview = {
  AvatarStatus: {
    Avatar: {},
    StatusDot: {}
  },
  Flex: {
    "> *": {
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
      P: {},
      NotificationCounter: {}
    },
    in: 'fl:y fx:1 g:W2'
  },
  in: 'ext:Flex g:Z1 mnw:G3 aln:center_flex-start'
}

// ── Badge ──
export const Badge = {
  tx: '-2.902',
  in: 'tg:label ext:Flex aln:cemter_center thm:warning rnd:C lh:1em bxs:content-box p:X1_Z1 bgc: bdr:'
}

// ── BadgeCaption ──
export const BadgeCaption = {
  Caption: {
    tx: 'CAPTION'
  },
  Badge: {},
  in: 'ext:Flex aln:center_flex-start g:Y'
}

// ── BadgeParagraph ──
export const BadgeParagraph = {
  P: {
    tx: 'Hey team, I\'ve finished the re...',
    in: 'm:0 c:paragraph'
  },
  Badge: {},
  in: 'ext:Flex aln:center_space-between g:A'
}

// ── Breadcrumb ──
export const Breadcrumb = {
  cp: {
    "&[href]": {
      "&:hover": {
        in: 'td:underline'
      },
      in: 'c:title'
    },
    "&:not([href])": {
      in: 'cur:default'
    },
    "&:not(:first-child):before": {
      cnt: '""',
      in: 'd:inline-block w:2px h:2px bdr:100% bg:white va:0.2em marginInline:.65em op:.5'
    },
    in: 'fw:400 td:none !scrollToTop c:white_0.35'
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
    },
  in: 'tg:nav cex:Link d:flex aln:center'
}

// ── BulletCaption ──
export const BulletCaption = {
  tx: 'Orders history',
  ":before": {
    cnt: '""',
    in: 'bsz:Z1 bg:blue rnd:A2'
  },
  in: 'tg:caption ext:Flex aln:center_flex-start g:Y1'
}

// ── ButtonHeading ──
export const ButtonHeading = {
  H: {
    tx: 'Heading',
    in: 'tg:h6'
  },
  Button: {
    tx: 'Button',
    in: 'thm:dialog'
  },
  in: 'aln:center_flex-start g:Z'
}

// ── ButtonHgroup ──
export const ButtonHgroup = {
  Hgroup: {
    H: {
      tx: 'Heading',
      in: 'tg:h6'
    },
    P: {},
    in: 'g:X2'
  },
  Button: {
    tx: 'Button',
    in: 'thm:dialog'
  },
  in: 'ext:Flex aln:flex-start_flex-start g:Z'
}

// ── ButtonParagraph ──
export const ButtonParagraph = {
  P: {
    tx: 'Didn\'t get the code?',
    in: 'c:caption m:0'
  },
  Button: {
    tx: 'Click to Resend',
    in: 'p:0 thm:transparent'
  },
  in: 'ext:Flex ai:center g:X2'
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

// ── Caption ──
export const Caption = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.Caption'
}

// ── CardNumberField ──
export const CardNumberField = {
  st: {
    value: 'XXXXXXXXXXXXXXXX'
  },
  cp: {
    Input: {
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
        in: 'ol:none'
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
          },
      in: 'ta:center p:X2_X rnd:0 ol:none'
    },
    ":first-child input": {
      in: 'p:X2_X_X2_A1 rnd:A_0_0_A'
    },
    ":last-child input": {
      in: 'p:X2_A1_X2_X rnd:0_A_A_0'
    }
  },
  ch: [
    {},
    {},
    {},
    {}
  ],
  in: 'ext:Flex cex:FixedNumberField g:0'
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
        in: 'nm:check'
      }
    }
  },
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── CheckCaptionList ──
export const CheckCaptionList = {
  cp: {
    Caption: {},
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          in: 'nm:check'
        }
      }
    }
  },
  ch: [
    {},
    {}
  ],
  in: 'ext:Flex cex:CheckCaption fl:y g:B'
}

// ── CheckHgroup ──
export const CheckHgroup = {
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {},
    in: 'g:W2'
  },
  Checkbox: {
    Input: {},
    Flex: {
      Icon: {
        in: 'nm:check'
      }
    }
  },
  in: 'ext:Flex g:Z'
}

// ── CheckHgroupList ──
export const CheckHgroupList = {
  cp: {
    Hgroup: {
      H: {
        in: 'tg:h6'
      },
      P: {},
      in: 'g:W2'
    },
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          in: 'nm:check'
        }
      }
    }
  },
  ch: [
    {},
    {}
  ],
  in: 'ext:Flex cex:CheckHgroup fl:y g:B'
}

// ── CheckStep ──
export const CheckStep = {
  Icon: {
    in: 'nm:check thm:dialog d:block bxs:content-box p:Y2 rnd:100%'
  },
  H6: {
    tx: 'Step'
  },
  Progress: {
    val: 0,
    ".isActive": {
      val: 1
    },
    in: 'mnw:E mxw:E h:V'
  },
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── CheckStepSet ──
export const CheckStepSet = {
  cp: {
    Icon: {
      ".isActive": {
        in: 'thm:primary'
      }
    },
    Progress: {},
    ":last-child > progress": {
      in: 'hd'
    }
  },
  ch: [
    {
      Icon: {
        in: 'isActive'
      }
    },
    {}
  ],
  in: 'ext:Flex cex:CheckStep g:Z1'
}

// ── CircleProgress ──
export const CircleProgress = {
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
  val: 0.73,
  "&::-webkit-progress-bar": {
    in: 'bg:gray'
  },
  "&::-webkit-progress-value": {
    in: 'thm:primary'
  },
  ":after": {
    cnt: '""',
    tf: 'translate(-50%, -50%)',
    in: 'pos:absolute w:B+B2 h:B+B2 rnd:100% tp:50% lft:50% bg:codGray'
  },
  in: 'tg:progress bsz:D_D rnd:100% ov:hidden pos:relative'
}

// ── ConfirmationButtons ──
export const ConfirmationButtons = {
  cp: {
    in: 'thm:dialog p:Z1_B1'
  },
  ch: [
    {
      tx: 'No'
    },
    {
      tx: 'YES'
    }
  ],
  in: 'ext:Flex cex:Button g:Y1'
}

// ── CounterButton ──
export const CounterButton = {
  Span: {
    tx: 'Button'
  },
  NotificationCounter: {
    tx: '7'
  },
  in: 'ext:Button pos:relative aln:center_space-between p:Z_Z_Z_A1 mnw:F thm:field'
}

// ── CounterIconButton ──
export const CounterIconButton = {
  Icon: {
    in: 'nm:smile'
  },
  NotificationCounter: {
    in: 'pos:absolute rgt:-Y tp:-W2'
  },
  in: 'ext:IconButton pos:relative'
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

// ── FieldCaption ──
export const FieldCaption = {
  Caption: {
    tx: 'Caption',
    in: 'tg:caption lh:1em fs:A fw:400 p:-_Y2_Z_X as:flex-start ws:nowrap ta:left'
  },
  Field: {
    Input: {},
    Icon: {},
    in: 'w:100%'
  },
  in: 'ext:Flex fl:column bsz:fit-content_fit-content'
}

// ── FixedNumberField ──
export const FixedNumberField = {
  Input: {
    phd: '0000',
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
        },
    in: 'bsz:B_D p:X2_Z_X2_A2 bxs:content-box ls:.35em maxlength:4 tt:uppercase'
  },
  in: 'ext:InputField'
}

// ── Footnote ──
export const Footnote = {
  tx: 'Footnote',
  in: 'ext:smbls.Footnote'
}

// ── Group ──
export const Group = {
  Title: {
    tx: 'Field Title',
    in: 'c:caption us:none ws:nowrap'
  },
  cp: {
    in: 'w:100%'
  },
  in: 'ext:Flex fl:y aln:flex-start g:Y1 mnw:F'
}

// ── GroupField ──
export const GroupField = {
  in: 'tg:label ext:Group'
}

// ── H1 ──
export const H1 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H1'
}

// ── H2 ──
export const H2 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H2'
}

// ── H3 ──
export const H3 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H3'
}

// ── H4 ──
export const H4 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H4'
}

// ── H5 ──
export const H5 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H5'
}

// ── H6 ──
export const H6 = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.H6'
}

// ── Headline ──
export const Headline = {
  tx: 'Headline',
  in: 'ext:smbls.Headline'
}

// ── HgroupSteps ──
export const HgroupSteps = {
  Hgroup: {
    H: {
      tx: 'Symbols',
      in: 'tg:h4'
    },
    P: {
      tx: 'The easiest way to build your own website'
    },
    in: 'g:Y1'
  },
  ProgressStepSet: {
    cp: {
      in: 'fx:1'
    }
  },
  in: 'ext:Flex fl:column g:A1 mnw:G1 mxw:H'
}

// ── Hr ──
export const Hr = {
  in: 'ext:smbls.Hr mnw:F'
}

// ── HrLegend ──
export const HrLegend = {
  tx: 'Or',
  ":before": {
    cnt: '""',
    in: 'h:V thm:dialog rnd:C fx:1'
  },
  ":after": {
    cnt: '""',
    in: 'h:V thm:dialog rnd:C fx:1'
  },
  in: 'ext:Flex mnw:G fw:500 ai:center g:A'
}

// ── IconButton ──
export const IconButton = {
  Icon: {
    in: 'nm:smile fs:A2'
  },
  in: 'ext:Button p:A ar:1_/_1 bsz:fit-content_fit-content rnd:100% bxs:content-box aln:center_center thm:dialog'
}

// ── IconButtonHeading ──
export const IconButtonHeading = {
  H: {
    tx: 'Heading',
    in: 'tg:h5'
  },
  IconButton: {},
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── IconButtonHgroup ──
export const IconButtonHgroup = {
  Hgroup: {
    H: {
      tx: 'Heading',
      in: 'tg:h6'
    },
    P: {},
    in: 'g:X2'
  },
  IconButton: {
    in: 'thm:dialog'
  },
  in: 'ext:Flex aln:flex-start_flex-start g:Z'
}

// ── IconButtonSet ──
export const IconButtonSet = {
  cp: {
    Icon: {}
  },
  ch: [
    {
      Icon: {
        in: 'nm:sun'
      }
    },
    {
      Icon: {
        in: 'nm:moon'
      }
    }
  ],
  in: 'ext:Flex cex:IconButton g:Z'
}

// ── IconCounterButton ──
export const IconCounterButton = {
  Icon: {
    in: 'd:block nm:info'
  },
  Span: {
    tx: 'Button'
  },
  NotificationCounter: {
    tx: '7',
    in: 'm:-_-_-_auto'
  },
  in: 'ext:Button pos:relative aln:center_flex-start p:Z_Z_Z_Z1 mnw:F thm:field g:Z'
}

// ── IconHeading ──
export const IconHeading = {
  Icon: {
    in: 'nm:logo fs:C'
  },
  H: {
    tx: 'Heading',
    in: 'tg:h5 lh:1em fw:700'
  },
  in: 'ext:Flex g:Z aln:center_flex-start'
}

// ── IconHgroup ──
export const IconHgroup = {
  Icon: {
    in: 'nm:logo d:block c:blue m:-_X_-_- fs:E'
  },
  Hgroup: {
    H: {
      in: 'tg:h2'
    },
    P: {},
    in: 'g:Y'
  },
  in: 'ext:Flex g:X aln:flex-start'
}

// ── IconInput ──
export const IconInput = {
  Input: {
    phd: 'Placeholder',
    in: 'fx:1 rnd:C p:Z2_C_Z2_A2 mxh:100%'
  },
  Icon: {
    in: 'nm:info pos:absolute zi:2 rgt:Z2'
  },
  in: 'tg:label ext:Flex mnw:G aln:center_flex-start rnd:D pos:relative'
}

// ── IconTextSet ──
export const IconTextSet = {
  cp: {
    Icon: {},
    in: 'aln:center_flex-start g:Y1'
  },
  ch: [
    {
      Icon: {
        in: 'nm:smile'
      },
      tx: '+1 (555) 123-4567'
    },
    {
      Icon: {
        in: 'nm:logo'
      },
      tx: 'example@mail.com'
    }
  ],
  in: 'cex:IconText,Flex g:A fxf:y'
}

// ── IcontextLink ──
export const IcontextLink = {
  tx: 'Follow Symbols',
  Icon: {
    in: 'fs:B nm:logo'
  },
  in: 'ext:Link,IconText g:Y mxh:3em cur:pointer rnd:D fw:500'
}

// ── ImgButton ──
export const ImgButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    in: 'bsz:C1_D2'
  },
  in: 'ext:Button thm:transparent p:0 rnd:Z2 ov:hidden'
}

// ── ImgHeading ──
export const ImgHeading = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    in: 'widthL:auto mxw:C mxh:C rnd:Z2'
  },
  H: {
    tx: 'Heading',
    in: 'tg:h4'
  },
  in: 'ext:Flex aln:center_flex-start g:Y1'
}

// ── ImgHeadingButton ──
export const ImgHeadingButton = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    in: 'bsz:C1_D2 rnd:Z2'
  },
  H: {
    tx: 'Heading',
    in: 'tg:h6'
  },
  in: 'ext:Button thm:transparent fl:y g:Z p:0 rnd:0'
}

// ── ImgHgroup ──
export const ImgHgroup = {
  Img: {
    src: 'https://api.symbols.app/core/files/public/69325cf7ebee5529e0391f0b/download',
    in: 'bsz:C+Y1_C2 rnd:Z m:-Y_-_-_-'
  },
  Hgroup: {
    H: {
      in: 'tg:h5'
    },
    P: {},
    in: 'g:W2'
  },
  in: 'ext:Flex aln:center_flex-start g:Y1'
}

// ── InputButton ──
export const InputButton = {
  Input: {
    phd: 'Enter your email',
    in: 'mnw:G+B1'
  },
  Button: {
    tx: 'Sign up',
    in: 'thm:primary'
  },
  "> *": {
    in: 'h:100% mnh:100% mxh:100%'
  },
  in: 'ext:Flex g:Y2 aln:center_flex-start h:C+X'
}

// ── Italic ──
export const Italic = {
  tx: 'Italic text',
  in: 'ext:smbls.Italic'
}

// ── LayerSimple ──
export const LayerSimple = {
  Title: {
    tx: 'Checklist'
  },
  Flex: {
    cp: {
      in: 'g:X flexAlign:center'
    },
    cex: {
      Icon: {
        in: 'c:inactive g:Y1'
      },
      Span: {
        in: 'c:white p:-_-_-_X2'
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
        ],
    in: 'fl:column g:A'
  },
  in: 'ext:Group p:Z_A_A_A m:C_- rnd:Z g:A w:F1 bg:gray'
}

// ── Link ──
export const Link = {
  tx: 'Link',
  in: 'ext:smbls.Link'
}

// ── LinkHgroup ──
export const LinkHgroup = {
  Hgroup: {
    H: {
      tx: 'Tbilisi',
      in: 'tg:h2'
    },
    P: {
      tx: '35 Vazha-pshavela avenue.'
    },
    in: 'g:X2'
  },
  Link: {
    tx: 'Get direction'
  },
  in: 'ext:Flex fl:y g:Z'
}

// ── LinkParagraph ──
export const LinkParagraph = {
  P: {
    tx: 'You are agree',
    in: 'c:caption m:0'
  },
  Link: {
    tx: 'Privacy policy',
    in: 'p:0 thm:transparent td:underline fw:400'
  },
  in: 'ext:Flex ai:center g:X2'
}

// ── LinkSet ──
export const LinkSet = {
  cp: {
    in: 'cur:pointer'
  },
  ch: [
    {
      tx: 'Link 1'
    },
    {
      tx: 'Link 2'
    }
  ],
  in: 'tg:nav ext:Flex cex:Link aln:center_flex-start g:A'
}

// ── ListingItem ──
export const ListingItem = {
  IconText: {
    Icon: {
      ".isActive": {
        in: 'c:orange'
      },
      in: 'nm:check c:dim'
    },
    "!isActive": {
      ":hover svg": {
        in: 'c:disabled'
      }
    },
    "@ck": (ev, el, s) => {
          const isActive = s.isActive
          s.update({
            isActive: !isActive,
            upvotes: isActive ? s.upvotes - 1 : s.upvotes + 1
          })
        },
    in: 'c:paragraph fl:column g:Z p:0 tg:button bg:transparent bd:0 fs:A cur:pointer m:W_-_-'
  },
  Hgroup: {
    H: {
      tx: 'Flexbox in Editor',
      in: 'ext:Link tg:h6 fw:700'
    },
    P: {
      tx: null,
      cp: {
        in: 'd:inline'
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
  in: 'ext:Flex g:A2 ai:flex-start'
}

// ── LoadingGif ──
export const LoadingGif = {
  src: 'https://assets.symbo.ls/loading.gif',
  ".inCenter": {
    tf: 'translate3d(-50%, -50%, 0)',
    in: 'pos:absolute tp:50% lft:50%'
  },
  in: 'ext:Img w:3.2em pe:none op:.35 zi:-1 inCenter'
}

// ── MessageModal ──
export const MessageModal = {
  Hgroup: {
    H: {
      tx: 'Message'
    },
    P: {
      tx: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.'
    },
    in: 'g:A'
  },
  IconButton: {
    Icon: {
      in: 'nm:x'
    }
  },
  in: 'ext:Modal mxw:H'
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

// ── NavigationArrows ──
export const NavigationArrows = {
  cp: {
    in: 'rnd:100%'
  },
  ch: [
    {
      Icon: {
        in: 'nm:chevronLeft'
      }
    },
    {
      Icon: {
        in: 'nm:chevronRight'
      }
    }
  ],
  in: 'ext:Flex cex:IconButton g:Z'
}

// ── NavigationDots ──
export const NavigationDots = {
  cp: {
    tx: '',
    ".isActive": {
      in: 'thm:primary'
    },
    ":active": {
      in: 'thm:primary'
    },
    in: 'bsz:Z thm:dialog rnd:100% cur:pointer'
  },
  ch: [
    {},
    {
      in: 'isActive'
    }
  ],
  in: 'tg:nav ext:Flex cex:Link g:C1'
}

// ── NotCounterParagraph ──
export const NotCounterParagraph = {
  P: {
    tx: 'Hey team, I\'ve finished the re...',
    in: 'm:0 c:paragraph mxw:E3+D1 ov:hidden'
  },
  NotificationCounter: {},
  in: 'ext:Flex aln:center_space-between g:B'
}

// ── NotificationCounter ──
export const NotificationCounter = {
  tx: '3',
  in: 'ext:Flex wr:A thm:primary rnd:100% ar:1_/_1 p:W2 lh:1em bxs:content-box aln:center_center'
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
    "@ck": (event, element, state) => {
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
    "@ck": (event, element, state) => {
          state.update({
            currentValue: state.currentValue + 1
          })
        },
    in: 'ext:IconButton'
  },
  "> button": {
    in: 'thm:transparent'
  },
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── P ──
export const P = {
  tx: 'It was the last day for our tribe, the year ends',
  in: 'ext:smbls.P'
}

// ── PackageFeatureItem ──
export const PackageFeatureItem = {
  Input: {
    ":checked + hgroup": {
      in: 'ol:1.5px_solid_#0079FD'
    },
    in: 'd:none typ:checkbox'
  },
  Hgroup: {
    ol: '1.5px, solid, --color-line-dark',
    Icon: {
      in: 'od:-1 m:-_-_A2 nm:logo'
    },
    in: 'w:100% p:A1 rnd:A1'
  },
  in: 'tg:label ext:Flex cur:pointer'
}

// ── Pagination ──
export const Pagination = {
  Left: {
    Icon: {
      in: 'nm:chevronLeft'
    },
    "@ck": (event, element, state) => {
          state.update({})
        },
    in: 'ext:IconButton'
  },
  Flex: {
    cp: {
      isActive: (element, state) => state.active === parseInt(element.key),
      ".isActive": {
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
    "@ck": (event, element, state) => {
          state.update({})
        },
    in: 'ext:IconButton'
  },
  in: 'ext:Flex g:A aln:center_fllex-start'
}

// ── Progress ──
export const Progress = {
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
  "::-webkit-progress-bar": {
    "@dark": {
      in: 'bg:gray'
    },
    "@light": {
      in: 'bg:hurricane'
    }
  },
  "::-webkit-progress-value": {
    in: 'bdr:Y thm:primary'
  },
  in: 'tg:progress ext:Flex h:X mnw:F3 rnd:Y ov:hidden'
}

// ── ProgressStepSet ──
export const ProgressStepSet = {
  cp: {
    in: 'mnw:C'
  },
  ch: [
    {
      val: 0.7
    },
    {}
  ],
  in: 'ext:Flex cex:Progress g:A'
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
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── RadioCaptionList ──
export const RadioCaptionList = {
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
  ],
  in: 'ext:Flex cex:RadioCaption fl:y g:B'
}

// ── RadioHgroup ──
export const RadioHgroup = {
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {},
    in: 'g:W2'
  },
  Radio: {
    Input: {},
    FLex: {
      ":after": {}
    }
  },
  in: 'ext:Flex g:Z'
}

// ── RadioHgroupList ──
export const RadioHgroupList = {
  cp: {
    Hgroup: {
      H: {
        in: 'tg:h6'
      },
      P: {},
      in: 'g:W2'
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
  ],
  in: 'ext:Flex cex:RadioHgroup fl:y g:B'
}

// ── RadioMark ──
export const RadioMark = {
  ":after": {
    cnt: '""',
    in: 'bsz:Z1 bg:white rnd:100% d:block'
  },
  in: 'p:Z1 thm:primary rnd:100% bsz:fit-content'
}

// ── RadioStep ──
export const RadioStep = {
  RadioMark: {
    ".isActive": {
      in: 'thm:primary'
    },
    ":after": {},
    in: 'thm:field'
  },
  H6: {
    tx: 'Step'
  },
  Progress: {
    val: 0,
    ".isActive": {
      val: 1
    },
    in: 'mnw:E mxw:E h:V m:-_-_-_W'
  },
  in: 'ext:Flex aln:center_flex-start g:Y2'
}

// ── RadioSteps ──
export const RadioSteps = {
  cp: {
    RadioMark: {},
    Progress: {},
    ":last-child > progress": {
      in: 'hd'
    }
  },
  ch: [
    {
      RadioMark: {
        in: 'isActive'
      }
    },
    {}
  ],
  in: 'ext:Flex cex:RadioStep g:Z1'
}

// ── ScrollableList ──
export const ScrollableList = {
  Flex: {
    sy: {
      listStyleType: 'none',
      "::-webkit-scrollbar": {
        display: 'none'
      }
    },
    cp: {
      ":hover": {
        in: 'thm:dialog-elevated'
      },
      in: 'p:Y1_A cur:pointer aln:flrx-start ta:left fw:700 rnd:0 thm:dialog fs:C'
    },
    ch: [
      {
        tx: 'Item One'
      },
      {
        tx: 'Item Two'
      }
    ],
    in: 'mxh:D2 ovy:auto fl:y p:Z_- cex:Button'
  },
  ":before, &:after": {
    cnt: '""',
    in: 'pos:absolute bsz:B_100% zi:2 lft:0 pe:none'
  },
  ":before": {
    "@light": {
      bg: 'linear-gradient(to bottom,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      bg: 'linear-gradient(to bottom, #171717 0%, transparent 100%)'
    },
    in: 'tp:0'
  },
  ":after": {
    "@light": {
      bg: 'linear-gradient(to top,  #ebecf2 0%, transparent 100%)'
    },
    "@dark": {
      bg: 'linear-gradient(to top, #171717 0%, transparent 100%)'
    },
    in: 'bot:-3px'
  },
  in: 'tg:nav pos:relative ov:hidden thm:field rnd:A2 mnw:F1'
}

// ── Scrollbar ──
export const Scrollbar = {
  TrackContainer: {
    op: 1,
    Track: {
      in: 'pos:absolute thm:field rnd:A h:2px bg:#d9d7d7_.5 lft:0 tfo:left w:15%'
    },
    in: 'trn:A_defaultBezier_opacity fx:1 m:-_C1_-_- pos:relative bg:red h:fit-content as:center'
  },
  NavigationArrows: {
    cp: {
      Icon: {
        in: 'fs:B1'
      },
      in: 'p:Z_Z'
    }
  },
  in: 'ext:Flex mnw:I'
}

// ── Search ──
export const Search = {
  Input: {
    phd: 'Type a command or search',
    ":focus ~ button": {
      in: 'op:1'
    },
    in: 'typ:search w:100% p:Z2_C+W2_Z2_A2 thm:transparent'
  },
  Icon: {
    in: 'nm:search pos:absolute rgt:Z+W2 fs:B'
  },
  in: 'tg:search ext:Flex mnw:G+A2 g:Z thm:field rnd:D2 aln:center_flex-start pos:relative'
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
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      in: 'c:blue'
    },
    "@ck": (e, el, s) => s.toggle('isOpen'),
    in: 'p:Z_A2 mnh:B2 pos:relative cur:pointer c:caption'
  },
  Options: {
    shw: (el, s) => s.isOpen,
    Input: {
      phd: 'Search and Select',
      "@ip": (e, el, state) => {
                const value = e.target.value.trim().toLowerCase()
                const filtered = state.data.filter(item =>
                  item.toLowerCase().includes(value))
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
        "@ck": (ev, el, s) => {
                    s.parent.update({
                      selected: s.value,
                      isOpen: false,
                      searchValue: '',
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
    isSelected: (el, s) => s.selected !== 'Search and Select',
    ".isSelected": {
      in: 'c:title'
    },
    "@ck": (e, el, s) => s.toggle('isOpen'),
    in: 'p:Z_A2 bg:#f5f5f5 c:black bdb:1px_solid_#ccc mnh:B2 pos:relative cur:pointer'
  },
  Options: {
    shw: (el, s) => s.isOpen,
    Input: {
      phd: 'Search and Select',
      "@ip": (e, el, state) => {
                const value = e.target.value.trim().toLowerCase()
                const filtered = state.data.filter(item =>
                  item.toLowerCase().includes(value))
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
        "@ck": (ev, el, s) => {
                    s.parent.update({
                      selected: s.value,
                      isOpen: false,
                      searchValue: '',
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
  in: 'c:black pos:relative w:G3 thm:field rnd:A2'
}

// ── SectionHeader ──
export const SectionHeader = {
  Hgroup: {},
  IconButtonSet: {},
  in: 'tg:header ext:Flex g:C1'
}

// ── Select ──
export const Select = {
  in: 'ext:smbls.Select'
}

// ── SelectField ──
export const SelectField = {
  Select: {
    ch: [
      {
        tx: 'Select one...',
        in: 'val:'
      },
      {
        tx: 'Mazda',
        in: 'val:mazda'
      },
      {
        tx: 'BMW',
        in: 'val:bmw'
      }
    ]
  },
  Icon: {
    in: 'm:-_Z2_-_-'
  },
  in: 'ext:SelectPicker thm:field mnw:G p:A_A1 rnd:D'
}

// ── SelectHgroup ──
export const SelectHgroup = {
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {},
    in: 'g:V2'
  },
  SelectPicker: {
    Select: {
      ch: () => [{
                value: 'Goat',
              },
              {
                value: 'Icon',
              },
            ]
    },
    in: 'm:-_-_-_auto'
  },
  in: 'ext:Flex g:C'
}

// ── SelectPicker ──
export const SelectPicker = {
  Select: {
    lh: 1,
    ":focus-visible": {
      in: 'ol:none'
    },
    ch: [
      {
        tx: 'Nikoloza',
        in: 'val:Nikoloza'
      },
      {
        tx: 'Svinchy',
        in: 'val:Svinchy'
      }
    ],
    cp: {
      in: 'tg:option'
    },
    in: 'ext:Flex fs:A bsz:100% p:-_B+V2_-_- cur:pointer ol:none appearance:none fx:1 zi:2 bd:none bg:none pe:All c:title'
  },
  Icon: {
    in: 'nm:chevronDown pos:absolute rgt:0 m:V_-_-_- fs:B'
  },
  in: 'tg:label ext:Flex rnd:0 aln:center_flex-start pos:relative'
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

// ── StatusDot ──
export const StatusDot = {
  "@light": {
    bd: 'solid, gray 1 +170',
    in: 'bdw:X'
  },
  "@dark": {
    bd: 'solid, black',
    in: 'bdw:X'
  },
  in: 'wr:A ar:1/1 rnd:100% thm:success'
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

// ── Strong ──
export const Strong = {
  tx: 'Strong text',
  in: 'ext:smbls.Strong'
}

// ── Subhead ──
export const Subhead = {
  tx: 'Subhead',
  in: 'ext:smbls.Subhead'
}

// ── SubmitButton ──
export const SubmitButton = {
  in: 'ext:Input typ:submit val:Submit p:Z2_B'
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
    },
    {
      tx: 'publish'
    }
  ],
  cp: {
    Icon: null,
    ".isActive": {
      in: 'thm:document'
    },
    "@ck": null,
    in: 'rnd:D thm:transparent p:Z_B1 tt:capitalize'
  },
  in: 'fl:x cex:Button p:V2+V2 rnd:D bg:gray_.1 w:fit-content cha:props'
}

// ── TextareaIconButton ──
export const TextareaIconButton = {
  Textarea: {
    in: 'mnh:C+Y mxh:C+Y mnw:G1 rnd:D p:A_A_A_A2'
  },
  IconButton: {
    Icon: {
      in: 'nm:send'
    },
    in: 'thm:primary'
  },
  in: 'ext:Flex g:Y1'
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
  in: 'ext:Flex aln:center_flex-start g:Z'
}

// ── ToggleCaptionList ──
export const ToggleCaptionList = {
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
  ],
  in: 'ext:Flex cex:ToggleCaption fl:y g:B'
}

// ── ToggleHgroup ──
export const ToggleHgroup = {
  Hgroup: {
    H: {
      in: 'tg:h6'
    },
    P: {},
    in: 'g:W2'
  },
  Toggle: {
    Input: {},
    Flex: {
      after: {}
    },
    in: 'm:-_-_-_auto'
  },
  in: 'ext:Flex g:Z'
}

// ── ToggleHgroupList ──
export const ToggleHgroupList = {
  cp: {
    Hgroup: {
      H: {
        in: 'tg:h6'
      },
      P: {},
      in: 'g:W2'
    },
    Toggle: {
      Input: {},
      Flex: {
        after: {}
      },
      in: 'm:-_-_-_auto'
    }
  },
  ch: [
    {},
    {}
  ],
  in: 'ext:Flex cex:ToggleHgroup fl:y g:B'
}

// ── U ──
export const U = {
  tx: 'Underlined text',
  in: 'ext:smbls.Underline'
}

// ── UnitValue ──
export const UnitValue = {
  Unit: {
    tx: '$'
  },
  Value: {
    tx: '73'
  },
  cp: {
    in: 'lh:1em c:title'
  },
  in: 'ext:Flex aln:center_flex-start g:V'
}

// ── UploadButton ──
export const UploadButton = {
  tx: 'Choose file',
  Input: {
    in: 'typ:file p:0 ist:0_0_0_0 pos:absolute bsz:100%_100% cur:pointer tp:0 lft:0 op:0'
  },
  in: 'ext:Button pos:relative p:0 cur:pointer thm:transparent c:blue'
}

// ── UploadIconButton ──
export const UploadIconButton = {
  Icon: {
    in: 'nm:upload'
  },
  Input: {
    in: 'typ:file p:0 ist:0_0_0_0 pos:absolute bsz:100%_100% cur:pointer tp:0 lft:0 op:0'
  },
  in: 'ext:IconButton pos:relative p:0 cur:pointer'
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

// ── ValueCircleProgress ──
export const ValueCircleProgress = {
  CircleProgress: {
    ":after": {}
  },
  UnitValue: {
    tf: 'translate(-50%, -50%)',
    Value: {
      tx: '73'
    },
    Unit: {
      tx: '%'
    },
    in: 'pos:absolute tp:50% lft:50% fl:row-reverse zi:5 g:V'
  },
  in: 'bd:2'
}

// ── ValueHeading ──
export const ValueHeading = {
  H: {
    tx: 'Kobe Bryant',
    in: 'tg:h6'
  },
  UnitValue: {
    Unit: {},
    Value: {},
    in: 'm:-_-_-_auto'
  },
  in: 'ext:Flex mnw:F3 aln:center_space-between'
}

// ── ValueProgress ──
export const ValueProgress = {
  Progress: {
    val: 0.73,
    in: 'mxw:100% fx:1'
  },
  UnitValue: {
    Value: {
      tx: '73'
    },
    Unit: {
      tx: '%'
    },
    in: 'fl:row-reverse c:paragraph'
  },
  in: 'ext:Flex aln:center_flex-start g:Y2'
}

// ── AsciiMouse ──
export const AsciiMouse = {
  scp: {},
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
    },
  in: 'tg:canvas pos:absolute tp:0 lft:0 w:100% h:100% pe:none zi:-1 d:block'
}

// ── AsciiMouseCopy ──
export const AsciiMouseCopy = {
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
  scp: {},
  in: 'pos:absolute tp:0 lft:0 w:100% pe:none zi:-1 d:block tg:canvas'
}

// ── AsteriskParagraph ──
export const AsteriskParagraph = {
  props: {
    tx: '',
    Span: {
      tx: '*',
      in: 'fs:B d:block m:-V_-_-_- c:blue'
    },
    Span_2: {
      tx: 'Frozen price on renewal until cancelled - 
      will be priced $588/year per seat after beta',
      in: 'c:title p:-_-_-_Y2 mxw:G+B1'
    },
    in: 'd:Flex fs:Z aln:flex-start_flex-start m:0'
  },
  in: 'extend:P'
}

// ── Banner ──
export const Banner = {
  "@heightM": {},
  "@heightL": {
    in: 'p:D2_-_-_-'
  },
  ":after": {
    cnt: '""',
    in: 'bsz:60%_100% pos:absolute bot:0 lft:0 zi:2'
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    },
    in: 'bg:gray15'
  },
  "> *:not(:first-child)": {
    in: 'zi:2'
  },
  Scene: {
    "@light": {
      ":after": {
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
    "@heightM": {
      in: 'm:C2_-_B2+W_-'
    },
    in: 'm:D2+Y2_-_B2+W_- bg:black_.25'
  },
  BannerImg: {
    in: 'w:96%'
  },
  TabSetTwo: {
    cp: {
      ":first-child": {
        bg: 'linear-gradient(to right,  #00A2E7, #185DF3, #1E54F0, #8B4CCA, #8B4CCA)'
      },
      "@light": {
        ":first-child": {
          in: 'c:white'
        }
      }
    },
    in: 'pos:absolute bot:C zi:10_!important'
  },
  in: 'p:F+X2_-_-_- fl:y pos:relative ai:center w:100% mxh:100%'
}

// ── BannerButton ──
export const BannerButton = {
  "@tabletS": {
    in: 'm:F1_-_-'
  },
  "@mobileS": {
    in: 'm:D_-_D_- p:C_B_B2_B'
  },
  "@mobileXS": {
    in: 'p:C_A_B2_A'
  },
  ":hover, &:focus-within": {
    "> h1": {
      txsh: 'gray1, 6px, 6px',
      tf: 'translate3d(-0.5%, -1%, 1px)'
    }
  },
  Icon: {
    sy: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    },
    in: 'nm:arrowUpRight pos:absolute tp:-E2+B2 rgt:-F+A2 bsz:I1+A_ op:.4'
  },
  H1: {
    trnp: 'text-shadow, transform',
    "@mobileS": {
      in: 'ta:center lh:1.2em p:-_Z'
    },
    tx: 'Join the waitlist',
    in: 'lh:1em p:-_-_X2_- c:white fw:700 fs:K trn:A_defaultBezier txsh:none tf:none'
  },
  Flex: {
    "@tabletS": {
      in: 'fl:y aln:start_space-between g:D'
    },
    Flex_1: {
      JoinWaitlist: {
        Button: {
          "@mobileS": {
            in: 'aln:center_center mnw:100%'
          },
          in: 'thm:'
        },
        "@mobileS": {
          in: 'm:0 fl:y rnd:B g:A mnw:100% aln:center_flex-start'
        },
        in: 'pos:relative thm:document m:-_-_-_-Z'
      },
      Asterisk: {
        "@mobileS": {
          in: 'ta:center p:-_Z'
        },
        tx: '* We\'ll only email you about invitation'
      },
      "@mobileS": {
        in: 'aln:center_flex-start mnw:100%'
      },
      in: 'fl:y g:A'
    },
    Flex_2: {
      "@tabletS": {
        in: 'as:flex-end'
      },
      "@mobileL": {
        in: 'as:flex-start'
      },
      "@mobileS": {
        in: 'fl:y aln:center_flex-start g:B as:center'
      },
      P: {
        tx: 'Want to skip the queue?',
        "@mobileS": {
          in: 'm:0'
        },
        in: 'm:0 fw:400 c:title'
      },
      Link: {
        "@tabletS": {
          in: 'p:0'
        },
        tx: 'Book a demo',
        hrf: 'https://cal.com/symbols-josh/early-access',
        tgt: '_blank',
        thm: null,
        ":hover": {
          in: 'td:underline'
        },
        Icon: {
          in: 'nm:arrowUpRight'
        },
        "@mobileM": {
          in: 'p:0'
        },
        sy: {
          color: 'white'
        },
        in: 'ext:Link,Button g:X bg:none c:title td:none'
      },
      in: 'g:A2 aln:center pos:relative'
    },
    "@mobileS": {
      in: 'aln:flex-start_flex-start'
    },
    in: 'aln:end_space-between'
  },
  in: 'tg:label fl:y w:95% thm:primary pos:relative ov:hidden mnh:fit-content p:B1_B2_B_C mxw:J1 g:C rnd:A2'
}

// ── BannerButtonCopy ──
export const BannerButtonCopy = {
  hrf: '/pricing',
  "@tabletS": {
    in: 'm:F1_-_-'
  },
  "@mobileS": {
    in: 'm:D_-_D_-'
  },
  "@mobileXS": {
    in: 'p:C_B_B2_B'
  },
  ":hover": {
    "> h1": {
      txsh: 'gray1, 10px, 10px',
      tf: 'translate3d(-1%, -2%, 1px)'
    }
  },
  "@mobileL": {},
  H1: {
    trnp: 'text-shadow, transform',
    tx: 'Get lifetime access now',
    "@mobileL": {},
    in: 'lh:1em p:-_-_X_- c:white fw:700 fs:K mxw:D3 trn:A_defaultBezier'
  },
  Flex: {
    "@mobileS": {
      in: 'fl:y aln:flex-start_flex-start g:A'
    },
    P: {
      tx: 'Need a personalized invite?',
      "@mobileS": {
        in: 'm:0'
      },
      in: 'fw:400'
    },
    DocsLink: {
      tx: 'Book a demo',
      hrf: 'https://cal.com/symbols-josh/early-access',
      tgt: '_blank',
      Icon: {
        in: 'nm:arrowUpRight'
      },
      "@mobileM": {
        in: 'p:0'
      },
      in: 'ext:DocsLink,Button g:X bg:none c:white td:none'
    },
    in: 'g:A2 p:B_-_-_-'
  },
  Icon: {
    "@mobileL": {
      in: 'op:.4'
    },
    sy: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px'
    },
    in: 'nm:arrowUpRight pos:absolute tp:-E2+B2 rgt:-F+A2 bsz:I1+A_'
  },
  in: 'ext:Link w:95% thm:primary pos:relative ov:hidden mnh:fit-content p:C_B2_B2_B2 mxw:J1 m:E2_-_D_- rnd:A2'
}

// ── BannerHgroup ──
export const BannerHgroup = {
  H: {
    tx: 'Canvas where the code meets design.',
    Span: {
      tx: 'Symbols.',
      in: 'fw:700'
    },
    in: 'ext:Flex aln:center_flex-start fl:row-reverse tg:h2 fs:F1 c:title fw:100 g:W2'
  },
  P: {
    tx: 'Work seamlessly with your team or clients in real-time. Build, test, and document apps with our streamlined platform, designed for developers.',
    in: 'mxw:H2 fs:A2'
  },
  in: 'ext:Hgroup ai:center ta:center g:A'
}

// ── BannerImg ──
export const BannerImg = {
  Img: {
    src: 'platform.svg',
    in: 'w:100%'
  },
  Img_2: {
    src: 'play.svg',
    tf: 'translate(-50%, -50%)',
    in: 'pos:absolute tp:50% lft:50% m:-B_-_-_-'
  },
  in: 'mxh:H+B ov:hidden pos:relative w:100%'
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

// ── CTAButtonsCampaign ──
export const CTAButtonsCampaign = {
  ch: [
    {
      hrf: '/signup',
      tx: 'Start for free',
      in: 'ext:Link,Button thm:primary fw:700 mnh:42px mxh:42px p:-_D+W'
    },
    {
      ext: [
        'DocsLink'
      ],
      hrf: 'https://cal.com/symbols-josh/early-access',
      tgt: '_blank',
      tx: 'Book a demo',
      Icon: {
        in: 'nm:arrowUpRight fs:A m:-_-_-W2_X1'
      },
      in: 'thm:transparent fw:400 fl:row-reverse c:title g:Z'
    }
  ],
  in: 'g:D aln:center'
}

// ── CalBooking ──
export const CalBooking = {
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
    },
  in: 'cg:C p:D_C2 rg:C2 mnw:G mnh:G'
}

// ── CaseItem ──
export const CaseItem = {
  props: {
    ":hover": {
      "> div > div": {
        in: 'op:1'
      },
      "> div > div:after": {
        in: 'w:75% op:1'
      },
      "> div > div > svg": {
        in: 'tf:rotate(90deg)'
      }
    },
    in: 'g:B2 cur:pointer'
  },
  Img: {
    src: 'bitmap.svg',
    in: 'bsz:F2_G1 obf:fill'
  },
  Flex: {
    H2: {
      tx: 'How did BCW improve infra and management reporting in just 3 days',
      in: 'fw:100 fs:B2+X1 mnw:F+B mxw:F+B lh:1.3em c:title'
    },
    IconText: {
      Icon: {
        in: 'nm:chevronUp trn:transform_.5s_ease tf:rotate(45deg)'
      },
      tx: 'Read more',
      ":after": {
        cnt: '""',
        trn: 'width .3s ease, opacity .5s ease',
        in: 'h:.5px w:0 op:0 bg:white_.75 pos:absolute bot:0 lft:B-V'
      },
      in: 'aln:center_flex-start fs:A1 fw:100 g:Y2 pos:relative mxw:fit-content p:-_-_X2_- op:.8'
    },
    in: 'fl:y aln:flex-start_space-between p:Z_-'
  },
  in: 'extend:Link,Flex'
}

// ── CompaniesUsing ──
export const CompaniesUsing = {
  "@tabletS": {
    in: 'fl:y g:C2 aln:center'
  },
  "@light": {},
  Caption: {
    tx: 'By team that previously contributed to:',
    in: 'c:caption fs:Z ws:nowrap'
  },
  Flex: {
    "@mobileS": {
      in: 'p:-_C2'
    },
    "@tabletL": {
      in: 'fxw:wrap p:-_C2 aln:center_center'
    },
    cp: {
      "@light": {
        ":nth-child(odd)": {
          in: 'd:none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          in: 'd:none'
        }
      }
    },
    ch: [
      {
        src: 'nike_light.svg',
        in: 'h:A2'
      },
      {
        src: 'nike_dark.svg',
        in: 'h:A2'
      },
      {
        src: 'sony_light.svg',
        in: 'h:A1'
      },
      {
        src: 'sony_dark.svg',
        in: 'h:A1'
      },
      {
        src: 'siemens.svg',
        in: 'h:A1'
      },
      {
        src: 'siemens.svg',
        in: 'h:A1'
      },
      {
        src: 'apple_light.svg',
        in: 'h:B+X'
      },
      {
        src: 'apple_dark.svg',
        in: 'h:B+X'
      },
      {
        src: 'microsoft_light.svg',
        in: 'h:A2'
      },
      {
        src: 'microsoft_dark.svg',
        in: 'h:A2'
      },
      {
        src: 'mtv.svg',
        in: 'h:A2'
      },
      {
        src: 'mtv.svg',
        in: 'h:A2'
      },
      {
        src: 'nokia.svg',
        in: 'h:A2'
      },
      {
        src: 'nokia.svg',
        in: 'h:A2'
      },
      {
        src: 'paypal.svg',
        in: 'h:A2'
      },
      {
        src: 'paypal.svg',
        in: 'h:A2'
      },
      {
        src: 'samsung_light.svg',
        in: 'h:A2'
      },
      {
        src: 'samsung_dark.svg',
        in: 'h:A2'
      }
    ],
    in: 'g:D fl:x aln:center cex:Img'
  },
  in: 'fl:x g:D aln:center_flex-start'
}

// ── CreateFeature ──
export const CreateFeature = {
  Flex: {
    cp: {
      "@mobileL": {
        in: 'p:D'
      },
      "@mobileM": {
        in: 'p:C_B_C_B'
      },
      ":before": {
        cnt: '""',
        in: 'bsz:1px_200% pos:absolute tp:0 lft:0 bg:line zi:0'
      },
      ":last-child": {
        ":after": {
          cnt: '""',
          in: 'bsz:1px_200% pos:absolute bot:0 lft:0 bg:line zi:0'
        }
      },
      Img: {},
      Hgroup: {
        "@mobileS": {
          in: 'fs:Z1'
        }
      },
      Button: {
        "@mobileXS": {
          in: 'mnw:100% mxw:100%'
        }
      },
      in: 'p:D2_-_D2_D2 bxs:border-box pos:relative'
    },
    ch: [
      {},
      {
        Img: {
          src: 'users.svg'
        },
        Hgroup: {
          H: {
            Span: {
              tx: 'Turn team work into'
            },
            Span_2: {
              tx: ' features, pages, apps'
            },
            Span_3: null,
            Span_4: null,
            in: 'mxw:F'
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
            Span: {
              tx: 'Rebrand easily, export and publish',
              in: 'fw:700'
            },
            Span_2: null,
            Span_3: null,
            Span_4: null,
            in: 'mxw:F'
          },
          P: {}
        },
        Button: {
          tx: 'Start creating features'
        }
      }
    ],
    in: 'fl:y mnw:50% cex:CreateFeatureItem'
  },
  Box: {
    "@tabletS": {
      in: 'd:none'
    },
    Img: {
      src: 'landing.gif',
      in: 'obf:scale-down bsz:100%'
    },
    "@rn": (el) => {
          const top = el.call('getCenteredTopOffset')
          el.setProps({
            top: top / 2
          })
        },
    in: 'ext:Flex aln:center_center bsz:H2_50% mnh:H2 pos:sticky lft:0 tp:50% rgt:0 zi:5'
  },
  in: 'fl:x mnw:320px mxw:1560px pos:relative m:-_auto w:100% as:flex-start p:-_-_E_-'
}

// ── CreateFeatureItem ──
export const CreateFeatureItem = {
  Img: {
    src: 'comps.svg',
    in: 'bsz:E2_F2 m:-_-_C_-'
  },
  Hgroup: {
    H: {
      tx: '',
      Span: {
        tx: 'Access',
        in: 'fw:300'
      },
      Span_2: {
        tx: ' 3000+ features'
      },
      Span_3: {
        tx: ', or ',
        in: 'fw:300'
      },
      Span_4: {
        tx: 'generate with AI'
      },
      in: 'fs:E1 mxw:F lh:1.3em c:title'
    },
    P: {
      tx: 'Invite team members, share and collaborate all-in-one realtime canvas',
      in: 'fs:A2+X fw:100 mxw:G+B2 c:title'
    },
    in: 'g:A'
  },
  Button: {
    hrf: '/signup',
    tx: 'Create features',
    thm: null,
    Icon: {
      in: 'nm:chevronUp fs:B tf:rotate(45deg) m:-W_-_-_-'
    },
    in: 'ext:DocsLink,Button fw:700 fl:row-reverse aln:center_center g:A2 p:Z2_- mnw:F3+B2 mxw:F3+B2 c:highlight-reversed bg:highlight m:E_-_-_- bd:0'
  },
  P: {
    tx: '* Learning, creating and sharing is free of charge',
    in: 'fw:100 m:B2_-_-_-'
  },
  in: 'fl:y aln:flex-start_flex-start'
}

// ── FeatureItem ──
export const FeatureItem = {
  trnp: 'color, background, border',
  "@mobileS": {
    sy: {
      minWidth: '100% !important',
      maxWidth: '100% !important',
      scrollSnapAlign: 'start'
    }
  },
  ":hover": {
    "& span": {
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

// ── FeatureStory ──
export const FeatureStory = {
  props: {
    in: 'fl:y aln:center_flex-start mnw:320px m:-_auto w:100% mxw:J1'
  },
  Hgroup: {
    "@tabletS": {
      in: 'p:-_B_C2_B'
    },
    H: {
      tx: 'Turning ideas into',
      Strong: {
        tx: ' features'
      },
      in: 'c:title fw:400 fs:E1 lh:1.3em'
    },
    P: {
      tx: 'Read our case studies how you can bootstrap, grow and scale your product with Symbols',
      in: 'fw:400 fs:B mxw:G3+B c:title'
    },
    in: 'ta:center aln:center_flex-start g:Z p:-_-_C2_-'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    "@tabletL": {
      in: 'col:100% p:C g:D1'
    },
    "@mobileM": {
      in: 'p:0 g:0'
    },
    cp: {
      "@tabletL": {
        in: 'bsz:H2_100% g:B1 p:0_0_D_C'
      },
      "@tabletS": {
        in: 'bsz:H_100% p:0_0_B1_B1'
      },
      "@mobileL": {
        in: 'bsz:G1_100% p:0_0_A1_B'
      },
      "@mobileM": {
        in: 'p:C_B1 bsz:fit-content_100%'
      },
      "@mobileS": {
        in: 'p:B'
      },
      ":before": {
        cnt: '""',
        "@tabletL": {
          in: 'd:block'
        },
        "@mobileM": {
          in: 'd:none'
        },
        in: 'bsz:.8px_130% bg:line zi:4 pos:absolute tp:-C lft:-D1 d:none'
      },
      ":after": {
        cnt: '""',
        bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%)',
        "@tabletL": {
          in: 'd:block'
        },
        "@mobileM": {
          in: 'd:none'
        },
        in: 'bsz:100%_100% pos:absolute tp:0 lft:0 d:none zi:2'
      },
      ":hover": {
        in: 'bg:line_.35'
      },
      ":first-child": {
        ":before": {
          in: 'd:none'
        }
      },
      ":not(:last-child)": {
        "@tabletL": {
          in: 'bdw:0_0_0_0'
        },
        "@mobileM": {
          in: 'bdw:0_0_1px_0'
        },
        in: 'bdw:0_1px_0_0 bdst:solid bdc:line'
      },
      Box: {
        "@tabletL": {
          in: 'bsz:100%_100% pos:absolute tp:0 lft:0'
        },
        "@mobileM": {
          in: 'pos:relative bsz:F1_100%'
        },
        "@mobileXS": {
          in: 'bsz:F_100%'
        },
        Img: {
          "@tabletL": {
            in: 'op:.7'
          },
          "@mobileM": {
            in: 'op:1'
          }
        },
        Icon: {
          "@tabletL": {
            in: 'fs:E2 tp:40%'
          },
          "@mobileL": {
            in: 'fs:E tp:38%'
          },
          "@mobileM": {
            in: 'fs:C tp:50%'
          }
        }
      },
      H3: {
        "@tabletL": {
          in: 'zi:3 fs:F1 lh:1.4em m:auto_0_0_0 mxw:F+B1'
        },
        "@tabletS": {
          in: 'fs:E2'
        },
        "@mobileL": {
          in: 'fs:D mxw:F+A'
        },
        "@mobileM": {
          in: 'fs:B2+X1 mxw:F m:Z2_-_B2_- lh:1.3em'
        },
        "@mobileS": {
          in: 'fs:D m:0_-_B_-'
        },
        "@mobileXS": {
          in: 'p:-_A_-_-'
        }
      },
      IconText: {
        "@tabletL": {
          ":after": {
            in: 'd:none'
          },
          in: 'zi:3'
        }
      },
      in: 'pos:relative p:C1_B1_C_C1'
    },
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
          in: 'mxw:F1'
        },
        IconText: {
          tx: 'Coming soon'
        }
      }
    ],
    in: 'bdst:solid bdc:line bdw:1px m:C_-_-_- w:100% ov:hidden cex:StoryItem'
  },
  CaseStudies: {
    H6: {
      tx: 'Case studies',
      in: 'fs:A2 fw:100'
    },
    Box: {
      "@tabletS": {
        in: 'p:Z_-_-_-'
      },
      "@mobileM": {
        in: 'p:A2_-_-_-'
      },
      "@mobileS": {
        in: 'p:A_-_A1_-'
      },
      ":after": {
        cnt: '""',
        bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        "@mobileM": {
          in: 'd:none'
        },
        in: 'bsz:100%_C1 pos:absolute tp:0 rgt:0 pe:none'
      },
      Flex: {
        "@tabletS": {
          sy: {
            scrollSnapType: 'x mandatory'
          },
          in: 'g:B2 p:-_B2 spd:B2'
        },
        "@mobileS": {
          in: 'p:-_A spd:A'
        },
        "::-webkit-scrollbar": {
          in: 'd:none'
        },
        cp: {
          "@tabletS": {
            sy: {
              scrollSnapAlign: 'start'
            },
            in: 'mnw:100% mxw:100% fl:y g:0 aln:flex-start_flex-start'
          },
          Img: {
            "@tabletS": {
              in: 'bsz:G1_H'
            },
            "@mobileL": {
              in: 'bsz:G_G2'
            },
            "@mobileM": {
              in: 'bsz:auto_100%'
            }
          },
          Flex: {
            H2: {
              "@tabletS": {
                in: 'mnw:D mxw:G2 p:-_A_B_-'
              },
              "@mobileM": {
                in: 'fs:D p:A_A_C_Y'
              },
              "@mobileXS": {
                in: 'fs:C1 p:A_Y_C_Y'
              }
            },
            IconText: {
              "@mobileM": {
                in: 'p:-_-_-_Z m:A_-_-_-'
              }
            }
          },
          in: 'fl:x p:0'
        },
        ch: [
          {},
          {
            Img: {
              src: 'bitmap2.svg'
            },
            Flex: {
              H2: {
                tx: 'Delivering ecommerce that does not look like others - the Mankanet story',
                in: 'mnw:F+C1 mxw:F+C1'
              }
            }
          }
        ],
        in: 'g:D mxw:100% ov:auto p:-_B cex:CaseItem'
      },
      Scrollbar: {
        "@mobileS": {
          in: 'm:A2_-_-_- p:-_A_-_B'
        },
        TrackContainer: {
          Track: {
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
                        },
            in: 'bg:gray3'
          }
        },
        NavigationArrows: {
          cp: {
            "@ck": (ev, el) => {
                          const flexNode = el.lookup('Flex').node
                          const isLeft = el.key === '0'
                          const scrollAmount = flexNode.clientWidth * .65
            
                          flexNode.scrollBy({
                            left: isLeft ? -scrollAmount : scrollAmount,
                            behavior: 'smooth'
                          })
                        },
            Icon: {},
            in: 'thm:transparent'
          }
        },
        in: 'm:C_-_-_- mnw:100% mxw:100% p:-_B_-_B2'
      },
      in: 'ov:hidden mxw:100% p:B2_- pos:relative bdst:solid bdc:line bdw:1px'
    },
    in: 'hd ext:Flex m:D_-_-_- w:100% fl:y g:A aln:flex-start_flex-start ov:hidden'
  },
  in: 'extend:Flex'
}

// ── Feedbacks ──
export const Feedbacks = {
  "@tabletS": {
    in: 'ov:hidden'
  },
  "@mobileM": {
    in: 'g:D1'
  },
  ":before": {
    cnt: '""',
    bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    "@tabletS": {
      in: 'd:block'
    },
    in: 'bsz:100%_B2 pos:absolute tp:0 lft:0 zi:2 pe:none d:none'
  },
  ":after": {
    cnt: '""',
    bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    "@tabletS": {
      in: 'd:block'
    },
    in: 'bsz:100%_D1 pos:absolute tp:0 rgt:-X pe:none zi:2 d:none'
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    },
    in: 'bg:gray15 c:gray1'
  },
  Hgroup: {
    H: {
      "@mobileM": {
        in: 'p:-_B1 ta:center lh:1.3em'
      },
      ":before, &:after": {
        cnt: '\'"\'',
        in: 'fw:400'
      },
      tx: 'This feels like a magical software',
      in: 'fs:E2 c:title'
    },
    P: {
      tx: '- Mike Minciotti',
      Div: {
        tx: 'Agency founder',
        in: 'fw:300'
      },
      in: 'ta:center c:title fw:700'
    },
    in: 'aln:center_flex-start g:A2'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    "@screenL": {
      in: 'g:F2 fs:A2'
    },
    "@screenM": {
      in: 'g:F1 fs:A1'
    },
    "@tabletM": {
      col: 'repeat(2, 1fr)',
      in: 'g:E'
    },
    "@tabletS": {
      "::-webkit-scrollbar": {
        in: 'd:none'
      },
      in: 'd:flex ai:center jc:flex-start mxw:100% ovx:auto p:-_B2 g:D1'
    },
    "@mobileM": {
      in: 'g:C p:-_B'
    },
    ch: [
      {
        "@tabletM": {
          in: 'tf:translateX(0px)'
        },
        "@tabletS": {
          tf: 'translate(0px, 0px)'
        },
        in: 'tf:translateX(100px)'
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
        "@tabletM": {
          tf: 'translate(30px, -30px)',
          in: 'pos:initial rgt:initial bot:initial'
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
        },
        in: 'pos:absolute rgt:E1 bot:-C'
      }
    ],
    "@screenS": {
      in: 'fs:A'
    },
    in: 'mxw:100% m:-_auto g:F_G pos:relative cex:UserFeedBack'
  },
  in: 'fl:y g:E bxs:content-box pos:relative aln:center_flex-start mnh:fit-content mxw:100%'
}

// ── FeedbacksShort ──
export const FeedbacksShort = {
  "@tabletS": {
    in: 'ov:hidden'
  },
  "@mobileM": {
    in: 'g:D1'
  },
  ":before": {
    cnt: '""',
    bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    "@tabletS": {
      in: 'd:block'
    },
    in: 'bsz:100%_B2 pos:absolute tp:0 lft:0 zi:2 pe:none d:none'
  },
  ":after": {
    cnt: '""',
    bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    "@tabletS": {
      in: 'd:block'
    },
    in: 'bsz:100%_D1 pos:absolute tp:0 rgt:-X pe:none zi:2 d:none'
  },
  "@dark": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)'
    }
  },
  "@light": {
    ":after": {
      bg: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)'
    },
    in: 'bg:gray15 c:gray1'
  },
  Hgroup: {
    H: {
      "@mobileM": {
        in: 'p:-_B1 ta:center lh:1.3em'
      },
      ":before, &:after": {
        cnt: '\'"\'',
        in: 'fw:400'
      },
      tx: 'This feels like a magical software',
      in: 'fs:E2 c:title'
    },
    P: {
      tx: '- Mike Minciotti',
      Div: {
        tx: 'Agency founder',
        in: 'fw:300'
      },
      in: 'ta:center c:title fw:700'
    },
    in: 'aln:center_flex-start g:A2'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    "@screenL": {
      in: 'g:F2 fs:A2'
    },
    "@screenM": {
      in: 'g:F1 fs:A1'
    },
    "@tabletM": {
      col: 'repeat(2, 1fr)',
      in: 'g:E'
    },
    "@tabletS": {
      "::-webkit-scrollbar": {
        in: 'd:none'
      },
      in: 'd:flex ai:center jc:flex-start mxw:100% ovx:auto p:-_B2 g:D1'
    },
    "@mobileM": {
      in: 'g:C p:-_B'
    },
    ch: [
      {
        tf: 'translate(110px, -25px)',
        "@tabletM": {
          in: 'tf:translateX(0px)'
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
      in: 'fs:A'
    },
    cp: {
      in: 'fs:Z2'
    },
    in: 'mxw:100% m:-_auto g:F_G pos:relative cex:UserFeedBack'
  },
  in: 'fl:y g:D3 bxs:content-box pos:relative aln:center_flex-start mnh:fit-content mxw:100%'
}

// ── FooteLanding ──
export const FooteLanding = {
  "@mobileL": {
    in: 'fl:column aln:center_center g:B2'
  },
  cp: {
    "@mobileL": {
      in: 'aln:center_center ta:center w:100% p:0'
    }
  },
  Copy: {
    "@dark": {
      in: 'c:gray8'
    },
    "@light": {
      in: 'c:gray5'
    },
    DocsLink: {
      tgt: '_blank',
      hrf: 'https://symbols.app',
      tx: 'Symbols'
    },
    Year: {
      tx: ' © Since 2021'
    },
    in: 'g:X2 lh:1 ext:Flex'
  },
  Flex: {
    Discord: {
      tgt: '_blank',
      hrf: 'https://discord.com/invite/crdFSkapFY',
      in: 'ico:discord'
    },
    Github: {
      tgt: '_blank',
      hrf: 'https://github.com/symbo-ls/',
      in: 'ico:github'
    },
    X: {
      tgt: '_blank',
      hrf: 'https://twitter.com/symbo_ls',
      in: 'ico:xcom'
    },
    Linkedin: {
      tgt: '_blank',
      hrf: 'https://www.linkedin.com/company/symbo-ls/',
      in: 'ico:linkedin'
    },
    in: 'tg:nav cex:MenuItem g:Z'
  },
  in: 'aln:center_space-between p:X2_A_X2_A2 w:100% m:-_auto g:B'
}

// ── FrontendUnified ──
export const FrontendUnified = {
  Flex: {
    "@mobileL": {
      in: 'g:B'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'd:flex fxf:y lh:1em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Strong: {
        tx: 'Make Reusable Features'
      },
      Text: {
        tx: 'in minutes',
        "@mobileL": {
          in: 'd:none'
        },
        in: 'fw:300'
      },
      in: 'c:title fs:G+X lh:1em'
    },
    H6: {
      tx: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.',
      in: 'c:title fw:100 mxw:G3+C'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  },
  WatchVideo: {
    in: 'bd:0 bdst:none m:E1_auto_D3 p:X2_X1'
  },
  WhatIsSymbols: {
    in: 'm:E3_auto'
  },
  in: 'mxw:J2 m:-_auto'
}

// ── FrontendUnifiedCopy ──
export const FrontendUnifiedCopy = {
  Flex: {
    "@mobileL": {
      in: 'g:B'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'd:flex fxf:y lh:1em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Strong: {
        tx: 'Make Reusable Features'
      },
      Text: {
        tx: 'in minutes',
        "@mobileL": {
          in: 'd:none'
        },
        in: 'fw:300'
      },
      in: 'c:title fs:G+X lh:1em'
    },
    H6: {
      tx: 'Find components and features, customize, and drag and drop into your app. Work with your team and share in realtime.',
      in: 'c:title fw:100 mxw:G3+C'
    },
    in: 'zi:2 fl:y ta:center c:title g:A aln:center'
  },
  WatchVideo: {
    in: 'bd:0 bdst:none m:E1_auto_D3 p:X2_X1'
  }
}

// ── Hero ──
export const Hero = {
  Main: {
    "@tabletS": {
      in: 'fl:y h:auto'
    },
    Flex: {
      "@tabletS": {
        in: 'w:100% p:E_B h:auto'
      },
      Header: {
        H1: {
          tx: null,
          "@tabletS": {
            in: 'fs:G'
          },
          "@mobileM": {
            in: 'fs:F'
          },
          Span: {
            tx: 'Infra and workspace for',
            in: 'fw:300 d:block'
          },
          Strong: {
            tx: 'Interface Engineers',
            in: 'fw:700 c:white'
          },
          in: 'c:title lh:1.2 mxw:K'
        },
        P: {
          tx: 'Make interfaces once. Reuse them across products, brands, and platforms — without rebuilding UI every time.',
          in: 'm:A_-_-_- c:gray8 fw:400 mxw:H2 lh:1.6 fs:Z1'
        },
        in: 'tg:header fl:y g:A'
      },
      Nav: {
        Label: {
          tx: 'CREATE WITH',
          in: 'tg:label fs:Z ls:1px c:gray6 fw:500 p:-_-_A_-'
        },
        Flex: {
          cp: {
            trn: 'opacity .3s ease, border .3s ease',
            in: 'aln:center g:Z2 p:Y1_Z2 rnd:C cur:pointer fs:Y2 fw:500 fx:1 jc:space-between thm:quaternary ws:nowrap'
          },
          ch: [
            {
              Icon: {
                in: 'nm:claude fs:B1 c:#D97757'
              },
              Text: {
                tx: 'Claude Code'
              },
              Icon_2: {
                in: 'nm:downloadOutline fs:Z c:gray6'
              },
              hrf: '/docs/claude-code'
            },
            {
              Icon: {
                in: 'nm:vscode fs:A c:#007ACC'
              },
              Text: {
                tx: 'VSCode'
              },
              Icon_2: {
                in: 'nm:downloadOutline fs:Z c:gray6'
              },
              hrf: '/docs/vscode'
            },
            {
              Icon: {
                in: 'nm:cursorEditor fs:B'
              },
              Text: {
                tx: 'Cursor'
              },
              Icon_2: {
                in: 'nm:downloadOutline fs:Z c:gray6'
              },
              hrf: '/docs/cursor'
            },
            {
              Icon: {
                in: 'nm:symbols fs:B c:blue'
              },
              Text: {
                tx: 'Web'
              },
              Icon_2: {
                in: 'nm:arrowUpRight fs:Z c:gray6'
              },
              hrf: '/signup'
            }
          ],
          in: 'fl:x g:Z2 fxw:nowrap cex:Link,Flex'
        },
        in: 'tg:nav fl:y g:A w:100% mxw:I m:C_-_-_-B p:C thm:dots'
      },
      in: 'fl:y fx:1 w:50% p:G_D_E jc:center d:flex g:D mxw:I2 m:-_-_-_auto h:100%'
    },
    CanvasEmbed: {
      "@tabletS": {
        in: 'w:100% h:50vh'
      },
      in: 'fx:1 w:50% mxw:50% h:100% bg:gray6 rnd:0 p:0 project:/nikoloza/default-flattened'
    },
    in: 'fl:x w:100% h:70dvh aln:stretch'
  },
  in: 'fl:y w:100% p:0 g:0 pos:relative'
}

// ── HeroTitle ──
export const HeroTitle = {
  "@mobileL": {
    in: 'g:B p:-_B2'
  },
  H1: {
    Writing: {
      speed: 30,
      "@mobileS": {
        in: 'lh:1.1em'
      },
      tx: 'Interface Engineering ',
      in: 'lh:0.9 h:A+X mnw:X'
    },
    Writing_2: {
      "@mobileS": {
        in: 'm:A2_-_-_-'
      },
      speed: 30,
      delay: 1200,
      in: 'tg:span lh:0.9 h:A+X mnw:X fw:200 afterText:starts_here'
    },
    "@mobileS": {
      in: 'mxw:E'
    },
    tx: null,
    "@mobileM": {
      in: 'fs:J2'
    },
    in: 'fxf:column c:title fs:K'
  },
  H6: {
    delay: 2000,
    speed: 5,
    in: 'm:X_-_- h:C ext:Writing c:title fw:400 mxw:H3 afterText:Symbols_Suite_helps_you_expand_your_skills_to_build_and_manage_entire_interfaces_—_from_design_systems_to_delivery_and_integrations.'
  },
  props: {},
  in: 'fl:y aln:center ta:center c:title g:A'
}

// ── HeroTitleCopy ──
export const HeroTitleCopy = {
  props: {},
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'lh:1.3em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      ch: [
        {
          tx: 'Your browser tab is now ',
          in: 'fw:300'
        },
        {
          tx: ' IDE, framework and deployment'
        }
      ],
      in: 'c:title fs:G+X lh:1.2 mxw:G'
    },
    H6: {
      tx: 'Rebuilding features wastes time. Ship or enhance production ready web projects in record time.',
      in: 'c:title fw:300 mxw:H'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── HeroTitleCopyCopy1 ──
export const HeroTitleCopyCopy1 = {
  props: {},
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'lh:1.3em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Span: {
        tx: 'Instantly turn your ideas',
        in: 'fw:300'
      },
      Div: {
        tx: 'into',
        Strong: {
          tx: ' features'
        },
        in: 'fw:300'
      },
      in: 'c:title fs:I lh:1.2 mxw:G'
    },
    H6: {
      cp: {},
      ch: [
        {
          tx: 'Your browser tab is now IDE, framework and deployment.'
        },
        {
          tx: 'You can build infinite frontend with single codebase. '
        }
      ],
      in: 'c:title fw:300 mxw:H'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── HeroTitleCopyCopy1Copy2 ──
export const HeroTitleCopyCopy1Copy2 = {
  props: {},
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'lh:1.3em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Span: {
        tx: 'Extend your apps with features,',
        in: 'fw:300'
      },
      Div: {
        Strong: {
          tx: 'instantly'
        },
        in: 'fw:300'
      },
      in: 'c:title fs:I lh:1.2 mxw:G'
    },
    H6: {
      cp: {},
      ch: [
        {
          tx: 'Your apps now have huge uikit, design system and AI editor.'
        },
        {
          tx: 'You can reuse it to infinite apps with a single codebase. '
        }
      ],
      in: 'c:title fw:300 mxw:H'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── HgroupImg ──
export const HgroupImg = {
  props: {
    "@tabletM": {
      in: 'g:C'
    },
    "@tabletS": {
      in: 'fl:y g:D aln:center_flex-start'
    },
    "@mobileM": {
      in: 'g:F mxw:100%'
    },
    in: 'g:F1+X mxw:fit-content'
  },
  Hgroup: {
    "@tabletS": {},
    "@mobileM": {
      in: 'p:-_B2'
    },
    H: {
      tx: 'Lifetime access is available now',
      "@tabletM": {
        in: 'fs:G'
      },
      "@mobileL": {
        in: 'fs:F'
      },
      in: 'tg:h1 fs:G1 fw:700 mxw:E+A lh:1.2em'
    },
    P: {
      tx: '',
      Span: {
        tx: '*',
        in: 'fs:B d:block m:-X_-_-_- c:blue'
      },
      Span_2: {
        tx: 'The lifetime offer is limited to the beta release and  will switch to monthly pricing once fulfilled.',
        in: 'c:title p:-_-_-_Y2'
      },
      in: 'd:Flex fs:X1+X mxw:G2+Z fw:300 aln:flex-start_flex-start'
    },
    in: 'g:B'
  },
  Img: {
    src: 'infinite.svg',
    "@mobileM": {
      in: 'tf:rotate(90deg)'
    },
    in: 'd:block mxh:fit-content'
  },
  in: 'extend:Flex'
}

// ── Investors ──
export const Investors = {
  H6: {
    tx: 'Investors:'
  },
  Grid: {
    tcol: 'repeat(3, 1fr)',
    "@tabletM": {
      tcol: 'repeat(2, 1fr)'
    },
    cex: [
      'AvatarHgroup'
    ],
    cp: {
      hrf: '{{ href }}',
      Avatar: {
        src: '{{ avatar }}',
        in: 'm:0 bsz:B'
      },
      Hgroup: {
        H: {
          tx: '{{ name }}',
          in: 'tg:h6 fs:A1 fw:600 m:0'
        },
        P: {
          tx: '{{ title }}'
        }
      },
      in: 'c:title g:Z2 aln:start'
    },
    ch: [
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQG6VLe-hAv2HA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1621306128570?e=1759363200&v=beta&t=Z4SUlB9y2OqIjf9LbU7n0AH94wsMaTpvDsrm4qcb7bg',
        ttl: 'Innovative Product Design Leader | ex Apple, Nook, Suki',
        in: 'nm:Matt_Pallakoff'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C4D03AQFbQdWExHLa6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1581961324261?e=1759363200&v=beta&t=0SudX05ax6HYAjQSOLkoC_wIXtRjC-TmjVzjwZe1eqE',
        in: 'nm:Irakli_Janiashvili ttl:Software_Engineer_at_Lightdash_⚡️'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQFUHNpe3mba6A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1606841237051?e=1759363200&v=beta&t=Qt6Hy2Z0ZP69PxSknUmHhrP_xNJjy0ag8k-Hw7ftwpE',
        in: 'nm:Tamar_Chkhaidze ttl:Senior_Tax_Consultant_at_PwC'
      },
      {
        in: 'avatar:https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q nm:Natia_Tsintsadze ttl:Co-founder_at_Archy'
      },
      {
        avatar: 'https://media.licdn.com/dms/image/v2/C5103AQExz0EA26jyFA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517614662229?e=2147483647&v=beta&t=RnmXzUwXGyhJkn1UiYbAmPfOULfSnyqk6FWqqweSnMw',
        in: 'nm:Revaz_Zakalashvili ttl:Tech_Lead_&_Senior_Software_Engineer'
      },
      {
        in: 'avatar:https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q nm:Revaz_Maisashvili ttl:Financial_Director'
      }
    ],
    "@mobileL": {
      tcol: 'repeat(1, 1fr)'
    },
    in: 'g:B cha:state'
  },
  in: 'fl:y g:B'
}

// ── JoinWaitlist ──
export const JoinWaitlist = {
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
    isActive: (el, s) => s.status === 'loading',
    trn: 'C, defaultBezier',
    trnp: 'opacity, visibility',
    "!isActive": {
      op: 0,
      in: 'vis:hidden'
    },
    in: 'pos:absolute ist:0 thm:document'
  },
  Success: {
    isActive: (el, s) => s.status === 'success',
    trn: 'C, defaultBezier',
    trnp: 'opacity, visibility',
    "!isActive": {
      op: 0,
      in: 'vis:hidden'
    },
    IconText: {
      tx: 'Thanks for registering your interest.',
      Icon: {
        in: 'c:green'
      },
      in: 'g:Z ico:check c:title'
    },
    in: 'pos:absolute ist:0 thm:document flexAlign:center_center'
  },
  Input: {
    phd: 'Enter your email',
    "@ip": (ev, el, s) => {
          s.quietUpdate({
            email: el.node.value
          })
        },
    in: 'w:100% thm:transparent typ:email req c:title'
  },
  Button: {
    tx: 'Get notified',
    Icon: {
      od: 2,
      in: 'fs:B'
    },
    in: 'thm:primary ico:checkmark g:X2 p:Z2_B_Z2_B2 aln:center typ:submit'
  },
  in: 'tg:form fl:x thm:field rnd:C1 ov:hidden p:X2 g:X2 pos:relative mxw:G3+C1 w:100%'
}

// ── LandingAIPrompt ──
export const LandingAIPrompt = {
  Box: {
    Textarea: {
      val: 'As an user, I need...',
      at: {
        placeholder: '"As an user, I need..."'
      },
      sy: {
        borderWidth: '0'
      },
      in: 'mnw:100% mnh:100% mxh:100% thm:transparent bd:0 bdw:0 p:B_-_-_B1'
    },
    Flex: {
      cp: {
        in: 'p:X thm:transparent'
      },
      ch: [
        {
          Icon: {
            in: 'nm:upload'
          }
        },
        {
          Icon: {
            in: 'nm:chevronUp'
          }
        }
      ],
      in: 'pos:absolute tp:A1 rgt:B1 g:A2 cex:IconButton'
    },
    Button: {
      tx: 'Create a feature',
      Icon: {
        in: 'nm:chevronUp fs:B tf:rotate(45deg) m:-W_-_-_-'
      },
      in: 'pos:absolute p:Z2_C+X1 rgt:A1 bot:A1 fl:row-reverse g:Y2 thm:blackWhite fw:600'
    },
    in: 'bsz:E2_100% mnh:E2 ov:hidden bdst:solid bdc:line bdw:1px pos:relative rnd:A2'
  },
  Flex: {
    Button: {
      tx: 'Explore Marketplace',
      Icon: {
        in: 'nm:chevronUp tf:rotate(45deg) fs:B'
      },
      in: 'thm:transparent p:0 g:X2 fw:500 c:title'
    },
    Button_2: {
      tx: 'More Ideas',
      Icon: {
        in: 'nm:chevronDown fs:B'
      },
      in: 'thm:transparent p:0 g:W2 fw:400 m:-_auto_-_B'
    },
    P: {
      tx: '* No black-box, you can build it once, and take to everywhere',
      in: 'fw:100'
    },
    in: 'aln:center_space-between p:-_X'
  },
  in: 'fl:y w:I2+D1'
}

// ── LandingCampaignHeader ──
export const LandingCampaignHeader = {
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@tabletS": {
    in: 'p:A1_A'
  },
  "@mobileM": {},
  "@mobileXS": {
    in: 'p:A1_Z'
  },
  Logo: {
    "@tabletS": {
      in: 'fs:E m:-_0_-_- p:0'
    },
    in: 'pos:relative ico:logo tp:auto lft:auto thm:transparent m:-_B_-_-'
  },
  Nav: {
    "@tabletS": {
      in: 'd:none'
    },
    cp: {
      in: 'c:title fw:400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          tx: 'explore',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          tx: 'developers',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          tx: 'pricing',
          in: 'c:title fw:600'
        }
      }
    ],
    in: 'fxf:x g:C cex:DocsLink'
  },
  P: {
    tx: 'of single source',
    Span: {
      tx: 'Symbols',
      in: 'fw:700 c:title'
    },
    "@mobileS": {},
    in: 'ext:Flex fw:100 c:title fl:row-reverse m:0_auto g:W2'
  },
  Nav_2: {
    "@tabletS": {
      in: 'd:none'
    },
    cp: {
      in: 'c:title fw:400'
    },
    ch: [
      {
        hrf: '/docs/resources',
        tx: '/support',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signin',
        tx: '/signin',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          tx: 'create-account',
          in: 'c:title fw:600'
        }
      }
    ],
    in: 'fxf:x g:C cex:DocsLink'
  },
  MenuIcon: {
    "@tabletS": {
      in: 'd:flex'
    },
    "@ck": (event, element, state) => state.toggle('activeMenu'),
    in: 'd:none'
  },
  in: 'fl:x p:X2_A_X2_Z ai:center mnw:100% bd:none fs:1rem thm:header'
}

// ── LandingFeatures ──
export const LandingFeatures = {
  "@ck": (ev, el, s) => {
      if (s.isVisible)
        el.node.scrollIntoView()
    },
  st: {
    src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4?'
  },
  Grid: {
    col: 'repeat(4, 1fr)',
    cp: {
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
            },
      in: 'fs:Z2 rnd:Z2 aln:center p:Z2_A2 g:Z'
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
    ],
    in: 'cex:Flex,CanvasButton g:0_W2'
  },
  Box: {
    ".isVisible": {
      in: 'h:H3'
    },
    "!isVisible": {
      in: 'h:F1'
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
      in: 'c:white bgc:gray4_.9'
    },
    "@light": {
      in: 'c:black bgc:gray13_.95'
    },
    Video: {
      src: '{{ src }}',
      onMouseenter: (ev, el) => {
              el.node.play()
            },
      onMouseleave: (ev, el) => {
              el.node.pause()
            },
      in: 'w:100% zi:2 rnd:Z2 ar:11_/_7 obf:cover !autoplay !ctl lp'
    },
    ":after": {
      cnt: '""',
      bg: 'linear-gradient(to top, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
      trnp: 'opacity, transform',
      in: 'pos:absolute bot:0 lft:0 bsz:50%_100% zi:2 trn:Z_defaultBezier pe:none'
    },
    in: 'thm:dialog rnd:A ov:hidden trn:C1_defaultBezier_height p:Y pos:relative'
  },
  in: 'w:I2+D1 fl:y g:X rnd:A p:X bdc:line bdst:solid bdw:1px'
}

// ── LandingGetstarted ──
export const LandingGetstarted = {
  cp: {
    fx: 1,
    in: 'aln:center p:Z_A cur:pointer rnd:Z2 g:A'
  },
  Create: {
    Img: {
      src: 'https://api.symbols.app/core/files/public/68cdbbc549b85e495f3c195f/download',
      in: 'w:C'
    },
    Text: {
      tx: 'Build your frontend'
    },
    hrf: '/signup'
  },
  VerticalLine: {
    in: 'ignoreChildProps icex m:A1_0'
  },
  Demos: {
    hrf: '/docs/examples',
    Img: {
      src: 'https://api.symbols.app/core/files/public/68cdbafe49b85e495f3c140a/download',
      in: 'w:C'
    },
    Text: {
      tx: 'Explore examples'
    }
  },
  VerticalLine_2: {
    in: 'ignoreChildProps icex m:A1_0'
  },
  Chrome: {
    hrf: '/docs/chrome-extension',
    Img: {
      src: 'https://api.symbols.app/core/files/public/69284e6628a7fb3ff8d05c33/download',
      in: 'w:C1'
    },
    Text: {
      tx: 'Build using extension'
    }
  },
  in: 'cex:Flex,Link,CanvasButton rnd:Z2+W2 p:W m:C1_-_- fl:x g:X2'
}

// ── LandingHeader ──
export const LandingHeader = {
  "@screenL": {},
  "@screenM": {},
  "@screenS": {},
  "@mobileM": {},
  "@mobileXS": {
    in: 'p:A1_Z'
  },
  "@tabletS": {
    in: 'p:A1_A'
  },
  Logo: {
    "@tabletS": {
      in: 'fs:E m:-_0_-_- p:0'
    },
    in: 'pos:relative ico:logo tp:auto lft:auto m:-_B_-_- thm:transparent'
  },
  Nav: {
    cp: {
      in: 'c:title fw:400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          tx: 'explore',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          tx: 'developers',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          tx: 'pricing',
          in: 'c:title fw:600'
        }
      }
    ],
    "@tabletS": {
      in: 'd:none'
    },
    in: 'fxf:x g:C cex:DocsLink'
  },
  P: {
    tx: 'of single source',
    Span: {
      tx: 'Symbols',
      in: 'fw:700 c:title'
    },
    "@mobileS": {},
    in: 'ext:Flex fw:100 c:title fl:row-reverse m:0_auto g:W2'
  },
  Nav_2: {
    cp: {
      in: 'c:title fw:400'
    },
    "@tabletS": {
      in: 'd:none'
    },
    ch: [
      {
        hrf: '/docs/resources',
        tx: '/support',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signin',
        tx: '/signin',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          tx: 'create-account',
          in: 'c:title fw:600'
        }
      }
    ],
    in: 'fxf:x g:C cex:DocsLink'
  },
  MenuIcon: {
    "@tabletS": {
      in: 'd:flex'
    },
    "@ck": (event, element, state) => state.toggle('activeMenu'),
    in: 'd:none'
  },
  in: 'fl:x p:X2_A_X2_Z ai:center mnw:100% bd:none fs:1rem thm:header'
}

// ── LandingNavbar ──
export const LandingNavbar = {
  zi: 9999999,
  "@tabletS": {
    in: 'w:100% p:X2_B jc:space-between'
  },
  thm: null,
  Logo: {
    "@tabletS": {
      in: 'fs:E m:-_0_-_- p:0'
    },
    in: 'pos:relative ico:logo tp:auto lft:auto thm:transparent m:-_B_-_-'
  },
  Nav_2: {
    "@tabletS": {
      in: 'd:none'
    },
    cp: {
      ":hover": {
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
    "@tabletS": {
      in: 'd:flex'
    },
    "@ck": (event, element, state) => state.toggle('activeMenu'),
    in: 'd:none'
  },
  in: 'ext:Navbar g:A2 jc:flex-start aln:center lft:0 w:50% p:Y1_D_Y1_A fs:Z2 us:none pos:absolute tp:W1 bd:0'
}

// ── LandingNavbarCopy ──
export const LandingNavbarCopy = {
  zi: 9999999,
  Logo: {
    "@tabletS": {
      in: 'fs:E m:-_0_-_- p:0'
    },
    in: 'pos:relative ico:logo tp:auto lft:auto thm:transparent m:-_B_-_-'
  },
  Nav: {
    "@tabletS": {
      in: 'd:none'
    },
    cp: {
      in: 'c:title fw:400'
    },
    ch: [
      {
        hrf: '/explore',
        tx: '/',
        Strong: {
          tx: 'explore',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/developers',
        tx: '/',
        Strong: {
          tx: 'developers',
          in: 'c:title fw:600'
        }
      },
      {
        hrf: '/pricing',
        tx: '/',
        Strong: {
          tx: 'pricing',
          in: 'c:title fw:600'
        }
      }
    ],
    in: 'fxf:x g:C cex:DocsLink'
  },
  P: {
    tx: 'of single source',
    Span: {
      tx: 'Symbols',
      in: 'fw:700 c:title'
    },
    "@mobileS": {},
    in: 'ext:Flex fw:100 c:title fl:row-reverse m:0_auto g:W2'
  },
  Nav_2: {
    "@tabletS": {
      in: 'd:none'
    },
    cp: {
      in: 'c:title fw:400'
    },
    ch: [
      {
        hrf: '/docs/resources',
        tx: '/support',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signin',
        tx: '/signin',
        in: 'c:caption fw:300'
      },
      {
        hrf: '/signup',
        tx: '/',
        Strong: {
          tx: 'create-account',
          in: 'c:title fw:600'
        }
      }
    ],
    in: 'fxf:x g:C cex:DocsLink'
  },
  MenuIcon: {
    "@tabletS": {
      in: 'd:flex'
    },
    "@ck": (event, element, state) => state.toggle('activeMenu'),
    in: 'd:none'
  },
  in: 'ext:Navbar g:A2 rnd:C1 p:X2_Z2 fs:Z2 us:none thm:common-box pos:absolute tp:W1 lft:X rgt:X'
}

// ── Layout ──
export const Layout = {
  props: {
    "@dark": {
      in: 'bg:black'
    },
    "@light": {
      in: 'bg:gray15'
    },
    "@screenL": {
      in: 'fs:A2'
    },
    "@screenM": {
      in: 'fs:A1'
    },
    "@screenS": {
      in: 'fs:A'
    },
    "@tabletL": {
      in: 'fs:Z2'
    },
    "@tabletM": {
      in: 'fs:Z1'
    },
    in: 'fl:y ov:hidden ovy:auto mxh:100% p:-_-_C2_- mnw:J+F1 w:100% aln:start_start'
  },
  Header: {},
  Banner: {
    in: 'mxh:100% mnw:100% mxw:100%'
  },
  Feedbacks: {
    in: 'p:F1_-_D2_- mnw:100% mxw:100%'
  },
  BuiltScale: {
    in: 'm:D_-_-_- mnw:100% mxw:100%'
  },
  GameChanging: {
    in: 'p:E1_-_E1_- mnw:100% mxw:100%'
  },
  OpenSource: {
    in: 'mnw:100% mxw:100%'
  },
  Products: {
    in: 'm:E2_auto'
  },
  Footer: {
    in: 'm:-_auto'
  },
  in: 'extend:Flex'
}

// ── MakeDesignWithCode ──
export const MakeDesignWithCode = {
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      lh: 1.2,
      "@mobileL": {
        in: 'd:flex fxf:y lh:1.2em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Strong: {
        tx: 'Engineering the interface layer',
        "@mobileL": {
          in: 'd:none'
        }
      },
      in: 'c:title fs:G+X m:-_-_-'
    },
    H6: {
      tx: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps in one go.',
      in: 'm:X_-_- c:title fw:300 mxw:G3+C'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── MakeDesignWithCodeCopy ──
export const MakeDesignWithCodeCopy = {
  props: {},
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'd:flex fxf:y lh:1.2em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Strong: {
        tx: 'The Most Advanced Front-end Editor'
      },
      Text: {
        tx: 'with no-code, marketplace and AI',
        "@mobileL": {
          in: 'd:none'
        },
        in: 'fw:300 m:W_-_X'
      },
      in: 'c:title fs:G+X lh:1em'
    },
    H6: {
      tx: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps online.',
      in: 'c:title fw:300 mxw:G3+C'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── MenuIcon ──
export const MenuIcon = {
  cp: {
    ":first-child": {
      ".activeMenu": {
        tf: 'rotate(45deg) translate(2px, 0px)'
      },
      "!activeMenu": {
        in: 'tf:rotate(0deg)'
      },
      in: 'w:B'
    },
    ":last-child": {
      ".activeMenu": {
        tf: 'rotate(-45deg) translate(5px, -5px)'
      },
      "!activeMenu": {
        in: 'tf:rotate(0deg)'
      },
      in: 'w:B'
    },
    in: 'mnh:V2 mxh:V2 h:V2 bg:white rnd:C trn:transform_.3s_ease'
  },
  ch: [
    {},
    {}
  ],
  in: 'ext:Button fl:y p:Y g:Y1 aln:flex-end_flex-start bg:transparent cha:props'
}

// ── Numbers ──
export const Numbers = {
  H6: {
    tx: 'Quick stats:'
  },
  Grid: {
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
      H: {
        tx: '{{ value }}',
        in: 'tg:h6 fw:600 m:0'
      },
      P: {
        tx: '{{ title }}',
        in: 'od:-1'
      },
      in: 'c:title g:Z2 aln:start'
    },
    ch: [
      {
        in: 'ttl:Investors val:8'
      },
      {
        in: 'ttl:Beta_Users val:518'
      },
      {
        in: 'ttl:AI_Models val:7'
      },
      {
        val: '3,184',
        in: 'ttl:Marketplace_items'
      }
    ],
    in: 'fl:y g:C m:B_0_A cha:state'
  },
  in: 'fl:y g:A2'
}

// ── OpenSource ──
export const OpenSource = {
  Hgroup: {
    H: {
      tx: 'Open-Source Ecosystem',
      in: 'c:transparent fs:A+I fw:900 -webkit-text-stroke:2px_#4A51FF'
    },
    P: {
      tx: 'Develop with confidence, as Symbols is built from the ground up with open-source in mind.',
      in: 'mxw:H'
    },
    in: 'aln:center_flex-start g:B2 ta:center'
  },
  TabSetTwo: {
    cp: {
      ":first-child": {
        in: 'thm:primary'
      }
    }
  },
  in: 'fl:y aln:center_flex-start g:D'
}

// ── PackageIncludes ──
export const PackageIncludes = {
  props: {
    cp: {
      Icon: {
        in: 'nm:check fs:Z'
      },
      in: 'ws:nowrap fw:300 g:Y fs:A'
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
    ],
    in: 'fl:y aln:flex-start_flex-start g:A2 cex:IconText'
  },
  in: 'extend:Flex'
}

// ── Packages ──
export const Packages = {
  props: {
    ":before": {
      cnt: '\'\'',
      bg: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      "@tabletS": {
        in: 'd:block'
      },
      in: 'bsz:100%_D pos:absolute tp:0 lft:0 pe:none d:none'
    },
    ":after": {
      cnt: '\'\'',
      bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
      "@tabletS": {
        in: 'd:block'
      },
      in: 'bsz:100%_D pos:absolute tp:0 rgt:0 pe:none d:none'
    },
    "@tabletS": {
      in: 'ovx:hidden'
    },
    in: 'mnw:100% mxw:100% mnh:fit-content pos:relative'
  },
  Grid: {
    "@tabletL": {
      col: 'repeat(2, auto)',
      in: 'rg:E'
    },
    "@tabletS": {
      in: 'd:flex ov:auto p:-_E_-_D'
    },
    "@mobileM": {
      in: 'p:-_C'
    },
    "@mobileS": {
      in: 'p:-_B2_-_B2'
    },
    cp: {
      Hgroup: {
        H: {
          in: 'tg:h6 fs:C1 fw:700'
        },
        P: {
          in: 'c:title'
        },
        in: 'g:Z1'
      },
      in: 'tg:form fl:y aln:flex-start_flex-start'
    },
    ch: [
      {
        "@mobileS": {
          in: 'p:-_B2_-_-'
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
          tx: 'Your current plan',
          Icon: {
            at: {
              name: 'check'
            }
          },
          in: 'g:Z m:C_-_-_- fw:900'
        },
        P: {
          tx: 'Collaborate and launch your project free with your team.',
          in: 'm:A2_-_D_- mxw:G'
        },
        PackageIncludes: {
          ch: null
        },
        in: 'p:-_D_-_-'
      },
      {
        "@tabletL": {
          in: 'bdw:0_0_0_1px'
        },
        "@tabletS": {
          in: 'bdw:0_1px_0'
        },
        "@mobileS": {
          in: 'p:-_B2_-_B2'
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
          "@mobileM": {
            in: 'fl:y g:B'
          },
          cp: {
            Radio: {
              chk: null,
              Input: {
                in: 'nm:starter'
              },
              in: 'nm:starter'
            }
          },
          in: 'm:C_-_B2_-'
        },
        Button: {
          tx: 'Upgrade',
          Icon: {
            in: 'nm:chevronUp'
          },
          in: 'thm:primary fl:row-reverse p:Z1_C fw:700 g:Y1 typ:submit'
        },
        PackageIncludes: {
          ch: null,
          in: 'm:B2+W1_-_-_-'
        },
        AsteriskParagraph: {
          in: 'm:C_-_0_-'
        },
        in: 'p:-_D_-_C1 bdst:solid bdc:blue_.25 bdw:0_1px_0'
      },
      {
        "@tabletL": {
          in: 'p:-_-_-_0 gc:span_2 mxw:fit-content'
        },
        "@tabletS": {
          in: 'p:-_-_-_C1'
        },
        "@mobileS": {
          in: 'p:-_-_-_B2'
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
          "@mobileM": {
            in: 'fl:y g:B'
          },
          cp: {
            Radio: {
              chk: null,
              Input: {
                in: 'nm:experts'
              },
              in: 'nm:experts'
            }
          },
          ch: null,
          in: 'm:C_-_B2_-'
        },
        IconButton: {
          "@screenMS": {
            in: 'm:-D+Z1_-B2_C1+Y_A2'
          },
          "@screenS": {
            in: 'm:-D+Z1_-A1_C1+Y_A2'
          },
          "@tabletL": {
            in: 'm:-D+Z1_0_C1+Y_A2'
          },
          "@tabletS": {
            in: 'm:-D+Z1_-C_C1+Y_A2'
          },
          "@mobileM": {
            in: 'm:-D+Z1_C_C1+Y_A2'
          },
          Icon: {
            nm: null,
            in: 'fs:B'
          },
          "@ck": null,
          in: 'm:-D+Z1_0_C1+Y_A2 as:end thm:transparent p:0'
        },
        PriceOptions_2: {
          hd: null,
          "@mobileM": {
            in: 'fl:y g:B'
          },
          cp: {
            Radio: {
              Input: {
                in: 'nm:experts'
              },
              in: 'nm:experts'
            }
          },
          ch: null,
          in: 'm:-_-_B2_-'
        },
        Button: {
          tx: 'Hire Experts',
          Icon: {
            in: 'nm:chevronUp tf:rotate(45deg) d:block m:-W2_-_-_-'
          },
          in: 'thm:primary fl:row-reverse p:Z1_C typ:submit fw:700 g:Y1'
        },
        PackageIncludes: {
          ch: null,
          in: 'm:B2+W1_-_-_-'
        },
        Flex: {
          "@tabletL": {
            in: 'm:D_-_-_-'
          },
          "@mobileM": {
            in: 'fl:y g:B1'
          },
          AsteriskParagraph: {
            Span: {},
            Span_2: {
              tx: 'To hear more pricing options or custom inquiries
              book 30 minutes free call with our sales',
              in: 'mxw:G+D'
            }
          },
          Link: {
            hrf: 'https://cal.com/symbols-josh/early-access',
            tx: 'Contact sales',
            tgt: '_blank',
            "@mobileS": {
              in: 'm:-_-_-_Z1'
            },
            ":hover": {
              in: 'td:underline'
            },
            in: 'ws:nowrap p:0 fw:700 c:title'
          },
          in: 'aln:flex-start_flex-start g:D2 m:auto_-_-_-'
        },
        in: 'p:-_-_-_C1'
      }
    ],
    in: 'col:2fr_3fr_3fr cex:Flex'
  },
  in: 'extend:Box'
}

// ── ParagraphTransparency ──
export const ParagraphTransparency = {
  "@mobileM": {
    in: 'p:-_B'
  },
  Strong: {
    tx: 'Whatever you create in Symbols'
  },
  Span: {
    tx: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.'
  },
  in: 'fw:300 ta:center fs:A+X c:title mxw:H+C p:-_C tg:p'
}

// ── PartnerSet ──
export const PartnerSet = {
  "@light": {},
  Caption: {
    tx: 'With partnership',
    in: 'fw:100 c:title'
  },
  Flex: {
    cp: {
      "@light": {
        ":nth-child(odd)": {
          in: 'd:none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          in: 'd:none'
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
    ],
    in: 'g:C cex:Img cha:props'
  },
  in: 'g:C aln:center'
}

// ── PerksInclude ──
export const PerksInclude = {
  props: {
    "@tabletS": {
      in: 'p:-_B2 g:D as:center'
    },
    in: 'fl:y aln:flex-start_flex-start g:C mxw:fit-content'
  },
  H6: {
    tx: 'Some perks also included',
    in: 'fw:300 fs:A'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    "@tabletM": {
      in: 'cg:E1'
    },
    "@tabletS": {
      col: 'repeat(2, 1fr)',
      in: 'rg:D'
    },
    "@mobileL": {
      in: 'cg:D2'
    },
    "@mobileM": {
      col: 'repeat(1, 1fr)',
      in: 'cg:0 rg:C1'
    },
    cp: {
      cp: {
        Icon: {
          in: 'nm:check'
        },
        in: 'ws:nowrap g:Z'
      },
      in: 'fl:y g:B aln:flex-start_flex-start cex:IconText'
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
    ],
    in: 'cg:F+B cex:Flex'
  },
  in: 'extend:Flex'
}

// ── PriceOptions ──
export const PriceOptions = {
  props: {
    cp: {
      Radio: {
        Input: {
          at: {
            name: 'starter'
          },
          val: null,
          "@cg": null,
          ":checked + div": {
            in: 'thm:transparent'
          },
          ":checked + div > svg": {
            in: 'op:1'
          }
        },
        Flex: {
          bd: 'solid, gray .5',
          Icon: {
            in: 'nm:check op:0 fs:Z2'
          },
          ":after": null,
          in: 'bdw:.5px thm:transparent p:V'
        },
        in: 'm:-W_-_-_-'
      },
      Hgroup: {
        H: {
          tx: null,
          in: 'tg:strong c:title fw:700'
        },
        P: {
          tx: null,
          in: 'fs:Z fw:300 c:title'
        },
        in: 'g:X'
      },
      in: 'tg:label cur:pointer fxf:x g:Z fl:row-reverse'
    },
    ch: [
      {
        price: 29,
        in: 'term:Monthly'
      },
      {
        price: 199,
        in: 'term:Annual'
      },
      {
        price: 299,
        in: 'term:Lifetime'
      }
    ],
    in: 'g:C1 cha:state'
  },
  in: 'extend:Flex'
}

// ── QuickHeroTitle ──
export const QuickHeroTitle = {
  Flex: {
    "@mobileL": {
      in: 'g:B p:-_B2'
    },
    H1: {
      tx: null,
      "@mobileL": {
        in: 'lh:1.3em'
      },
      "@mobileS": {
        in: 'fs:J2'
      },
      Span: {
        tx: 'Build reusable ',
        in: 'fw:300'
      },
      Strong: {
        tx: 'web features '
      },
      Br: {},
      Strong_2: {
        tx: 'in seconds'
      },
      Span_2: {
        tx: ', not days',
        in: 'fw:300'
      },
      in: 'c:title fs:G+X lh:1.2 mxw:G'
    },
    H6: {
      tx: 'Rebuilding features wastes time. Symbols enables frontend teams to build lego-like features. Ship or enhance production ready web projects in record time.',
      in: 'c:title fw:300 mxw:H2'
    },
    in: 'zi:2 fxf:y flexAlign:center ta:center c:title g:A'
  }
}

// ── RemainingLine ──
export const RemainingLine = {
  ":before": {
    cnt: '""',
    bg: 'linear-gradient(to right, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
    in: 'pos:absolute bsz:C_G2'
  },
  Flex: {
    "@rn": (el, s) => {
          el.setProps({
            width: s.percent + '%'
          })
        },
    Line: {
      bg: 'linear-gradient(to right, #0015FF, #0009FE)',
      in: 'bsz:2px_100%'
    },
    Dot: {
      bg: 'rgba(0, 9, 254, .35)',
      ":after": {
        cnt: '""',
        tf: 'translate(-50%, -50%)',
        in: 'bsz:X1_X1 bg:#0085FE pos:absolute tp:50% lft:50% rnd:100% op:1 zi:100'
      },
      in: 'bsz:A2_A2 rnd:100% m:-_-_-_-X pos:relative'
    },
    in: 'aln:center_flex-start w:65%'
  },
  Span: {
    tx: '{{ percent }}% already raised',
    in: 'fw:300'
  },
  in: 'g:Z aln:center_flex-start pos:relative mnw:100%'
}

// ── SideMenu ──
export const SideMenu = {
  bg: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
  ".activeMenu": {
    in: 'mnw:100% op:1 trn:min-width_.15s_ease'
  },
  "!activeMenu": {},
  "> nav > a": {
    in: 'fs:F2 fw:100'
  },
  "@mobileM": {
    in: 'ai:center ta:center'
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
  Logo: null,
  Nav: {
    "@tabletS": {
      in: 'd:flex'
    },
    "@mobileM": {
      in: 'p:-_0_-_-'
    },
    cp: {
      Strong: {
        in: 'fw:100'
      }
    },
    in: 'fxf:column g:B p:-_E_-_-'
  },
  P: null,
  Nav_2: {
    "@tabletS": {
      in: 'd:flex'
    },
    "@mobileM": {
      in: 'p:0_0_0_0'
    },
    cp: {
      Strong: {
        in: 'fw:100'
      },
      in: 'fw:100'
    },
    in: 'fxf:column p:-_C_-_- g:B'
  },
  MenuIcon: null,
  in: 'ext:LandingCampaignHeader mnw:0 fl:y g:B p:F1_0_0_0 ai:flex-end pos:fixed bdf:blur(5px) tp:0 rgt:0 zi:99999998 mnh:100% mxh:100% ov:hidden mxw:0 op:0 tg:aside'
}

// ── StoryItem ──
export const StoryItem = {
  props: {
    ":hover": {
      "> h3 + div": {
        in: 'op:1'
      },
      "> h3 + div:after": {
        in: 'w:75% op:1'
      },
      "> h3 + div > svg": {
        in: 'tf:rotate(90deg)'
      }
    },
    in: 'fl:y cur:pointer'
  },
  Box: {
    Img: {
      src: 'Frame.svg',
      in: 'bsz:100%_100% obf:cover'
    },
    Icon: {
      tf: 'translate(-50%, -50%)',
      in: 'nm:play fs:C rnd:100% pos:absolute tp:50% lft:50% zi:3 bg:black_.8 bxs:content-box p:Z'
    },
    in: 'pos:relative bsz:E3_F3 ov:hidden'
  },
  H3: {
    tx: 'Start creating features for your apps',
    in: 'fs:B2+X1 fw:100 mxw:F m:Z2_-_B2_- lh:1.3em'
  },
  IconText: {
    tx: 'Get started',
    Icon: {
      in: 'nm:chevronUp trn:transform_.5s_ease tf:rotate(45deg)'
    },
    ":after": {
      cnt: '""',
      trn: 'width .3s ease, opacity .5s ease',
      in: 'h:.5px w:0 op:0 bg:white_.75 pos:absolute bot:0 lft:B-V'
    },
    in: 'aln:center_flex-start fs:A1 fw:600 g:Y2 thm:transparent pos:relative mxw:fit-content p:0_0_X2_0 op:.8 c:white'
  },
  in: 'extend:Link,Flex'
}

// ── SupportedBy ──
export const SupportedBy = {
  "@mobileL": {
    in: 'fl:y aln:center_center p:-_B'
  },
  "@light": {},
  Caption: {
    tx: 'Supported by',
    in: 'fw:200'
  },
  Flex: {
    "@mobileL": {
      in: 'fxw:wrap'
    },
    cp: {
      "@light": {
        ":nth-child(odd)": {
          in: 'd:none'
        }
      },
      "@dark": {
        ":nth-child(even)": {
          in: 'd:none'
        }
      },
      ":nth-child(odd)": {},
      ":nth-child(even)": {}
    },
    ch: [
      {
        src: 'google_for_startups_light.png',
        in: 'mxw:F'
      },
      {
        src: 'google_for_startups_dark.png',
        in: 'mxw:F'
      },
      {
        src: 'gh_for_startups_light.png',
        in: 'w:E+Z2'
      },
      {
        src: 'gh_for_startups_dark.png',
        in: 'w:E+Z2'
      },
      {
        src: 'grafana_light.png',
        in: 'w:E+A2'
      },
      {
        src: 'grafana_dark.png',
        in: 'w:E+A2'
      }
    ],
    in: 'g:C cex:Img aln:center_center'
  },
  in: 'g:C aln:center'
}

// ── SurveyBanner ──
export const SurveyBanner = {
  bd: '1px, solid',
  "@dark": {
    in: 'bdc:gray4'
  },
  "@light": {
    in: 'bgc:white bdc:gray10'
  },
  Box: {
    H1: {
      tx: 'Only e2e tooling for Interface Engineers',
      lh: 1.3,
      in: 'mxw:F'
    },
    P: {
      tx: 'AI driven, realtime and centralized platform to build products as easily as filling Typeform and Airtable, also as powerful as Bubble and Figma.',
      in: 'mxw:G3+A m:Z1_0'
    },
    in: 'as:flex-end p:C2_D'
  },
  in: 'fl:x mnh:G1 bgi:banner.png bgr:no-repeat bgs:cover ar:1149_/_432 m:A_0'
}

// ── SurveyForm ──
export const SurveyForm = {
  "@mobileM": {
    in: 'rg:C p:B_0'
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
      in: 'val:{{_name_}}'
    }
  },
  "SurveyInput.email": {
    Title: {
      tx: 'Investor email'
    },
    Input: {
      in: 'val:{{_email_}}'
    },
    in: 'typ:email'
  },
  "SurveyTextarea.note": {
    Title: {
      tx: 'Note (optional)'
    },
    Textarea: {
      in: 'bd:0'
    }
  },
  ContinueButton: {
    tx: 'Book a call',
    sy: {
      justifySelf: 'start'
    },
    "@mobileL": {
      in: 'w:100%'
    },
    in: 'ext:Button,ContinueButton typ:submit p:Z2_D m:-_-Z fw:700'
  },
  in: 'ext:Grid tg:form pos:relative cg:C p:C2 rg:B2'
}

// ── SurveyInput ──
export const SurveyInput = {
  Title: {},
  Input: {
    sy: {
      width: '-webkit-fill-available'
    },
    phd: 'Please specify',
    at: {
      name: (el) => {
              const compRoot = el.parent
              const fieldKey = compRoot.key
              return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
            }
    },
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
        },
    in: 'thm:field m:-_-Z p:Z1_A2 req'
  },
  in: 'ext:SurveyLabel pos:relative aln:stretch_flex-start'
}

// ── SurveyLabel ──
export const SurveyLabel = {
  in: 'ext:GroupField mxw:H'
}

// ── SurveySelect ──
export const SurveySelect = {
  Title: {},
  DropdownField: {
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
      in: 'pos:absolute rgt:Z pe:none'
    },
    in: 'p:0 rnd:C1 tbi:-1 m:-_-Z'
  },
  SurveyOtherInput: {
    in: 'm:0_-Z'
  },
  in: 'ext:SurveyLabel'
}

// ── SurveyTextarea ──
export const SurveyTextarea = {
  Title: {},
  Textarea: {
    sy: {
      width: '-webkit-fill-available'
    },
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
    "@cg": (ev, el, s) => {
          const fieldKey = el.parent.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          s.update({
            [key]: ev.target.value
          })
        },
    in: 'thm:field m:-_-Z mxw:none p:Z1_A2 req bd:0'
  },
  in: 'ext:SurveyLabel w:100% pos:relative aln:stretch_flex-start'
}

// ── SymbolsEditor ──
export const SymbolsEditor = {
  MakeDesignWithCode: {
    in: 'm:-_auto'
  },
  Grid: {
    col: 'repeat(3, 1fr)',
    "@tabletL": {
      col: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      in: 'col:100%'
    },
    "@mobileS": {
      in: 'p:-_A'
    },
    cp: {
      Hgroup: {
        H: {
          in: 'c:title fs:A'
        },
        P: {
          in: 'c:caption'
        },
        in: 'pos:absolute zi:3 g:Y p:-_B_-_-'
      },
      Img: {
        in: 'd:block pos:absolute zi:1'
      },
      in: 'h:G3+X mxh:G3+X pos:relative ov:hidden rnd:A bg:gray3_.3'
    },
    ch: [
      {
        "@mobileL": {
          in: 'gc:span_1'
        },
        Hgroup: {
          "@mobileS": {
            in: 'tp:A2 lft:A2'
          },
          H: {
            tx: 'Voice and text input'
          },
          P: {
            tx: 'AI processing using GPT-4, Claude, Grok and more'
          },
          in: 'tp:B lft:B'
        },
        Img: {
          src: 'ai.svg',
          tf: 'translate(-50%, 0)',
          in: 'pos:absolute bot:0 lft:50%'
        },
        Download: {
          tx: 'Download',
          tf: 'translate(-50%, -50%)',
          "@mobileS": {
            in: 'tp:42% fs:Z1'
          },
          in: 'pos:absolute tp:52% lft:50% bg:electricBlue c:title p:Z_B rnd:D pointerEvent:none'
        },
        Flex: {
          tf: 'translate(-50%, -50%)',
          "@mobileL": {
            in: 'fl:y bot:B'
          },
          "@mobileM": {
            in: 'bot:Y g:A'
          },
          IconText: {
            "@mobileM": {
              in: 'fl:y g:Y2 aln:center_flex-start ta:center p:-_B lh:1.3em'
            },
            "@mobileS": {
              in: 'fs:A2'
            },
            Icon: {
              in: 'nm:microphone fs:C'
            },
            tx: '"Make this component wider, pink and add magic icon"',
            in: 'g:Y c:title fw:500'
          },
          Button: {
            tx: 'Try it (soon)',
            in: 'thm:transparent p:0 c:title fw:300 cur:pointer'
          },
          in: 'pos:absolute bot:B lft:50% mnw:100% mxw:100% aln:center_center g:A2'
        },
        in: 'gc:span_2'
      },
      {
        Hgroup: {
          "@mobileS": {
            in: 'bot:A2 lft:A2'
          },
          H: {
            tx: 'Branding as Design System'
          },
          P: {
            tx: 'Turn your branding into a system your apps use'
          },
          in: 'bot:B lft:B'
        },
        Img: {
          src: 'designSystem.svg',
          "@mobileL": {
            in: 'op:.5'
          },
          "@mobileM": {
            in: 'op:1'
          },
          "@mobileS": {
            in: 'tp:C'
          },
          in: 'w:100% tp:B1'
        }
      },
      {
        Hgroup: {
          "@mobileS": {
            in: 'bot:A2 lft:A2'
          },
          H: {
            tx: 'Version history'
          },
          P: {
            tx: 'Time travel and individually compare your changes',
            "@screenS": {
              in: 'mxw:G'
            },
            "@mobileL": {
              in: 'mxw:fit-content'
            },
            "@mobileS": {
              in: 'mxw:F3'
            }
          },
          in: 'bot:B lft:B'
        },
        Img: {
          src: 'versioning.svg',
          "@mobileS": {
            in: 'tp:B1 rgt:B1'
          },
          in: 'tp:B2 rgt:B2'
        }
      },
      {
        "@mobileL": {
          in: 'gc:span_1'
        },
        Hgroup: {
          "@mobileL": {
            in: 'tp:A2 lft:A2'
          },
          H: {
            tx: 'Infinite Canvas'
          },
          P: {
            tx: 'Put your resources in transparent and clear organization'
          },
          in: 'tp:B lft:B'
        },
        Img: {
          src: 'canvas.svg',
          "@mobileL": {
            in: 'tp:F'
          },
          "@mobileM": {
            in: 'tp:F'
          },
          in: 'w:100% tf:scale(1.12) tp:E+A1'
        },
        in: 'bgi:scene.svg bgs:cover bgr:no-repeat bgp:center_center gc:span_2'
      },
      {
        Hgroup: {
          "@mobileL": {
            in: 'tp:A1 lft:A'
          },
          H: {
            tx: 'Customize without code'
          },
          P: {
            tx: 'Online editor with and without coding changes'
          },
          in: 'tp:A2 lft:B'
        },
        Img: {
          src: 'calculate.svg',
          "@mobileL": {
            in: 'tf:scale(1.3) tp:E3 rgt:0'
          },
          "@mobileM": {
            in: 'tf:scale(1.2) rgt:-Z1'
          },
          "@mobileS": {
            in: 'tf:scale(1) rgt:-D1 tp:E1'
          },
          in: 'tp:E+Z rgt:-C tf:scale(1.12)'
        }
      },
      {
        Hgroup: {
          "@mobileL": {
            in: 'tp:A1 lft:A'
          },
          H: {
            tx: 'Synchronisation'
          },
          P: {
            tx: 'Get simultanious synchronisation to your local and to the live website',
            in: 'mxw:G1'
          },
          in: 'tp:A2 lft:B'
        },
        Img: {
          src: 'rock.svg',
          "@screenS": {
            in: 'lft:C2'
          },
          "@tabletL": {
            in: 'lft:E2'
          },
          "@tabletM": {
            in: 'lft:E'
          },
          "@tabletS": {
            in: 'lft:C1'
          },
          "@mobileL": {
            in: 'lft:E3'
          },
          "@mobileM": {
            in: 'lft:D2'
          },
          "@mobileS": {
            in: 'lft:0 tf:scale(.8)'
          },
          "@mobileXS": {
            in: 'lft:-B1'
          },
          in: 'tp:E+A1 lft:D1'
        }
      },
      {
        Hgroup: {
          "@mobileL": {
            in: 'bot:A2 lft:A2'
          },
          H: {
            tx: 'Cross Delivery'
          },
          P: {
            tx: 'Universal by design, we support the most popular frameworks and tools to get your onboard faster',
            in: 'mxw:G2'
          },
          in: 'bot:B lft:B'
        },
        ":after": {
          cnt: '""',
          bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          in: 'pos:absolute bsz:100%_100% zi:2'
        },
        Img: {
          src: 'platforms.svg',
          "@mobileL": {
            in: 'tf:scale(1.2) tp:D lft:E'
          },
          "@mobileM": {
            in: 'tf:scale(1) tp:B lft:B'
          },
          in: 'tp:B lft:B'
        }
      }
    ],
    in: 'w:100% mxw:100% cex:Box m:0_auto g:B p:-_B'
  },
  in: 'fl:y aln:flex-start_flex-start mnw:320px w:100% m:-_auto mxw:1560px mxh:100% g:D'
}

// ── SymbolsFeatures ──
export const SymbolsFeatures = {
  P: {
    tx: 'Whatever you create in Symbols',
    Span: {
      tx: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.',
      in: 'fw:100'
    },
    "@tabletS": {
      in: 'p:D2_B1'
    },
    "@mobileL": {
      in: 'fs:B2'
    },
    in: 'fs:A2+X ta:center mxw:H+C fw:700 p:D2_- c:title m:-_auto'
  },
  Scrollable: {
    "::-webkit-scrollbar": {
      in: 'd:none'
    },
    "@tabletS": {
      in: 'p:B'
    },
    "@mobileS": {
      sy: {
        scrollSnapType: 'x mandatory'
      },
      in: 'g:B1 p:A1 spd:A1'
    },
    cp: {
      "@mobileS": {
        in: 'p:E2_B_B_B'
      },
      Icon: {},
      H3: {
        "@mobileS": {
          in: 'fs:D2'
        }
      }
    },
    ch: [
      {
        hrf: '/docs/components',
        ":hover": {
          in: 'bg:#1E2397'
        },
        Icon: {
          in: 'nm:grid'
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
          "& h3": {
            in: 'c:highlight-reversed'
          },
          "& span": {
            in: 'c:highlight-reversed'
          },
          in: 'bg:#FFF263 c:highlight-reversed'
        },
        Icon: {
          in: 'nm:tree'
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
          "& h3": {
            in: 'c:highlight-reversed'
          },
          "& span": {
            in: 'c:highlight-reversed'
          },
          in: 'bg:#5FCCD6 c:highlight-reversed'
        },
        Icon: {
          in: 'nm:fn_outline'
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
          in: 'bg:#2127A7'
        },
        Icon: {
          in: 'nm:folder_outline'
        },
        H3: {
          tx: 'Files and assets on the cloud - ',
          Span: {
            tx: 'instant access in the code, no assets sharing anymore!'
          },
          in: 'p:-_V2+V2_-_-'
        }
      },
      {
        ":hover": {
          "& h3": {
            in: 'c:title-reversed'
          },
          "& span": {
            in: 'c:title-reversed_.9'
          },
          in: 'c:title-reversed bg:#FFFFFF'
        },
        Icon: {
          in: 'nm:state'
        },
        H3: {
          tx: 'Content and state management - in one',
          Span: {
            tx: ' CMS unifies content and state driven flows into one dashboard.'
          },
          in: 'p:-_W_-_-'
        }
      },
      {
        hrf: '/docs/pages',
        ":hover": {
          in: 'bg:#A823F6'
        },
        Icon: {
          in: 'nm:content'
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
          in: 'bg:#BC0025'
        },
        Icon: {
          in: 'nm:bug'
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
          in: 'bg:line'
        },
        Icon: {
          in: 'nm:api'
        },
        H3: {
          tx: 'Symbols is an ecosystem ',
          Span: {
            tx: ' single source of truth to build frontend locally and in cloud - in realtime.',
            in: 'd:block'
          }
        }
      }
    ],
    in: 'mxw:100% ovx:auto g:B2 p:-_B_A_B aln:start cex:FeatureItem'
  },
  Scrollbar: {
    "@mobileS": {
      in: 'mxw:88% mnw:88%'
    },
    in: 'ext:Scrollbar.scrollable mxw:95% mnw:95% m:-_auto'
  },
  in: 'mxw:100% bd:1px_solid_transparent p:0_!important'
}

// ── TestimonialCard ──
export const TestimonialCard = {
  "@mobileL": {
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

// ── Testimonials ──
export const Testimonials = {
  Hgroup: {
    "@mobileL": {
      in: 'p:-_B'
    },
    H: {
      tx: 'What people say',
      in: 'tg:h6 fw:600 m:0 c:title'
    },
    P: {
      tx: 'Trusted by engineers, designers, and teams worldwide.',
      in: 'c:caption fw:400'
    },
    in: 'tg:header fl:y g:A p:-_D w:100% m:-_auto mxw:I2*2'
  },
  Scrollable: {
    "@mobileL": {
      sy: {
        scrollSnapType: 'x mandatory'
      },
      in: 'p:A_B'
    },
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
    ],
    in: 'g:B p:A_B aln:flex-start cex:TestimonialCard'
  },
  in: 'fl:y g:C w:100% pos:relative'
}

// ── ThankYou ──
export const ThankYou = {
  H2: {
    tx: 'Thank you',
    lh: 1,
    in: 'fw:300'
  },
  Grid: {
    col: 'repeat(2, 1fr)',
    cp: {
      in: 'm:0'
    },
    ch: [
      {
        tx: 'Thanks for scrolling that far. We are open to answer your questions. Just talk to us to personalise your experience.'
      }
    ],
    in: 'm:B_0_D g:B_7% cex:P'
  },
  in: 'p:C2'
}

// ── UserFeedBack ──
export const UserFeedBack = {
  Avatar: {
    src: 'james.svg',
    in: 'bsz:C2+Y2_C2+Y2'
  },
  Flex: {
    Strong: {
      tx: 'James Harris',
      in: 'c:title'
    },
    Caption: {
      tx: 'Frontend Developer',
      in: 'fw:100'
    },
    P: {
      tx: 'This is awesome. I love it. Symbols is doing great work.',
      in: 'm:Y1_-_-_- mxw:F2 mnw:F2 p:Y1_Y2_Z_Z2 thm:field c:title rnd:Y2_A_A_A'
    },
    in: 'fl:y ai:flex-start'
  },
  in: 'fl:x g:Z1'
}

// ── UserStoryDone ──
export const UserStoryDone = {
  "@mobileM": {
    in: 'p:F_B1_E_B1'
  },
  Hgroup: {
    H: {
      tx: 'User Story?',
      "@mobileXS": {
        in: 'd:flex fxf:column g:Y'
      },
      Strong: {
        tx: ' boom, done!'
      },
      in: 'c:title fw:100 tg:h1'
    },
    P: {
      tx: 'You have all the power to close tickets in minutes now. With help of AI and marketplace, you can drag and drop, prompt features and customize as you want.',
      in: 'fs:A2 fw:300 mxw:G3+B'
    },
    in: 'aln:center_flex-start ta:center g:A1'
  },
  Button: {
    hrf: '/signup',
    tx: 'Try it out',
    bd: 'solid, gray, 1px',
    in: 'ext:DocsLink,Button fw:700 thm:field p:Z1_D+Y2'
  },
  in: 'fl:y aln:center_flex-start g:D'
}

// ── WaitlistForm ──
export const WaitlistForm = {
  st: {
    status: 'idle',
    error: ''
  },
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
    phd: 'Enter your email',
    in: 'w:G thm:transparent typ:email req'
  },
  Button: {
    tx: 'Get notified',
    Icon: {
      od: 2,
      in: 'fs:B'
    },
    in: 'thm:primary ico:arrow_up_right g:X2 p:Z2_B_Z2_B2'
  },
  in: 'tg:form thm:field rnd:C1 fl:x p:X'
}

// ── WhatIsSymbols ──
export const WhatIsSymbols = {
  H2: {
    tx: null,
    Strong: {
      tx: 'Industry leading benefits'
    },
    Text: {
      tx: 'Game changing ways of building features',
      in: 'fw:100'
    },
    in: 'ta:center m:-_auto_A c:title lh:1.3em'
  },
  Grid: {
    tcol: 'repeat(3, 1fr)',
    "@tabletM": {
      tcol: 'repeat(2, 1fr)'
    },
    "@mobileL": {
      tcol: 'repeat(1, 1fr)'
    },
    cp: {
      fx: 1,
      ":hover": {
        "& h5, &:after": {
          op: 0,
          tf: 'translate3d(0, 35%, 0)'
        }
      },
      Video: {
        src: '{{ src }}',
        onMouseenter: (ev, el) => {
                  el.node.play()
                },
        onMouseleave: (ev, el) => {
                  el.node.pause()
                },
        in: 'w:100% zi:2 rnd:A ar:11_/_7 obf:cover !autoplay !ctl lp'
      },
      ":after": {
        cnt: '""',
        bg: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        trnp: 'opacity, transform',
        in: 'pos:absolute bot:0 bsz:50%_100% zi:2 trn:Z_defaultBezier pe:none'
      },
      H5: {
        tx: '{{ text }}',
        trnp: 'opacity, transform',
        in: 'pos:absolute bot:0 w:90% c:title fw:bold zi:3 p:A trn:Z_defaultBezier pe:none'
      },
      in: 'pos:relative fl:y'
    },
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
    ],
    in: 'g:A m:0_auto aln:center_center cex:Flex cha:state'
  },
  in: 'fl:y aln:center_center g:B2'
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

