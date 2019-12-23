'use strict';

let submit = document.getElementById('submit');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let result = document.getElementById('result');

let exit = document.getElementById('exit');

chrome.storage.local.get(['dict', 'current_question', 'num_questions', "NUM"], function (data) {
    if (data.num_questions === 0 || data.current_question >= Object.keys(data.dict).length) {
        term.innerHTML = "Finished";
        submit.disabled = true;
        definition.disabled = true;
        exit.disabled = false;
        chrome.storage.local.set({ num_questions: data.NUM, current_question: 0 });
    } else {
        term.innerHTML = data.dict[data.current_question]["term"];
    }
});

submit.onclick = function (element) {
    chrome.storage.local.get(['dict', 'current_question', 'REDIRECTS'], function (data) {
        if (definition.value === data.dict[data.current_question]["definition"]) {
            result.innerHTML = "Correct";
            submit.disabled = true;
            definition.disabled = true;
            next.disabled = false;
            chrome.storage.local.set({ num_questions: data.num_questions - 1, num_redirects: data.REDIRECTS });
        }
        else {
            result.innerHTML = "Incorrect";
        }
    });
};

next.onclick = function (element) {
    chrome.storage.local.get('current_question', function (data) {
        chrome.storage.local.set({ current_question: data.current_question + 1 }, function () {
            chrome.tabs.update({ url: "quiz.html" });
        });
    });
};


exit.onclick = function (element) {
    chrome.storage.local.get('prev_url', function (data) {
        chrome.tabs.update({ url: data.prev_url });
        chrome.history.deleteUrl({ url: "chrome-extension://" + chrome.runtime.id + "/quiz.html"});
    });
};
