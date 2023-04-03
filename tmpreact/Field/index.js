import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Field(props) {
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

Field.defaultProps = {
  value: undefined,
  depth: 16,
  placeholder: "",
  type: "text",
  input: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  svg: {
    position: "absolute",
    right: "1em",
  },
  align: "center center",
};

