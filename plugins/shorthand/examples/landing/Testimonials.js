export const Testimonials = {
  flow: 'y',
  gap: 'C',
  width: '100%',
  position: 'relative',

  Hgroup: {
    tag: 'header',
    flow: 'y',
    gap: 'A',
    padding: '- D',
    width: '100%',
    margin: '- auto',
    maxWidth: 'I2*2',
    '@mobileL': {
      padding: '- B'
    },

    H: {
      tag: 'h6',
      text: 'What people say',
      fontWeight: '600',
      margin: '0',
      color: 'title'
    },

    P: {
      color: 'caption',
      fontWeight: '400',
      text: 'Trusted by engineers, designers, and teams worldwide.'
    }
  },

  Scrollable: {
    gap: 'B',
    padding: 'A B',
    '@mobileL': {
      padding: 'A B',
      style: {
        scrollSnapType: 'x mandatory'
      }
    },
    align: 'flex-start',
    childExtends: 'TestimonialCard',
    children: [
      {
        P: { text: 'This is awesome. I love it. Symbols is doing great work.' },
        Flex: {
          Avatar: { src: 'james.svg' },
          Flex_2: {
            Strong: { text: 'James Harris' },
            Caption: { text: 'Frontend Developer' }
          }
        }
      },
      {
        P: { text: 'This would definitely streamline the process for my web dev agency.' },
        Flex: {
          Avatar: { src: 'joe.svg' },
          Flex_2: {
            Strong: { text: 'Joe Mallory-Skinner' },
            Caption: { text: 'Design System Designer' }
          }
        }
      },
      {
        P: { text: 'This would definitely streamline the process for my web dev agency.' },
        Flex: {
          Avatar: { src: 'arthur.svg' },
          Flex_2: {
            Strong: { text: 'Arthur Beckett' },
            Caption: { text: 'Full Stack Developer' }
          }
        }
      },
      {
        P: { text: 'What you guys have built is really cool. I definitely see a use for this.' },
        Flex: {
          Avatar: { src: 'mike.svg' },
          Flex_2: {
            Strong: { text: 'Mike Minciotti' },
            Caption: { text: 'Agency Owner' }
          }
        }
      },
      {
        P: { text: 'Symbols is miles ahead of what my company uses to manage UIkits.' },
        Flex: {
          Avatar: { src: 'aaron.svg' },
          Flex_2: {
            Strong: { text: 'Aaron Fagan' },
            Caption: { text: 'Enterprise Architect' }
          }
        }
      },
      {
        P: { text: 'Symbols is definitely more advanced than Storybook.' },
        Flex: {
          Avatar: { src: 'derek.svg' },
          Flex_2: {
            Strong: { text: 'Derek Onay' },
            Caption: { text: 'Senior Product Designer' }
          }
        }
      },
      {
        P: { text: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.' },
        Flex: {
          Avatar: { src: 'matt.svg' },
          Flex_2: {
            Strong: { text: 'Matt Vaccaro' },
            Caption: { text: 'Product Engineer' }
          }
        }
      },
      {
        P: { text: 'Great product. I will for sure be a customer. Also excited to see where you guys take it.' },
        Flex: {
          Avatar: { src: 'chirag.svg' },
          Flex_2: {
            Strong: { text: 'Chirag Thesia' },
            Caption: { text: 'Software Engineer' }
          }
        }
      },
      {
        P: { text: "I'm very impressed with the overall product. Very useful." },
        Flex: {
          Avatar: { src: 'enes.svg' },
          Flex_2: {
            Strong: { text: 'Enes Tufekci' },
            Caption: { text: 'Owner of UIAgents' }
          }
        }
      },
      {
        P: { text: 'It looks like it will solve the big issue with tech stack fragmentation.' },
        Flex: {
          Avatar: { src: 'andrew.svg' },
          Flex_2: {
            Strong: { text: 'Andrew Smith' },
            Caption: { text: 'Product Director' }
          }
        }
      }
    ]
  }
}
