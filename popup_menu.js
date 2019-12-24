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
        chrome.storage.local.set({ dict: data.dict });
        confirmation.innerHTML = data.dict[length]["term"] + " " + data.dict[length]["definition"];
        term.value = "";
        definition.value = "";
    });
};

let display = document.getElementById('display');
let result = document.getElementById('result');

display.onclick = function (element) {
    chrome.storage.local.get('dict', function (data) {
        let element = document.getElementById('element');
        if (element.value >= Object.keys(data.dict).length || !/^\d+$/.test(element.value)) {
            result.innerHTML = "No element";
        }
        else {
            result.innerHTML = data.dict[element.value]["term"] + " " + data.dict[element.value]["definition"];
        }
        element.value = "";
    });
};

let quiz = document.getElementById('quiz');

quiz.onclick = function (element) {
    chrome.tabs.update({ url: "quiz.html" });
}

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
        data.whitelist.push(whitelist_page.value);
        chrome.storage.local.set({ whitelist: [...data.whitelist] });
        whitelist_page.value = "";
    });
}