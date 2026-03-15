'use strict'

export const GRID_PROPS = {
  area: (value) => ({ gridArea: value }),
  template: (value) => ({ gridTemplate: value }),
  templateAreas: (value) => ({ gridTemplateAreas: value }),

  column: (value) => ({ gridColumn: value }),
  columns: (value) => ({ gridTemplateColumns: value }),
  templateColumns: (value) => ({ gridTemplateColumns: value }),
  autoColumns: (value) => ({ gridAutoColumns: value }),
  columnStart: (value) => ({ gridColumnStart: value }),

  row: (value) => ({ gridRow: value }),
  rows: (value) => ({ gridTemplateRows: value }),
  templateRows: (value) => ({ gridTemplateRows: value }),
  autoRows: (value) => ({ gridAutoRows: value }),
  rowStart: (value) => ({ gridRowStart: value }),

  autoFlow: (value) => ({ gridAutoFlow: value })
}
