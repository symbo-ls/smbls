chrome.devtools.panels.create('Symbols', null, 'panel.html', panel => {
  panel.onShown.addListener(win => {
    win.panelShown()
  })
})
