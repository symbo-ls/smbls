export const Writing = {
  delay: 0,
  speed: 25,
  onAttachNode: (el) => {
    const text = el.props.text || el.props.afterText || el.text
    // text = 'Interface Engineering'
    let index = 0
    el.node.textContent = ''

    const t = setTimeout(() => {
      const typeCharacter = () => {
        if (index < text.length) {
          el.node.textContent = text.slice(0, index + 1)
          index++
          setTimeout(typeCharacter, el.props.speed)
        }
      }
      typeCharacter()
      clearTimeout(t)
    }, el.props.delay)
  },
};