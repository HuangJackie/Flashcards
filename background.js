'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        dict: { 0: { term: "Term", definition: "Definition" } },
        current_question: 0,
        num_questions: 2,
        NUM: 2
    }, function () {
        console.log('Initialized dict.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                // pageUrl: { hostEquals: 'developer.chrome.com' }, Want it to work for all pages so remove.
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.history.onVisited.addListener(function (details) {
    if (details.url.indexOf('quiz.html') === -1) {
        chrome.storage.local.set({ prev_url: details.url });
    }
});
