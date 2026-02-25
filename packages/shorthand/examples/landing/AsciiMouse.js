export const AsciiMouse = {
  tag: 'canvas',
  scope: {},
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: '-1',
  display: 'block',
  onRender: (el) => {
    const canvas = el.node
    const ctx = canvas.getContext('2d', {
      alpha: true
    })

    if (el.scope.cleanup) el.scope.cleanup()

    const COLOR = [0, 89, 250]
    const TRAIL_DECAY = 0.10

    const BASE_ALPHA = 0.04
    const DOWN_ALPHA_BOOST = 0.085
    const DOWN_GROW = 1.22
    const DOWN_CORE_BOOST = 0.6

    const ACTIVATE_AFTER = 2000 // ⏱️ 2 seconds

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    let w = 0,
      h = 0,
      dpr = 1
    let lastCssW = 0,
      lastCssH = 0

    const parent = canvas.parentElement || document.body

    const startTime = performance.now()
    let enabled = false

    const blob = {
      x: 0.5,
      y: 0.5,
      vx: 0,
      vy: 0,
      r: 0.22,
      rActive: 0.30,
      t: 0,
      presence: 0,
      press: 0,
    }

    const pointer = {
      x: 0.5,
      y: 0.5,
      active: false,
      down: false,
      lastClientX: window.innerWidth * 0.5,
      lastClientY: window.innerHeight * 0.5,
    }

    const parentContentSize = () => {
      if (parent === document.body || parent === document.documentElement) {
        const de = document.documentElement
        const body = document.body
        return {
          width: Math.max(de.scrollWidth, body?.scrollWidth || 0, de.clientWidth),
          height: Math.max(de.scrollHeight, body?.scrollHeight || 0, de.clientHeight),
        }
      }
      return {
        width: Math.max(parent.scrollWidth, parent.clientWidth, parent.offsetWidth || 1),
        height: Math.max(parent.scrollHeight, parent.clientHeight, parent.offsetHeight || 1),
      }
    }

    const updatePointerFromClient = (clientX, clientY) => {
      pointer.lastClientX = clientX
      pointer.lastClientY = clientY

      const rect = parent.getBoundingClientRect()
      const localX = clientX - rect.left
      const localY = clientY - rect.top

      const scrollLeft =
        parent === document.body || parent === document.documentElement ?
        window.scrollX || 0 :
        parent.scrollLeft || 0

      const scrollTop =
        parent === document.body || parent === document.documentElement ?
        window.scrollY || 0 :
        parent.scrollTop || 0

      const contentX = localX + scrollLeft
      const contentY = localY + scrollTop

      const cssW = Math.max(1, w / dpr)
      const cssH = Math.max(1, h / dpr)

      pointer.x = clamp(contentX / cssW, 0, 1)
      pointer.y = clamp(contentY / cssH, 0, 1)
      pointer.active = true

      if (enabled) {
        blob.vx += (pointer.x - blob.x) * 0.002
        blob.vy += (pointer.y - blob.y) * 0.002
      }
    }

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const {
        width,
        height
      } = parentContentSize()
      const cssW = Math.floor(width)
      const cssH = Math.floor(height)

      if (cssW === lastCssW && cssH === lastCssH) return
      lastCssW = cssW
      lastCssH = cssH

      canvas.style.width = cssW + 'px'
      canvas.style.height = cssH + 'px'

      w = canvas.width = Math.floor(cssW * dpr)
      h = canvas.height = Math.floor(cssH * dpr)

      updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()

    const onMove = (e) => updatePointerFromClient(e.clientX, e.clientY)
    const onLeave = () => {
      pointer.active = false
    }
    const onDown = (e) => {
      pointer.down = true
      updatePointerFromClient(e.clientX, e.clientY)
    }
    const onUp = () => {
      pointer.down = false
    }

    window.addEventListener('mousemove', onMove, {
      passive: true
    })
    window.addEventListener('mouseleave', onLeave, {
      passive: true
    })
    window.addEventListener('mousedown', onDown, {
      passive: true
    })
    window.addEventListener('mouseup', onUp, {
      passive: true
    })
    window.addEventListener('resize', resize, {
      passive: true
    })

    let raf = 0
    let last = performance.now()

    const frame = (now) => {
      resize()

      if (!enabled && now - startTime >= ACTIVATE_AFTER) {
        enabled = true
      }

      const dt = clamp((now - last) / 1000, 0.001, 0.05)
      last = now

      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = TRAIL_DECAY
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      const targetPresence = enabled && pointer.active ? 1 : 0
      blob.presence += (targetPresence - blob.presence) * 0.22
      blob.press += ((enabled && pointer.down ? 1 : 0) - blob.press) * 0.3

      if (blob.presence < 0.01) {
        raf = requestAnimationFrame(frame)
        return
      }

      const stiffness = 48
      const damping = 8

      const ax = (pointer.x - blob.x) * stiffness - blob.vx * damping
      const ay = (pointer.y - blob.y) * stiffness - blob.vy * damping
      blob.vx += ax * dt
      blob.vy += ay * dt
      blob.x += blob.vx * dt
      blob.y += blob.vy * dt

      const speed = Math.hypot(blob.vx, blob.vy)
      const energy = clamp(speed * 2, 0, 1)
      blob.t += (1 + energy * 2) * dt

      const cx = blob.x * w
      const cy = blob.y * h

      const baseR =
        Math.min(w, h) *
        (blob.r + (blob.rActive - blob.r) * blob.presence)

      const r =
        baseR *
        (1 + Math.sin(blob.t * 2) * 0.01) *
        (1 + energy * 0.22) *
        (1 + blob.press * (DOWN_GROW - 1))

      const alpha =
        (BASE_ALPHA + blob.press * DOWN_ALPHA_BOOST) * blob.presence

      const [cr, cg, cb] = COLOR

      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      const g = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r)
      g.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`)
      g.addColorStop(0.3, `rgba(${cr},${cg},${cb},${alpha * 0.55})`)
      g.addColorStop(0.6, `rgba(${cr},${cg},${cb},${alpha * 0.2})`)
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      const coreStrength = (0.08 + blob.press * DOWN_CORE_BOOST) * alpha
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.35)
      core.addColorStop(0, `rgba(255,255,255,${coreStrength})`)
      core.addColorStop(1, `rgba(255,255,255,0)`)

      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    el.scope.cleanup = () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', resize)
      el.scope.cleanup = null
    }
  },
};