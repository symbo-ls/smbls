export const SearchDropdown_copy = {
  state: {
    isOpen: false,
    selected: 'Search and Select',
    data: [
      'Los Angeles',
      'New York',
      'San Fransisco',
      'San Diego',
    ],
    filtered: [
    ],
    searchValue: '',
  },
  SelectedContainer: {
    text: '{{ selected }}',
    padding: 'Z A2',
    background: '#f5f5f5',
    color: 'black',
    borderBottom: '1px solid #ccc',
    minHeight: 'B2',
    position: 'relative',
    cursor: 'pointer',
    isSelected: (el, s) => s.selected !== 'Search and Select',
    '.isSelected': {
      color: 'title',
    },
    onClick: (e, el, s) => s.toggle('isOpen'),
  },
  Options: {
    show: (el, s) => s.isOpen,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: 'line .35',
    padding: 'Z Z2',
    theme: 'dialog',
    flexFlow: 'y',
    round: '0 0 A2 A2',
    Input: {
      theme: 'field-dialog',
      placeholder: 'Search and Select',
      padding: 'Y2 A',
      margin: '- -Y',
      display: 'block',
      minWidth: '',
      boxSizing: 'border-box',
      border: 'none',
      outline: 'none',
      onInput: (e, el, state) => {
          const value = e.target.value.trim().toLowerCase()
          const filtered = state.data.filter(item =>
            item.toLowerCase().includes(value))
          state.replace({
            searchValue: value,
            filtered: filtered
          })
        },
    },
    Results: {
      marginTop: 'X',
      show: (el, s) => !!s.searchValue && s.filtered.length,
      children: (el, s) => s.filtered,
      childrenAs: 'state',
      childProps: {
        padding: 'Z',
        text: '{{ value }}',
        onClick: (ev, el, s) => {
            s.parent.update({
              selected: s.value,
              isOpen: false,
              searchValue: '',
              //filtered: []
            })
          },
      },
    },
    Placeholder: {
      padding: 'Z',
      show: (el, s) => !s.searchValue,
      text: 'Enter name to search',
      color: 'disabled',
    },
    NoResults: {
      padding: 'Z',
      show: (el, s) => !!s.searchValue && !s.filtered.length,
      text: 'No results found',
      color: 'disabled',
    },
  },
  color: 'black',
  position: 'relative',
  width: 'G3',
  theme: 'field',
  round: 'A2',
};