(function () {
    fillInRecordedInputs();
})();

function fillInRecordedInputs() {
    fetchFillIns(fillIns =>
        fillIns
            .map(dataMigraterV1_1)
            .forEach(data => fillInInput(data))
    );
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
    console.log(data.id + data.name + data.class);
    inputs
        .filter(input => (input.id + input.name + input.className).trim() === (data.id + data.name + data.className).trim())
        .forEach(input => input.value = data.value)
}

function getAllTextInputs() {
    return []
        .slice
        .call(document.querySelectorAll("input[type=text]"))
}

function dataMigraterV1_1(oldData) {
    if (oldData.className) {
        return oldData;
    }
    return {
        id: oldData.id || "",
        name: oldData.name || "",
        className: oldData.class || "",
        value: oldData.value || ""
    }
}