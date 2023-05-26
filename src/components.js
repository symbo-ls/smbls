'use strict'

import {
  create, Flex, Checkbox, Radio, ToggleSwitch, CheckBoxWithLabel,
  RadioWithLabel, ToggleSwithWithLabel
} from "smbls"

import { TimePicker } from "./components/TimePicker"
import { DatePicker, DatePickerTwoColumns } from "./components/DatePicker"

import designSystem from '@symbo.ls/default-config'
console.log(designSystem)

create({
  extend: Flex,
  props: { flow: 'column'},

  checkBox: { extend: Checkbox },
  radioButton: { extend: Radio },
  toggleSwitch: { extend: ToggleSwitch },
  checkBoxWithLabel: { extend: CheckBoxWithLabel },
  radioWithLabel: { extend: RadioWithLabel },
  toggleSwitchWithLabel: { extend: ToggleSwithWithLabel },
  timePicker: { extend: TimePicker },
  datePicker: { extend: DatePicker },
  datePicker2: { extend: DatePickerTwoColumns }
}, {
  designSystem: {
    ...designSystem
  },
})
