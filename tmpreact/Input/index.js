import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function Input(props) {
  function attr_pattern_1({ props: props2 }) {
    return props2.pattern;
  }

  function attr_minlength_1({ props: props2 }) {
    return props2.minlength;
  }

  function attr_maxlength_1({ props: props2 }) {
    return props2.maxlength;
  }

  function attr_name_1({ props: props2 }) {
    return props2.name;
  }

  function attr_placeholder_1({ props: props2 }) {
    return props2.placeholder;
  }

  function attr_value_1({ props: props2 }) {
    return props2.value;
  }

  function attr_disabled_1({ props: props2 }) {
    return props2.disabled || null;
  }

  function attr_readonly_1({ props: props2 }) {
    return props2.readonly;
  }

  function attr_required_1({ props: props2 }) {
    return props2.required;
  }

  function attr_type_1({ props: props2 }) {
    return props2.type;
  }

  function attr_tabIndex_1({ props: props2 }) {
    return props2.tabIndex;
  }

  return (
    <input
      pattern={attr_pattern_1({
        props: props2,
      })}
      minlength={attr_minlength_1({
        props: props2,
      })}
      maxlength={attr_maxlength_1({
        props: props2,
      })}
      name={attr_name_1({
        props: props2,
      })}
      placeholder={attr_placeholder_1({
        props: props2,
      })}
      value={attr_value_1({
        props: props2,
      })}
      disabled={attr_disabled_1({
        props: props2,
      })}
      readonly={attr_readonly_1({
        props: props2,
      })}
      required={attr_required_1({
        props: props2,
      })}
      type={attr_type_1({
        props: props2,
      })}
      tabIndex={attr_tabIndex_1({
        props: props2,
      })}
    />
  );
}

Input.defaultProps = {
  type: "input",
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};

