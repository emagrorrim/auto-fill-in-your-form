(function() {
  fillInRecordedInputs();
})();

function fillInRecordedInputs() {
  _fetchFillIns((fillIns) => {
    fillIns.forEach((data) => _fillInInput(data));
  });
}

function _fetchFillIns(completion) {
  let key = window.location.host + window.location.pathname;
  chrome.storage.sync.get(key, (items) => {
    let fillIns = items[key] || [];
    completion(fillIns);
  });
}

function _fillInInput(data) {
  let inputs = _getAllTextInputs() || [];
  let input = inputs.filter((input) => input.id === data.id)[0] || inputs.filter((input) => input.className === data.class)[0];
  if (input == null || input == undefined) {
    return;
  }
  input.value = data.value;
}

function _getAllTextInputs() {
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