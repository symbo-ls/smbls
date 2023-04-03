import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function RangeSlider(props) {
  return (
    <input
      type="range"
      className={`${css({
        appearance: "none",
        width: "100%",
        height: "2px",
        outline: "none",
        flex: 1,
        "&::-webkit-slider-thumb": {
          boxSizing: "content-box",
          appearance: "none",
          width: "8px",
          height: "8px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "100%",
          opacity: ".8",
        },
      })}`}
    />
  );
}

RangeSlider.defaultProps = {};


export function Slider(props) {
  return <div />;
}

