// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


let error404Listener = null;
let preferredThumbnailFile = 'hq1';
let noRedirectToken = 'zctf420otaqimwn9lx8m';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
   
  })

  //TODO: add checking to replace in the case that the original string is in different format
  let redirectListener = function (details) {
    details.url = details.url.replace('hq720', preferredThumbnailFile);
    return {redirectUrl: details.url};
  };
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
  let opt_extraInfoSpec = ['blocking'];

  setupThumbnailRedirectors();

  function setupThumbnailRedirectors () {
    chrome.webRequest.onBeforeRequest.addListener(redirectListener, filter,opt_extraInfoSpec);
  }
  
  chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
    tabs.forEach(function (tab) {
      console.log('foreachtab', tab);
        chrome.tabs.executeScript(tab.id, {file: 'js/youtube.js'}, function () {
          console.log("This is being called");
          chrome.tabs.sendMessage(tab.id,"meessa");
        });
    })
});

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