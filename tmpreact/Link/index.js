import * as React from "react";
import { css } from "@emotion/css";
import { setClassname } from "css-in-props";

export function Link(props) {
  const childProps_Link_1 = {
    aria: {},
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'currentColor',
    draggable: true,
    border: 'none',
    outline: 'solid, 0, blue .3',
    ':focus-visible': {
        opacity: 1,
        outline: 'solid, X, blue .3'
    }
  }

  const domqlElementObj_1 = {
    key: 'TODO',
    tag: 'a',
    context: 'TODO',
    props: childProps_Link_1,
    state: {}
  }

  function attr_href_1(el, s, ctx) {
    const { exec: exec2 } = ctx.utils;
    return exec2(el.props.href, el) || exec2(el.props, el).href;
  }

  function attr_target_1({ props: props2 }) {
    return props2.target;
  }

  function attr_aria_label_1({ props: props2 }) {
    return props2.aria ? props2.aria.label : props2.text;
  }

  function attr_draggable_1({ props: props2 }) {
    return props2.draggable;
  }

  function attr_placeholder_1({ props: props2 }) {
    return props2.placeholder;
  }

  function attr_tabIndex_1({ props: props2 }) {
    return props2.tabIndex;
  }

  return (
    <a
      href={attr_href_1(domqlElementObj_1, s, ctx)}
      target={attr_target_1({
        props: props2,
      })}
      aria-label={attr_aria_label_1({
        props: props2,
      })}
      draggable={attr_draggable_1({
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

Link.defaultProps = {
  aria: {},
  draggable: true,
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};


export function RouteLink(props) {
  const childProps_RouteLink_1 = {
    aria: {},
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'currentColor',
    draggable: true,
    border: 'none',
    outline: 'solid, 0, blue .3',
    ':focus-visible': {
        opacity: 1,
        outline: 'solid, X, blue .3'
    }
  }

  const domqlElementObj_1 = {
    key: 'TODO',
    tag: 'a',
    context: 'TODO',
    props: childProps_RouteLink_1,
    state: {}
  }

  function attr_href_1(el, s, ctx) {
    const { exec: exec2 } = ctx.utils;
    return exec2(el.props.href, el) || exec2(el.props, el).href;
  }

  function attr_target_1({ props: props2 }) {
    return props2.target;
  }

  function attr_aria_label_1({ props: props2 }) {
    return props2.aria ? props2.aria.label : props2.text;
  }

  function attr_draggable_1({ props: props2 }) {
    return props2.draggable;
  }

  function attr_placeholder_1({ props: props2 }) {
    return props2.placeholder;
  }

  function attr_tabIndex_1({ props: props2 }) {
    return props2.tabIndex;
  }

  function RouteLink_onClick_1(event, el, s, ctx) {
    const { props: props2 } = el;
    const { router } = ctx.utils;
    const root = el.__ref.__root;
    const { href } = props2;
    const firstThree = href[0] + href[1] + href[2];
    const routerOptions = props2.routerOptions || {
      scrollToOptions: {
        behaviour: "instant",
      },
    };
    if (href && firstThree !== "htt" && firstThree !== "ske") {
      (router || import_router.router)(root, href, {}, routerOptions);
      event.preventDefault();
    }
    return;
  }

  return (
    <a
      href={attr_href_1(domqlElementObj_1, s, ctx)}
      target={attr_target_1({
        props: props2,
      })}
      aria-label={attr_aria_label_1({
        props: props2,
      })}
      draggable={attr_draggable_1({
        props: props2,
      })}
      placeholder={attr_placeholder_1({
        props: props2,
      })}
      tabIndex={attr_tabIndex_1({
        props: props2,
      })}
      onClick={(ev) => RouteLink_onClick_1(domqlElementObj_1, el, s, ctx)}
    />
  );
}

RouteLink.defaultProps = {
  aria: {},
  draggable: true,
  outline: "solid, 0, blue .3",
  ":focus-visible": {
    opacity: 1,
    outline: "solid, X, blue .3",
  },
};


export function RouterLink(props) {
  const childProps_RouterLink_1 = {}

  const domqlElementObj_1 = {
    key: 'TODO',
    tag: 'div',
    context: 'TODO',
    props: childProps_RouterLink_1,
    state: {}
  }

  function RouterLink_onClick_1(event, el, s, ctx) {
    const { props: props2 } = el;
    const { router } = ctx.utils;
    const root = el.__ref.__root;
    const { href } = props2;
    const firstThree = href[0] + href[1] + href[2];
    const routerOptions = props2.routerOptions || {
      scrollToOptions: {
        behaviour: "instant",
      },
    };
    if (href && firstThree !== "htt" && firstThree !== "ske") {
      (router || import_router.router)(root, href, {}, routerOptions);
      event.preventDefault();
    }
    return;
  }

  return (
    <div
      onClick={(ev) => RouterLink_onClick_1(domqlElementObj_1, el, s, ctx)}
    />
  );
}

