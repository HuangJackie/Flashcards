'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        dict: { 0: { term: "Term", definition: "Definition" } },
        current_question: 0,
        num_questions: 2,
        NUM: 2,
        num_redirects: 3,
        REDIRECTS: 3,
        whitelist: ["quiz.html"]
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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log(details.url + " frameId: " + details.frameId + " transitionType: " + details.transitionType + " tabId: " + details.tabId + " transitionQualifiers: " + details.transitionQualifiers);
    if (tab.active && changeInfo.status === "complete") {
        // console.log(tabId);
        // console.log(changeInfo);
        // console.log(tab);
        chrome.storage.local.get(['num_redirects', 'prev_url', 'whitelist'], function (data) {
            // console.log((data.whitelist).filter(url => (tab.url.indexOf(url) === -1)));
            // console.log(tab.url);
            // console.log(data.whitelist);
            if (data.whitelist.length === data.whitelist.filter(url => (tab.url.indexOf(url) === -1)).length) {

                if (data.num_redirects === 0) {
                    chrome.storage.local.set({ prev_url: tab.url }, function () {
                        chrome.tabs.update({ url: "quiz.html" });
                    });
                } else {
                    if (data.prev_url !== tab.url) {
                        chrome.storage.local.set({ num_redirects: data.num_redirects - 1, prev_url: tab.url });
                    }
                }

            }
        });
    }
});