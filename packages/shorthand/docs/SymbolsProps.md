# Symbols Property Reference

All possible properties used in Symbols (DOMQL v3): CSS-in-props, HTML attributes, JS events, and core DOMQL properties.

---

## Core DOMQL Properties

- attr
- childExtends
- childExtendsRecursive
- childProps
- children
- childrenAs
- class
- content
- context
- data
- extends
- hide
- html
- if
- ignoreChildExtend
- key
- query
- routes
- scope
- show
- state
- style
- tag
- text

---

## Symbols Shorthand Props

- align (alignItems + justifyContent)
- boxSize (width + height)
- flow (flexFlow shorthand: 'x' = row, 'y' = column)
- heightRange (minHeight + maxHeight)
- horizontalInset (left + right)
- round (borderRadius)
- shadow (boxShadow)
- size (width + height)
- templateColumns (gridTemplateColumns)
- verticalInset (top + bottom)
- widthRange (minWidth + maxWidth)
- wrap (flexWrap)

---

## CSS Properties (Unified in Props)

### Box / Sizing

- aspectRatio
- blockSize
- boxSizing
- height
- inlineSize
- margin
- marginBottom
- marginLeft
- marginRight
- marginTop
- maxBlockSize
- maxHeight
- maxInlineSize
- maxWidth
- minBlockSize
- minHeight
- minInlineSize
- minWidth
- padding
- paddingBottom
- paddingInline
- paddingLeft
- paddingRight
- paddingTop
- width

### Flexbox

- alignContent
- alignItems
- alignSelf
- flex
- flexBasis
- flexDirection
- flexFlow
- flexGrow
- flexShrink
- flexWrap
- gap
- justifyContent
- justifyItems
- justifySelf
- order
- placeContent
- placeItems
- placeSelf
- rowGap

### Grid

- columnGap
- gridArea
- gridAutoColumns
- gridAutoFlow
- gridAutoRows
- gridColumn
- gridColumnEnd
- gridColumnStart
- gridRow
- gridRowEnd
- gridRowStart
- gridTemplateAreas
- gridTemplateColumns
- gridTemplateRows

### Position

- bottom
- float
- inset
- left
- position
- right
- top
- zIndex

### Display / Visibility

- clear
- contain
- content
- cursor
- display
- opacity
- overflow
- overflowX
- overflowY
- pointerEvents
- resize
- userSelect
- visibility

### Color / Theme

- background
- backgroundAttachment
- backgroundBlendMode
- backgroundClip
- backgroundColor
- backgroundImage
- backgroundOrigin
- backgroundPosition
- backgroundPositionX
- backgroundPositionY
- backgroundRepeat
- backgroundRepeatX
- backgroundRepeatY
- backgroundSize
- color
- theme
- themeModifier

### Border

- border
- borderBottom
- borderBottomLeftRadius
- borderBottomRightRadius
- borderCollapse
- borderColor
- borderImage
- borderImageOutset
- borderImageRepeat
- borderImageSlice
- borderImageSource
- borderImageWidth
- borderLeft
- borderRadius
- borderRight
- borderSpacing
- borderStyle
- borderTop
- borderTopLeftRadius
- borderTopRightRadius
- borderWidth

### Outline

- outline
- outlineColor
- outlineOffset
- outlineStyle
- outlineWidth

### Shadow

- boxShadow
- textShadow

### Typography

- direction
- fontDisplay
- fontFamily
- fontFeatureSettings
- fontKerning
- fontOpticalSizing
- fontPalette
- fontSize
- fontSizeAdjust
- fontSmooth
- fontStretch
- fontStyle
- fontSynthesis
- fontVariant
- fontVariationSettings
- fontWeight
- hyphens
- letterSpacing
- lineHeight
- tabSize
- textAlign
- textDecoration
- textDecorationColor
- textDecorationLine
- textDecorationStyle
- textIndent
- textOverflow
- textStroke
- textTransform
- unicodeBidi
- verticalAlign
- whiteSpace
- wordBreak
- wordSpacing
- wordWrap
- writingMode

### List / Table

- borderCollapse
- borderSpacing
- captionSide
- counterIncrement
- counterReset
- emptyCells
- listStyle
- listStyleImage
- listStylePosition
- listStyleType
- quotes
- tableLayout

### Column

- columnCount
- columnFill
- columnGap
- columnRule
- columnRuleColor
- columnRuleStyle
- columnRuleWidth
- columnSpan
- columnWidth
- columns

### Filter / Effects

- backdropFilter
- boxDecorationBreak
- clipPath
- filter
- isolation
- mixBlendMode
- objectFit
- objectPosition
- perspective
- perspectiveOrigin
- willChange

### Transform

- transform
- transformOrigin
- transformStyle

### Transition

- transition
- transitionDelay
- transitionDuration
- transitionProperty
- transitionTimingFunction

### Animation

- animation
- animationDelay
- animationDirection
- animationDuration
- animationFillMode
- animationIterationCount
- animationName
- animationPlayState
- animationTimingFunction

### Scroll

- scrollBehavior
- scrollMargin
- scrollMarginBottom
- scrollMarginLeft
- scrollMarginRight
- scrollMarginTop
- scrollPadding
- scrollPaddingBottom
- scrollPaddingLeft
- scrollPaddingRight
- scrollPaddingTop
- scrollSnapAlign
- scrollSnapStop
- scrollSnapType

### Page Break

- breakAfter
- breakBefore
- breakInside
- pageBreakAfter
- pageBreakBefore
- pageBreakInside

