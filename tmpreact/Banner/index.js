import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function ParentMode(props) {
  return (
    <div
      className={`${css({
        boxSizing: "border-box",
        padding: "3.6em 1.6em 4em 3.6em",
        position: "relative",
        display: "block",
        width: "700px",
        "> svg": {
          position: "absolute",
          top: "1.2em",
          right: "1.2em",
          color: "rgba(215, 100, 185, .2)",
        },
        "> div": {
          alignItems: "flex-start",
          "> div": {
            marginTop: "4px",
          },
        },
        h2: {
          margin: 0,
          marginBottom: "10px",
        },
        span: {
          maxWidth: "22.428571428571427em",
          lineHeight: "22px",
        },
      })}`}
    />
  );
}

ParentMode.defaultProps = {};

