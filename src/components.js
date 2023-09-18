'use strict'

import { create, Flex, Checkbox, Radio, ToggleSwitch, CheckBoxWithLabel, RadioWithLabel, ToggleSwithWithLabel } from "smbls"

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
  toggleSwitchWithLabel: { extend: ToggleSwithWithLabel }
}, {
  designSystem: {
    ...designSystem
  },
})