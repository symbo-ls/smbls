export const DashboardView = {
  extends: 'Flex',
  flow: 'y',
  gap: 'B',

  scope: {
    renderStats: function (el, s) {
      var statsEl = el.node.querySelector('[data-stats]')
      if (!statsEl) return
      var total = (s.submissions || []).length
      statsEl.innerHTML = '<div style="font-size:36px;font-weight:900;color:#4f46e5">' + total + '</div>' +
        '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em">Total Reports</div>'
    },

    renderSubmissions: function (el, s) {
      var listEl = el.node.querySelector('[data-list]')
      if (!listEl) return
      var subs = s.submissions || []
      if (subs.length === 0) {
        listEl.innerHTML = '<div style="background:white;border-radius:20px;padding:80px 20px;text-align:center;border:2px dashed #e2e8f0">' +
          '<div style="font-size:13px;color:#64748b;font-weight:500;margin-top:8px">Waiting for team to submit results...</div></div>'
        return
      }
      listEl.innerHTML = ''
      subs.forEach(function (sub) {
        var card = document.createElement('div')
        card.style.cssText = 'background:white;border-radius:20px;border:1px solid #e2e8f0;padding:28px;margin-bottom:16px'

        var header = document.createElement('div')
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f1f5f9;gap:16px;flex-wrap:wrap'

        var leftSide = document.createElement('div')
        leftSide.style.cssText = 'flex:1'
        leftSide.innerHTML = '<div style="font-size:11px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:2px 8px;border-radius:6px;display:inline-block;margin-bottom:6px">' + (sub.timestamp || '') + '</div>' +
          '<h3 style="font-size:18px;font-weight:900;color:#0f172a;margin:0">Prefers: <span style="color:#4f46e5">' + (sub.preference || '—') + '</span></h3>'

        var rightSide = document.createElement('div')
        rightSide.style.cssText = 'text-align:center;padding:12px 20px;background:#4f46e5;border-radius:14px;min-width:90px'
        rightSide.innerHTML = '<div style="font-size:10px;font-weight:700;color:#a5b4fc;text-transform:uppercase;margin-bottom:4px">Impact</div>' +
          '<div style="font-size:24px;font-weight:900;color:white">' + (sub.comparisonScore || 5) + '/10</div>'

        header.appendChild(leftSide)
        header.appendChild(rightSide)
        card.appendChild(header)

        var metricsGrid = document.createElement('div')
        metricsGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;font-size:13px;margin-bottom:20px'

        var symCol = document.createElement('div')
        symCol.innerHTML = '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">Symbols Performance</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
          '<div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #f1f5f9"><div style="font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Accuracy</div><div style="font-weight:700;color:#334155">' + (sub.symbolsAccuracy || '—') + '</div></div>' +
          '<div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #f1f5f9"><div style="font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Iterations</div><div style="font-weight:700;color:#334155">' + (sub.symbolsIterations || '—') + '</div></div>' +
          '</div>'

        var reactCol = document.createElement('div')
        reactCol.innerHTML = '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">React Performance</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
          '<div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #f1f5f9"><div style="font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Accuracy</div><div style="font-weight:700;color:#334155">' + (sub.reactAccuracy || '—') + '</div></div>' +
          '<div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #f1f5f9"><div style="font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Iterations</div><div style="font-weight:700;color:#334155">' + (sub.reactIterations || '—') + '</div></div>' +
          '</div>'

        metricsGrid.appendChild(symCol)
        metricsGrid.appendChild(reactCol)
        card.appendChild(metricsGrid)

        if (sub.rawMetricsData) {
          var metricsBox = document.createElement('div')
          metricsBox.style.cssText = 'background:#0f172a;color:#818cf8;padding:14px;border-radius:10px;font-family:monospace;font-size:11px;margin-bottom:16px;word-break:break-all'
          metricsBox.innerHTML = '<div style="color:white;font-weight:700;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1)">Technical Metrics</div>' + sub.rawMetricsData
          card.appendChild(metricsBox)
        }

        if (sub.comparisonReason) {
          var reasonBox = document.createElement('div')
          reasonBox.style.cssText = 'margin-top:16px;padding-top:16px;border-top:1px solid #f1f5f9'
          reasonBox.innerHTML = '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Verdict Details</div>' +
            '<p style="font-size:13px;color:#475569;line-height:1.7;font-weight:500;background:#f8fafc;padding:14px;border-radius:14px;border:1px solid #f1f5f9;margin:0">' + sub.comparisonReason + '</p>'
          card.appendChild(reasonBox)
        }

        listEl.appendChild(card)
      })
    }
  },

  onRender: (el, s) => {
    if (el.__init) return
    el.__init = true
    var node = el.node
    node.style.cssText = 'display:flex;flex-direction:column;gap:16px'

    // Stats header
    var statsCard = document.createElement('div')
    statsCard.style.cssText = 'background:white;border-radius:20px;border:1px solid #e2e8f0;padding:28px;display:flex;justify-content:space-between;align-items:center'
    var statsLeft = document.createElement('div')
    statsLeft.innerHTML = '<h2 style="font-size:22px;font-weight:900;color:#0f172a;margin:0 0 4px">Community Results</h2>' +
      '<p style="font-size:13px;color:#64748b;font-weight:500;margin:0">Saved to Local Storage</p>'
    var statsRight = document.createElement('div')
    statsRight.setAttribute('data-stats', '1')
    statsRight.style.cssText = 'text-align:right'
    statsCard.appendChild(statsLeft)
    statsCard.appendChild(statsRight)
    node.appendChild(statsCard)

    // Submissions list container
    var list = document.createElement('div')
    list.setAttribute('data-list', '1')
    node.appendChild(list)

    el.scope.renderStats(el, s)
    el.scope.renderSubmissions(el, s)
  },

  onStateUpdate: (el, s) => {
    el.scope.renderStats(el, s)
    el.scope.renderSubmissions(el, s)
  }
}
