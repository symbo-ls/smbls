import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function Tooltip(props) {
  function flow_1({ props: props2 }) {
    return (
      props2.flow && {
        flexFlow: props2.flow,
      }
    );
  }

  function wrap_1({ props: props2 }) {
    return (
      props2.wrap && {
        flexWrap: props2.wrap,
      }
    );
  }

  function align_1({ props: props2 }) {
    if (typeof props2.align !== "string") return;
    const [alignItems, justifyContent] = props2.align.split(" ");
    return {
      alignItems,
      justifyContent,
    };
  }

  return (
    <div
      tooltip="true"
      className={`${css(
        flow_1({
          props: props2,
        })
      )} ${css(
        wrap_1({
          props: props2,
        })
      )} ${css(
        align_1({
          props: props2,
        })
      )}`}
    />
  );
}

Tooltip.defaultProps = {
  flow: "column",
  shape: "tooltip",
  shapeDirection: "top",
  title: {
    fontWeight: 500,
    color: "gray12",
    text: "And tooltip is coming",
  },
  p: {
    fontSize: "Z2",
    margin: "0",
    color: "gray6",
    text: "and winter too",
    fontWeight: "400",
  },
};


export function TooltipParent(props) {
  return <div />;
}

TooltipParent.defaultProps = { zIndex: 999 };

