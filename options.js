'use strict';

let whitelistTable = document.getElementById('whitelist');

chrome.storage.local.get('whitelist', function (data) {
    data.whitelist.shift().forEach(element => {
        let row = whitelistTable.insertRow();
        row.insertCell(0).innerHTML = element;
        let button = document.createElement('button');
        button.addEventListener('click', function () {
            data.whitelist.splice(data.whitelist.indexOf(element), 1)
            chrome.storage.local.set({ whitelist: data.whitelist })
            row.parentNode.removeChild(row);
        });
        row.appendChild(button);
    });
});

let flashcardTable = document.getElementById('flashcards');

chrome.storage.local.get('dict', function (data) {
    Object.keys(data.dict).forEach(item => {
        let row = flashcardTable.insertRow();
        row.insertCell(0).innerHTML = data.dict[item]["term"];
        row.insertCell(1).innerHTML = data.dict[item]["definition"];
        let button = document.createElement('button');
        button.addEventListener('click', function () {
            delete data.dict[item];
            chrome.storage.local.set({ dict: data.dict })
            row.parentNode.removeChild(row);
        });
        row.appendChild(button);
    });
});