'use strict'

import { Avatar, SearchWithButton } from '@symbo.ls/uikit'

export const ComponentsView = {
  extends: 'Flex',

  state: {
    globalTheme: 'dark',
    value: ''
  },

  fontFamily: 'avenir',
  ':before': {
    content: '""',
    boxSize: 'E 100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '10',
    background:
      ' linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none'
  },
  ':after': {
    content: '""',
    boxSize: 'E 100%',
    position: 'fixed',
    bottom: '0',
    left: '0',
    zIndex: '10',
    background:
      ' linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
    footer: {
      position: 'fixed',
      width: 'calc(100% - 70px)',
      zIndex: '100',
      bottom: '0',
      right: '0',
      align: 'center flex-end',
      padding: '- B B -',
      '@media only screen and (max-width: 480px)': {
        justifyContent: 'center',
        padding: '- 20px 30px 20px'
      },
      search: {
        fontFamily: 'avenir',
        fontWeight: '400',
        round: 'D',
        flow: 'row',
        border: 'solid, #252527',
        borderWidth: '1px',
        width: 'G+D',
        padding: 'Z A Z B',
        position: 'relative',
        Icon: {
          boxSize: 'A+V A+V',
          color: '#3F3F43'
        },
        input: {
          fontFamily: 'avenir',
          placeholder: 'find component . . .',
          fontSize: 'A',
          ':focus ~ svg': { opacity: '0' }
        },
        x: {
          color: 'white',
          position: 'absolute',
          right: 'A'
        }
      }
    }
  },

  Cnt: {
    extends: 'Flex',

    flow: 'column',
    padding: 'F E E D',
    gap: 'E+C',
    minWidth: 'calc(100% - 70px)',
    height: '100dvh',
    margin: '- - - auto',
    style: {
      overflowY: 'auto',
      scrollBehavior: 'smooth'
    },

    childExtends: {
      props: ({ key, state }) => ({
        hide: !key.toLowerCase().includes(state.value),
        position: 'relative'
      }),
      __title: {
        props: {
          ignoreChildExtends: true,
          position: 'absolute',
          left: '0',
          top: '-C',
          fontSize: '14px',
          color: 'white .35'
        },
        text: ({ parent }) => parent.key
      }
    },

    H1: {
      hide: false,
      Title: { text: 'Searched value:' },
      text: ({ state }) => state.value
    },

    StatusIndicator: {},
    Avatar: {},
    AvatarIndicator: {},
    AvatarBundle: {
      childExtends: Avatar,
      ...[{}, {}, {}]
    },
    AvatarChooser: {
      options: [
        {
          text: 'Kevin'
        },
        {
          text: 'John'
        }
      ]
    },
    Hgroup: {
      Title: { text: 'Title' },
      Paragraph: { text: 'Paragraph' }
    },
    User: {
      Avatar: {},
      Notes: {
        Title: { text: 'Erin Schleifer' },
        Paragraph: { text: 'email@symbols.com' }
      }
    },
    Label: {},
    UserWithLabel: {},
    CountIndicator: {},
    ChatUser: {},
    UserButtonSet: {},
    UserButtonSetCircle: {},
    UserMessage: {},
    UserWithButton: {},

    FlexButton: {},
    CancelConfirmButtons: {},
    SquareButton: {},

    Tab: {},
    IconTab: {},
    Modal: {},
    Message: {},
    SuccessIndicator: {},
    CompleteProcess: {},
    UploadButton: {},
    UploadLabel: {},
    UploadFooter: {},
    UploadModal: {},
    UploadButtonWithBackground: {},
    UploadLabel2: {},
    UploadModal2: {},
    UploadModal3: {},
    UploadImage: {},
    DoubleUnitValue: {},
    ProgressLine: {},
    UploadingProcess: {},
    UploadedProcess: {},
    UnitValue: {
      Value: { text: '72' },
      Unit: { text: '%' }
    },
    ProgressLineWithUnitValue: {},
    UploadingProcess2: {},
    UploadedProcess2: {},
    ProgressCircleWithSideUnitValue: {},
    UploadingProcess3: {},
    UploadedProcess3: {},
    ProgressCircle: {},
    ProgressCircleWithIcon: {},
    ProgressCircleWithUnitValue: {},
    UploadingProcess4: {},
    UploadedProcess4: {},
    UploadModal4: {},

    Checkbox: {},
    Radio: {},
    Toggle: {},
    NumberInput: {},

    Field: {},
    FieldTemplate: {},
    FieldWithTitle: {},
    FieldWithTitleTemplate: {},
    TextAreaField: {},

    ParagraphButton: {},
    VerificationCode: {},
    ResetPassword: {},
    ParagraphButtonWithCheckbox: {},
    ContactForm: {},
    SignUp: {},
    DoubleHr: {},
    SocialLink: {},
    LogIn: {},

    Search: {},
    SearchWithButton: {},
    DropDownButton: {},
    SearchWithDropDownButton: {},
    ListTemplate: {},
    ListWithTitleTemplate: {},
    GroupListTemplate: {},
    GroupListWithSearchTemplate: {},

    CheckIndicator: {},
    CheckIndicatorWithLabel: {},
    CheckStep: {},
    CheckSteps: {},
    RadioIndicator: {},
    RadioIndicatorWithLabel: {},
    RadioStep: {},
    RadioSteps: {},
    LineSteps: {},
    LineStepsWithHgroup: {},

    StepCard: {},
    UnitValueWithLabel: {},
    BalanceCard: {},
    UnitValueWithTitle: {},
    DropDownButtonWithAvatar: {},
    ConvertCard: {},
    CurrencyConvert: {},
    PlusMinusButtons: {},
    Pricing: {},

    DatePicker: {},
    TimePicker: {}
  },

  footer: {
    extends: 'Flex',
    Search: {
      extends: SearchWithButton,
      minWidth: 'G+C',
      minHeight: 'C+X',
      maxHeight: 'C+Z',
      round: 'C',
      padding: '- A+W - A+Y',
      border: '1px solid #3F3F43',
      background: 'transparent',
      Input: {
        fontSize: 'Z1',
        placeholder: 'Find component ...',
        ':focus ~ svg': { opacity: '0' },
        onKeyup: (event, el, s) => {
          const value = el.node.value.toLowerCase()
          s.update({ value })
        }
      },
      Icon: {
        fontSize: 'C',
        color: '#3F3F43'
      },
      Button: {
        position: 'absolute',
        margin: 'auto',
        right: 'Z',
        color: '#3F3F43'
      }
    }
  }
}
