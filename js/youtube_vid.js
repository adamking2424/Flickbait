console.log('youtube_vid.js');

buildVoteUI();

//TODO need to clean this up, dont think it should creeate element then have to search for the same one.
function buildVoteUI () {
  let titleContainerElement = document.getElementsByTagName('ytd-video-primary-info-renderer')[0];
  titleContainerElement.childNodes[1].childNodes[5].childNodes[1].innerHTML = '<button id=12>up</button><span id=13>1</span><button id=14>down</button>';
  let counterSpan = document.getElementById('13');
  document.getElementById('12').addEventListener('click',function(){
    console.log('upvoting');
    counterSpan.innerHTML = Number(counterSpan.innerHTML) + 1;
  });
  document.getElementById('14').addEventListener('click',function(){
    console.log('downvoting');
    counterSpan.innerHTML = Number(counterSpan.innerHTML) - 1;
  });
}





