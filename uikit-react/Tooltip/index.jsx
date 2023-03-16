'use strict';

import React from 'react';
import { Box } from '@symbo.ls/react-box';
import { Flex } from '@symbo.ls/react-atoms';

export const Tooltip = (props) => {
  const containerProps = {
    flexDirection: 'column',

    textAlign: 'center',
    padding: 'Z1 A',
    round: 'Y2',
    minWidth: 'D2',
    gap: 'X',

    height: '36px',
    background: 'tooltipBackground',
    borderRadius: '12px',
    color: 'pink',

    shape: "tooltip",
    shapeDirection: 'top',
    shapeModifier: {
      position: 'block east',
      direction: 'north east',
    },
  };

  const titleProps = {
    fontWeight: '500',
    color: 'gray12',
    text: 'Tooltip is coming',
    ...props.titleProps,
  };

  const subtitleProps = {
    fontSize: 'Z2',
    margin: '0',
    color: 'gray6',
    text: 'and winter too',
    fontWeight: '400',
    ...props.subtitleProps,
  };

  return(
    <Flex
      {...containerProps}
    >
      <Box
        // tag={'title'}
        {...titleProps}
      >
        {
          titleProps.text
        }
      </Box>
      <Box
        tag={'p'}
        {...subtitleProps}
      >
        {
          subtitleProps.text
        }
      </Box>
    </Flex>
  )
};
