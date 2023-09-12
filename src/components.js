'use strict'

import { create, Flex, Search } from "smbls"

import designSystem from '@symbo.ls/default-config'
console.log(designSystem)
designSystem.globalTheme = 'dark'

create({
  extend: Flex,

  header: {
    extend: Flex,
    title: {
      tag: 'h1',
      props: { text: 'components'}
    }
  },

  content: {
    extend: Flex,

    IndicatorDot: {},
    CheckIndicator: {},
    CheckIconWIthBorder: {},
    CheckBox: {},
    RadioButton: {},
    ToggleSwitch: {},
    TitleParagraph: {},
    TitleParagraphWithButton: {},
    Label: {},
    NotificationIndicator: {},
    CustomizedField: {},
    FieldWithIcon: {},
    FieldWithTitle: {},
    FieldWithDescription: {},
    CommonField: {},
    FieldWithAllSet: {},
    CodeField: {},
    DropDownButton: {},
    Search: {},
    SearchWithDropDownButton: {},
    UploadButton: {},
    UploadButtonWithIcon: {},
    UploadLabel: {},
    UploadLabel2: {},
    UnitValue: {},
    ProgressLine: {},
    ProgressLineWithUnitValue: {},
    ProgressCircle: {},
    ProgressCircleWithIcon: {},
    ProgressCircleWithUnitValue: {},
    ProgressCircleWithSideUnitValue: {},
    DoubleUnitValue: {},
    UploadingProcess: {},
    UploadedProcess: {},
    UploadingProcess4: {},
    UploadedProcess4: {},
    UploadingProcess2: {},
    UploadedProcess2: {},
    UploadingProcess3: {},
    UploadedProcess3: {},
    Modal: {},
    UploadFileModal: {},
    UploadFileModal2: {},
    UploadFileModal3: {},
    UploadFileModal4: {},
    UploadFileModal5: {},

    // IndicatorDot: {},
    // NotificationAlert: {},
    // Avatar: {},
    // AvatarWithIndicator: {},
    // CheckMark: {},
    // DateIndicator: {},
    // BalancesIndicator: {},
    // CardLabel: {},
    // AmountWithLabel: {},

    // InfoSet: {},
    // AvatarWithInfoSet: {},
    // ChatUser: {},
    // ChatUserWithUploadedFile: {},
    // ChatUserWithButtonSet: {},
    // ChatUserWithNotification: {},
    // Card: {},
    // DropDownWithAvatar: {},
    // ConvertCard: {},
    // ConvertBoard: {},
    // AvatarInfoSetWithLabel: {},
    // AvatarInfoSetWithButton: {},
    // AvatarBundle: {},
    // AvatarBundleInfoSet: {},
    // IconTextWithNotification: {},
    // Search: {},
    // CustomizedField: {},
    // FieldWithTitle: {},
    // CodeField: {},
    // ParagraphWithUnderlineButton: {},
    // ParagrapUnderlineLinkWithCheckbox: {},
    // TitleParagraph: {},
    // SlideTabs: {},
    // SlideTabsWithTitleParagraph: {},
    // CancenConfirmButtons: {},
    // Modal: {},
    // ModalWithTitleParagraph: {},
    // ResetCompleteModal: {},
    // MessageModal: {},
    // ChangePasswordModal: {},
    // VerificationCodeModal: {},
    // ContactForm: {},
    // SignUpForm: {},
    // SlideTabsCard: {},

    // Checkbox: {},
    // Radio: {},
    // // ToggleSwitch: {},
    // checkBoxWithLabel: { extend: CheckBoxWithLabel },
    // radioWithLabel: { extend: RadioWithLabel },
    // toggleSwitchWithLabel: { extend: ToggleSwithWithLabel },
    // timePicker: { extend: TimePicker },
    // datePicker: { extend: DatePicker },
    // datePicker2: { extend: DatePickerTwoColumns },
    // search: { extend: Search },
    // fieldSet: { extend: FieldSet },
    // UploadResult: {},
    // UploadLabel: {},
    // UploadModal: {},
    // dropDownItem: { extend: DropDownItem },
    // tab: { extend: Tab },
    // steps: { extend: Steps },
    state: { globalTheme: 'dark'}
  },

  footer: {
    extend: Flex,
    search: {
      extend: Search,
      input: {},
      Icon: {},
      x: {}
    }
  },

  props: {
    // position: 'relative',
    fontFamily: 'avenir',
    // boxSize: '100% 100%',
    // overflow: 'hidden',
    ':before': {
      content: '""',
      boxSize: 'F 100%',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '10',
      background:' linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      pointerEvents: 'none'
    },
    ':after': {
      content: '""',
      boxSize: 'F 100%',
      position: 'fixed',
      bottom: '0',
      left: '0',
      zIndex: '10',
      background:' linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
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
        color: 'white',
        transform: 'rotate(180deg)',
        textTransform: 'capitalize',
        fontSize: 'C',
        color: 'white',
        margin: '0',
        padding: '0',
        letterSpacing: '1px',
        // fontWeight: '900',
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
      style: { overflowY: 'auto'},
      scrollBehavior: 'smooth',
      '::-webkit-scrollbar': { display: 'none' }
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
        border: 'none',
        round: 'D',
        flow: 'row',
        border: 'solid, #252527',
        borderWidth: '1px',
        width: 'G+D',
        padding: 'Z A Z B',
        minHeight: 'C+Z',
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
          right: 'Y',
          color: 'white',
          position: 'absolute',
          right: 'A'
        }
        }
      }
  },

}, {
  designSystem,
  state: {
    globalTheme: 'dark',
  }
})
