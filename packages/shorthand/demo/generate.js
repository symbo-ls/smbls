import { shorten, stringify } from '../src/index.js'
import { Avatar } from '../examples/default/Avatar.js'
import { Field } from '../examples/default/Field.js'
import { Stars } from '../examples/default/Stars.js'
import { Pills } from '../examples/default/Pills.js'
import { Modal } from '../examples/default/Modal.js'
import { ButtonSet } from '../examples/default/ButtonSet.js'
import { NumberPicker } from '../examples/default/NumberPicker.js'
import { Accordion } from '../examples/default/Accordion.js'
import { AvatarChatPreview } from '../examples/default/AvatarChatPreview.js'
import { SearchDropdown } from '../examples/default/SearchDropdown.js'
import { Badge } from '../examples/default/Badge.js'
import { Breadcrumb } from '../examples/default/Breadcrumb.js'
import { TabSet } from '../examples/default/TabSet.js'
import { CircleProgress } from '../examples/default/CircleProgress.js'
import { Pagination } from '../examples/default/Pagination.js'
import { UserNavbar } from '../examples/default/UserNavbar.js'
import { StoryCard } from '../examples/default/StoryCard.js'
import { Progress } from '../examples/default/Progress.js'
import { ToggleCaption } from '../examples/default/ToggleCaption.js'
import { LandingNavbar } from '../examples/landing/LandingNavbar.js'
import { CTAButtons } from '../examples/landing/CTAButtons.js'
import { FeatureItem } from '../examples/landing/FeatureItem.js'
import { TestimonialCard } from '../examples/landing/TestimonialCard.js'
import { Banner } from '../examples/landing/Banner.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const components = {
  Avatar,
  Field,
  Stars,
  Pills,
  Modal,
  ButtonSet,
  NumberPicker,
  Accordion,
  AvatarChatPreview,
  SearchDropdown,
  Badge,
  Breadcrumb,
  TabSet,
  CircleProgress,
  Pagination,
  UserNavbar,
  StoryCard,
  Progress,
  ToggleCaption,
  LandingNavbar,
  CTAButtons,
  FeatureItem,
  TestimonialCard,
  Banner
}

function serialize(obj, indent = 0) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  if (typeof obj === 'function')
    return obj.toString().replace(/\n/g, '\n' + pad)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const items = obj.map((i) => pad1 + serialize(i, indent + 1))
    return '[\n' + items.join(',\n') + '\n' + pad + ']'
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return '{}'
    const entries = keys.map((k) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)
        ? k
        : JSON.stringify(k)
      return pad1 + safeKey + ': ' + serialize(obj[k], indent + 1)
    })
    return '{\n' + entries.join(',\n') + '\n' + pad + '}'
  }
  if (typeof obj === 'string') return "'" + obj.replace(/'/g, "\\'") + "'"
  return String(obj)
}

let src = ''
let dest = ''
let strfy = ''

for (const [name, comp] of Object.entries(components)) {
  const short = shorten(comp)
  const strd = stringify(comp)

  src += '// ── ' + name + ' ──\n'
  src += 'export const ' + name + ' = ' + serialize(comp) + '\n\n'

  dest += '// ── ' + name + ' ──\n'
  dest += 'export const ' + name + ' = ' + serialize(short) + '\n\n'

  strfy += '// ── ' + name + ' ──\n'
  strfy += 'export const ' + name + ' = ' + serialize(strd) + '\n\n'
}

writeFileSync(join(__dirname, 'source.js'), src)
writeFileSync(join(__dirname, 'shortened.js'), dest)
writeFileSync(join(__dirname, 'stringified.js'), strfy)

console.log(
  'Generated demo/source.js, demo/shortened.js, and demo/stringified.js'
)
