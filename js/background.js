'use strict';

let error404Listener = null;
let preferredThumbnailFile = 'hq1.jpg';
let noRedirectToken = 'zctf420otaqimwn9lx8m';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {

  });

  


 
  let redirectListener = function (details) {
    details.url = details.url.replace(/(default|hqdefault|mqdefault|sddefault|hq720).jpg/, preferredThumbnailFile);
    return {redirectUrl: details.url};
  };

  let opt_extraInfoSpec = ['blocking'];

  let filter = {
        urls: [
          'https://i.ytimg.com/vi/*/default.jpg*',
          'https://i.ytimg.com/vi/*/hqdefault.jpg*',
          'https://i.ytimg.com/vi/*/mqdefault.jpg*',
          'https://i.ytimg.com/vi/*/sddefault.jpg*',
          'https://i.ytimg.com/vi/*/hq720.jpg*',
          'https://i.ytimg.com/vi_webp/*/default.webp*',
          'https://i.ytimg.com/vi_webp/*/hqdefault.webp*',
          'https://i.ytimg.com/vi_webp/*/mqdefault.webp*',
          'https://i.ytimg.com/vi_webp/*/sddefault.webp*'
        ]
      };

  setupThumbnailRedirectors();

  function setupThumbnailRedirectors () {
    chrome.webRequest.onBeforeRequest.addListener(redirectListener, filter, opt_extraInfoSpec);
  }

  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete' && tab.active) {
      if (tab.url.includes('subscriptions')) {
        console.log(new Date().getTime() + '  ' + 'executing youtube_sub.js');
        chrome.tabs.executeScript(tab.id, {file: 'js/youtube_sub.js'});
      } else if (tab.url.includes('watch?')) {
        chrome.tabs.executeScript(tab.id, {file: 'js/youtube_vid.js'});
      } else {
        console.log(new Date().getTime() + '  ' + 'executing youtube_home.js');
        chrome.tabs.executeScript(tab.id, {file: 'js/youtube_home.js'});
      }
    }
  });


  //This is so that the UI shows when on youtube.com. Might want to change it so it always shows.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.youtube.com'},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});