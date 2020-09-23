
console.log('youtube_sub.js');
setupHTML();

function setupHTML () {
  let elements = document.getElementsByClassName('style-scope ytd-grid-video-renderer');
  for (let x = 0; x < elements.length; x++) {
    if (elements[x].id === 'details') {
      let node = document.createElement("P");  
      let textnode = document.createTextNode("Water");  
      node.appendChild(textnode);
      let metaElement = elements[x].childNodes[0];
      let titleElement = metaElement.childNodes[0].childNodes[1];
      metaElement.appendChild(node);  //THIS IS THE SPACE BELOW VIEWS
      titleElement.innerHTML = 'OMG SUBSCRIPTIONS DONE WOWOWOWO';
    }
  }
}

chrome.runtime.onMessage.addListener(function (message) {
  console.log(new Date().getTime() + '  ' + 'onMessage-> youtube_sub.js  ', message);
});
