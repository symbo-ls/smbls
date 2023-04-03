import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Video(props) {
  function attr_autoplay_1() {
    return props.autoplay;
  }

  function attr_controls_1() {
    return props.controls;
  }

  return <video autoplay={attr_autoplay_1()} controls={attr_controls_1()} />;
}

Video.defaultProps = { controls: true };

