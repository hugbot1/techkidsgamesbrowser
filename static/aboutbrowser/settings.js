var startUrlInput, startUrlStatus;
var searchEngineUrlInput, searchEngineUrlStatus;
var pr0xyInput, pr0xyStatus;

function init() {
    var startUrlSetting = document.querySelector("settings setting#startUrl");
    startUrlInput = startUrlSetting.querySelector("input");
    startUrlStatus = startUrlSetting.querySelector("settingStatus");
    startUrlInput.addEventListener("input", () => {
        console.debug("startUrl value = " + startUrlInput.value)
        if (startUrlInput.value == "") {
            return;
        }
        sendMessage({
            type: "setSetting",
            setting: "startUrl",
            value: startUrlInput.value
        });
    })

    var searchEngineUrlSetting = document.querySelector("settings setting#searchEngineUrl");
    searchEngineUrlInput = searchEngineUrlSetting.querySelector("input");
    searchEngineUrlStatus = searchEngineUrlSetting.querySelector("settingStatus");
    searchEngineUrlInput.addEventListener("input", () => {
        console.debug("searchEngineUrl value = " + searchEngineUrlInput.value)
        if (searchEngineUrlInput.value == "") {
            return;
        }
        sendMessage({
            type: "setSetting",
            setting: "searchEngineUrl",
            value: searchEngineUrlInput.value
        });
    })

    var pr0xySetting = document.querySelector("settings setting#pr0xy");
    pr0xyInput = pr0xySetting.querySelector("#pr0xyselector");
    pr0xyStatus = pr0xySetting.querySelector("settingStatus");
    pr0xyInput.addEventListener("change", () => {
        console.debug("pr0xy value = " + pr0xyInput.value);
        sendMessage({
            type: "setSetting",
            setting: "currentPr0xyId",
            value: pr0xyInput.value
        });
    })

    getAllSettings();
}

function getAllSettings() {
    sendMessage({
        type: "getSetting",
        setting: "startUrl"
    });
    sendMessage({
        type: "getSetting",
        setting: "searchEngineUrl"
    });
    sendMessage({
        type: "getSetting",
        setting: "currentPr0xyId"
    });
}

function resetAllSettings() {
    console.debug("resetting all settings...");
    sendMessage({
        type: "resetSettings"
    });
    setTimeout(() => {
        getAllSettings();
    }, 100);
}

function settingSetCallback(msg) {
    if (msg.setting == "startUrl") {
        startUrlStatus.innerText = "Saved!";
        setTimeout(() => {
            startUrlStatus.innerText = "";
        }, 1000)
    } else if (msg.setting == "searchEngineUrl") {
        searchEngineUrlStatus.innerText = "Saved!";
        setTimeout(() => {
            searchEngineUrlStatus.innerText = "";
        }, 1000)
    } else if (msg.setting == "currentPr0xyId") {
        pr0xyStatus.innerText = "Saved!";
        setTimeout(() => {
            pr0xyStatus.innerText = "";
        }, 1000)
    }
}

function settingValueCallback(msg) {
    if (msg.setting == "startUrl") {
        startUrlInput.value = msg.value;
    } else if (msg.setting == "searchEngineUrl") {
        searchEngineUrlInput.value = msg.value;
    } else if (msg.setting == "currentPr0xyId") {
        pr0xyInput.value = msg.value;
    }
}
