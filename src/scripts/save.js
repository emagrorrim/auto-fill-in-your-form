(function () {
    saveFillInsIfNeeded();
})();

function saveFillInsIfNeeded() {
    const inputs = getAllValidateTextInputs();
    const data = formattedInformation(inputs);
    if (data && data.length) {
        const key = window.location.host + window.location.pathname;
        let obj = {};
        obj[key] = data;
        chrome.storage.sync.set(obj, () => alert("Form Saved!"));
    } else {
        alert("There is no available text field has value in it, search box and password won't be remember, Sorry for that!");
    }
}

function formattedInformation(inputs) {
    return inputs.map(input => {
        return {
            id: input.id,
            name: input.name,
            className: input.className,
            value: input.value
        }
    });
}

function getAllValidateTextInputs() {
    return []
        .slice
        .call(document.querySelectorAll("input[type=text]"))
        .filter(input => input.value);
}
