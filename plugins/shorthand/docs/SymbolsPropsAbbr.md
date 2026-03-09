# Symbols Shorthand Abbreviations

Unique abbreviations for all Symbols properties. Used in shorthand syntax: `abbr:value` with space-separated tokens.

**Syntax rules:**

- `:` separates key from value — `bg:red`
- Space separates tokens — `bg:red p:A`
- `,` separates array values — `ext:Flex,Box`
- `_` replaces spaces in values — `p:A_B` → `padding: 'A B'`
- Boolean true: just the abbreviation — `hid` → `hidden: true`
- Boolean false: prefix with `!` — `!hid` → `hidden: false`

---

## Core DOMQL Properties

| Property              | Abbr |
| --------------------- | ---- |
| attr                  | at   |
| childExtends          | cex  |
| childExtendsRecursive | cexr |
| childProps            | cp   |
| children              | ch   |
| childrenAs            | cha  |
| class                 | cl   |
| content               | cnt  |
| context               | ctx  |
| data                  | dt   |
| extends               | ext  |
| hide                  | hd   |
| html                  | htm  |
| if                    | if   |
| ignoreChildExtend     | icex |
| key                   | ky   |
| query                 | qy   |
| routes                | rt   |
| scope                 | scp  |
| show                  | shw  |
| state                 | st   |
| style                 | sy   |
| tag                   | tg   |
| text                  | tx   |

---

## Symbols Shorthand Props

| Property        | Abbr |
| --------------- | ---- |
| align           | aln  |
| boxSize         | bsz  |
| flow            | fl   |
| heightRange     | hr   |
| horizontalInset | hi   |
| round           | rnd  |
| shadow          | shd  |
| size            | sz   |
| templateColumns | tcol |
| verticalInset   | vi   |
| widthRange      | wr   |
| wrap            | wrp  |

---

## CSS Properties

### Box / Sizing

| Property      | Abbr |
| ------------- | ---- |
| aspectRatio   | ar   |
| blockSize     | bks  |
| boxSizing     | bxs  |
| height        | h    |
| inlineSize    | ins  |
| margin        | m    |
| marginBottom  | mb   |
| marginLeft    | ml   |
| marginRight   | mr   |
| marginTop     | mt   |
| maxBlockSize  | mxbs |
| maxHeight     | mxh  |
| maxInlineSize | mxis |
| maxWidth      | mxw  |
| minBlockSize  | mnbs |
| minHeight     | mnh  |
| minInlineSize | mnis |
| minWidth      | mnw  |
| padding       | p    |
| paddingBottom | pb   |
| paddingInline | pil  |
| paddingLeft   | pl   |
| paddingRight  | pr   |
| paddingTop    | pt   |
| width         | w    |

### Flexbox

| Property       | Abbr |
| -------------- | ---- |
| alignContent   | ac   |
| alignItems     | ai   |
| alignSelf      | as   |
| flex           | fx   |
| flexBasis      | fxb  |
| flexDirection  | fxd  |
| flexFlow       | fxf  |
| flexGrow       | fxg  |
| flexShrink     | fxs  |
| flexWrap       | fxw  |
| gap            | g    |
| justifyContent | jc   |
| justifyItems   | ji   |
| justifySelf    | js   |
| order          | od   |
| placeContent   | pcn  |
| placeItems     | pit  |
| placeSelf      | psl  |
| rowGap         | rg   |

### Grid

| Property            | Abbr |
| ------------------- | ---- |
| columnGap           | cg   |
| gridArea            | ga   |
| gridAutoColumns     | gac  |
| gridAutoFlow        | gaf  |
| gridAutoRows        | gar  |
| gridColumn          | gc   |
| gridColumnEnd       | gce  |
| gridColumnStart     | gcs  |
| gridRow             | gr   |
| gridRowEnd          | gre  |
| gridRowStart        | grs  |
| gridTemplateAreas   | gta  |
| gridTemplateColumns | gtc  |
| gridTemplateRows    | gtr  |

