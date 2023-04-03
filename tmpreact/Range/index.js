import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function Range(props) {
  return <input type="range" />;
}

Range.defaultProps = {
  appearance: "none",
  outline: "none",
  "::-webkit-slider-thumb": {
    boxSizing: "content-box",
    width: "8px",
    height: "8px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "100%",
    opacity: ".8",
    style: { appearance: "none" },
  },
  "::-webkit-slider-runnable-track": {},
  "@dark": {
    background: "white 0.2",
    "::-webkit-slider-thumb": {
      background: "#232526",
      borderColor: "rgba(69,70,70,0.75)",
    },
    ":hover": {
      "::-webkit-slider-thumb": {
        borderColor: "rgba(255,255,255,0.35)",
      },
    },
    ":focus": {
      "::-webkit-slider-thumb": { borderColor: "#3C6AC0" },
    },
  },
  "@light": {
    background: "gray9",
    "::-webkit-slider-thumb": {
      background: "white",
      borderColor: "gray9",
    },
    ":hover": {
      "::-webkit-slider-thumb": { borderColor: "gray7" },
    },
    ":focus": {
      "::-webkit-slider-thumb": { borderColor: "blue" },
    },
  },
};


export function RangeWithButtons(props) {
  return <div />;
}

