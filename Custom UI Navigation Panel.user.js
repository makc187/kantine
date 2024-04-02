// ==UserScript==
// @name          Custom UI Navigation Panel
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @exclude       *.gastronovi.com/*
// @grant         none
// ==/UserScript==


if(true) {
   // ...:
  //alert('Hello world3!');
  var css = 'body { padding-bottom: 60px !important; /*max-width: 100% !important; overflow-x: hidden !important;*/ }',
  head = document.head || document.getElementsById('head')[0],
  style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  
  //<meta name="viewport" content="width=device-width, initial-scale=1.0">
  let metaElem = document.createElement('meta');
  metaElem.setAttribute('name', 'viewport');
  metaElem.setAttribute('content', 'width=device-width, initial-scale=1.0');
  //document.head.prepend(metaElem);
  
  // custom per page mods:
  if(true) {
      var elem = document.querySelector(".c-page-header-navigation__flyout");
      if(elem) {
          elem.style = "display: none;";
      }
  }
}

function canNavigateForward() {
    const currentState = history.state;

    // Call history.forward() and check if it changes the state
    history.forward();
    const newState = history.state;

    // Restore the state
    history.back();

    // If the new state is different from the current state, navigation forward is possible
    var can = newState !== currentState;
    
    if(!can) {
        history.forward();
    }
    
    return can;
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function flaotingDiv(){

    //How much the screen has been zoomed.
    var zoomLevel = ((screen.width)/(window.innerWidth));
    //By what factor we must scale the div for it to look the same.
    var inverseZoom = ((window.innerWidth)/(screen.width));
    //The div whose size we want to remain constant.
    var h = document.getElementById("fixed-panel");

    //This ensures that the div stays at the top of the screen at all times. For some reason, the top value is affected by the zoom level of the Div. So we need to multiple the top value by the zoom level for it to adjust to the zoom. 
    h.style.top = (((window.pageYOffset) + 5) * zoomLevel).toString() + "px";

    //This ensures that the window stays on the right side of the screen at all times. Once again, we multiply by the zoom level so that the div's padding scales up.
    h.style.paddingLeft = ((((window.pageXOffset) + 5) * zoomLevel).toString()) + "px";

    //Finally, we shrink the div on a scale of inverseZoom.
    h.style.zoom = inverseZoom;

}


(function() {
    'use strict';
    
    if(false) {
        return;
    }
    
    if(inIframe()) {
        return;
    }

    // Create a div for the fixed panel
    const panelDiv = document.createElement('div');
    panelDiv.className = 'fixed-panel';
    panelDiv.setAttribute("id", "fixed-panel");
    
    const panel = document.createElement('div');
    panel.className = 'pan';
    panelDiv.appendChild(panel);

    // Add buttons to the panel
    const buttonLabels = ['&rsaquo;', '&lsaquo;', '&lsaquo;', '&rsaquo;'];
    const buttonDisabled = [false, false, /*history.state != null*/false, /*canNavigateForward()*/false];
    const buttonStyles = ['rotate: 90deg;','rotate: 90deg;', buttonDisabled[2] ? 'color: gray !important;' : '', buttonDisabled[3] ? 'color: gray !important;' : ''];
    const buttonActions = [
        () => window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        }),  // Scroll to bottom
        () => window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                }),                             // Scroll to top
        () => history.back(),                                    // History back
        () => history.forward()                                  // History forward
    ];

    for (let i = 0; i < buttonLabels.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = buttonLabels[i];
        button.onclick = buttonActions[i];
        button.style = buttonStyles[i];
        panel.appendChild(button);
    }

    // Append the panel to the body
    document.body.appendChild(panelDiv);

    // Add styles for the panel and buttons
    const style = document.createElement('style');
    style.textContent = `
        .fixed-panel {
            position: fixed;
            bottom: 0;
            /*position: absolute;*/
            width: 100vw;
            height: 60px;
            background-color: 
            /*rgba(8, 8, 8,0.95)*/ 
            rgba(40,40,40,0.8) 
            !important;
            -webkit-backdrop-filter: /*saturate(100%) blur(25px);*/ saturate(280%) blur(20px);
            z-index: 1000000;
            -webkit-user-select: none;
            overflow: hidden;
        }
        
        .pan {
            /*background-color: rgba(32, 32, 32, 0.55);
            mix-blend-mode: darken;*/
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: gray solid 0.5px;
            -webkit-user-select: none;
        }

        .fixed-panel button {
            padding: 10px 20px;
            font-size: 16px !important;
            font-family: 'verdana' !important;
            color: rgba(64,156,255,1) !important;
            background-color: transparent;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transform: scale(2) !important;
            -webkit-user-select: none;
            background-color: rgba(72, 72, 72, 0.0);
            -webkit-tap-highlight-color: rgba(64,156,255,1) !important;
        }
    `;
    document.head.appendChild(style);
    
    //window.onscroll = flaotingDiv;
})();































