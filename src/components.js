'use strict'

import {
  create, Flex, Checkbox, Radio, ToggleSwitch, CheckBoxWithLabel,
  RadioWithLabel, ToggleSwithWithLabel, Steps, Tab, TimePicker
} from "smbls"

import { DatePicker, DatePickerTwoColumns } from "./components/DatePicker"
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

  checkBox: { extend: Checkbox },
  radioButton: { extend: Radio },
  toggleSwitch: { extend: ToggleSwitch },
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
