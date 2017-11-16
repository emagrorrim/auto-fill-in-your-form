(function() {
  saveFillInsIfNeeded();
})();

function saveFillInsIfNeeded() {
  let inputs = _getAllTextInputs();
  let data = _formattedInformation(inputs);
  if (data != null && data != undefined || data.length != 0) {
    chrome.storage.sync.set({'test': data}, () => {
      alert('Form Saved!')
    });
  }
}

function _formattedInformation(inputs) {
  let information = [];
  inputs.forEach((input) => {
    let info = {
      id: input.id,
      class: input.className,
      value: input.value
    };
    information.push(info);
  });
  return information;
}

function _getAllTextInputs() {
  let inputs = document.getElementsByTagName("input");
  let textInputs = [];
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.type === "text" && _hasValue(input)) {
      textInputs.push(input);
    }
  }
  return textInputs;
}

function _hasValue(input) {
  return input.value !== undefined && input.value !== null && input.value !== "";
}