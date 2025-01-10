import { getApiUrl } from './config.js'
import { ALLOWED_FIELDS } from './compareUtils.js'

export async function getServerProjectData(appKey, authToken) {
  const response = await fetch(`${getApiUrl()}/get/`, {
    method: 'GET',
    headers: {
      'X-AppKey': appKey,
      'Authorization': `Bearer ${authToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch server data: ${response.statusText}`)
  }

  return await response.json()
}

export async function updateProjectOnServer(appKey, authToken, changes, projectData) {
  // Validate changes before sending
  const validChanges = changes.filter(([type, path]) => {
    const normalizedPath = path[0].toLowerCase()
    return ALLOWED_FIELDS.includes(normalizedPath)
  })

  const response = await fetch(`${getApiUrl()}/auth/project/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
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