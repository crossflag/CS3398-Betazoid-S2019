//const CSS = "body {filter: invert(100%); backbround-color: white; color: black;}";
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

// Different settings for different buttons
var CSS = ""; // Will hold code for various filters
var previousID = ""; // Will hold previous button id for filters
const INVERT = "body {filter: invert(100%); backbround-color: white; color: black;}";
const GRAYSCALE = "body {filter: grayscale(100%); backbround-color: white; color: black;}";
const SEPIA = "body {filter: sepia(100%); backbround-color: white; color: black;}";

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
function toggleCSS(tab, buttonID) {
  /*
  function gotTitle(title) {

    if (title === TITLE_APPLY) {
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      // Check the button's id and apply a filter based on it
      switch(buttonID)
      {
        case "Invert Color":
          CSS = INVERT;
          break;
        case "Grayscale":
          CSS = GRAYSCALE;
          break;
        case "Sepia":
          CSS = SEPIA;
          break;
      }
      browser.tabs.insertCSS({code: CSS}); // Apply the selected filter
    } else if(title === TITLE_REMOVE){
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
      browser.tabs.removeCSS({code: CSS}); // Remove any filter
    }
    else { // First time pressing a button
      
       //*** Reusing code! Is there a better way to implement this section? ***
       //What this fixes: Bug where user would have to press a button twice to apply a filter.
       //Why the bug would occur: the page action's title was not initialized to TITLE_REMOVE.
       
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      switch(buttonID)
      {
        case "Invert Color":
          CSS = INVERT;
          break;
        case "Grayscale":
          CSS = GRAYSCALE;
          break;
        case "Sepia":
          CSS = SEPIA;
          break;
      }
      browser.tabs.insertCSS({code: CSS}); // Apply the selected filter
    }
  }
  */

  function applyFilter() {
    // Check if user clicked the same button twice, or if user wants to clear all filters
    if(previousID == buttonID || buttonID == "Clear Filter") {
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
      browser.tabs.removeCSS({code: CSS}); // Remove the filter
      CSS = ""; // Reset the CSS variable
      previousID = ""; // Reset previously used button id
    }
    else { 
      browser.tabs.removeCSS({code: CSS}); // Remove the filter
      // Get the code for the selected filter
      switch(buttonID) {
        case "Invert Color":
          CSS = INVERT;
          break;
        case "Grayscale":
          CSS = GRAYSCALE;
          break;
        case "Sepia":
          CSS = SEPIA;
          break;
        default: // Do nothing for default
          break;
      }
      previousID = buttonID;
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      browser.tabs.insertCSS({code: CSS}); // Apply the selected filter
    }
  }

  var gettingTitle = browser.browserAction.getTitle({tabId: tab.id});
  //gettingTitle.then(gotTitle);
  gettingTitle.then(applyFilter);
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
    //browser.browserAction.show(tab.id); // This was throwing an error in the debugger for some reason
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
    toggleCSS(tab, received.message);
  }
});
  sendResponse({response: "recieved"})
}


/*
Add an event listener
The popup window's event listener broadcasts a message, and this receives it
Upon receiving a message, it then runs update()
*/
browser.runtime.onMessage.addListener(update);
