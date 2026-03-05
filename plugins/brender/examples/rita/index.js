'use strict'

import { create } from 'smbls'
import * as app from './smbls'

create({}, app)

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll shadow ─────────────────────────────────────────
  const nav = document.querySelector('nav')
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.setAttribute('data-scrolled', '')
      else nav.removeAttribute('data-scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  // ── Scroll-driven entrance animations ─────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px'
  })

  document.querySelectorAll('.anim').forEach(el => observer.observe(el))

  // ── Smooth scroll for anchor links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 52
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })

  // ── Page exit transitions ──────────────────────────────────────
  // Intercept internal link clicks, play exit animation, then navigate
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href]')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href) return

    // Skip: external links, hash links, same page, or already handled
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    const isAnchor = href.includes('#')
    if (!isInternal || isAnchor) return

    // Skip if same page
    if (window.location.pathname === href) return

    e.preventDefault()
    document.body.classList.add('is-leaving')

    setTimeout(() => {
      window.location.href = href
    }, 270)
  }, true)

})
