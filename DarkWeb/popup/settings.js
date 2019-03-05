
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

function notifyExtension(e) {

  var sending = browser.runtime.sendMessage({message:"color"});
  sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyExtension);
