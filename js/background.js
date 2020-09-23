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
    chrome.webRequest.onBeforeRequest.addListener(redirectListener, filter,opt_extraInfoSpec);
  }

  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
      if (tab.url.includes('subscriptions')) {
        console.log(new Date().getTime() + '  ' + 'executing youtube_sub.js');
        executeScript(tabId, 'js/youtube_sub.js', 'youtube_sub.js init');
      } else if (tab.url.includes('watch?')) {
        executeScript(tabId, 'js/youtube_vid.js', 'youtube_vid.js init');
      } else {
        console.log(new Date().getTime() + '  ' + 'executing youtube_home.js');
        executeScript(tabId, {
          file: 'js/youtube_home.js',
          runAt: 'document_start'  //TODO need to check if this is actually helping 
      }, 'youtube_home.js FIN');
      }
    }
  });

  function executeScript (tabId, options, message) {
    chrome.tabs.executeScript(tabId, options, function () {
      console.log(message);
    });
  }
});