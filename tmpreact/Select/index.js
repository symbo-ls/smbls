import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Select(props) {
  function attr_name_1({ props: props2 }) {
    return props2.name;
  }

  function attr_disabled_1({ props: props2 }) {
    return props2.disabled;
  }

  function attr_placeholder_1({ props: props2 }) {
    return props2.placeholder;
  }

  function attr_tabIndex_1({ props: props2 }) {
    return props2.tabIndex;
  }

  return (
    <select
      name={attr_name_1({
        props: props2,
      })}
      disabled={attr_disabled_1({
        props: props2,
      })}
      placeholder={attr_placeholder_1({
        props: props2,
      })}
      tabIndex={attr_tabIndex_1({
        props: props2,
      })}
    />
  );
}

Select.defaultProps = {
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};

