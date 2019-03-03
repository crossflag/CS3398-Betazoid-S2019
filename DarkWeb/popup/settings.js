document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("toggle")) {
    return;
  }

  browser.tabs.insertCSS(tabId, {
        file: "image.css"
	}

});

