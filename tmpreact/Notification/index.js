import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Notification(props) {
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

Notification.defaultProps = {
  cursor: "pointer",
  align: "flex-start center",
  icon: { icon: "info outline" },
  article: {
    flow: "column",
    align: "flex-start",
    gap: "X2",
    title: {
      fontWeight: "600",
      lineHeight: "1em",
      text: "Notification",
    },
    p: {
      fontSize: "Z",
      margin: "0",
      text: "is not always a distraction",
    },
  },
};

