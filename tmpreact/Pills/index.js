import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Pills(props) {
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

Pills.defaultProps = {
  childProps: {
    background: "gray6",
    width: "Y2",
    height: "Y2",
    round: "A",
    ".active": { background: "gray9" },
  },
};

