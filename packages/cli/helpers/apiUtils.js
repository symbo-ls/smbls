import { getApiUrl } from './config.js'
import { ALLOWED_FIELDS } from './compareUtils.js'

export async function getServerProjectData (appKey, authToken) {
  try {
    const response = await fetch(`${getApiUrl()}/get/`, {
      method: 'GET',
      headers: {
        'X-AppKey': appKey,
        Authorization: `Bearer ${authToken}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      const error = new Error(`Failed to fetch server data: ${response.statusText}`)
      error.response = {
        status: response.status,
        data
      }
      throw error
    }

    // Check if response is empty object
    if (data && Object.keys(data).length === 0) {
      const error = new Error('Project not found')
      error.response = {
        status: 404,
        data
      }
      throw error
    }

    return data
  } catch (error) {
    if (!error.response) {
      error.response = {
        status: 500,
        data: {}
      }
    }
    throw error
  }
}

export async function updateProjectOnServer (appKey, authToken, changes, projectData) {
  // Validate changes before sending
  const validChanges = changes.filter(([type, path]) => {
    const normalizedPath = path[0].toLowerCase()
    return ALLOWED_FIELDS.includes(normalizedPath)
  })

  const response = await fetch(`${getApiUrl()}/auth/project/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      appKey,
      changes: validChanges,
      projectUpdates: projectData
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update project')
  }

  return response
}
