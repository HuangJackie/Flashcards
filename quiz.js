'use strict';

let submit = document.getElementById('submit');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let result = document.getElementById('result');

chrome.storage.local.get(['dict', 'current_question', 'num_questions'], function (data) {
    term.innerHTML = data.dict[data.current_question]["term"];
});

submit.onclick = function (element) {
    chrome.storage.local.get(['dict', 'current_question'], function (data) {
        if (definition.value === data.dict[data.current_question]["definition"]) {
            result.innerHTML = "Correct";
            submit.disabled = true;
        }
        else {
            result.innerHTML = "Incorrect";
        }
    });
};