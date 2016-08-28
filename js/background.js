chrome.browserAction.onClicked.addListener(function (tab) {
    if (background.isUrl(tab.url)) {
        chrome.tabs.executeScript(null, {code: "window.getSelection().toString();"}, function (selection) {
            if (selection && selection[0]) {
                background.openTextUrl(selection[0]);
            } else {
                background.openLinkUrl(tab.url);
            }
        });
    }
});

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('title') + " “%s”",
    contexts: ["selection"],
    onclick: function (info) {
        if (info.selectionText) {
            background.openTextUrl(info.selectionText);
        }
    }
});

background = {
    isUrl: function (url) {
        if (!url) {
            return false;
        }
        return (new RegExp('^http[s]?://.*')).test(url);
    },
    openTextUrl: function (text) {
        chrome.storage.sync.get('_gtlc', function (items) {
            var lc = items._gtlc ? items._gtlc : chrome.i18n.getUILanguage();
            var gtUrl = 'https://translate.google.com/?source=yii#auto/' + lc + '/' + encodeURIComponent(text);
            chrome.tabs.create({url: gtUrl});
        });
    },
    openLinkUrl: function (url) {
        chrome.storage.sync.get('_gtlc', function (items) {
            var lc = items._gtlc ? items._gtlc : chrome.i18n.getUILanguage();
            var gtUrl = 'http://translate.google.com/translate?source=yii&js=n&sl=auto&tl=' + lc + '&u=' + encodeURIComponent(url);
            chrome.tabs.create({url: gtUrl});
        });
    }
};