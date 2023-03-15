
import React from "react";
import { Flex } from "@symbo.ls/atoms";
import { Box } from "@symbo.ls/react-box";
import { transformEmotion, transformClassname} from 'css-in-props'

export const Flex = (props) => {
  const excludedProps = {};
  const transformedProps = transformClassname(flexProps, void 0, Flex.class, excludedProps)
  const propsClass = transformEmotion(transformedProps)

  return (
    <Box tag={props.tag} className={propsClass} {...excludedProps}>
      {props.children}
    </Box>
  );
};

Flex.defaultProps = {
  display: 'flex'
}