### Position

| Property | Abbr |
| -------- | ---- |
| bottom   | bot  |
| float    | flt  |
| inset    | ist  |
| left     | lft  |
| position | pos  |
| right    | rgt  |
| top      | tp   |
| zIndex   | zi   |

### Display / Visibility

| Property      | Abbr |
| ------------- | ---- |
| clear         | clr  |
| contain       | ctn  |
| cursor        | cur  |
| display       | d    |
| opacity       | op   |
| overflow      | ov   |
| overflowX     | ovx  |
| overflowY     | ovy  |
| pointerEvents | pe   |
| resize        | rsz  |
| userSelect    | us   |
| visibility    | vis  |

### Color / Theme

| Property             | Abbr |
| -------------------- | ---- |
| background           | bg   |
| backgroundAttachment | bga  |
| backgroundBlendMode  | bgbm |
| backgroundClip       | bgcl |
| backgroundColor      | bgc  |
| backgroundImage      | bgi  |
| backgroundOrigin     | bgo  |
| backgroundPosition   | bgp  |
| backgroundPositionX  | bgpx |
| backgroundPositionY  | bgpy |
| backgroundRepeat     | bgr  |
| backgroundRepeatX    | bgrx |
| backgroundRepeatY    | bgry |
| backgroundSize       | bgs  |
| color                | c    |
| theme                | thm  |
| themeModifier        | thmm |

### Border

| Property                | Abbr   |
| ----------------------- | ------ |
| border                  | bd     |
| borderBottom            | bdb    |
| borderBottomLeftRadius  | bdblr  |
| borderBottomRightRadius | bdbrr  |
| borderCollapse          | bdcl   |
| borderColor             | bdc    |
| borderImage             | bdi    |
| borderImageOutset       | bdio   |
| borderImageRepeat       | bdir   |
| borderImageSlice        | bdis   |
| borderImageSource       | bdisrc |
| borderImageWidth        | bdiw   |
| borderLeft              | bdl    |
| borderRadius            | bdr    |
| borderRight             | bdrg   |
| borderSpacing           | bdsp   |
| borderStyle             | bdst   |
| borderTop               | bdt    |
| borderTopLeftRadius     | bdtlr  |
| borderTopRightRadius    | bdtrr  |
| borderWidth             | bdw    |

### Outline

| Property      | Abbr |
| ------------- | ---- |
| outline       | ol   |
| outlineColor  | olc  |
| outlineOffset | olo  |
| outlineStyle  | ols  |
| outlineWidth  | olw  |

### Shadow

| Property   | Abbr |
| ---------- | ---- |
| boxShadow  | bxsh |
| textShadow | txsh |

### Typography

| Property              | Abbr |
| --------------------- | ---- |
| direction             | dir  |
| fontDisplay           | fdi  |
| fontFamily            | ff   |
| fontFeatureSettings   | ffs  |
| fontKerning           | fk   |
| fontOpticalSizing     | fos  |
| fontPalette           | fpl  |
| fontSize              | fs   |
| fontSizeAdjust        | fsa  |
| fontSmooth            | fsm  |
| fontStretch           | fsr  |
| fontStyle             | fsy  |
| fontSynthesis         | fsyn |
| fontVariant           | fv   |
| fontVariationSettings | fvs  |
| fontWeight            | fw   |
| hyphens               | hyp  |
| letterSpacing         | ls   |
| lineHeight            | lh   |
| tabSize               | tsz  |
| textAlign             | ta   |
| textDecoration        | td   |
| textDecorationColor   | tdc  |
| textDecorationLine    | tdl  |
| textDecorationStyle   | tds  |
| textIndent            | ti   |
| textOverflow          | tov  |
| textStroke            | tsk  |
| textTransform         | tt   |
| unicodeBidi           | ub   |
| verticalAlign         | va   |
| whiteSpace            | ws   |
| wordBreak             | wbr  |
| wordSpacing           | wsp  |
| wordWrap              | wwr  |
| writingMode           | wm   |

