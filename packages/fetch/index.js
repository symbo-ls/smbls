'use strict'

const BACKEND_URL = window.location
  .host.includes('local')
  ? 'localhost:13335'
  : 'api.symbols.app'

const defaultOptions = {
  BACKEND_URL
}
  
export const fetchRemote = async (key, options = defaultOptions) => {
  let data = {}
  await window.fetch(`https://${options.BACKEND_URL}/${options.route || ''}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-AppKey': key }
  }).then((response) => {
    return response.json().then(d => data = d)
  })
  return data
}

export const fetch = fetchRemote
