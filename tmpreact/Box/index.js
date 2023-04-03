import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Box(props) {
  const key = "47"
  const childProps_Box_1 = {}

  const domqlElementObj_1 = {
    key: 'TODO',
    tag: 'div',
    context: 'TODO',
    props: childProps_Box_1,
    state: {}
  }

  function style_1({ props: props2 }) {
    return props2 && props2.style;
  }

  function shape_1({ props: props2 }) {
    const { shape } = props2;
    return (0, import_utils5.exec)(SHAPES[shape], {
      props: props2,
    });
  }

  function shapeDirection_1({ props: props2 }) {
    const { shape, shapeDirection } = props2;
    if (!shape || !shapeDirection) return;
    const shapeDir = SHAPES[shape + "Direction"];
    return shape && shapeDir ? shapeDir[shapeDirection || "left"] : null;
  }

  function shapeDirectionColor_1({ props: props2 }) {
    const { background, backgroundColor } = props2;
    const borderColor = (0, import_scratch7.getMediaColor)(
      background || backgroundColor,
      "borderColor"
    );
    return props2.shapeDirection ? borderColor : null;
  }

  function round_1({ props: props2, ...el }) {
    return transformBorderRadius(
      props2.round || props2.borderRadius,
      props2,
      "round"
    );
  }

  function borderRadius_1({ props: props2, ...el }) {
    return transformBorderRadius(
      props2.borderRadius || props2.round,
      props2,
      "borderRadius"
    );
  }

  function content_1({ props: props2 }) {
    return (
      props2.content && {
        content: props2.content,
      }
    );
  }

  function position_1({ props: props2 }) {
    return (
      props2.position && {
        position: props2.position,
      }
    );
  }

  function inset_1({ props: props2 }) {
    const { inset } = props2;
    if (typeof inset !== "string") return;
    return {
      inset: inset
        .split(" ")
        .map((v) => (0, import_scratch6.getSpacingByKey)(v, "k").k)
        .join(" "),
    };
  }

  function left_1({ props: props2 }) {
    return (0, import_scratch6.getSpacingByKey)(props2.left, "left");
  }

  function top_1({ props: props2 }) {
    return (0, import_scratch6.getSpacingByKey)(props2.top, "top");
  }

  function right_1({ props: props2 }) {
    return (0, import_scratch6.getSpacingByKey)(props2.right, "right");
  }

  function bottom_1({ props: props2 }) {
    return (0, import_scratch6.getSpacingByKey)(props2.bottom, "bottom");
  }

  function depth_1({ props: props2 }) {
    return depth[props2.depth];
  }

  function theme_1(element) {
    const { props: props2 } = element;
    const globalTheme = getSystemTheme(element);
    if (!props2.theme) return;
    return (0, import_scratch5.getMediaTheme)(
      props2.theme,
      `@${props2.themeModifier || globalTheme}`
    );
  }

  function color_1(element) {
    const { props: props2 } = element;
    const globalTheme = getSystemTheme(element);
    if (!props2.color) return;
    return (0, import_scratch5.getMediaColor)(
      props2.color,
      "color",
      globalTheme
    );
  }

  function background_1(element) {
    const { props: props2 } = element;
    const globalTheme = getSystemTheme(element);
    if (!props2.background) return;
    return (0, import_scratch5.getMediaColor)(
      props2.background,
      "background",
      globalTheme
    );
  }

  function backgroundColor_1(element) {
    const { props: props2 } = element;
    const globalTheme = getSystemTheme(element);
    if (!props2.backgroundColor) return;
    return (0, import_scratch5.getMediaColor)(
      props2.backgroundColor,
      "backgroundColor",
      globalTheme
    );
  }

  function backgroundImage_1(element) {
    const { props: props2, context } = element;
    const globalTheme = getSystemTheme(element);
    if (!props2.backgroundImage) return;
    return transformBackgroundImage(
      props2.backgroundImage,
      context,
      globalTheme
    );
  }

  function backgroundSize_1({ props: props2 }) {
    return props2.backgroundSize
      ? {
          backgroundSize: props2.backgroundSize,
        }
      : null;
  }

  function backgroundPosition_1({ props: props2 }) {
    return props2.backgroundPosition
      ? {
          backgroundPosition: props2.backgroundPosition,
        }
      : null;
  }

  function textStroke_1({ props: props2 }) {
    return props2.textStroke ? transformTextStroke(props2.textStroke) : null;
  }

  function outline_1({ props: props2 }) {
    props2.outline && {
      outline: transformBorder(props2.outline),
    };
    return;
  }

  function border_1({ props: props2 }) {
    props2.border && {
      border: transformBorder(props2.border),
    };
    return;
  }

  function borderColor_1({ props: props2 }) {
    return (
      props2.borderColor &&
      (0, import_scratch5.getMediaColor)(props2.borderColor, "borderColor")
    );
  }

  function borderStyle_1({ props: props2 }) {
    return (
      props2.borderStyle && {
        borderStyle: props2.borderStyle,
      }
    );
  }

  function borderLeft_1({ props: props2 }) {
    props2.borderLeft && {
      borderLeft: transformBorder(props2.borderLeft),
    };
    return;
  }

  function borderTop_1({ props: props2 }) {
    props2.borderTop && {
      borderTop: transformBorder(props2.borderTop),
    };
    return;
  }

  function borderRight_1({ props: props2 }) {
    props2.borderRight && {
      borderRight: transformBorder(props2.borderRight),
    };
    return;
  }

  function borderBottom_1({ props: props2 }) {
    props2.borderBottom && {
      borderBottom: transformBorder(props2.borderBottom),
    };
    return;
  }

  function boxShadow_1({ props: props2 }) {
    props2.boxShadow && {
      boxShadow: transformShadow(props2.boxShadow),
    };
    return;
  }

  function textShadow_1({ props: props2 }) {
    props2.textShadow && {
      textShadow: transformShadow(props2.textShadow),
    };
    return;
  }

  function opacity_1({ props: props2 }) {
    return (
      props2.opacity && {
        opacity: props2.opacity,
      }
    );
  }

  function visibility_1({ props: props2 }) {
    return (
      props2.visibility && {
        visibility: props2.visibility,
      }
    );
  }

  function boxSizing_1({ props: props2 }) {
    props2.boxSizing
      ? {
          boxSizing: props2.boxSizing,
        }
      : {
          boxSizing: "border-box",
        };
    return;
  }

  function display_1({ props: props2 }) {
    return (
      props2.display && {
        display: props2.display,
      }
    );
  }

  function hide_1({ props: props2 }) {
    return (
      props2.hide && {
        display: "none",
      }
    );
  }

  function width_1({ props: props2 }) {
    return (
      props2.width &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "width")
    );
  }

  function height_1({ props: props2 }) {
    return (
      props2.height &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "height")
    );
  }

  function boxSize_1({ props: props2 }) {
    if (typeof props2.boxSize !== "string") return;
    const [height, width] = props2.boxSize.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(height, "height"),
      ...(0, import_scratch.getSpacingByKey)(width || height, "width"),
    };
  }

  function maxWidth_1({ props: props2 }) {
    return (
      props2.maxWidth &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "maxWidth")
    );
  }

  function minWidth_1({ props: props2 }) {
    return (
      props2.minWidth &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "minWidth")
    );
  }

  function widthRange_1({ props: props2 }) {
    if (typeof props2.widthRange !== "string") return;
    const [minWidth, maxWidth] = props2.widthRange.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(minWidth, "minWidth"),
      ...(0, import_scratch.getSpacingByKey)(maxWidth || minWidth, "maxWidth"),
    };
  }

  function maxHeight_1({ props: props2 }) {
    return (
      props2.maxHeight &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "maxHeight")
    );
  }

  function minHeight_1({ props: props2 }) {
    return (
      props2.minHeight &&
      (0, import_scratch.getSpacingBasedOnRatio)(props2, "minHeight")
    );
  }

  function heightRange_1({ props: props2 }) {
    if (typeof props2.heightRange !== "string") return;
    const [minHeight, maxHeight] = props2.heightRange.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(minHeight, "minHeight"),
      ...(0, import_scratch.getSpacingByKey)(
        maxHeight || minHeight,
        "maxHeight"
      ),
    };
  }

  function direction_1({ props: props2 }) {
    return (
      props2.direction && {
        direction: props2.direction,
      }
    );
  }

  function aspectRatio_1({ props: props2 }) {
    return (
      props2.aspectRatio && {
        aspectRatio: props2.aspectRatio,
      }
    );
  }

  function borderWidth_1({ props: props2 }) {
    return props2.borderWidth
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "borderWidth")
      : null;
  }

  function padding_1({ props: props2 }) {
    return props2.padding
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "padding")
      : null;
  }

  function paddingInline_1({ props: props2 }) {
    if (typeof props2.paddingInline !== "string") return;
    const [paddingInlineStart, paddingInlineEnd] =
      props2.paddingInline.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(
        paddingInlineStart,
        "paddingInlineStart"
      ),
      ...(0, import_scratch.getSpacingByKey)(
        paddingInlineEnd || paddingInlineStart,
        "paddingInlineEnd"
      ),
    };
  }

  function paddingBlock_1({ props: props2 }) {
    if (typeof props2.paddingBlock !== "string") return;
    const [paddingBlockStart, paddingBlockEnd] = props2.paddingBlock.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(
        paddingBlockStart,
        "paddingBlockStart"
      ),
      ...(0, import_scratch.getSpacingByKey)(
        paddingBlockEnd || paddingBlockStart,
        "paddingBlockEnd"
      ),
    };
  }

  function paddingInlineStart_1({ props: props2 }) {
    return props2.paddingInlineStart
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "paddingInlineStart")
      : null;
  }

  function paddingInlineEnd_1({ props: props2 }) {
    return props2.paddingInlineEnd
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "paddingInlineEnd")
      : null;
  }

  function paddingBlockStart_1({ props: props2 }) {
    return props2.paddingBlockStart
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "paddingBlockStart")
      : null;
  }

  function paddingBlockEnd_1({ props: props2 }) {
    return props2.paddingBlockEnd
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "paddingBlockEnd")
      : null;
  }

  function margin_1({ props: props2 }) {
    return props2.margin
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "margin")
      : null;
  }

  function marginInline_1({ props: props2 }) {
    if (typeof props2.marginInline !== "string") return;
    const [marginInlineStart, marginInlineEnd] = props2.marginInline.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(
        marginInlineStart,
        "marginInlineStart"
      ),
      ...(0, import_scratch.getSpacingByKey)(
        marginInlineEnd || marginInlineStart,
        "marginInlineEnd"
      ),
    };
  }

  function marginBlock_1({ props: props2 }) {
    if (typeof props2.marginBlock !== "string") return;
    const [marginBlockStart, marginBlockEnd] = props2.marginBlock.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(
        marginBlockStart,
        "marginBlockStart"
      ),
      ...(0, import_scratch.getSpacingByKey)(
        marginBlockEnd || marginBlockStart,
        "marginBlockEnd"
      ),
    };
  }

  function marginInlineStart_1({ props: props2 }) {
    return props2.marginInlineStart
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "marginInlineStart")
      : null;
  }

  function marginInlineEnd_1({ props: props2 }) {
    return props2.marginInlineEnd
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "marginInlineEnd")
      : null;
  }

  function marginBlockStart_1({ props: props2 }) {
    return props2.marginBlockStart
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "marginBlockStart")
      : null;
  }

  function marginBlockEnd_1({ props: props2 }) {
    return props2.marginBlockEnd
      ? (0, import_scratch.getSpacingBasedOnRatio)(props2, "marginBlockEnd")
      : null;
  }

  function gap_1({ props: props2 }) {
    return props2.gap ? transfromGap(props2.gap) : null;
  }

  function gridArea_1({ props: props2 }) {
    return (
      props2.gridArea && {
        gridArea: props2.gridArea,
      }
    );
  }

  function flex_1({ props: props2 }) {
    return (
      props2.flex && {
        flex: props2.flex,
      }
    );
  }

  function flexDirection_1({ props: props2 }) {
    return (
      props2.flexDirection && {
        flexDirection: props2.flexDirection,
      }
    );
  }

  function alignItems_1({ props: props2 }) {
    return (
      props2.alignItems && {
        alignItems: props2.alignItems,
      }
    );
  }

  function alignContent_1({ props: props2 }) {
    return (
      props2.alignContent && {
        alignContent: props2.alignContent,
      }
    );
  }

  function justifyContent_1({ props: props2 }) {
    return (
      props2.justifyContent && {
        justifyContent: props2.justifyContent,
      }
    );
  }

  function justifyItems_1({ props: props2 }) {
    return (
      props2.justifyItems && {
        justifyItems: props2.justifyItems,
      }
    );
  }

  function alignSelf_1({ props: props2 }) {
    return (
      props2.alignSelf && {
        alignSelf: props2.alignSelf,
      }
    );
  }

  function order_1({ props: props2 }) {
    return (
      props2.order && {
        order: props2.order,
      }
    );
  }

  function flexWrap_1({ props: props2 }) {
    props2.flexWrap && {
      display: "flex",
      flexFlow: props2.flexWrap,
    };
    return;
  }

  function flexFlow_1({ props: props2 }) {
    props2.flexFlow && {
      display: "flex",
      flexFlow: props2.flexFlow,
    };
    return;
  }

  function flexAlign_1({ props: props2 }) {
    if (typeof props2.flexAlign !== "string") return;
    const [alignItems, justifyContent] = props2.flexAlign.split(" ");
    return {
      display: "flex",
      alignItems,
      justifyContent,
    };
  }

  function gridColumn_1({ props: props2 }) {
    return (
      props2.gridColumn && {
        gridColumn: props2.gridColumn,
      }
    );
  }

  function gridColumnStart_1({ props: props2 }) {
    return props2.columnStart
      ? {
          gridColumnStart: props2.columnStart,
        }
      : null;
  }

  function gridRow_1({ props: props2 }) {
    return (
      props2.gridRow && {
        gridRow: props2.gridRow,
      }
    );
  }

  function gridRowStart_1({ props: props2 }) {
    return props2.rowStart
      ? {
          gridRowStart: props2.rowStart,
        }
      : null;
  }

  function size_1({ props: props2 }) {
    if (typeof props2.heightRange !== "string") return;
    const [minHeight, maxHeight] = props2.heightRange.split(" ");
    return {
      ...(0, import_scratch.getSpacingByKey)(minHeight, "minHeight"),
      ...(0, import_scratch.getSpacingByKey)(
        maxHeight || minHeight,
        "maxHeight"
      ),
    };
  }

  function columns_1({ props: props2 }) {
    return (
      props2.columns && {
        columns: props2.columns,
      }
    );
  }

  function fontSize_1({ props: props2 }) {
    return props2.fontSize
      ? (0, import_scratch8.getFontSizeByKey)(props2.fontSize)
      : null;
  }

  function fontFamily_1({ props: props2 }) {
    return (
      props2.fontFamily && {
        fontFamily:
          (0, import_scratch8.getFontFamily)(props2.fontFamily) ||
          props2.fontFamily,
      }
    );
  }

  function lineHeight_1({ props: props2 }) {
    return (
      props2.lineHeight && {
        lineHeight: props2.lineHeight,
      }
    );
  }

  function textDecoration_1({ props: props2 }) {
    return (
      props2.textDecoration && {
        textDecoration: props2.textDecoration,
      }
    );
  }

  function textTransform_1({ props: props2 }) {
    return (
      props2.textTransform && {
        textTransform: props2.textTransform,
      }
    );
  }

  function whiteSpace_1({ props: props2 }) {
    return (
      props2.whiteSpace && {
        whiteSpace: props2.whiteSpace,
      }
    );
  }

  function letterSpacing_1({ props: props2 }) {
    return (
      props2.letterSpacing && {
        letterSpacing: props2.letterSpacing,
      }
    );
  }

  function textAlign_1({ props: props2 }) {
    return (
      props2.textAlign && {
        textAlign: props2.textAlign,
      }
    );
  }

  function fontWeight_1({ props: props2 }) {
    props2.fontWeight && {
      fontWeight: props2.fontWeight,
      fontVariationSettings: '"wght" ' + props2.fontWeight,
    };
    return;
  }

  function overflow_1({ props: props2 }) {
    return (
      props2.overflow && {
        overflow: props2.overflow,
      }
    );
  }

  function transition_1({ props: props2 }) {
    props2.transition && {
      transition: splitTransition(props2.transition),
    };
    return;
  }

  function willChange_1({ props: props2 }) {
    props2.willChange && {
      willChange: props2.willChange,
    };
    return;
  }

  function transitionDuration_1({ props: props2 }) {
    props2.transitionDuration && {
      transitionDuration: transformDuration(props2.transitionDuration),
    };
    return;
  }

  function transitionDelay_1({ props: props2 }) {
    props2.transitionDelay && {
      transitionDelay: transformDuration(props2.transitionDelay),
    };
    return;
  }

  function transitionTimingFunction_1({ props: props2 }) {
    props2.transitionTimingFunction && {
      transitionTimingFunction: (0, import_scratch3.getTimingFunction)(
        props2.transitionTimingFunction
      ),
    };
    return;
  }

  function transitionProperty_1({ props: props2 }) {
    props2.transitionProperty && {
      transitionProperty: props2.transitionProperty,
      willChange: props2.transitionProperty,
    };
    return;
  }

  function transform_1({ props: props2 }) {
    return (
      props2.transform && {
        transform: props2.transform,
      }
    );
  }

  function transformOrigin_1({ props: props2 }) {
    return (
      props2.transformOrigin && {
        transformOrigin: props2.transformOrigin,
      }
    );
  }

  function userSelect_1({ props: props2 }) {
    return (
      props2.userSelect && {
        userSelect: props2.userSelect,
      }
    );
  }

  function pointerEvents_1({ props: props2 }) {
    return (
      props2.pointerEvents && {
        pointerEvents: props2.pointerEvents,
      }
    );
  }

  function cursor_1({ props: props2 }) {
    return (
      props2.cursor && {
        cursor: props2.cursor,
      }
    );
  }

  function zIndex_1({ props: props2 }) {
    return (
      props2.zIndex && {
        zIndex: props2.zIndex,
      }
    );
  }

  function animation_1(el) {
    el.props.animation && {
      animationName: applyAnimationProps(el.props.animation, el),
      animationDuration: (0, import_scratch9.getTimingByKey)(
        el.props.animationDuration || "A"
      ).timing,
      animationDelay: (0, import_scratch9.getTimingByKey)(
        el.props.animationDelay || "0s"
      ).timing,
      animationTimingFunction: (0, import_scratch9.getTimingFunction)(
        el.props.animationTimingFunction || "ease"
      ),
      animationFillMode: el.props.animationFillMode || "both",
      animationPlayState: el.props.animationPlayState,
      animationDirection: el.props.animationDirection,
    };
    return;
  }

  function animationName_1(el) {
    el.props.animationName && {
      animationName: applyAnimationProps(el.props.animationName, el),
    };
    return;
  }

  function animationDuration_1({ props: props2 }) {
    props2.animationDuration && {
      animationDuration: (0, import_scratch9.getTimingByKey)(
        props2.animationDuration
      ).timing,
    };
    return;
  }

  function animationDelay_1({ props: props2 }) {
    props2.animationDelay && {
      animationDelay: (0, import_scratch9.getTimingByKey)(props2.animationDelay)
        .timing,
    };
    return;
  }

  function animationTimingFunction_1({ props: props2 }) {
    props2.animationTimingFunction && {
      animationTimingFunction: (0, import_scratch9.getTimingFunction)(
        props2.animationTimingFunction
      ),
    };
    return;
  }

  function animationFillMode_1({ props: props2 }) {
    props2.animationFillMode && {
      animationFillMode: props2.animationFillMode,
    };
    return;
  }

  function animationPlayState_1({ props: props2 }) {
    props2.animationPlayState && {
      animationPlayState: props2.animationPlayState,
    };
    return;
  }

  function animationIterationCount_1({ props: props2 }) {
    props2.animationIterationCount && {
      animationIterationCount: props2.animationIterationCount || 1,
    };
    return;
  }

  function animationDirection_1({ props: props2 }) {
    props2.animationDirection && {
      animationDirection: props2.animationDirection,
    };
    return;
  }

  function attr_id_1({ props: props2 }) {
    return props2.id;
  }

  function Box_onBeforeClassAssign_1(element, s) {
    const { props: props2, class: className } = element;
    const CLASS_NAMES = {
      media: {},
      selector: {},
      case: {},
    };
    for (const key in props2) {
      const setter = keySetters[key.slice(0, 1)];
      if (setter) setter(key, props2[key], CLASS_NAMES, element);
    }
    (0, import_utils3.merge)(className, CLASS_NAMES);
    return;
  }

  function Box_onInitUpdate_1(element) {
    const { props: props2, context, class: className } = element;
    const globalTheme = context.designSystem.globalTheme;
    const parentProps = element.parent.props;
    if (
      parentProps &&
      parentProps.spacingRatio &&
      parentProps.inheritSpacingRatio
    ) {
      element.setProps(
        {
          spacingRatio: parentProps.spacingRatio,
          inheritSpacingRatio: true,
        },
        {
          preventRecursive: true,
          ignoreInitUpdate: true,
        }
      );
    }
    if (globalTheme) {
      const CLASS_NAMES = {
        media: {},
        selector: {},
        case: {},
      };
      for (const key in props2) {
        const setter = keySetters[key.slice(0, 1)];
        if (key === "theme") {
          props2.update(
            {
              themeModifier: globalTheme,
            },
            {
              preventRecursive: true,
              ignoreInitUpdate: true,
              preventDefineUpdate: "$setStateCollection",
            }
          );
        } else if (key === "true")
          applyTrueProps(props2[key], CLASS_NAMES, element);
        if (setter) setter(key, props2[key], CLASS_NAMES, element);
      }
      if (Object.keys(CLASS_NAMES.media).length) {
        className.media = CLASS_NAMES.media;
      }
      className.selector = CLASS_NAMES.selector;
      className.case = CLASS_NAMES.case;
    }
    return;
  }

  return (
    <div
      className={`${css(
        style_1({
          props: props2,
        })
      )} ${css(
        shape_1({
          props: props2,
        })
      )} ${css(
        shapeDirection_1({
          props: props2,
        })
      )} ${css(
        shapeDirectionColor_1({
          props: props2,
        })
      )} ${css(
        round_1({
          props: props2,
          ...el,
        })
      )} ${css(
        borderRadius_1({
          props: props2,
          ...el,
        })
      )} ${css(
        content_1({
          props: props2,
        })
      )} ${css(
        position_1({
          props: props2,
        })
      )} ${css(
        inset_1({
          props: props2,
        })
      )} ${css(
        left_1({
          props: props2,
        })
      )} ${css(
        top_1({
          props: props2,
        })
      )} ${css(
        right_1({
          props: props2,
        })
      )} ${css(
        bottom_1({
          props: props2,
        })
      )} ${css(
        depth_1({
          props: props2,
        })
      )} ${css(theme_1(domqlElementObj_1))} ${css(
        color_1(domqlElementObj_1)
      )} ${css(background_1(domqlElementObj_1))} ${css(
        backgroundColor_1(domqlElementObj_1)
      )} ${css(backgroundImage_1(domqlElementObj_1))} ${css(
        backgroundSize_1({
          props: props2,
        })
      )} ${css(
        backgroundPosition_1({
          props: props2,
        })
      )} ${css(
        textStroke_1({
          props: props2,
        })
      )} ${css(
        outline_1({
          props: props2,
        })
      )} ${css(
        border_1({
          props: props2,
        })
      )} ${css(
        borderColor_1({
          props: props2,
        })
      )} ${css(
        borderStyle_1({
          props: props2,
        })
      )} ${css(
        borderLeft_1({
          props: props2,
        })
      )} ${css(
        borderTop_1({
          props: props2,
        })
      )} ${css(
        borderRight_1({
          props: props2,
        })
      )} ${css(
        borderBottom_1({
          props: props2,
        })
      )} ${css(
        boxShadow_1({
          props: props2,
        })
      )} ${css(
        textShadow_1({
          props: props2,
        })
      )} ${css(
        opacity_1({
          props: props2,
        })
      )} ${css(
        visibility_1({
          props: props2,
        })
      )} ${css(
        boxSizing_1({
          props: props2,
        })
      )} ${css(
        display_1({
          props: props2,
        })
      )} ${css(
        hide_1({
          props: props2,
        })
      )} ${css(
        width_1({
          props: props2,
        })
      )} ${css(
        height_1({
          props: props2,
        })
      )} ${css(
        boxSize_1({
          props: props2,
        })
      )} ${css(
        maxWidth_1({
          props: props2,
        })
      )} ${css(
        minWidth_1({
          props: props2,
        })
      )} ${css(
        widthRange_1({
          props: props2,
        })
      )} ${css(
        maxHeight_1({
          props: props2,
        })
      )} ${css(
        minHeight_1({
          props: props2,
        })
      )} ${css(
        heightRange_1({
          props: props2,
        })
      )} ${css(
        direction_1({
          props: props2,
        })
      )} ${css(
        aspectRatio_1({
          props: props2,
        })
      )} ${css(
        borderWidth_1({
          props: props2,
        })
      )} ${css(
        padding_1({
          props: props2,
        })
      )} ${css(
        paddingInline_1({
          props: props2,
        })
      )} ${css(
        paddingBlock_1({
          props: props2,
        })
      )} ${css(
        paddingInlineStart_1({
          props: props2,
        })
      )} ${css(
        paddingInlineEnd_1({
          props: props2,
        })
      )} ${css(
        paddingBlockStart_1({
          props: props2,
        })
      )} ${css(
        paddingBlockEnd_1({
          props: props2,
        })
      )} ${css(
        margin_1({
          props: props2,
        })
      )} ${css(
        marginInline_1({
          props: props2,
        })
      )} ${css(
        marginBlock_1({
          props: props2,
        })
      )} ${css(
        marginInlineStart_1({
          props: props2,
        })
      )} ${css(
        marginInlineEnd_1({
          props: props2,
        })
      )} ${css(
        marginBlockStart_1({
          props: props2,
        })
      )} ${css(
        marginBlockEnd_1({
          props: props2,
        })
      )} ${css(
        gap_1({
          props: props2,
        })
      )} ${css(
        gridArea_1({
          props: props2,
        })
      )} ${css(
        flex_1({
          props: props2,
        })
      )} ${css(
        flexDirection_1({
          props: props2,
        })
      )} ${css(
        alignItems_1({
          props: props2,
        })
      )} ${css(
        alignContent_1({
          props: props2,
        })
      )} ${css(
        justifyContent_1({
          props: props2,
        })
      )} ${css(
        justifyItems_1({
          props: props2,
        })
      )} ${css(
        alignSelf_1({
          props: props2,
        })
      )} ${css(
        order_1({
          props: props2,
        })
      )} ${css(
        flexWrap_1({
          props: props2,
        })
      )} ${css(
        flexFlow_1({
          props: props2,
        })
      )} ${css(
        flexAlign_1({
          props: props2,
        })
      )} ${css(
        gridColumn_1({
          props: props2,
        })
      )} ${css(
        gridColumnStart_1({
          props: props2,
        })
      )} ${css(
        gridRow_1({
          props: props2,
        })
      )} ${css(
        gridRowStart_1({
          props: props2,
        })
      )} ${css(
        size_1({
          props: props2,
        })
      )} ${css(
        columns_1({
          props: props2,
        })
      )} ${css(
        fontSize_1({
          props: props2,
        })
      )} ${css(
        fontFamily_1({
          props: props2,
        })
      )} ${css(
        lineHeight_1({
          props: props2,
        })
      )} ${css(
        textDecoration_1({
          props: props2,
        })
      )} ${css(
        textTransform_1({
          props: props2,
        })
      )} ${css(
        whiteSpace_1({
          props: props2,
        })
      )} ${css(
        letterSpacing_1({
          props: props2,
        })
      )} ${css(
        textAlign_1({
          props: props2,
        })
      )} ${css(
        fontWeight_1({
          props: props2,
        })
      )} ${css(
        overflow_1({
          props: props2,
        })
      )} ${css(
        transition_1({
          props: props2,
        })
      )} ${css(
        willChange_1({
          props: props2,
        })
      )} ${css(
        transitionDuration_1({
          props: props2,
        })
      )} ${css(
        transitionDelay_1({
          props: props2,
        })
      )} ${css(
        transitionTimingFunction_1({
          props: props2,
        })
      )} ${css(
        transitionProperty_1({
          props: props2,
        })
      )} ${css(
        transform_1({
          props: props2,
        })
      )} ${css(
        transformOrigin_1({
          props: props2,
        })
      )} ${css(
        userSelect_1({
          props: props2,
        })
      )} ${css(
        pointerEvents_1({
          props: props2,
        })
      )} ${css(
        cursor_1({
          props: props2,
        })
      )} ${css(
        zIndex_1({
          props: props2,
        })
      )} ${css(animation_1(domqlElementObj_1))} ${css(
        animationName_1(domqlElementObj_1)
      )} ${css(
        animationDuration_1({
          props: props2,
        })
      )} ${css(
        animationDelay_1({
          props: props2,
        })
      )} ${css(
        animationTimingFunction_1({
          props: props2,
        })
      )} ${css(
        animationFillMode_1({
          props: props2,
        })
      )} ${css(
        animationPlayState_1({
          props: props2,
        })
      )} ${css(
        animationIterationCount_1({
          props: props2,
        })
      )} ${css(
        animationDirection_1({
          props: props2,
        })
      )}`}
      id={attr_id_1({
        props: props2,
      })}
      onBeforeClassAssign={() =>
        Box_onBeforeClassAssign_1(domqlElementObj_1, s)
      }
      onInitUpdate={() => Box_onInitUpdate_1(domqlElementObj_1)}
    />
  );
}

