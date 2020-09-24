console.log('youtube_vid.js');
buildVoteUI();

//TODO need to clean this up, dont think it should creeate element then have to search for the same one.
//TODO need to probs convert all to jQuery
function buildVoteUI () {
  //let titleContainerElement = document.getElementsByTagName('ytd-video-primary-info-renderer')[0];
  //console.log(titleContainerElement.childNodes[1].childNodes[3]);
  $("h1").append('<div align="right" width="40%"><button id=12>up</button><span id=13>1</span><button id=14>down</button></div>');
  let counterSpan = document.getElementById('13');
  document.getElementById('12').addEventListener('click',function(){
    console.log('upvoting');
    counterSpan.innerHTML = Number(counterSpan.innerHTML) + 1;
  });
  document.getElementById('14').addEventListener('click',function(){
    console.log('downvoting');
    counterSpan.innerHTML = Number(counterSpan.innerHTML) - 1;
  });

  document.getElementById("primary-inner").addEventListener('click', function () {
    console.log("video clicked!");
  })
  

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
observer.disconnect();

  
}





