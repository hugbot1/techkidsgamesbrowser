function sendMessage(msg, to) {
    to.postMessage(msg, window.origin);
}

window.addEventListener("message", (event) => {
    if (event.origin != window.origin) {
        console.error("get rekt malware");
    }
    let msg = event.data;
    let sender = event.source;
    if (msg.type === "setSetting") {
        console.debug("recieved setSetting for setting " + msg.setting + " and value " + msg.value);
        // add checks? maybe?
        window.aboutbrowser.settings.setSetting(msg.setting, msg.value);
        sendMessage({type: "settingSet", setting: msg.setting, errcode: 0}, sender);
    } else if (msg.type === "getSetting") {
        console.debug("recieved getSetting for setting " + msg.setting);
        sendMessage({type: "settingValue", setting: msg.setting, value: window.aboutbrowser.settings.getSetting(msg.setting), errcode: 0}, sender);
    } else if (msg.type === "resetSettings") {
        console.debug("recieved resetSettings");
        window.aboutbrowser.settings.reset();
    } else if (msg.type === "openUrl") {
        console.debug("recieved openUrl for url " + msg.value);
        window.aboutbrowser.openTab(msg.value);
    } else if (msg.type === "setUrl") {
        console.debug("recieved setUrl for url " + msg.value);
        window.aboutbrowser.navigateTo(msg.value);
    } else if (msg.type === "reloadBookmarks") {
        console.debug("recieved reloadBookmarks");
        window.aboutbrowser.bookmarks.reload();
    } else if (msg.type === "reloadHistory") {
        console.debug("recieved reloadHistory");
        window.aboutbrowser.history.reload();
    }
})
