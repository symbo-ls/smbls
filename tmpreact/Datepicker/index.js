import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function DatePicker(props) {
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
      className={`${css({
        main: {
          "section > header span:nth-child(6)": {
            opacity: 0.5,
          },
          "section > header span:nth-child(7)": {
            opacity: 0.5,
          },
          "section > div button:nth-child(7n)": {
            opacity: 0.5,
          },
          "section > div button:nth-child(7n - 1)": {
            opacity: 0.5,
          },
        },
      })} ${css(
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

DatePicker.defaultProps = { depth: 16, align: "stretch center" };

