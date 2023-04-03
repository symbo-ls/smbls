import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function Img(props) {
  function attr_src_1({ props: props2 }) {
    return props2.src;
  }

  function attr_alt_1({ props: props2 }) {
    return props2.alt;
  }

  function attr_title_1({ props: props2 }) {
    return props2.title || props2.alt;
  }

  return (
    <img
      src={attr_src_1({
        props: props2,
      })}
      alt={attr_alt_1({
        props: props2,
      })}
      title={attr_title_1({
        props: props2,
      })}
    />
  );
}

Img.defaultProps = { src: "", alt: "", title: "" };

