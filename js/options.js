document.addEventListener('DOMContentLoaded', function () {
    var lc = document.getElementById('lc');
    chrome.storage.sync.get('_gtlc', function (items) {
        if(items._gtlc){
            lc.value = items._gtlc;
        }else{
            lc.value = chrome.i18n.getUILanguage();
        }
    });
    document.getElementById('lc').addEventListener('change', function () {
        chrome.storage.sync.set({'_gtlc': this.value}, function () {});
    });
});
