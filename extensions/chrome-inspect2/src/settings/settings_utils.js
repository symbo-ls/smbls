/**
 * @typedef {Object} Settings
 * @property {boolean} useComputed
 * @property {boolean} useStylesheets
 */

const storageKey = 'settings'

/**
 * @typedef {Object} SettingDefinition
 * @property {string} type
 * @property {String} name
 * @property {string} [key]
 * @property {any} [default]
 * @property {value} [any]
 */

/**
 * @type {SettingDefinition[]}
 */
export const settingsDefinitions = [
  {
    key: 'useStylesheets',
    name: 'Use Stylesheets',
    type: 'checkbox',
    default: true
  },
  {
    key: 'useComputed',
    name: 'Use Computed',
    type: 'checkbox',
    default: false
  }
]

/**
 * @returns {Promise<Settings>}
 */
export const getSettings = async () =>
  (await chrome.storage.local.get(storageKey)).settings

/**
 * @param {Partial<Settings>} updates
 */
export async function updateSettings(updates) {
  const cur = await getSettings()
  chrome.storage.local
    .set({ [storageKey]: { ...cur, ...updates } })
    .catch((reason) => console.error(`failed to update settings : ${reason}`))
}

export async function initSettings() {
  const curSettings = (await getSettings()) ?? {}

  // construct default settings from definitions
  const defaultSettings = {}
  settingsDefinitions.forEach(({ key, default: defValue }) => {
    defaultSettings[key] = defValue
  })

  // override defaults with any existing settings
  Object.keys(curSettings).forEach((key) => {
    // only include settings within the current defined set
    if (key in defaultSettings) {
      defaultSettings[key] = curSettings[key]
    }
  })

  updateSettings(defaultSettings)
}
