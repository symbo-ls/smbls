'use strict'

import {
  create, Flex, CheckBoxWithLabel,
  RadioWithLabel, ToggleSwithWithLabel, Steps, Tab, TimePicker,
  DatePicker, DatePickerTwoColumns
} from "smbls"

import { Search } from "./components/Search"
import { FieldSet } from "./components/FieldSet"
import { DropDownItem } from "./components/DropDownItem"

import designSystem from '@symbo.ls/default-config'
console.log(designSystem)
designSystem.globalTheme = 'dark'

create({
  extend: Flex,
  props: {
    flow: 'column',
    padding: 'E',
    gap: 'D'
  },
  state: {
    globalTheme: 'dark',
  },
  Avatar: {},
  IndicatorDot: {},
  NotificationAlert: {},
  DateIndicator: {},
  AvatarWithIndicator: {},
  InfoSet: {},
  User: {},
  ChatUser: {},
  ChatUserWithUploadedFile: {},
  ChatUserWithButtonSet: {},
  ChatUserWithNotification: {},
  CardLabel: {},
  Card: {},
  DropDownWithAvatar: {},
  ConvertCard: {},
  Checkbox: {},
  Radio: {},
  ToggleSwitch: {},
  checkBoxWithLabel: { extend: CheckBoxWithLabel },
  radioWithLabel: { extend: RadioWithLabel },
  toggleSwitchWithLabel: { extend: ToggleSwithWithLabel },
  timePicker: { extend: TimePicker },
  datePicker: { extend: DatePicker },
  datePicker2: { extend: DatePickerTwoColumns },
  search: { extend: Search },
  fieldSet: { extend: FieldSet },
  UploadResult: {},
  UploadLabel: {},
  UploadModal: {},
  dropDownItem: { extend: DropDownItem },
  tab: { extend: Tab },
  steps: { extend: Steps },
}, {
  designSystem,
  state: {
    globalTheme: 'dark',
  }
})
