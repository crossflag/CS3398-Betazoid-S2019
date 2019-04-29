
//const CSS = "body {filter: invert(100%); backbround-color: white; color: black;}";
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

// Different settings for different buttons
var CSS = ""; // Will hold code for various filters
var previousID = ""; // Will hold previous button id for filters
const INVERT =
"body {filter: invert(100%); background-color: white; color: black;}"+
"html {background-color: black;}"+
"header {background-color: white;}"+
"video {filter: invert(100%);}";
const GRAYSCALE = "body {filter: grayscale(100%); background-color: white; color: black;}";
const SEPIA = "body {filter: sepia(100%); background-color: white; color: black;}";
const NIGHT =
"body { filter:invert(100%); background-color: white; color: black; }"+
"html { background-color: black;}"+
".thumbstrip {filter: invert(100%);}"+
"iframe {filter: invert(100%);}"+
"video {filter: invert(100%); }"+
"a:visited { color: rgb(147,127,198); }"+
"cite { color: rgb(155,109,109); }"+
"a:link, #res a, #rhs a, #rhs { color: rgb(180,71,64); }"+
"header,.footer .footer-sidebar { background-color: white;}"+
"img {filter: invert(100%); }";


const ROTATECW = "body {filter: hue-rotate(180deg); background-color: white; color: black;}";
const ROTATECCW = "body {filter: hue-rotate(270deg); background-color: white; color: black;}";
const NOBLUE = "body {filter: sepia(40%); background-color: white; color: black;}";
const DROPS = "body {filter: drop-shadow(5px 5px 5px black); background-color: white; color: black;}";
const CONTRAST = "body {filter: contrast(200%); background-color: white; color: black;}";
const TRANSP = "body {filter: opacity(50%); background-color: white;  color: black;}";

loadSettings(); // Load previously saved color setting on startup

//pdf testing and debugging stuff

/*
  This handles the keyboard shortcut.
  The actual keys for the shorcut are defined in manifest.json
    under "commands" > "toggle-feature" > "suggested" > default/mac
*/
browser.commands.onCommand.addListener(function(command) {
  if (command == "toggle-feature")
    loadSettings(); // Load filter settings upon entering keyboard shortcut
});

/*
  Add an event listener.
  The popup window's event listener broadcasts a message, and this receives it.
  Upon receiving a message, it then runs updateFilter().
*/
browser.runtime.onMessage.addListener(updateFilter);
function updateFilter(recieved, sender, sendResponse) {
  if(recieved.message == "SaveSettings")       // user clicked on Save Settings
    saveSettings();
  else if(recieved.message == "ApplyPreset")   // user clicked on Apply Settings
    loadSettings();
  else
    toggleFilters(recieved.message);           // user clicked on a specific filter to toggle
  sendResponse({response: "--- background.js has finished! ---"});
}

/*
  This listener is for newly-created tabs.
  After the user switches to the new tab, the code then runs updateNewTab().
*/
browser.tabs.onUpdated.addListener(updateNewTab);
function updateNewTab(recieved, sender, sendResponse) {
  var tabID = browser.tabs.getCurrent().id;
  browser.tabs.insertCSS(tabID, {code: CSS});
}

// Applies the desired filter's code to the CSS variable
function setCSScode(buttonID) {
  switch(buttonID) {
    case "Invert":    CSS = INVERT;    break;
    case "Grayscale": CSS = GRAYSCALE; break;
    case "Sepia":     CSS = SEPIA;     break;
    case "Night":     CSS = NIGHT;     break;
    case "RotateCW":  CSS = ROTATECW;  break;
    case "RotateCCW": CSS = ROTATECCW; break;
    case "BlueLight": CSS = NOBLUE;    break;
    case "Drops":     CSS = DROPS;     break;
    case "Contrast":  CSS = CONTRAST;  break;
    case "Transp":    CSS = TRANSP;    break;
    default: console.log("No filter found for this button."); break; // Do nothing for default
  }
}

/*
  Compares the current filter to the selected filter.
  First removes the previous filter, and then checks if it should apply a new filter
  If the selected filter is the same as the current filter, then it will just remove it.
  Else, it will apply the new filter.
*/
function toggleFilters(buttonID) {
    removeAllFilters(); // To apply a new filter, we must first remove the all filters
    CSS = ""; // Reset the CSS variable. This fixes tab persistence.
    if(previousID == buttonID) {
        previousID = "";
        localStorage.setItem('current', "");
    }
    else {
        setCSScode(buttonID);
        previousID = buttonID;
        localStorage.setItem('current', previousID);
        applyFilter();
    }
}

// Apply the selected filter to all tabs
function applyFilter() {
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let currentTab of tabs) {
      if(currentTab.url != "about:debugging") {
        var tabID = currentTab.id;
        browser.tabs.insertCSS(tabID, {code: CSS});
      }
    }
  });
}

// Remove the all filters from all tabs
function removeAllFilters() {
  var cssCodes = [INVERT, GRAYSCALE, SEPIA, NIGHT, ROTATECW, ROTATECCW, NOBLUE, DROPS, CONTRAST, TRANSP];
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let currentTab of tabs) {
      if(currentTab.url != "about:debugging") {
        var tabID = currentTab.id;
        cssCodes.forEach(function(code) {
          browser.tabs.removeCSS(tabID, {code: code});
        });
      }
    }
  });
}

/*
  Saves the current filter to the browser's local storage.
  Currently saves single filters. Must be redesigned for more complex settings in the future.
*/
function saveSettings() {
  console.log("Saving " + previousID + " to local storage.");
  localStorage.setItem('user', previousID); // Change this later for more complex filters
}

/*
  Loads the last saved setting, and applies it to the browser window.
  If the filter id is null or empty, then the extension will remove all filters.
  Currently applies single filters. Must be redesigned for more complex settings in the future.
*/
function loadSettings() {
  if(localStorage.getItem('user') != null && localStorage.getItem('user') != "") { // validate data before applying
    console.log("Loading \"" + localStorage.getItem('user') + "\" filter from local storage.");

    // Change this section later for more complex filters
    removeAllFilters();
    setCSScode(localStorage.getItem('user'));
    previousID = localStorage.getItem('user');
    localStorage.setItem('current', previousID);
    applyFilter();
  }
  else {
    console.log("No valid data is stored in local storage!");
    removeAllFilters();
    previousID = "";
    localStorage.setItem('current', "");
  }
}