### List / Table

| Property          | Abbr |
| ----------------- | ---- |
| captionSide       | cps  |
| counterIncrement  | ci   |
| counterReset      | cr   |
| emptyCells        | ec   |
| listStyle         | lst  |
| listStyleImage    | lsi  |
| listStylePosition | lsp  |
| listStyleType     | lsty |
| quotes            | qt   |
| tableLayout       | tl   |

### Column

| Property        | Abbr |
| --------------- | ---- |
| columnCount     | cc   |
| columnFill      | cf   |
| columnRule      | crl  |
| columnRuleColor | crlc |
| columnRuleStyle | crls |
| columnRuleWidth | crlw |
| columnSpan      | csp  |
| columnWidth     | cwi  |
| columns         | col  |

### Filter / Effects

| Property           | Abbr |
| ------------------ | ---- |
| backdropFilter     | bdf  |
| boxDecorationBreak | bxdb |
| clipPath           | cpth |
| filter             | fil  |
| isolation          | iso  |
| mixBlendMode       | mbm  |
| objectFit          | obf  |
| objectPosition     | obp  |
| perspective        | prs  |
| perspectiveOrigin  | prso |
| willChange         | wc   |

### Transform

| Property        | Abbr |
| --------------- | ---- |
| transform       | tf   |
| transformOrigin | tfo  |
| transformStyle  | tfs  |

### Transition

| Property                 | Abbr  |
| ------------------------ | ----- |
| transition               | trn   |
| transitionDelay          | trnd  |
| transitionDuration       | trndr |
| transitionProperty       | trnp  |
| transitionTimingFunction | trntf |

### Animation

| Property                | Abbr  |
| ----------------------- | ----- |
| animation               | an    |
| animationDelay          | and   |
| animationDirection      | andr  |
| animationDuration       | andur |
| animationFillMode       | anfm  |
| animationIterationCount | anic  |
| animationName           | ann   |
| animationPlayState      | anps  |
| animationTimingFunction | antf  |

### Scroll

| Property            | Abbr |
| ------------------- | ---- |
| scrollBehavior      | sb   |
| scrollMargin        | smr  |
| scrollMarginBottom  | smrb |
| scrollMarginLeft    | smrl |
| scrollMarginRight   | smrr |
| scrollMarginTop     | smrt |
| scrollPadding       | spd  |
| scrollPaddingBottom | spdb |
| scrollPaddingLeft   | spdl |
| scrollPaddingRight  | spdr |
| scrollPaddingTop    | spdt |
| scrollSnapAlign     | ssa  |
| scrollSnapStop      | sss  |
| scrollSnapType      | sst  |

### Page Break

| Property        | Abbr |
| --------------- | ---- |
| breakAfter      | bka  |
| breakBefore     | bkb  |
| breakInside     | bki  |
| pageBreakAfter  | pbka |
| pageBreakBefore | pbkb |
| pageBreakInside | pbki |

---

## HTML Attributes

### Global

| Property        | Abbr |
| --------------- | ---- |
| accessKey       | ack  |
| className       | cn   |
| contentEditable | ced  |
| contextMenu     | cmu  |
| draggable       | drg  |
| hidden          | hid  |
| id              | id   |
| is              | is   |
| lang            | lng  |
| nonce           | nnc  |
| spellCheck      | spc  |
| tabIndex        | tbi  |
| title           | ttl  |
| translate       | trl  |

### Form

