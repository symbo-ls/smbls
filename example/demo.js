'use strict'

import { create } from '@symbo.ls/create'
import { Flex } from '@symbo.ls/atoms'
import { SearchWithButton } from '@symbo.ls/field'

import designSystem from '@symbo.ls/default-config'
designSystem.globalTheme = 'dark'

create({
  extend: Flex,

  header: {
    extend: Flex,
    title: {
      tag: 'h1',
      props: { text: 'components' }
    }
  },

  content: {
    extend: Flex,

    StatusIndicator: {},
    Avatar: {},
    AvatarIndicator: {},
    AvatarBundle: {},
    AvatarChooser: {
      options: [{
        text: 'Kevin'
      }, {
        text: 'John'
      }]
    },
    TitleParagraph: {},
    User: {},
    Label: {},
    UserWithLabel: {},
    CountIndicator: {},
    ChatUser: {},
    UserButtonSet: {},
    UserMessage: {},
    UserWithButton: {},

    CommonButton: {},
    CancelConfirmButtons: {},
    IconCommonButton: {},
    IcontextButton: {},

    Tab: {},
    IconTab: {},
    TitleParagraphWithButton: {},
    Modal: {},
    Message: {},
    SuccessIndicator: {},
    CompleteProcess: {},
    UploadButtonWithIcon: {},
    UploadLabel2: {},
    UploadModal: {},
    UploadModal3: {},
    UploadButton: {},
    UploadLabel: {},
    UploadModal2: {},
    UploadImage: {},
    DoubleUnitValue: {},
    ProgressLine: {},
    UploadingProcess: {},
    UploadedProcess: {},
    UnitValue: {
      Value: { text: '2:20' },
      Unit: { text: 'AM' }
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
    CheckboxTitleParagraph: {},
    RadioTitleParagraph: {},
    ToggleTitleParagraph: {},

    Field: {},
    FieldTemplate: {},
    CommonField: {},
    CommonFieldTemplate: {},
    Textarea: {},
    TextareaWithButton: {},
    NumberField: {},
    ParagraphButton: {},
    VerificationCode: {},
    ResetPassword: {},
    ParagraphButtonWithCheckbox: {},
    ContactForm: {},
    SignUp: {},
    DoubleHr: {},
    SocialLink: {},
    LogIn: {},
    SlideTabs: {},

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
    LineStepsWithTitleParagraph: {},

    StepCard: {},
    UnitValueWithLabel: {},
    BalanceCard: {},
    UnitValueWithTitle: {},
    DropDownButtonWithAvatar: {},
    ConvertCard: {},
    CurrencyConvert: {},
    PlusMinusButtons: {},
    Pracing: {},

    DatePicker: {},
    TimePicker: {},

    state: { globalTheme: 'dark' }
  },

  footer: {
    extend: Flex,
    Search: {
      extend: SearchWithButton,
      props: {
        minWidth: 'G+C',
        minHeight: 'C+X',
        maxHeight: 'C+Z',
        round: 'C',
        padding: '- A+W - A+Y',
        border: '1px solid #3F3F43',
        background: 'transparent'
      },
      Input: {
        fontSize: 'Z1',
        placeholder: 'find component ...',
        ':focus ~ svg': { opacity: '0' }
      },
      Icon: {
        props: {
          fontSize: 'C',
          color: '#3F3F43'
        }
      },
      Button: {
        position: 'absolute',
        margin: 'auto',
        right: 'Z',
        color: '#3F3F43'
      }
    }
  },

  props: {
    fontFamily: 'avenir',
    ':before': {
      content: '""',
      boxSize: 'E 100%',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '10',
      background: ' linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      pointerEvents: 'none'
    },
    ':after': {
      content: '""',
      boxSize: 'E 100%',
      position: 'fixed',
      bottom: '0',
      left: '0',
      zIndex: '10',
      background: ' linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      pointerEvents: 'none'
    },

    header: {
      zIndex: '51',
      background: 'transparent',
      height: '100%',
      minWidth: 'D',
      align: 'flex-end flex-end',
      border: 'solid, #252527',
      borderWidth: '0 1.5px 0 0',
      padding: '- Z C -',
      position: 'fixed',
      flow: 'column',
      title: {
        transform: 'rotate(180deg)',
        textTransform: 'capitalize',
        fontSize: 'C',
        color: 'white',
        margin: '0',
        padding: '0',
        letterSpacing: '1px',
        style: {
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }
      }
    },

    content: {
      flow: 'column',
      padding: 'F E E D',
      gap: 'E+C',
      minWidth: 'calc(100% - 70px)',
      height: '100%',
      margin: '- - - auto',
      style: {
        overflowY: 'auto',
        scrollBehavior: 'smooth'
      }
    },

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
  }
}, {
  designSystem,
  state: {
    globalTheme: 'dark'
  }
})
