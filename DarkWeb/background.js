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
"header {background-color: white;} ";
const GRAYSCALE = "body {filter: grayscale(100%); background-color: white; color: black;}";
const SEPIA = "body {filter: sepia(100%); background-color: white; color: black;}";
const NIGHT =
"body { filter:invert(100%); background-color: white; color: black; }"+
"html {background-color: black;}"+
"header,.footer .footer-sidebar { background-color: white;}"+
"a,.tocnumber, .toctext { filter:invert(95%); }"+
"a:link, #res a, #rhs a, #rhs { color: rgb(88,214,202); }"+
"a:hover, a:active { background-color: black; color: rgb(147,127,198); }"+
"cite { color: rgb(155,109,109); }"+
"a:visited { color: rgb(147,127,198); }"+
"* { opacity: 0.99; }"+
"span { color: black; }";
const ROTATECW = "body {filter: hue-rotate(180deg); background-color: white; color: black;}";
const ROTATECCW = "body {filter: hue-rotate(270deg); background-color: white; color: black;}";
const NOBLUE = "body {filter: sepia(40%); background-color: white; color: black;}";
const DROPS = "body {filter: drop-shadow(5px 5px 5px black); background-color: white; color: black;}";
const CONTRAST = "body {filter: contrast(200%); background-color: white; color: black;}";
const TRANSP = "body {filter: opacity(50%); background-color: white;  color: black;}";

console.log("DOES THIS WORK?!?!");
console.log(localStorage.getItem('user'));
toggleFilters(localStorage.getItem('user'));

/*
Add an event listener
The popup window's event listener broadcasts a message, and this receives it
Upon receiving a message, it then runs updateFilter()
*/

browser.commands.onCommand.addListener(function(command) {
  if (command == "toggle-feature") {
    toggleFilters("Invert");
  }
});

browser.runtime.onMessage.addListener(updateFilter);
function updateFilter(recieved, sender, sendResponse) {
  toggleFilters(recieved.message);
  sendResponse({response: "Response from background.js."});
}

// This listener is for newly-created tabs
// After the user switches to the new tab, the code then runs updateNewTab()
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
    default: break; // Do nothing for default
  }
}

/*
 Compares the current filter to the selected filter.
 First removes the previous filter, and then checks if it should apply a new filter
 If the selected filter is the same as the current filter, then it will just remove it.
 Else, it will apply the new filter.
*/
function toggleFilters(buttonID) {
    if(buttonID == "SaveSettings"){
        console.log("Saving Settings");
        var saveID = previousID;
        localStorage.setItem('user', saveID);
        console.log(localStorage.getItem('user'));
        return;
    }
    removeAllFilters(); // To apply a new filter, we must first remove the all filters
    CSS = ""; // Reset the CSS variable. This fixes tab persistence.
    if(previousID == buttonID) {
        previousID = "";
    }
    else {
        setCSScode(buttonID);
        previousID = buttonID;
        applyFilter();
    }
}

// Apply the selected filter to all tabs
function applyFilter() {
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let currentTab of tabs) {
      var tabID = currentTab.id;
      browser.tabs.insertCSS(tabID, {code: CSS});
    }
  });
}

// Remove the all filters from all tabs
function removeAllFilters() {
  var cssCodes = [INVERT, GRAYSCALE, SEPIA, NIGHT, ROTATECW, ROTATECCW, NOBLUE, DROPS, CONTRAST, TRANSP];
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let currentTab of tabs) { 
      var tabID = currentTab.id;
      cssCodes.forEach(function(item) {
        var code = item; browser.tabs.removeCSS(tabID, {code: code});
      });
    }
  });
}