| Property       | Abbr |
| -------------- | ---- |
| accept         | acp  |
| acceptCharset  | accs |
| action         | act  |
| autoComplete   | atc  |
| autoFocus      | atf  |
| capture        | cap  |
| challenge      | chg  |
| checked        | chk  |
| cols           | cls  |
| colSpan        | csn  |
| controls       | ctl  |
| default        | def  |
| defer          | dfr  |
| disabled       | dis  |
| encType        | ect  |
| form           | frm  |
| formAction     | fac  |
| formEncType    | fect |
| formMethod     | fme  |
| formNoValidate | fnv  |
| formTarget     | ftg  |
| high           | hgh  |
| inputMode      | imd  |
| kind           | knd  |
| label          | lbl  |
| list           | lis  |
| loop           | lp   |
| low            | lw   |
| max            | mx   |
| maxLength      | mxl  |
| method         | mtd  |
| min            | mn   |
| minLength      | mnl  |
| multiple       | mul  |
| muted          | mut  |
| name           | nm   |
| open           | opn  |
| optimum        | opt  |
| pattern        | ptn  |
| placeholder    | phd  |
| readOnly       | ro   |
| required       | req  |
| reversed       | rev  |
| rows           | rws  |
| rowSpan        | rsn  |
| selected       | sel  |
| span           | spn  |
| start          | srt  |
| step           | stp  |
| type           | typ  |
| value          | val  |

### Link / Navigation

| Property       | Abbr |
| -------------- | ---- |
| download       | dl   |
| href           | hrf  |
| hrefLang       | hrl  |
| ping           | png  |
| referrerPolicy | rfp  |
| rel            | rl   |
| target         | tgt  |

### Media

| Property            | Abbr |
| ------------------- | ---- |
| allow               | alw  |
| allowFullScreen     | afs  |
| allowPaymentRequest | apr  |
| alt                 | alt  |
| cellPadding         | cpg  |
| cellSpacing         | csg  |
| cite                | cit  |
| coords              | crd  |
| crossOrigin         | cor  |
| dateTime            | dtm  |
| fetchPriority       | fpr  |
| headers             | hds  |
| httpEquiv           | hte  |
| integrity           | itg  |
| isMap               | ism  |
| keyType             | kty  |
| loading             | ldg  |
| manifest            | mft  |
| media               | mda  |
| poster              | pst  |
| preload             | prl  |
| radioGroup          | rdg  |
| sandbox             | sbx  |
| scope               | sco  |
| scoped              | scod |
| seamless            | sml  |
| shape               | shp  |
| sizes               | szs  |
| src                 | src  |
| srcDoc              | srd  |
| srcLang             | srl  |
| srcSet              | srs  |
| useMap              | ump  |

### ARIA

| Property             | Abbr |
| -------------------- | ---- |
| ariaActiveDescendant | aad  |
| ariaAtomic           | aat  |
| ariaBusy             | abu  |
| ariaChecked          | achk |
| ariaControls         | acl  |
| ariaCurrent          | acr  |
| ariaDescribedBy      | adb  |
| ariaDetails          | adt  |
| ariaDisabled         | adis |
| ariaDropEffect       | ade  |
| ariaErrorMessage     | aem  |
| ariaExpanded         | aexp |
| ariaGrabbed          | agr  |
| ariaHasPopup         | ahp  |
| ariaHidden           | ahid |
| ariaInvalid          | ainv |
| ariaLabel            | alb  |
| ariaLabelledBy       | alby |
| ariaLive             | alv  |
| ariaModal            | amod |
| ariaMultiSelectable  | ams  |
| ariaOrientation      | aor  |
| ariaOwns             | aow  |
| ariaPosInSet         | apis |
| ariaPressed          | apr2 |
| ariaReadOnly         | aro  |
| ariaRelevant         | arl  |
| ariaRequired         | areq |
| ariaSelected         | asel |
| ariaSetSize          | assz |
| ariaValueMax         | avmx |
| ariaValueMin         | avmn |
| ariaValueNow         | avn  |
| role                 | rl2  |

---

## Events

### Lifecycle

| Property      | Abbr |
| ------------- | ---- |
| onInit        | @in  |
| onRender      | @rn  |
| onUpdate      | @up  |
| onStateChange | @sc  |
| onStateUpdate | @su  |

### Mouse

