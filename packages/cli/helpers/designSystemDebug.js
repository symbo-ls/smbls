import chalk from 'chalk'

// Keys that are typically primitive flags in designSystem.
export const DESIGN_SYSTEM_FLAG_KEYS = [
  'useReset',
  'useVariable',
  'useFontImport',
  'useIconSprite',
  'useSvgSprite',
  'useDefaultConfig',
  'useDocumentTheme',
  'useDefaultIcons',
  'verbose'
]

function describeValue (v) {
  if (v === null) return { type: 'null', preview: 'null' }
  const t = typeof v
  if (t !== 'object') {
    return { type: t, preview: JSON.stringify(v) }
  }
  if (Array.isArray(v)) {
    return { type: 'array', preview: `array(len=${v.length})` }
  }
  // Plain object (or object-like)
  const keys = Object.keys(v)
  return {
    type: 'object',
    preview: keys.length ? `object(keys=${keys.slice(0, 6).join(',')}${keys.length > 6 ? ',…' : ''})` : 'object({})'
  }
}

export function logDesignSystemFlags (label, designSystem, { enabled } = {}) {
  if (!enabled) return
  const ds = designSystem && typeof designSystem === 'object' ? designSystem : null
  if (!ds) {
    console.log(chalk.dim(`[designSystem] ${label}: (missing)`))
    return
  }

  console.log(chalk.dim(`[designSystem] ${label}`))
  for (const k of DESIGN_SYSTEM_FLAG_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(ds, k)) continue
    const { type, preview } = describeValue(ds[k])
    console.log(chalk.gray(`- ${k}: ${type} ${chalk.dim(preview)}`))
  }
}
