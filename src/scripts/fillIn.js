(function () {
    fillInRecordedInputs();
})();

function fillInRecordedInputs() {
    fetchFillIns(fillIns => fillIns.forEach(data => fillInInput(dataMigirater(data))));
}

function fetchFillIns(completion) {
    let key = window.location.host + window.location.pathname;
    chrome.storage.sync.get(key, (items) => {
        let fillIns = items[key] || [];
        completion(fillIns);
    });
}

function fillInInput(data) {
    let inputs = getAllTextInputs();
    inputs
        .filter(input => (input.id + input.name + input.className) === (data.id + data.name + data.class))
        .forEach(input => input.value = data.value)
}

function getAllTextInputs() {
    return []
        .slice
        .call(document.querySelectorAll("input[type=text]"))
}

function dataMigirater(oldData) {
    return {
        id: oldData.id || "",
        name: oldData.name || "",
        class: oldData.class || "",
        value: oldData.value || ""
    }
}