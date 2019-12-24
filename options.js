'use strict';

let whitelistTable = document.getElementById('whitelist');

chrome.storage.local.get('whitelist', function (data) {
    data.whitelist.shift();
    data.whitelist.shift();
    data.whitelist.forEach(element => {
        let row = whitelistTable.insertRow();
        row.insertCell(0).innerHTML = element;
        let button = document.createElement('button');
        button.innerHTML = "X";
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
        button.innerHTML = "X";
        button.addEventListener('click', function () {
            delete data.dict[item];
            chrome.storage.local.set({ dict: data.dict })
            row.parentNode.removeChild(row);
        });
        row.appendChild(button);
    });
});

let submit_redirects = document.getElementById('submit_redirects');
let num_redirects = document.getElementById('num_redirects');

submit_redirects.onclick = function (element) {
    if (/^\d+$/.test(num_redirects.value) && num_redirects.value != 0) {
        chrome.storage.local.set({ REDIRECTS: num_redirects.value, num_redirects: num_redirects.value });
    } else {
        confirmation.innerHTML = "Invalid value";
    }
    num_redirects.value = "";
}

let submit_whitelist = document.getElementById('submit_whitelist');
let whitelist_page = document.getElementById('whitelist_page');

submit_whitelist.onclick = function (element) {
    chrome.storage.local.get('whitelist', function (data) {
        if (!data.whitelist.includes(whitelist_page.value)) {
            data.whitelist.push(whitelist_page.value);
            chrome.storage.local.set({ whitelist: [...data.whitelist] });
        }
        whitelist_page.value = "";
    });
    chrome.tabs.update({ url: "options.html" });
}