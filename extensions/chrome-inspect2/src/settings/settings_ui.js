import {
  getSettings,
  updateSettings,
  settingsDefinitions
} from './settings_utils'

const container = document.getElementById('settings-container')

const curSettings = await getSettings()

// Build settings UI from definitions
settingsDefinitions.forEach(({ key, name, type, default: defValue }) => {
  const input = document.createElement('input')
  input.id = key
  input.type = type

  if (!(key in curSettings)) {
    console.error(`Setting ${key} missing value`, curSettings)
  }

  const value = curSettings[key] ?? defValue ?? null

  if ((defValue ?? null) !== null) {
    input.defaultValue = defValue
  }

  if ((value ?? null) !== null) {
    if (type === 'checkbox') {
      input.checked = value
    } else {
      input.value = value
    }
  }

  const label = document.createElement('label')
  label.htmlFor = key
  label.textContent = name

  const wrapper = document.createElement('div')
  wrapper.classList.add('setting')

  wrapper.append(label)
  wrapper.append(input)

  container.append(wrapper)

  input.addEventListener('change', (event) => {
    const val = type === 'checkbox' ? event.target.checked : event.target.value

    updateSettings({ [key]: val })
  })
})
