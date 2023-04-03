import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function Avatar(props) {
  const key = "44"

  function attr_src_1({ props: props2 }) {
    return (
      props2.src ||
      `https://avatars.dicebear.com/api/${
        props2.avatarType || "adventurer-neutral"
      }/${props2.key || key}.svg`
    );
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

Avatar.defaultProps = {
  avatarType: "initials",
  cursor: "pointer",
  src: "",
  alt: "",
  title: "",
};


export function AvatarBundle(props) {
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

AvatarBundle.defaultProps = {};

