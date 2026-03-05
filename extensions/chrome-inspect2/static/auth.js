// Auth module — manages login/logout and token storage via chrome.storage.local
;(function () {
  'use strict'

  const API_BASE = 'https://api.symbols.app'
  const STORAGE_KEYS = {
    accessToken: 'symbols_access_token',
    refreshToken: 'symbols_refresh_token',
    expiresAt: 'symbols_expires_at',
    user: 'symbols_user'
  }

  // ============================================================
  // Token storage (chrome.storage.local)
  // ============================================================
  function getStoredAuth () {
    return new Promise((resolve) => {
      chrome.storage.local.get(Object.values(STORAGE_KEYS), (data) => {
        resolve({
          accessToken: data[STORAGE_KEYS.accessToken] || null,
          refreshToken: data[STORAGE_KEYS.refreshToken] || null,
          expiresAt: data[STORAGE_KEYS.expiresAt] || 0,
          user: data[STORAGE_KEYS.user] || null
        })
      })
    })
  }

  function setStoredAuth (tokens, user) {
    const data = {}
    if (tokens) {
      data[STORAGE_KEYS.accessToken] = tokens.accessToken
      data[STORAGE_KEYS.refreshToken] = tokens.refreshToken
      data[STORAGE_KEYS.expiresAt] = tokens.accessTokenExp
        ? (tokens.accessTokenExp.expiresAt || (Date.now() / 1000 + (tokens.accessTokenExp.expiresIn || 3600)))
        : (Date.now() / 1000 + 3600)
    }
    if (user) {
      data[STORAGE_KEYS.user] = user
    }
    return new Promise((resolve) => chrome.storage.local.set(data, resolve))
  }

  function clearStoredAuth () {
    return new Promise((resolve) => {
      chrome.storage.local.remove(Object.values(STORAGE_KEYS), resolve)
    })
  }

  // ============================================================
  // API calls
  // ============================================================
  async function apiRequest (path, options) {
    const url = API_BASE + path
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options && options.headers)
      }
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || ('HTTP ' + res.status))
    }
    return res.json()
  }

  async function authedRequest (path, options) {
    const auth = await getStoredAuth()
    let token = auth.accessToken

    // Refresh if expired (30s buffer)
    if (token && auth.expiresAt && (Date.now() / 1000) > auth.expiresAt - 30) {
      try {
        const refreshed = await refreshTokens(auth.refreshToken)
        token = refreshed.accessToken
      } catch (e) {
        // Refresh failed — clear auth
        await clearStoredAuth()
        throw new Error('Session expired — please sign in again')
      }
    }

    if (!token) throw new Error('Not signed in')

    return apiRequest(path, {
      ...options,
      headers: {
        ...(options && options.headers),
        Authorization: 'Bearer ' + token
      }
    })
  }

  // ============================================================
  // Auth operations
  // ============================================================
  async function login (email, password) {
    const data = await apiRequest('/core/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    const tokens = data.tokens || data
    const user = data.user || null
    await setStoredAuth(tokens, user)
    return { tokens, user }
  }

  async function refreshTokens (refreshToken) {
    const data = await apiRequest('/core/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    })
    const tokens = data.tokens || data
    const auth = await getStoredAuth()
    await setStoredAuth(tokens, auth.user)
    return tokens
  }

  async function getMe () {
    return authedRequest('/core/auth/me', { method: 'GET' })
  }

  async function logout () {
    try {
      const auth = await getStoredAuth()
      if (auth.accessToken) {
        await apiRequest('/core/auth/logout', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + auth.accessToken }
        }).catch(() => {})
      }
    } finally {
      await clearStoredAuth()
    }
  }

  async function isSignedIn () {
    const auth = await getStoredAuth()
    if (!auth.accessToken) return false
    try {
      await getMe()
      return true
    } catch (e) {
      return false
    }
  }

  // ============================================================
  // Platform API — projects
  // ============================================================
  async function listProjects () {
    return authedRequest('/core/projects', { method: 'GET' })
  }

  async function getProjectByKey (key) {
    return authedRequest('/core/projects/key/' + encodeURIComponent(key), { method: 'GET' })
  }

  async function getProjectData (projectId, branch) {
    return authedRequest(
      '/core/projects/' + projectId + '/data?branch=' + (branch || 'main') + '&version=latest',
      { method: 'GET' }
    )
  }

  async function getServiceToken () {
    try {
      const res = await fetch(API_BASE + '/service-token')
      const json = await res.json().catch(() => null)
      if (json && json.token) return json.token.trim()
      const txt = await res.text()
      return (txt || '').replace(/\s+/g, '') || null
    } catch (e) {
      return null
    }
  }

  async function getAccessToken () {
    const auth = await getStoredAuth()
    return auth.accessToken
  }

  // ============================================================
  // Browser sign-in (PKCE session flow — same as CLI)
  // ============================================================
  const WEBSITE_BASE = 'https://symbols.app'

  function randomVerifier (len) {
    len = len || 64
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'
    var arr = new Uint8Array(len)
    crypto.getRandomValues(arr)
    var out = ''
    for (var i = 0; i < len; i++) out += chars.charAt(arr[i] % chars.length)
    return out
  }

  async function sha256Base64url (input) {
    var encoder = new TextEncoder()
    var data = encoder.encode(input)
    var hash = await crypto.subtle.digest('SHA-256', data)
    var bytes = new Uint8Array(hash)
    var binary = ''
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
  }

  // Proxy fetch through service worker to avoid CORS preflight issues
  function swFetch (url, options) {
    return new Promise(function (resolve, reject) {
      chrome.runtime.sendMessage({
        type: 'api-fetch',
        url: url,
        method: (options && options.method) || 'GET',
        headers: (options && options.headers) || {},
        body: (options && options.body) || undefined
      }, function (resp) {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
          return
        }
        if (!resp) {
          reject(new Error('No response from service worker'))
          return
        }
        resolve(resp)
      })
    })
  }

  async function loginViaBrowser (onStatus) {
    var sessionId = crypto.randomUUID()
    var codeVerifier = randomVerifier(64)
    var codeChallenge = await sha256Base64url(codeVerifier)

    if (onStatus) onStatus('Creating secure session...')

    // Create PKCE session via service worker (avoids CORS)
    var sessionResp = await swFetch(API_BASE + '/core/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        code_challenge: codeChallenge,
        plugin_info: { version: 'chrome-extension', figma_env: 'chrome' }
      })
    })

    if (!sessionResp.ok) {
      // Fallback: open signin page, ask user to use email/password
      chrome.tabs.create({ url: WEBSITE_BASE + '/signin' })
      throw new Error('Session unavailable — sign in on symbols.app, then use email & password below')
    }

    // Open signin with session param
    var signinUrl = WEBSITE_BASE + '/signin?session=' + encodeURIComponent(sessionId)
    chrome.tabs.create({ url: signinUrl })

    if (onStatus) onStatus('Waiting for sign-in in browser...')

    var startedAt = Date.now()
    var timeoutMs = 3 * 60 * 1000
    var pollMs = 1500

    while (true) {
      if (Date.now() - startedAt > timeoutMs) {
        throw new Error('Sign-in timed out — please try again')
      }

      await new Promise(function (r) { setTimeout(r, pollMs) })

      try {
        var statusResp = await swFetch(
          API_BASE + '/core/auth/session/status?session=' + encodeURIComponent(sessionId),
          { method: 'GET' }
        )

        if (!statusResp.ok) continue

        var statusData = statusResp.data || {}
        var status = statusData.status || statusData.data?.status || statusData.state || statusData.data?.state
        if (status === 'ready_for_confirm') break
        if (status === 'expired' || status === 'revoked' || status === 'invalid') {
          throw new Error('Session ' + status + ' — please try again')
        }
      } catch (pollErr) {
        if (pollErr.message && pollErr.message.includes('Session')) throw pollErr
      }
    }

    if (onStatus) onStatus('Confirming session...')

    var confirmResp = await swFetch(API_BASE + '/core/auth/session/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        code_verifier: codeVerifier
      })
    })

    if (!confirmResp.ok) {
      var confirmData = confirmResp.data || {}
      throw new Error(confirmData.message || confirmData.error || 'Session confirm failed')
    }

    var cData = confirmResp.data || {}
    var token = cData.access_token || cData.data?.access_token ||
      cData.token || cData.data?.token
    if (!token) {
      throw new Error('Sign-in succeeded but no token returned')
    }

    var tempTokens = { accessToken: token, refreshToken: null, accessTokenExp: null }
    await setStoredAuth(tempTokens, null)

    try {
      var user = await getMe()
      await setStoredAuth(tempTokens, user)
      return { tokens: tempTokens, user: user }
    } catch (e) {
      return { tokens: tempTokens, user: null }
    }
  }

  // ============================================================
  // AI — platform AI endpoint
  // ============================================================
  async function aiPrompt (messages, context) {
    return authedRequest('/core/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, context })
    })
  }

  // ============================================================
  // Expose global API
  // ============================================================
  window.SymbolsAuth = {
    login,
    loginViaBrowser,
    logout,
    getMe,
    isSignedIn,
    getStoredAuth,
    getAccessToken,
    getServiceToken,
    listProjects,
    getProjectByKey,
    getProjectData,
    authedRequest,
    aiPrompt,
    API_BASE
  }
})()
