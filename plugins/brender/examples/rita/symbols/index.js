import { create } from 'smbls'
import app from './app.js'

import state from './state.js'
import dependencies from './dependencies.js'
import * as components from './components/index.js'
import * as snippets from './snippets/index.js'
import pages from './pages/index.js'
import * as functions from './functions/index.js'
import * as methods from './methods/index.js'
import designSystem from './designSystem/index.js'
import files from './files/index.js'
import config from './config.js'

create(app, {
  state,
  dependencies,
  components,
  snippets,
  pages,
  functions,
  methods,
  designSystem,
  files,
  ...config
})

// ── Animations & Effects ────────────────────────────────────────
setTimeout(() => {

  // Inject styles
  const style = document.createElement('style')
  style.textContent = `
    [data-reveal] {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }
    [data-reveal="left"] { transform: translateX(-32px); }
    [data-reveal="right"] { transform: translateX(32px); }
    [data-reveal="scale"] { transform: scale(0.94) translateY(16px); }
    [data-reveal].revealed {
      opacity: 1;
      transform: translateY(0) translateX(0) scale(1);
    }
    [data-stagger] > * {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    }
    [data-stagger].revealed > * {
      opacity: 1;
      transform: translateY(0);
    }
    nav[data-scrolled] {
      box-shadow: 0 1px 12px rgba(0,0,0,0.06) !important;
    }
    nav a[data-active] {
      color: #0a0a0a !important;
    }
    [key=content] > *:not(nav):not(footer) {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    [key=content] > *:not(nav):not(footer).revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)

  // Active nav link
  const setActiveNav = () => {
    const path = window.location.pathname
    document.querySelectorAll('nav a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href')
      if (href === path || (href !== '/' && path.startsWith(href))) {
        a.setAttribute('data-active', '')
      } else {
        a.removeAttribute('data-active')
      }
    })
  }
  setActiveNav()
  window.addEventListener('popstate', () => setTimeout(setActiveNav, 50))
  document.addEventListener('click', (e) => {
    const a = e.target.closest('nav a[href^="/"]')
    if (a) setTimeout(setActiveNav, 50)
  })

  // ── Scroll Reveal Observer (persistent) ──────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute('data-stagger')) {
          Array.from(entry.target.children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 90}ms`
          })
        }
        entry.target.classList.add('revealed')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

  // ── Auto-tag & observe (runs on load + every navigation) ───
  const isGrid = el => getComputedStyle(el).display === 'grid'

  const initPageAnimations = () => {
    const content = document.querySelector('[key=content]')
    if (!content) return

    const vh = window.innerHeight
    let sectionDelay = 0

    // Observe each section with stagger for above-fold
    Array.from(content.children).forEach(el => {
      if (el.tagName === 'NAV' || el.tagName === 'FOOTER' || el.classList.contains('revealed')) return

      const rect = el.getBoundingClientRect()
      if (rect.top < vh) {
        el.style.transitionDelay = `${sectionDelay}ms`
        sectionDelay += 100
      }
      revealObserver.observe(el)
    })

    // Tag inner elements for scroll reveal
    document.querySelectorAll('section').forEach(section => {
      if (section.hasAttribute('data-hero')) return

      section.querySelectorAll('h2').forEach(h => {
        if (!h.closest('[data-reveal]')) h.setAttribute('data-reveal', '')
      })

      section.querySelectorAll('p').forEach(p => {
        if (!p.closest('[data-stagger]') && !p.closest('[data-reveal]') && !p.closest('article')) {
          p.setAttribute('data-reveal', '')
        }
      })

      section.querySelectorAll('img[loading="lazy"]').forEach(img => {
        const wrapper = img.parentElement
        if (wrapper && wrapper.tagName !== 'SECTION') {
          wrapper.setAttribute('data-reveal', 'scale')
          wrapper.setAttribute('data-parallax', '')
        }
      })

      section.querySelectorAll('*').forEach(el => {
        if (isGrid(el) && el.children.length > 1 && !el.closest('[data-stagger]')) {
          el.setAttribute('data-stagger', '')
        }
      })

      section.querySelectorAll('form').forEach(f => f.setAttribute('data-reveal', 'right'))
    })

    document.querySelectorAll('[data-reveal]:not(.revealed), [data-stagger]:not(.revealed)').forEach(el => {
      revealObserver.observe(el)
    })
  }

  // Initial run
  initPageAnimations()

  // Re-init when framework swaps page content
  const appEl = document.querySelector('[key=smblsapp]')
  if (appEl) {
    new MutationObserver(() => {
      setTimeout(initPageAnimations, 60)
    }).observe(appEl, { childList: true, subtree: true })
  }

  // ── Nav scroll shadow (dynamic query) ──────────────────────
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav')
    if (nav) {
      if (window.scrollY > 40) nav.setAttribute('data-scrolled', '')
      else nav.removeAttribute('data-scrolled')
    }
  }, { passive: true })

  // ── Parallax (dynamic queries) ─────────────────────────────
  let pTicking = false
  window.addEventListener('scroll', () => {
    if (pTicking) return
    requestAnimationFrame(() => {
      // Hero parallax
      const heroImg = document.querySelector('[data-hero] img[loading="eager"]')
      if (heroImg) {
        const y = window.scrollY
        const h = heroImg.closest('section')?.offsetHeight || window.innerHeight
        if (y < h) heroImg.style.transform = `scale(${1 + y * 0.0001}) translateY(${y * 0.25}px)`
      }

      // Image parallax
      document.querySelectorAll('[data-parallax]').forEach(el => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        if (rect.top < vh && rect.bottom > 0) {
          const progress = (vh - rect.top) / (vh + rect.height)
          const img = el.querySelector('img')
          if (img) img.style.transform = `translateY(${(progress - 0.5) * 30}px) scale(1.04)`
        }
      })

      pTicking = false
    })
    pTicking = true
  }, { passive: true })

  // ── Smooth scroll for anchors (delegated) ──────────────────
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor) return
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
    }
  })

  // ── Scroll to top on page switch ───────────────────────────
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href]')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/') || href.startsWith('//') || href.includes('#')) return
    window.scrollTo(0, 0)
  })

  window.addEventListener('popstate', () => {
    window.scrollTo(0, 0)
  })

}, 150)
