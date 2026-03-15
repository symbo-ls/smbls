export const FeatureStory = {
  extend: 'Flex',
  props: {
    flow: 'y',
    align: 'center flex-start',
    minWidth: '320px',
    margin: '- auto',
    width: '100%',
    maxWidth: 'J1',
  },
  Hgroup: {
    textAlign: 'center',
    align: 'center flex-start',
    gap: 'Z',
    padding: '- - C2 -',
    '@tabletS': {
      padding: '- B C2 B',
    },
    H: {
      color: 'title',
      text: 'Turning ideas into',
      fontWeight: '400',
      fontSize: 'E1',
      lineHeight: '1.3em',
      Strong: {
        text: ' features',
      },
    },
    P: {
      text: 'Read our case studies how you can bootstrap, grow and scale your product with Symbols',
      fontWeight: '400',
      fontSize: 'B',
      maxWidth: 'G3+B',
      color: 'title',
    },
  },
  Grid: {
    borderStyle: 'solid',
    borderColor: 'line',
    borderWidth: '1px',
    margin: 'C - - -',
    width: '100%',
    overflow: 'hidden',
    columns: 'repeat(3, 1fr)',
    '@tabletL': {
      columns: '100%',
      padding: 'C',
      gap: 'D1',
    },
    '@mobileM': {
      padding: '0',
      gap: '0',
    },
    childProps: {
      position: 'relative',
      padding: 'C1 B1 C C1',
      '@tabletL': {
        boxSize: 'H2 100%',
        gap: 'B1',
        padding: '0 0 D C',
      },
      '@tabletS': {
        boxSize: 'H 100%',
        padding: '0 0 B1 B1',
      },
      '@mobileL': {
        boxSize: 'G1 100%',
        padding: '0 0 A1 B',
      },
      '@mobileM': {
        padding: 'C B1',
        boxSize: 'fit-content 100%',
      },
      '@mobileS': {
        padding: 'B',
      },
      ':before': {
        content: '""',
        boxSize: '.8px 130%',
        background: 'line',
        zIndex: '4',
        position: 'absolute',
        top: '-C',
        left: '-D1',
        display: 'none',
        '@tabletL': {
          display: 'block',
        },
        '@mobileM': {
          display: 'none',
        },
      },
      ':after': {
        content: '""',
        boxSize: '100% 100%',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'none',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%)',
        zIndex: '2',
        '@tabletL': {
          display: 'block',
        },
        '@mobileM': {
          display: 'none',
        },
      },
      ':hover': {
        background: 'line .35',
      },
      ':first-child': {
        ':before': {
          display: 'none',
        },
      },
      ':not(:last-child)': {
        borderWidth: '0 1px 0 0',
        borderStyle: 'solid',
        borderColor: 'line',
        '@tabletL': {
          borderWidth: '0 0 0 0',
        },
        '@mobileM': {
          borderWidth: '0 0 1px 0',
        },
      },
      Box: {
        '@tabletL': {
          boxSize: '100% 100%',
          position: 'absolute',
          top: '0',
          left: '0',
        },
        '@mobileM': {
          position: 'relative',
          boxSize: 'F1 100%',
        },
        '@mobileXS': {
          boxSize: 'F 100%',
        },
        Img: {
          '@tabletL': {
            opacity: '.7',
          },
          '@mobileM': {
            opacity: '1',
          },
        },
        Icon: {
          '@tabletL': {
            fontSize: 'E2',
            top: '40%',
          },
          '@mobileL': {
            fontSize: 'E',
            top: '38%',
          },
          '@mobileM': {
            fontSize: 'C',
            top: '50%',
          },
        },
      },
      H3: {
        '@tabletL': {
          zIndex: '3',
          fontSize: 'F1',
          lineHeight: '1.4em',
          margin: 'auto 0 0 0',
          maxWidth: 'F+B1',
        },
        '@tabletS': {
          fontSize: 'E2',
        },
        '@mobileL': {
          fontSize: 'D',
          maxWidth: 'F+A',
        },
        '@mobileM': {
          fontSize: 'B2+X1',
          maxWidth: 'F',
          margin: 'Z2 - B2 -',
          lineHeight: '1.3em',
        },
        '@mobileS': {
          fontSize: 'D',
          margin: '0 - B -',
        },
        '@mobileXS': {
          padding: '- A - -',
        },
      },
      IconText: {
        '@tabletL': {
          zIndex: '3',
          ':after': {
            display: 'none',
          },
        },
      },
    },
    childExtends: 'StoryItem',
    children: [
      {
        href: '/docs/intro',
      },
      {
        Box: {
          Img: {
            src: 'frame2.svg',
          },
        },
        H3: {
          text: 'Inspect your existing website and customize',
        },
        IconText: {
          text: 'Coming soon',
        },
      },
      {
        Box: {
          Img: {
            src: 'frame.png',
          },
        },
        H3: {
          text: 'Turn your user stories and meetings into features',
          maxWidth: 'F1',
        },
        IconText: {
          text: 'Coming soon',
        },
      },
    ],
  },
  CaseStudies: {
    hide: true,
    extends: 'Flex',
    margin: 'D - - -',
    width: '100%',
    flow: 'y',
    gap: 'A',
    align: 'flex-start flex-start',
    overflow: 'hidden',
    H6: {
      text: 'Case studies',
      fontSize: 'A2',
      fontWeight: '100',
    },
    Box: {
      overflow: 'hidden',
      maxWidth: '100%',
      padding: 'B2 -',
      position: 'relative',
      borderStyle: 'solid',
      borderColor: 'line',
      borderWidth: '1px',
      '@tabletS': {
        padding: 'Z - - -',
      },
      '@mobileM': {
        padding: 'A2 - - -',
      },
      '@mobileS': {
        padding: 'A - A1 -',
      },
      ':after': {
        content: '""',
        boxSize: '100% C1',
        background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        position: 'absolute',
        top: '0',
        right: '0',
        pointerEvents: 'none',
        '@mobileM': {
          display: 'none',
        },
      },
      Flex: {
        gap: 'D',
        maxWidth: '100%',
        overflow: 'auto',
        padding: '- B',
        '@tabletS': {
          gap: 'B2',
          padding: '- B2',
          style: {
            scrollSnapType: 'x mandatory',
          },
          scrollPadding: 'B2',
        },
        '@mobileS': {
          padding: '- A',
          scrollPadding: 'A',
        },
        '::-webkit-scrollbar': {
          display: 'none',
        },
        childProps: {
          flow: 'x',
          padding: '0',
          '@tabletS': {
            minWidth: '100%',
            maxWidth: '100%',
            flow: 'y',
            gap: '0',
            align: 'flex-start flex-start',
            style: {
              scrollSnapAlign: 'start',
            },
          },
          Img: {
            '@tabletS': {
              boxSize: 'G1 H',
            },
            '@mobileL': {
              boxSize: 'G G2',
            },
            '@mobileM': {
              boxSize: 'auto 100%',
            },
          },
          Flex: {
            H2: {
              '@tabletS': {
                minWidth: 'D',
                maxWidth: 'G2',
                padding: '- A B -',
              },
              '@mobileM': {
                fontSize: 'D',
                padding: 'A A C Y',
              },
              '@mobileXS': {
                fontSize: 'C1',
                padding: 'A Y C Y',
              },
            },
            IconText: {
              '@mobileM': {
                padding: '- - - Z',
                margin: 'A - - -',
              },
            },
          },
        },
        childExtends: 'CaseItem',
        children: [
          {},
          {
            Img: {
              src: 'bitmap2.svg',
            },
            Flex: {
              H2: {
                text: 'Delivering ecommerce that does not look like others - the Mankanet story',
                minWidth: 'F+C1',
                maxWidth: 'F+C1',
              },
            },
          },
        ],
      },
      Scrollbar: {
        margin: 'C - - -',
        minWidth: '100%',
        maxWidth: '100%',
        padding: '- B - B2',
        '@mobileS': {
          margin: 'A2 - - -',
          padding: '- A - B',
        },
        TrackContainer: {
          Track: {
            background: 'gray3',
            onFrame: el => {
              const flexNode = el.lookup('Flex').node
              const viewportRatio = flexNode.clientWidth / flexNode.scrollWidth
              const scrollRatio =
                flexNode.scrollLeft / (flexNode.scrollWidth - flexNode.clientWidth)

              el.variables({
                clientWidth: flexNode.clientWidth,
                scrollWidth: flexNode.scrollWidth
              }).changed(() => {
                const ScrollBar = el.lookup('Scrollbar')
                // Check if there's no scrollable area
                if (flexNode.clientWidth >= flexNode.scrollWidth) {
                  ScrollBar.setNodeStyles({
                    display: 'none'
                  })
                } else {
                  ScrollBar.setNodeStyles({
                    display: 'flex'
                  })
                }
              })

              // Set width as percentage of viewport vs scrollable area
              el.node.style.width = `${viewportRatio * 100}%`
              el.node.style.transform = `translateX(${
            scrollRatio * (100 - viewportRatio * 100)
          }%)`
            },
          },
        },
        NavigationArrows: {
          childProps: {
            theme: 'transparent',
            onClick: (ev, el) => {
              const flexNode = el.lookup('Flex').node
              const isLeft = el.key === '0'
              const scrollAmount = flexNode.clientWidth * .65

              flexNode.scrollBy({
                left: isLeft ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
              })
            },
            Icon: {},
          },
        },
      },
    },
  },
};