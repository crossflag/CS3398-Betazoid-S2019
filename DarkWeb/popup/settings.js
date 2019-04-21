/*
  Get the last saved filter on startup, and flip the switches.
  The item 'current' in localStorage is used to track the current filter without loading background.js.
  Settings.js is reloaded everytime the popup is opened, where as background.js is only loaded once.
*/
var currentID = localStorage.getItem('current'); // Get last used filter
flipSwitches(currentID); // flip the toggle switches

// print response to ensure message was handled correctly
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

// print errors if any
function handleError(error) {
  console.log(`Error: ${error}`);
}

/*
Send a message to (all?) other event listeners
For this web extension, background.js contains the only other event listener
*/
function notifyExtension(e) {
  console.log("Settings.js listener: button was pressed.");
  var buttonID = e.target.id; // Get the pressed button's id
  if(buttonID != "") {
  	console.log("BUTTON THAT WAS PRESSED: " + buttonID);

    if(buttonID == "SaveSettings")
    {
      localStorage.setItem('current', currentID); // Set the current filter
    }
    else if(buttonID == "ApplyPreset")
    {
      currentID = localStorage.getItem('user'); // Get last user-saved filter
      if(currentID == null) currentID == ""; // Prevents errors
      flipSwitches(currentID); // flip the toggle switches based on user-saved filter
    }
    else
    {
      currentID = buttonID;
      localStorage.setItem('current', currentID); // Set the current filter
      flipSwitches(currentID); // flip the toggle switches
    }

  	var sending = browser.runtime.sendMessage({message:buttonID}); // Handle button presses
  	// The popup's event listener expects a response, so we handle it here
  	sending.then(handleResponse, handleError);
  }
}

/*
Create event listener for any click in the popup
All clicks cause the event listener to run notifyExtension()
*/
window.addEventListener("click", notifyExtension);

/*
  Flips toggle switches based on the button id
  if button id does not match the filter id but button is turned on, turn off
  if button id matches the current filter id but button is turned off, turn on
*/
function flipSwitches(buttonID) {
  var switches = document.getElementsByClassName('switch');
  for (var i = 0; i < switches.length; i++) {
    if ((switches[i].lastElementChild.id != buttonID && switches[i].control.checked) ||
      (switches[i].lastElementChild.id == buttonID && !switches[i].control.checked)){
      switches[i].click();
    }
  }
}