(function () {
    fillInRecordedInputs();
})();

function fillInRecordedInputs() {
    fetchFillIns(fillIns => fillIns.forEach(data => fillInInput(data)));
}

function fetchFillIns(completion) {
    let key = window.location.host + window.location.pathname;
    chrome.storage.sync.get(key, (items) => {
        let fillIns = items[key] || [];
        console.log(fillIns);
        completion(fillIns);
    });
}

function fillInInput(data) {
    let inputs = getAllTextInputs();
    inputs
        .filter(input => (input.id + input.name + input.className) === (data.id + data.name + data.className))
        .forEach(input => input.value = data.value)
}

function getAllTextInputs() {
    return []
        .slice
        .call(document.querySelectorAll("input[type=text]"))
}