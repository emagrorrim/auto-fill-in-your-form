(function() {
  fillInRecordedInputs();
})();

function fillInRecordedInputs() {
  fetchFillIns((fillIns) => {
    fillIns.forEach((data) => fillInInput(data));
  });
}

function fetchFillIns(completion) {
  let key = window.location.host + window.location.pathname;
  chrome.storage.sync.get(key, (items) => {
    let fillIns = items[key] || [];
    completion(fillIns);
  });
}

function fillInInput(data) {
  let inputs = getAllTextInputs() || [];
  let input = inputs.filter((input) => input.id === data.id)[0] || inputs.filter((input) => input.className === data.class)[0];
  if (!input) {
    return;
  }
  input.value = data.value;
}

function getAllTextInputs() {
  let inputs = document.getElementsByTagName("input");
  let textInputs = [];
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.type === "text") {
      textInputs.push(input);
    }
  }
  return textInputs;
}