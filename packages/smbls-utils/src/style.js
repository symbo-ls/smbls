'use strict'

export const getEmotionStylesheet = () => {
  // Access the first stylesheet
  const stylesheet = document.styleSheets[0]
  let str = ''
  if (stylesheet) {
    try {
      // Access the CSS rules
      const cssRules = stylesheet.cssRules || stylesheet.rules // For older browsers, use `rules`

      // Iterate over the rules and log them
      for (let i = 0; i < cssRules.length; i++) {
        str += cssRules[i].cssText
      }
    } catch (error) {
      console.error('Unable to access CSS rules. This may be due to CORS restrictions:', error)
    }
  } else {
    console.log('No stylesheets found in document.styleSheets[0].')
  }
  return str
}