| Property      | Abbr |
| ------------- | ---- |
| onClick       | @ck  |
| onContextMenu | @cm  |
| onDblClick    | @dc  |
| onMouseDown   | @md  |
| onMouseEnter  | @me  |
| onMouseLeave  | @ml  |
| onMouseMove   | @mm  |
| onMouseOut    | @mo  |
| onMouseOver   | @mv  |
| onMouseUp     | @mu  |

### Keyboard

| Property   | Abbr |
| ---------- | ---- |
| onKeyDown  | @kd  |
| onKeyPress | @kp  |
| onKeyUp    | @ku  |

### Focus

| Property   | Abbr |
| ---------- | ---- |
| onBlur     | @bl  |
| onFocus    | @fc  |
| onFocusIn  | @fi  |
| onFocusOut | @fo  |

### Form

| Property      | Abbr |
| ------------- | ---- |
| onBeforeInput | @bi  |
| onChange      | @cg  |
| onFormData    | @fd  |
| onInput       | @ip  |
| onInvalid     | @iv  |
| onReset       | @rs  |
| onSearch      | @sr  |
| onSelect      | @sl  |
| onSubmit      | @sb  |

### Touch

| Property      | Abbr |
| ------------- | ---- |
| onTouchCancel | @tc  |
| onTouchEnd    | @te  |
| onTouchMove   | @tm  |
| onTouchStart  | @ts  |

### Pointer

| Property        | Abbr |
| --------------- | ---- |
| onPointerCancel | @pc  |
| onPointerDown   | @pd  |
| onPointerEnter  | @pe  |
| onPointerLeave  | @ple |
| onPointerMove   | @pm  |
| onPointerOut    | @po  |
| onPointerOver   | @pov |
| onPointerUp     | @pu  |

### Drag

| Property    | Abbr |
| ----------- | ---- |
| onDrag      | @dg  |
| onDragEnd   | @dge |
| onDragEnter | @dgn |
| onDragLeave | @dgl |
| onDragOver  | @dgo |
| onDragStart | @dgs |
| onDrop      | @dp  |

### Scroll / Resize

| Property | Abbr |
| -------- | ---- |
| onResize | @rz  |
| onScroll | @scl |
| onWheel  | @wh  |

### Clipboard

| Property | Abbr |
| -------- | ---- |
| onCopy   | @cy  |
| onCut    | @ct  |
| onPaste  | @pt  |

### Composition

| Property            | Abbr |
| ------------------- | ---- |
| onCompositionEnd    | @cpe |
| onCompositionStart  | @cps |
| onCompositionUpdate | @cpu |

### Animation / Transition Events

| Property             | Abbr |
| -------------------- | ---- |
| onAnimationEnd       | @ae  |
| onAnimationIteration | @ai  |
| onAnimationStart     | @as  |
| onTransitionEnd      | @tre |
| onTransitionStart    | @trs |

### Media Events

| Property         | Abbr |
| ---------------- | ---- |
| onAbort          | @ab  |
| onCanPlay        | @cp2 |
| onCanPlayThrough | @cpt |
| onDurationChange | @duc |
| onEmptied        | @em  |
| onEncrypted      | @enc |
| onEnded          | @end |
| onError          | @er  |
| onLoad           | @ld  |
| onLoadedData     | @ldd |
| onLoadedMetadata | @ldm |
| onPause          | @pa  |
| onPlay           | @pl  |
| onPlaying        | @plg |
| onProgress       | @prg |
| onRateChange     | @rc  |
| onSeeked         | @sk  |
| onSeeking        | @skg |
| onStalled        | @stl |
| onSuspend        | @ssp |
| onTimeUpdate     | @tu  |
| onVolumeChange   | @vc  |
| onWaiting        | @wt  |

---

## Special / Advanced

| Property          | Abbr  |
| ----------------- | ----- |
| columns           | cols2 |
| icon              | ico   |
| iconText          | ict   |
| ignoreChildExtend | icex  |
| lookup            | lkp   |
| router            | rtr   |
| shape             | shp2  |
| shapeModifier     | shpm  |
