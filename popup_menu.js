'use strict';

let submit = document.getElementById('submit');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let confirmation = document.getElementById('confirmation');

submit.onclick = function (element) {
    chrome.storage.local.get('dict', function (data) {
        let length = Object.keys(data.dict).length;
        data.dict[length] = {};
        data.dict[length]["term"] = term.value;
        data.dict[length]["definition"] = definition.value;
        chrome.storage.local.set({ dict: data.dict }, function () {
            console.log('Saved dict.');
        });
        confirmation.innerHTML = data.dict[length]["term"] + " " + data.dict[length]["definition"];
    });
};
