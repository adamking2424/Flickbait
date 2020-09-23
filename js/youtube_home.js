
console.log('youtube.js');

setupHTML();

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
  
chrome.runtime.onMessage.addListener(function (message) {
  console.log(new Date().getTime() + '  ' + 'onMessage-> youtube.js  ', message);
});
