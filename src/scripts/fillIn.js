(function() {
  console.log(chrome);
  fillInRecordedInputs();
})();

function fillInRecordedInputs() {
  let fillIns = _fetchFillIns((fillIns) => {
    fillIns.forEach((data) => _fillInInput(data));
  });
}

function _fetchFillIns(completion) {
  chrome.storage.sync.get('test', (items) => {
    completion(items['test']);
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