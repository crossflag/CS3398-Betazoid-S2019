function invertColors(tabID) {
  browser.tabs.insertCSS(tabId, {
        file: "style.css"
  });
}
rowser.browserAction.onClicked.addListener(invertColors)

