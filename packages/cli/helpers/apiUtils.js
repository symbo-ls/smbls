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

export async function getRemoteChanges(appKey, authToken, version, branch = 'main') {
  const response = await fetch(`${getApiUrl()}/${appKey}/changes?version=${version}&branch=${branch}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'X-AppKey': appKey
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch remote changes')
  }

  return response.json()
}

export function findConflicts(localChanges, remoteChanges) {
  const conflicts = []

  for (const localChange of localChanges) {
    const localPath = localChange[1].join('.')
    const conflictingRemoteChange = remoteChanges.find(remoteChange =>
      remoteChange[1].join('.') === localPath
    )

    if (conflictingRemoteChange) {
      conflicts.push([localChange, conflictingRemoteChange])
    }
  }

  return conflicts
}

export function getSymStoryApiUrl() {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined
    ? 'http://localhost:3000'
    : 'https://story.symbo.ls'
}

export async function getProjectDataFromSymStory(appKey, authToken, branch = 'main', version) {
  console.log('getProjectDataFromSymStory', appKey, authToken, branch, version)
  const baseUrl = getSymStoryApiUrl()
  const url = new URL(`${baseUrl}/${appKey}`)
  console.log('url', url)

  if (branch) url.searchParams.append('branch', branch)
  if (version) url.searchParams.append('version', version)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      redirect: 'follow'
    })

    const data = await response.json()

    if (!response.ok) {
      const error = new Error(`Failed to fetch project data: ${response.statusText}`)
      error.response = {
        status: response.status,
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

export async function getRemoteChangesFromSymStory(appKey, authToken, version, branch = 'main') {
  const baseUrl = getSymStoryApiUrl()

  const response = await fetch(`${baseUrl}/${appKey}/changes?version=${version}&branch=${branch}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'X-AppKey': appKey
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch remote changes')
  }

  return response.json()
}

export async function updateProjectOnSymStoryServer(appKey, authToken, changes, message = 'Update from CLI') {
  const baseUrl = getSymStoryApiUrl()

  // Validate changes before sending
  const validChanges = changes.filter(([type, path]) => {
    const normalizedPath = path[0].toLowerCase()
    return ALLOWED_FIELDS.includes(normalizedPath)
  })

  const response = await fetch(`${baseUrl}/${appKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      'X-AppKey': appKey
    },
    body: JSON.stringify({
      changes: validChanges,
      message,
      type: 'patch'
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update project')
  }

  return response
}
