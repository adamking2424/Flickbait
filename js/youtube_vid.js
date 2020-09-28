console.log('youtube_vid.js');
buildVoteUI();
addSidebarRatings();


// Need to get the channel URL from the ui, as the url doesnt always hold the correct link !
// console.log('location ', location);
// let channel = location.href.split('ab_channel=').pop();
// console.log(channel);


function buildVoteUI () {
  let alreadyVoted = false;
  let channelLink = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-owner-renderer')[0].href;
  let channelName = channelLink.split('/channel/').pop();
  $("h1").append('<div align="right" height="400px" width="40%"><button id=12 class="voteButton true">Truth ⬆ 0</button><button id=14 class="voteButton false">Clickbait ⬇ 0</button></div>');
  getVotes(channelName);

  document.getElementById('12').addEventListener('click',function(){
     console.log('upvoting');
     if (!alreadyVoted) {
       voteButtonClicked(channelName, true);
       alreadyVoted = true;
     }
  });
  document.getElementById('14').addEventListener('click',function(){
      console.log('downvoting');
      if (!alreadyVoted) {
        voteButtonClicked(channelName, false);
        alreadyVoted = true;
      }
  });

  
 /*  //THIS IS FOR CHECKING IF VIDEO IS PLAYING!!

  //TODO need to add a listener to the title property of the element
  let playButton = document.getElementsByClassName('ytp-play-button ytp-button')[0];

  const config = { attributes: true}
  const callback = function(mutationsList, observer) {
    console.log(mutationsList);
    for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
      }
      else if (mutation.type === 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(playButton, config);

  // Later, you can stop observing
  observer.disconnect(); */

}

function addSidebarRatings () {
  //compact style-scope ytd-compact-video-renderer byline-separated
  let sideElements = document.getElementsByClassName('secondary-metadata style-scope ytd-compact-video-renderer');
  for (let i = 0; i < sideElements.length; i++) {
    console.log(sideElements[i].childNodes[1].childNodes[2]);
    let node = document.createElement('button');  
    node.className = 'voteButton true'
    //node.id = channelName;
    let textnode = document.createTextNode(`Not clickbait 👏 `);  
    node.appendChild(textnode);
    let locationNode = sideElements[i].childNodes[1].childNodes[2];
    console.log(locationNode.childNodes)
    locationNode.insertBefore(node, locationNode.childNodes[2]);
  }
}

function getVotes (channelId) {
  chrome.runtime.sendMessage({type:"getOneVote", data:{channel_id:channelId}}, function(response) {
    console.log('DB RESPONSE: getOneVote', response);
    if (response.length) {
      document.getElementById('12').innerHTML = 'Truth ⬆ ' + String(response[0].upvotes);
      document.getElementById('14').innerHTML = 'Clickbait ⬇ ' + String(response[0].downvotes);
    } 
  });
}

//{type:"sendVote", data: {channel_id:"bla", upvoted:true}};
function voteButtonClicked(channelId, upvoted) {
  increaseVoteValue(upvoted);

  chrome.runtime.sendMessage({type:"sendVote", data:{channel_id:channelId, upvoted:upvoted}}, function(response) {
    console.log('DB RESPONSE: Added vote', response);
  
  });
}


function increaseVoteValue (upvoted) {
  if (upvoted) {
    let button = document.getElementById('12');
    let currentVote = button.innerHTML.split('⬆ ').pop().trim();
    button.innerHTML = 'Truth ⬆ ' + (Number(currentVote) + 1);
  } else {
    let button = document.getElementById('14');
    let currentVote = button.innerHTML.split('⬇ ').pop().trim();
    console.log(currentVote);
    button.innerHTML = 'Clickbait ⬇ ' + (Number(currentVote) - 1);
  }
}






