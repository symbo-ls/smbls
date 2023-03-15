
import React from "react";
import { Box } from "@symbo.ls/react-box";
import { transformEmotion, transformClassname} from 'css-in-props'

export const Flex = (props) => {
  const flexProps = {
    display: 'flex',
    flexFlow: props.flexFlow,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    ...props
  }

  return (
    <Box tag={props.tag} className={transformEmotion(transformClassname(flexProps))} {...props}>
      {props.children}
    </Box>
  );
};
