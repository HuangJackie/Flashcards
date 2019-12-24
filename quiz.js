'use strict';

let submit = document.getElementById('submit');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let result_incorrect = document.getElementById('result_incorrect');
let result_correct = document.getElementById('result_correct');

let exit = document.getElementById('exit');

$('#result_alert_incorrect').hide();
$('#result_alert_correct').hide();
chrome.storage.local.get(['dict', 'current_question', 'num_questions', "NUM"], function (data) {
    if (data.num_questions === 0 || data.current_question >= Object.keys(data.dict).length) {
        term.innerHTML = "Finished";
        document.getElementById('instructions').innerHTML = "Congratulations!";
        submit.disabled = true;
        definition.disabled = true;
        exit.disabled = false;
        exit.style.visibility = "visible";
        chrome.storage.local.set({ num_questions: data.NUM, current_question: 0 });
    } else {
        term.innerHTML = data.dict[data.current_question]["term"];
    }
});

submit.onclick = function (element) {
    chrome.storage.local.get(['dict', 'current_question', 'REDIRECTS'], function (data) {
        if (definition.value === data.dict[data.current_question]["definition"]) {
            $('#result_alert_correct').show();
            $('#result_alert_incorrect').hide();
            result_correct.innerHTML = "Correct";
            submit.disabled = true;
            definition.disabled = true;
            next.disabled = false;
            next.style.visibility = "visible";
            chrome.storage.local.set({ num_questions: data.num_questions - 1, num_redirects: data.REDIRECTS });
        }
        else {
            $('#result_alert_incorrect').show();
            result_incorrect.innerHTML = "Incorrect";
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
    chrome.storage.local.get(['prev_url', 'REDIRECTS'], function (data) {
        chrome.tabs.update({ url: data.prev_url });
        chrome.history.deleteUrl({ url: "chrome-extension://" + chrome.runtime.id + "/quiz.html" });
        chrome.storage.local.set({ num_redirects: data.REDIRECTS });
    });
};

let result_button_incorrect = document.getElementById('result_button_incorrect');

result_button_incorrect.onclick = function (element) {
    $('#result_alert_incorrect').hide();
}

let result_button_correct = document.getElementById('result_button_correct');

result_button_correct.onclick = function (element) {
    $('#result_alert_correct').hide();
}