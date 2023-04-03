import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export default function TextArea(props) {
  function attr_pattern_1({ props: props3 }) {
    return props3.pattern;
  }

  function attr_minlength_1({ props: props3 }) {
    return props3.minlength;
  }

  function attr_maxlength_1({ props: props3 }) {
    return props3.maxlength;
  }

  function attr_name_1({ props: props3 }) {
    return props3.name;
  }

  function attr_placeholder_1({ props: props3 }) {
    return props3.placeholder;
  }

  function attr_value_1({ props: props3 }) {
    return props3.value;
  }

  function attr_disabled_1({ props: props3 }) {
    return props3.disabled || null;
  }

  function attr_readonly_1({ props: props3 }) {
    return props3.readonly;
  }

  function attr_required_1({ props: props3 }) {
    return props3.required;
  }

  function attr_type_1({ props: props3 }) {
    return props3.type;
  }

  function attr_tabIndex_1({ props: props3 }) {
    return props3.tabIndex;
  }

  return (
    <textarea
      pattern={attr_pattern_1({
        props: props3,
      })}
      minlength={attr_minlength_1({
        props: props3,
      })}
      maxlength={attr_maxlength_1({
        props: props3,
      })}
      name={attr_name_1({
        props: props3,
      })}
      placeholder={attr_placeholder_1({
        props: props3,
      })}
      value={attr_value_1({
        props: props3,
      })}
      disabled={attr_disabled_1({
        props: props3,
      })}
      readonly={attr_readonly_1({
        props: props3,
      })}
      required={attr_required_1({
        props: props3,
      })}
      type={attr_type_1({
        props: props3,
      })}
      tabIndex={attr_tabIndex_1({
        props: props3,
      })}
    />
  );
}

TextArea.defaultProps = {
  type: "input",
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};

