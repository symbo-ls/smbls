'use strict'

const BACKEND_URL = window.location
  .host.includes('local')
  ? 'localhost:13335'
  : 'api.symbols.app'

export const fetch = async (key, route) => {
  let data = {}
  await window.fetch(`https://${BACKEND_URL}/${route || ''}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-AppKey': key }
  }).then((response) => {
    return response.json().then(d => data = d)
  })
  return data
}