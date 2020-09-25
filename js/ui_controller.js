initUI();

function initUI () {
    let elementArr = ['replaceThumbnail', 'titleCaps'];
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


