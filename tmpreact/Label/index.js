import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Label(props) {
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

  function attr_type_1({ props: props2 }) {
    return props2.type;
  }

  function attr_placeholder_1({ props: props2 }) {
    return props2.placeholder;
  }

  function attr_tabIndex_1({ props: props2 }) {
    return props2.tabIndex;
  }

  return (
    <button
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
      type={attr_type_1({
        props: props2,
      })}
      placeholder={attr_placeholder_1({
        props: props2,
      })}
      tabIndex={attr_tabIndex_1({
        props: props2,
      })}
    >
      3
    </button>
  );
}

Label.defaultProps = {
  emoji: "👍",
  text: "3",
  depth: 16,
  type: "button",
  align: "center center",
  whiteSpace: "nowrap",
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};

