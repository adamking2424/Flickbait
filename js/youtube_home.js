
console.log('youtube.js');

let styleElement = null;
setupHTML();
addOptionsListeners();
chrome.storage.sync.get('titleCaps', function(result) {
  console.log("CAPS OFF IS", result);
  if (result.titleCaps) setupCSS();
});


function setupHTML() {
  let elements = document.getElementsByClassName('style-scope ytd-rich-grid-media');
  for (let x = 0; x < elements.length; x++) {
    if (elements[x].id === 'details') {
      let node = document.createElement("P");  
      let textnode = document.createTextNode("Hello wow");  
      node.appendChild(textnode);
      let metaElement = elements[x].childNodes[1];
      metaElement.appendChild(node);
      elements[x].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML = "WOWOWOWOWOWOWOWOWOWOWWO WOWOWOWOWOWOWWOWOWO WOWOWOWOWWOWOWOWOWOW WOWOWOWOWOWWO";
    }
  }  
}

//OPTIONS ARE key, namespace, storageChange.oldValue, storageChange.newValue
function addOptionsListeners () {
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      switch (key) {
        case 'titleCaps': {
          storageChange.newValue ? setupCSS() : removeCSS();
        }
      }
    }
  });
}

function removeCSS () {
  if (styleElement) {
    styleElement.parentNode.removeChild(styleElement);
  }
}



function setupCSS() {
  styleElement = document.createElement('style');
  styleElement.innerHTML = `
    #video-title{
        text-transform: lowercase;
        display: block !important;
    }
    #video-title::first-letter {
        text-transform: uppercase;
    }`;
  document.head.appendChild(styleElement);
}
  
chrome.runtime.onMessage.addListener(function (message) {
  console.log(new Date().getTime() + '  ' + 'onMessage-> youtube.js  ', message);
});
