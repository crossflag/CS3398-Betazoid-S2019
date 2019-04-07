
/*
send message to background.js when a "click" event happens
*/


//print response to ensure message was handled correctly
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}


//print errors if any
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
  console.log("BUTTON THAT WAS PRESSED: " + buttonID);
  var sending = browser.runtime.sendMessage({message:buttonID});
  // The popup's event listener expects a response, so we handle it here
  sending.then(handleResponse, handleError);
}

/* 
Create event listener for any click in the popup
All clicks cause the event listener to run notifyExtension()
*/
window.addEventListener("click", notifyExtension);
