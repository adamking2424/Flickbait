chrome.runtime.onMessage.addListener(function (message) {
  console.log('onMessage-> ' + message);

  let elements = document.getElementsByClassName('style-scope ytd-rich-grid-media');
  let h4 = document.createElement("h4");
  h4.textContent = "something";

  for (let x = 0; x < elements.length; x++) {
    if (elements[x].id === 'details' && x % 2) {
      console.log(elements[x]);
      let node = document.createElement("P");  
      let textnode = document.createTextNode("Water");  
      node.appendChild(textnode);
      let metaElement = elements[x].childNodes[1];
      metaElement.appendChild(node);
      elements[x].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML = "HEY"
      console.log(x, elements[x].childNodes[1].childNodes[0].childNodes[1]);
    }
  }
});