chrome.runtime.onMessage.addListener(function (message) {
  console.log('onMessage-> ' + message);
  // Object.keys(message).forEach(function (change) {
  //     console.log('youtube.js onMessage()');
  // })

  var elements = document.getElementsByClassName("style-scope yt-img-shadow");
  // elements.forEach(element => {
  //   console.log(element);
  //   element.src = 'img/get_started16.png';
  // })
  for (let i = 0; i < elements.length;i++) {
    console.log(elements[i]);
    let firstActualImage = '';
    if (elements[i].src) {
      console.log('Has a source');
      elements[i].src = "https://i.ytimg.com/vi/OCdrRSt0ysc/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDU93uO-MWyIIuri-DNXazphgKSnw";
    }
  }

});