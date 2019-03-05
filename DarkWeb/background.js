const CSS = "body {filter: invert(100%); backbround-color: white; color: black;}";
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
function toggleCSS(tab) {

  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      browser.tabs.insertCSS({code: CSS});
    } else {
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
      browser.tabs.removeCSS({code: CSS});
    }
  }

  var gettingTitle = browser.browserAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}


/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializebrowserAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.browserAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    browser.browserAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    browser.browserAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializebrowserAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializebrowserAction(tab);
});

/*
toggleCSS when popup sends a message.
*/
function update(received, sender, sendResponse) {
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
  for (tab in tabs) {
    initializebrowserAction(tab);
    toggleCSS(tab);
  }
});
  sendResponse({response: "recieved"})
}


browser.runtime.onMessage.addListener(update);
