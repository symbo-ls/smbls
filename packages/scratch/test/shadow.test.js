'use strict'

import { transformBoxShadow } from '../src/transforms'

test('should preserve rgba() when transforming boxShadow', () => {
  expect(transformBoxShadow('0 2px 8px rgba(0,0,0,0.06)')).toStrictEqual(
    '0 2px 8px rgba(0,0,0,0.06)'
  )
})
