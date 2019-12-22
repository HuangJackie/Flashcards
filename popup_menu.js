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
    });
};

let quiz = document.getElementById('quiz');

quiz.onclick = function (element) {
    chrome.tabs.update({url: "quiz.html"});
}