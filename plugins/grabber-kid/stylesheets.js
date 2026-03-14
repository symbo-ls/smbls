const getRelevantRules = (node, rules) => {
  let relevantRules = []

  for (const rule of rules) {
    const { selectorText, conditionText, media, cssRules } = rule

    if (selectorText && node.matches(selectorText)) {
      relevantRules.push(rule)
    } else if ((conditionText || (media && media.length > 0)) && cssRules) {
      relevantRules = [
        ...relevantRules,
        ...getRelevantRules(node, rule.cssRules)
      ]
    }
  }

  return relevantRules
}

const extractStylesFromRule = (rule, defaults = {}) => {
  const { style } = rule
  const results = {}

  // Loop through each property and add it to the styles object
  for (let k = 0; k < style.length; k++) {
    const prop = style[k]
    const value = style.getPropertyValue(prop)
    const defaultValue = defaults[prop]

    if (value && value !== defaultValue) {
      results[prop] = value
    }
  }

  return results
}

const processMediaQueries = (rule, parentRule) => {
  const { conditionText } = parentRule
  let key = `@media ${conditionText}`
  if (
    ['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)'].includes(
      conditionText
    )
  ) {
    key = conditionText.includes('dark') ? '@dark' : '@light'
  }

  return { [key]: { ...extractStylesFromRule(rule) } }
}

const getAppliedStylesheets = (node) => {
  let styles = {}
  let conditionalStyles = {}

  // Loop through all stylesheets
  for (const styleSheet of document.styleSheets) {
    let baseRules = null
    // Try to access the cssRules of the stylesheet (some stylesheets may be cross-origin and not accessible)
    try {
      baseRules = styleSheet.cssRules
    } catch (error) {
      // Unable to access stylesheet (possibly cross-origin), skip it
      console.log('Could not access stylesheet rules:', { styleSheet, error })
    }

    if (baseRules !== null) {
      // filter rules down to relevant ones with selectors
      const rules = getRelevantRules(node, baseRules)

      // Loop through all rules within the stylesheet
      for (const rule of rules) {
        const { parentRule } = rule

        // Rule is enclosed within a media query
        if (parentRule && parentRule.conditionText) {
          conditionalStyles = {
            ...conditionalStyles,
            ...processMediaQueries(rule, parentRule)
          }
        } else if (rule.selectorText.includes(':hover')) {
          // Hover styles should be extracted separately as they do not
          // follow the same patterns as other conditional styles
          const hoverKey = ':hover'
          conditionalStyles[hoverKey] = {
            ...conditionalStyles[hoverKey],
            ...extractStylesFromRule(rule)
          }
        } else {
          styles = { ...styles, ...extractStylesFromRule(rule) }
        }
      }
    }
  }

  return [styles, conditionalStyles]
}

const getInlineStyles = (node, defaults) => {
  const styles = {}
  for (let i = 0; i < node.style.length; i++) {
    const prop = node.style[i]
    const val = node.style.getPropertyValue(prop)

    if (val && val !== defaults[prop]) {
      styles[prop] = val
    }
  }

  return styles
}

export function getAllAppliedSheetStyles(node, defaults) {
  const inlineStyles = getInlineStyles(node, defaults)
  const [stylesheetStyles, conditionalStyles] = getAppliedStylesheets(node)
  return [{ ...stylesheetStyles, ...inlineStyles }, conditionalStyles]
}
