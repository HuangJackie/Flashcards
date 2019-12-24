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

let quiz = document.getElementById('quiz');

quiz.onclick = function (element) {
    chrome.tabs.update({ url: "quiz.html" });
}

let onOffSwitch = document.getElementById("on_off");
chrome.storage.local.get('ON_OFF', function (data) {
    onOffSwitch.checked = data.ON_OFF;
});

onOffSwitch.onclick = function (element) {
    if (onOffSwitch.checked) {
        chrome.storage.local.set({ ON_OFF: true });
    }
    else {
        chrome.storage.local.set({ ON_OFF: false });
    }
};

let options = document.getElementById("options");
options.onclick = function (element) {
    chrome.tabs.update({ url: "options.html" });
};
