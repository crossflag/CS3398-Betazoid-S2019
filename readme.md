
# DarkWeb 

## Vision Statement

We are working with the community at large to create a simple, easy to use browser plug-in
that anyone can use to reduce eye strain, relieve stress and maintain comfort throughout their day. 


## Outline

Welcome to our project and thanks for dropping in. We are excited you’re here. DarkWeb is a plugin that allows you to seamlessly view content on you browser while controlling the amount of blue/white light that is displayed. Our team’s goal is to create a plugin for anyone who may not want their sleep disrupted or to reduce eye strain. By not using brute force swapping of intensity we allow for a more nuanced approach to interpret the the colors showed on a website.  We allow for a configurable approach so each user can to choose from settings or use a per-selected settings for more control. 

## Status
Project runs and implements basic funtionality.

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



