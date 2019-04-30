
# DarkWeb 

## Vision Statement

We are working with the community at large to create a simple, easy to use browser plug-in
that anyone can use to reduce eye strain, relieve stress and maintain comfort throughout their day. 


## Outline

Welcome to our project and thanks for dropping in. We are excited you’re here. DarkWeb is a plugin that allows you to seamlessly view content on you browser while controlling the amount of blue/white light that is displayed. Our team’s goal is to create a plugin for anyone who may not want their sleep disrupted or to reduce eye strain. By not using brute force swapping of intensity we allow for a more nuanced approach to interpret the the colors showed on a website.  We allow for a configurable approach so each user can to choose from settings or use a per-selected settings for more control. 

## Status
Project runs and implements basic funtionality.

# Instructions for Installing Firefox Plugin
## Via Mozilla Addon Link
* https://addons.mozilla.org/en-US/firefox/addon/darkweb/

## Via xpi File
* Open Firefox browser
* Select menu tab from top right hand corner
* select "Add-ons"
* Select select "Tools for Add-ons" drop down menu
* Select select "Install Add-ons From File"

![alt test](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/artifacts/install_add_on.png)

* Select [darkweb-1.0-fx.xpi](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/darkweb-1.0-fx.xpi)


## Team's feature/accomplishments for Sprint 1 and next steps
### Cameron
Responsible for extension UI look and layout. Artifacts include [settings.html](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.html) and [setting.css](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.css). Both of these files can be found in [DarkWeb/popup](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/tree/master/DarkWeb/popup).
Next steps: Implementing better color filtering so pages look more uniform when filter is applied.
         
### Tyler
Responsible for implementing the basic structure for the project ([DarkWeb/manifest.json](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/manifest.json), [DarkWeb/popup/](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/tree/master/DarkWeb/popup), [DarkWeb/icons/](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/tree/master/DarkWeb/icons)), aided in the construction of the [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js) file, and created the 'Night' theme. Next steps: Reimplement 'Night' mode feature utilizing JQuery for more nuanced adjustments of web page element colors.

### Nicholas
During initial prototyping, created [old_files/DarkWeb.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/old_files/darkweb.js) to have the toolbar button add a boarder to show that we could change websites layouts. Then Connected the buttons inside the extension popup to to the background javascript file using a message sender in [DarkWeb/popup/settings.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.js) and a message listener in [DarkWeb/background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js). Then used function created by Tyler to successfully inject CSS into page. Next Steps: Save the setting from the last time browser was closed

### Rhett
Responsible for adding the RotateCW, RotateCCW, and Blue Light filters. I provided small adjustments to the GUI(Artifacts available in [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js), [popup/settings.css](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.css), and [popup/settings.html](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.html) in the Darkweb folder of this repository). Background.js is used at all times, settings.css is used when the popup is on, and settings.html is used whenever a buttonID is called for. Also responsible researching how to implement ability to apply to multiple tabs at once, making a filter persist in a tab that is updated, which has proved to be very challenging for our team right now. Status: Continuing work on the incomplete issues mentioned in the last sentence.

### Richard
Responsible for adding basic button functionality in [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js). This file handles all button presses, and inserts CSS code to the web page depending on that button. Next steps: Add ability to apply color filters across all tabs at once.

## Team's feature/accomplishments for Sprint 2 and next steps
### Tyler
Responsible for adding keyboard shortcut functionality in ([DarkWeb/manifest.json](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/manifest.json). The extension can be run with the command "CTRL+SHIFT+D". Also improved the Night theme code in the [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js) file for improved webpage coverage. Also aided in resolving MVC communication issues in [popup/settings.html](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.html) and [DarkWeb/popup/settings.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.js).
Next steps: Implement atomic behavior for sliders in popup (Only one slider should be active at a time). Create a separate js file for querying webpages and adjusting detected colors.

### Rhett
Responsible for implementing the Hi Contrast filter, Drop Shadow filter, and Transparency filter to allow for more user funcctionality with new filter options in [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js). Responsible for testing and bug identification in for Google Chrome Compatibility(Noted in [Rhett_Report.md](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/artifacts/Rhett_Report.md). Modified the app [icons](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/tree/master/DarkWeb/icons) to work with Chrome. Slight UI changes to accomadate more filter buttons to resolve a text wrapping issue by making the sliders longer in [setting.css](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.css). Next steps: To Achieve working filters in Chrome and to help work out the ability to save presets.

### Nicholas
Added the ability to apply to filters to all previously opened tabs, using the old interface [artifacts/DarkWeb_tabs/background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/artifacts/DarkWeb_tabs/background.js). Corrected the popup toggle switches to so that a selection of a filter would programmatically deselect any previous selected toggle switches so the popup would not show more then one selected at a time [popup/settings.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.js). Next steps: Investigate how to inject JQuery into the extension. Have the extension automatically load and not go through "about:debugging" everytime.

### Cameron
Changed UI look, layout and feel. These changes can be seen in [settings.html](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.html). Such changes include changing buttons to toggle switches, resizing the window and adding a fieldset tag to prepare for clearer feature segregation. Style changes were also made in [setting.css](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/popup/settings.css). Moving forward I would like to modify the the toggle switches to stay "on" when closing the popup window and also reflect this "on" state in new tabs when they are opened.

### Richard
Responsible for making filters persist over multiple tabs, and having a filter-change on one tab be reflected on all others. This functionality was added in [background.js](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/background.js). The script also gained permission to apply these filter changes over all urls, as reflected in the permissions section of [DarkWeb/manifest.json](https://github.com/cs3398-betazoid-betamales/CS3398-Betazoid-S2019/blob/master/DarkWeb/manifest.json). Next Steps: Investigate how to save current filter settings upon closing the extension, and loading those settings upon reopening the extension/web browser.

## Team's feature/accomplishments for Sprint 3
### Tyler


### Rhett


### Nicholas


### Cameron


### Richard