---

## HTML Attributes

### Global

- accessKey
- className
- contentEditable
- contextMenu
- dir
- draggable
- hidden
- id
- is
- lang
- nonce
- spellCheck
- style
- tabIndex
- title
- translate

### Form

- accept
- acceptCharset
- action
- autoComplete
- autoFocus
- capture
- challenge
- checked
- cols
- colSpan
- controls
- default
- defer
- disabled
- encType
- form
- formAction
- formEncType
- formMethod
- formNoValidate
- formTarget
- high
- inputMode
- kind
- label
- list
- loop
- low
- max
- maxLength
- method
- min
- minLength
- multiple
- muted
- name
- open
- optimum
- pattern
- placeholder
- readOnly
- required
- reversed
- rows
- rowSpan
- selected
- size
- span
- start
- step
- type
- value
- wrap

### Link / Navigation

- download
- href
- hrefLang
- ping
- referrerPolicy
- rel
- target

### Media

- allow
- allowFullScreen
- allowPaymentRequest
- alt
- cellPadding
- cellSpacing
- cite
- coords
- crossOrigin
- data
- dateTime
- fetchPriority
- headers
- height
- httpEquiv
- integrity
- isMap
- keyType
- loading
- manifest
- media
- poster
- preload
- radioGroup
- sandbox
- scope
- scoped
- seamless
- shape
- sizes
- src
- srcDoc
- srcLang
- srcSet
- useMap
- width

### Microdata

- itemId
- itemProp
- itemRef
- itemScope
- itemType

### ARIA

- ariaActiveDescendant
- ariaAtomic
- ariaBusy
- ariaChecked
- ariaControls
- ariaCurrent
- ariaDescribedBy
- ariaDetails
- ariaDisabled
- ariaDropEffect
- ariaErrorMessage
- ariaExpanded
- ariaGrabbed
- ariaHasPopup
- ariaHidden
- ariaInvalid
- ariaLabel
- ariaLabelledBy
- ariaLive
- ariaModal
- ariaMultiSelectable
- ariaOrientation
- ariaOwns
- ariaPosInSet
- ariaPressed
- ariaReadOnly
- ariaRelevant
- ariaRequired
- ariaSelected
- ariaSetSize
- ariaValueMax
- ariaValueMin
- ariaValueNow
- role

---

## JS Events (onX Prefix)

### Lifecycle (DOMQL custom)

- onInit
- onRender
- onUpdate
- onStateChange
- onStateUpdate

### Mouse

- onClick
- onContextMenu
- onDblClick
- onMouseDown
- onMouseEnter
- onMouseLeave
- onMouseMove
- onMouseOut
- onMouseOver
- onMouseUp

### Keyboard

- onKeyDown
- onKeyPress
- onKeyUp

### Focus

- onBlur
- onFocus
- onFocusIn
- onFocusOut

### Form

- onBeforeInput
- onChange
- onFormData
- onInput
- onInvalid
- onReset
- onSearch
- onSelect
- onSubmit

### Touch

- onTouchCancel
- onTouchEnd
- onTouchMove
- onTouchStart

### Pointer

- onPointerCancel
- onPointerDown
- onPointerEnter
- onPointerLeave
- onPointerMove
- onPointerOut
- onPointerOver
- onPointerUp

### Drag

- onDrag
- onDragEnd
- onDragEnter
- onDragLeave
- onDragOver
- onDragStart
- onDrop

### Scroll / Resize

- onResize
- onScroll
- onWheel

### Clipboard

- onCopy
- onCut
- onPaste

### Composition

- onCompositionEnd
- onCompositionStart
- onCompositionUpdate

### Animation / Transition

- onAnimationEnd
- onAnimationIteration
- onAnimationStart
- onTransitionEnd
- onTransitionStart

### Media

- onAbort
- onCanPlay
- onCanPlayThrough
- onDurationChange
- onEmptied
- onEncrypted
- onEnded
- onError
- onLoad
- onLoadedData
- onLoadedMetadata
- onPause
- onPlay
- onPlaying
- onProgress
- onRateChange
- onSeeked
- onSeeking
- onStalled
- onSuspend
- onTimeUpdate
- onVolumeChange
- onWaiting

---

## Selectors, Media, and Cases

### Pseudo-classes

- :active
- :checked
- :disabled
- :empty
- :enabled
- :first-child
- :first-of-type
- :focus
- :focus-visible
- :focus-within
- :hover
- :last-child
- :last-of-type
- :not()
- :nth-child()
- :nth-of-type()
- :only-child
- :only-of-type
- :visited

### Pseudo-elements

- ::after
- ::backdrop
- ::before
- ::cue
- ::marker
- ::placeholder
- ::selection
- ::slotted
- ::-webkit-scrollbar

### CSS selectors

- '& > span'
- '&:hover'
- '> label'
- '> \*'

### Responsive breakpoints (@media)

- @desktop
- @laptop
- @mobile
- @mobileM
- @mobileS
- @mobileXS
- @print
- @tablet
- @tabletM
- @tv

### Theme modes

- @dark
- @light

### Conditional cases

- .propName (local case, true match)
- !propName (local case, negation)
- $caseName (global case, e.g. $ios, $android, $localhost)

---

## Special / Advanced Properties

- childExtends (string, array, or inline object)
- childProps (object or function)
- childrenAs ('props' or 'state')
- columns
- icon
- iconText
- ignoreChildExtend
- lookup
- router
- shape
- shapeModifier
- templateColumns
- theme
- themeModifier
