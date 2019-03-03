function invertColors(tabID) {
  browser.tabs.insertCSS(tabId, {
        file: "style.css"
  });
}
browser.browserAction.onClicked.addListener(invertColors)

