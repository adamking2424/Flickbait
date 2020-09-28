console.log('youtube.js');


//Need to get all channelIds
//Send all channel Ids to getReq
//For each result need to add a button!



function getAllChannelIds () {

  //byline-container id of 
  
  let channelElements = document.getElementsByClassName('style-scope ytd-channel-name complex-string');
  let channelNameArr = [];
  for (let i = 0; i < channelElements.length; i++) {
    let channelName = channelElements[i].childNodes[0].href.split('/').pop();
    channelNameArr.push(channelName);
    let node = document.createElement('button');  
    node.className = 'voteButton true'
    node.id = channelName;
    let textnode = document.createTextNode(`Not clickbait 👏 `);  
    node.appendChild(textnode);
    let locationNode = channelElements[i].parentNode.parentNode.parentNode.parentNode.parentNode;
    locationNode.insertBefore(node, locationNode.childNodes[2]);
  }
  getAllVotes(channelNameArr);
}


function removeClickbaitHTML () {
  let channelElements = document.getElementsByClassName('style-scope ytd-channel-name complex-string');
  for (let i = 0; i < channelElements.length; i++) {
    let channelName = channelElements[i].childNodes[0].href.split('/').pop();
    if (document.getElementById(channelName)) {
      removeElement(channelName);
    }
  }
}
function addClickbaitHTML () {
  console.log('adding clickbait html');
  getAllChannelIds();
}

function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}



function getAllVotes(channelNameArr) {
  let channelObjArr = [];
 
  channelObjArr = channelNameArr.reduce((accumulator, currentValue) => {
    return accumulator = [...accumulator, {channel_id:currentValue}]
  }, channelObjArr)

  console.log('channelObjArr', channelObjArr);
  sendMessageToBackground(channelObjArr);

}


function sendMessageToBackground (channelObjArr) {
  console.log('sending message to background script');
  chrome.runtime.sendMessage({type:"getAllVotes", data:channelObjArr}, function(response) {
    console.log('DB RESPONSE: ', response);
    addClickbaitFlags(response);
  });
}


function addClickbaitFlags (data) {
  data.forEach(item => {
    if (item.downvotes > item.upvotes) {
      document.getElementById(item.channel_id).className = 'voteButton false';
    } else {
      document.getElementById(item.channel_id).className = 'voteButton false';
    }
  })
}







let styleElement = null;
setInitialOptions(['replaceThumbnail', 'titleCaps', 'clickbaitRating', 'hideClickbait']);
addOptionsListeners();


function setInitialOptions(optionsArr) {
  for (let i = 0; i < optionsArr.length; i++) {
    chrome.storage.sync.get(optionsArr[i], function (result) {
      if (result[optionsArr[i]]) setOptions(optionsArr[i],result[optionsArr[i]]);
    })
  }
}

function setupHTML() {

  //TESTING
  let contentElement = document.getElementById('contents');
  console.log(contentElement);
  contentElement.childNodes[0].parentNode.removeChild(contentElement.childNodes[0]);
  //TESTING



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
      setOptions(key, storageChange.newValue);
    }
  });
}

function setOptions(storageItem, value) {
  switch(storageItem) {
    case 'replaceThumbnail': {
      break;
    }
    case 'titleCaps': {
      value ? removeCaps() : addCaps();
      break;
    }
    case 'clickbaitRating': {
      console.log(storageItem);
      value ? addClickbaitHTML(): removeClickbaitHTML();
      break;
    }
    case 'hideClickbait': {
      value ? removeClickbait() : returnClickbait();
      break;
    }
  }
}

let oldContent = null;
function removeClickbait () {
  console.log('removeClickbait');
  oldContent = document.getElementById('contents');
  document.getElementById('contents').removeChild(oldContent.childNodes[0]);
}

function returnClickbait () {
  console.log('returnClickbait');
}

function addCaps () {
  console.log('addCaps');
  if (styleElement) {
    styleElement.parentNode.removeChild(styleElement);
  }
}

function removeCaps() {
  console.log('removeCaps');
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
