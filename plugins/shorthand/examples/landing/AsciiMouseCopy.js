export const AsciiMouseCopy = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  pointerEvents: 'none',
  zIndex: '-1',
  display: 'block',
  onRender: (el) => {
    const canvas = el.node
    const ctx = canvas.getContext('2d', {
      alpha: true
    })

    if (el.scope.cleanup) el.scope.cleanup()

    const RAMP = ' .,:;i1tfLCG08@'
    const COLOR = 'rgba(0, 89, 250, 0.1)' // #0059FA @ 10%
    const CELL = 14
    const MAX_GLYPHS_PER_FRAME = 4500
    const TRAIL_DECAY = 0.10

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    let w = 0,
      h = 0,
      dpr = 1
    let cell = 14
    let fontPx = 14

    // Track last pointer in viewport coords so scroll can update page coords
    const pointer = {
      // normalized page coords
      x: 0.5,
      y: 0.5,
      active: false,

      // last viewport coords (client)
      lastClientX: window.innerWidth * 0.5,
      lastClientY: window.innerHeight * 0.5,
      // last scroll
      lastScrollX: window.scrollX || 0,
      lastScrollY: window.scrollY || 0,
    }

    const docSize = () => {
      const de = document.documentElement
      const body = document.body
      const height = Math.max(
        de.scrollHeight,
        body ? body.scrollHeight : 0,
        de.clientHeight
      )
      const width = Math.max(de.clientWidth, window.innerWidth)
      return {
        width,
        height
      }
    }

    const updatePointerFromClient = (clientX, clientY) => {
      pointer.lastClientX = clientX
      pointer.lastClientY = clientY

      const scrollX = window.scrollX || 0
      const scrollY = window.scrollY || 0
      pointer.lastScrollX = scrollX
      pointer.lastScrollY = scrollY

      const pageX = clientX + scrollX
      const pageY = clientY + scrollY

      // normalize to document/canvas size
      pointer.x = clamp(pageX / Math.max(1, (w / dpr)), 0, 1)
      pointer.y = clamp(pageY / Math.max(1, (h / dpr)), 0, 1)
      pointer.active = true
    }

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const {
        width,
        height
      } = docSize()

      // Set CSS size (document space)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      // Set backing store size (device space)
      w = canvas.width = Math.floor(width * dpr)
      h = canvas.height = Math.floor(height * dpr)

      cell = Math.max(10, Math.round(CELL * dpr))
      fontPx = Math.max(10, Math.round(cell * 1.05))
      ctx.font = `${fontPx}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
      ctx.textBaseline = 'top'

      // recompute pointer mapping after resize
      updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
    }

    resize()

    const onMove = (e) => {
      updatePointerFromClient(e.clientX, e.clientY)
    }

    const onLeave = () => {
      pointer.active = false
    }

    const onScroll = () => {
      // if scroll changed but mouse didn't move, update page coords
      updatePointerFromClient(pointer.lastClientX, pointer.lastClientY)
      pointer.active = true
    }

    window.addEventListener('mousemove', onMove, {
      passive: true
    })
    window.addEventListener('mouseleave', onLeave, {
      passive: true
    })
    window.addEventListener('resize', resize, {
      passive: true
    })
    window.addEventListener('scroll', onScroll, {
      passive: true
    })

    const blob = {
      x: 0.5,
      y: 0.5,
      vx: 0,
      vy: 0,
      r: 0.22,
      rActive: 0.30, // bigger while active
      t: 0,
      presence: 0,
    }

    let raf = 0
    let last = performance.now()

    ctx.clearRect(0, 0, w, h)

    const frame = (now) => {
      const dt = clamp((now - last) / 1000, 0.001, 0.05)
      last = now

      // transparent trail decay (no bg tint)
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = TRAIL_DECAY
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      blob.presence += ((pointer.active ? 1 : 0) - blob.presence) * 0.12
      if (blob.presence < 0.01) {
        raf = requestAnimationFrame(frame)
        return
      }

      // spring follow
      const stiffness = 26
      const damping = 10

      const ax = (pointer.x - blob.x) * stiffness - blob.vx * damping
      const ay = (pointer.y - blob.y) * stiffness - blob.vy * damping
      blob.vx += ax * dt
      blob.vy += ay * dt
      blob.x += blob.vx * dt
      blob.y += blob.vy * dt

      const speed = Math.hypot(blob.vx, blob.vy)
      const energy = clamp(speed * 2, 0, 1)
      blob.t += (1 + energy * 2) * dt

      // IMPORTANT: map to canvas device pixels
      const cx = blob.x * w
      const cy = blob.y * h

      const baseR =
        Math.min(w, h) *
        (blob.r + (blob.rActive - blob.r) * blob.presence)

      const wobble = 1 + Math.sin(blob.t * 2) * 0.01
      const r = baseR * wobble

      const reach = r * (1.6 + energy * 0.4)
      const x0 = Math.max(0, Math.floor((cx - reach) / cell))
      const x1 = Math.min(Math.ceil(w / cell), Math.ceil((cx + reach) / cell))
      const y0 = Math.max(0, Math.floor((cy - reach) / cell))
      const y1 = Math.min(Math.ceil(h / cell), Math.ceil((cy + reach) / cell))

      const sigma = r * (0.55 + energy * 0.15)
      const inv2s2 = 1 / (2 * sigma * sigma)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = COLOR

      let glyphs = 0
      const rampMax = RAMP.length - 1
      const strength = 0.95 * blob.presence

      for (let gy = y0; gy < y1; gy++) {
        const py = gy * cell
        const dy = py - cy
        for (let gx = x0; gx < x1; gx++) {
          if (glyphs++ > MAX_GLYPHS_PER_FRAME) break

          const px = gx * cell
          const dx = px - cx
          const d2 = dx * dx + dy * dy
          const t = Math.exp(-d2 * inv2s2)
          if (t < 0.03) continue

          const idx = Math.min(rampMax, (t * rampMax) | 0)
          ctx.globalAlpha = Math.min(0.8, t) * strength
          ctx.fillText(RAMP[idx], px, py)
        }
        if (glyphs > MAX_GLYPHS_PER_FRAME) break
      }

      ctx.restore()

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    el.scope.cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      el.scope.cleanup = null
    }
  },
  tag: 'canvas',
  scope: {},
};