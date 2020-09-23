// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
   
  })


  //TODO -> need work this out 
  
  // chrome.webRequest.onBeforeRequest.addListener(
  //   redirectListener = function (details) {
  //       if (!details.url.includes(`&noRedirectToken=${noRedirectToken}`)) {
  //           if (details.url.startsWith('https://i.ytimg.com/vi/')) {
  //               return {redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault|hq720).jpg/, `${preferredThumbnailFile}.jpg`)};
  //           } else if (details.url.startsWith('https://i.ytimg.com/vi_webp/')) {
  //               return {
  //                   redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault).webp.*/, `${preferredThumbnailFile}.jpg`)
  //                       .replace('/vi_webp/', '/vi/')
  //               };
  //           }
  //       }
  //   });
    
  


  chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
    tabs.forEach(function (tab) {
      console.log('foreach');
      console.log(tab);
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