initTabs();
initUI();

function initTabs () {
    document.getElementById('clickbaitContainer').style.display = "block";

    document.getElementById('clickbaitTab').addEventListener('click', (event) => {
        openTab('clickbaitContainer');
    })
    document.getElementById('statsTab').addEventListener('click', (event) => {
        openTab('statsContainer');
    })
}

function openTab (tabname) {
    
    
    var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabname).style.display = "block";
  //evt.currentTarget.className += " active";
}



function initUI () {
    let elementArr = ['replaceThumbnail', 'titleCaps', 'clickbaitRating'];
    for (let i = 0; i < elementArr.length; i++) {
        setCheckboxValues(elementArr[i]);
        onElementClicked(elementArr[i]);
    }
}

function setCheckboxValues (elementName) {
    chrome.storage.sync.get([elementName], function(result) {
        if (result) {
            document.getElementById(elementName).checked = result[elementName];
        } else {
            document.getElementById(elementName).checked = true;
            chrome.storage.sync.set({elementName: true}, function() {
            });
        }
    });
}

function onElementClicked (elementName) {
    document.getElementById(elementName).addEventListener('click', ()=> {
        let checkboxValue = document.getElementById(elementName).checked;
        chrome.storage.sync.set({[elementName]: checkboxValue}, function() {
            console.log('Value is set to ' + checkboxValue);
        });
    })
}





// document.getElementById("replaceThumbnail").addEventListener('click', () => {
//   function modifyDOM() {
//       //You can play with your DOM here or check URL against your regex
//       //console.log('Tab script:');
//       //console.log(document.body);
//       return document.body.innerHTML;
//   }
//   //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//   chrome.tabs.executeScript({
//       code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
//   }, (results) => {
//       //Here we have just the innerHTML and not DOM structure
//       //console.log('Popup script:')
//       //console.log(results[0]);
//   });
// });


