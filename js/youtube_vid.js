console.log('youtube_vid.js');


let titleContainerElement = document.getElementsByTagName('ytd-video-primary-info-renderer')[0];


console.log(titleContainerElement);
console.log(titleContainerElement.childNodes[1].childNodes[5].childNodes[1]);

titleContainerElement.childNodes[1].childNodes[5].childNodes[1].innerHTML = "<center>THIS MAYBE WHERE VOTING</center>";

//'<button>Upvote</button><span>1</span><button>Downvote</button>'

//"<center>THIS MAYBE WHERE VOTING</center>"





