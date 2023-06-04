'use strict'

import fs from 'fs'

// Step 1: Read the JSON file
export const addToJson = (filePath, key, value) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    try {
      const jsonData = JSON.parse(data)

      jsonData[key] = value

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error('Error writing file:', err)
        }
        console.log(filePath, JSON.stringify(jsonData, null, 2))
      })
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
    }
  })
}
