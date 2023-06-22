'use strict'

import {
  create, Flex, Checkbox, Radio, ToggleSwitch, CheckBoxWithLabel,
  RadioWithLabel, ToggleSwithWithLabel
} from "smbls"

import { TimePicker } from "./components/TimePicker"
import { DatePicker, DatePickerTwoColumns } from "./components/DatePicker"
import { Search } from "./components/Search"
import { FieldSet } from "./components/FieldSet"
import { FileUpload } from "./components/FileUpload"
import { Upload } from "./components/Upload"
import { DropDownItem } from "./components/DropDownItem"
import { Tab } from "./components/Tab"
import { Steps } from "./components/Steps"

import designSystem from '@symbo.ls/default-config'
console.log(designSystem)

create({
  extend: Flex,
  props: {
    flow: 'column',
    padding: 'E',
    gap: 'D'
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
  fileUploud: { extend: FileUpload },
  upload: { extend: Upload },
  dropDownItem: { extend: DropDownItem },
  tab: { extend: Tab },
  steps: { extend: Steps }
}, {
  designSystem: {
    ...designSystem
  },
})
