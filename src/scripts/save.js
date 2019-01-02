(function() {
  saveFillInsIfNeeded();
})();

function saveFillInsIfNeeded() {
  let inputs = getAllTextInputs();
  let data = formattedInformation(inputs);
  if (data !== null && data !== undefined && data.length !== 0) {
    let key = window.location.host + window.location.pathname;
    let obj = {};
    obj[key] = data;
    chrome.storage.sync.set(obj, () => {
      alert("Form Saved!")
    });
  } else {
    alert("There is no available text field has value in it, search box and password won't be remember, Sorry for that!");
  }
}

function formattedInformation(inputs) {
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

function getAllTextInputs() {
  let inputs = document.getElementsByTagName('input');
  let textInputs = [];
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.type === 'text' && !!input) {
      textInputs.push(input);
    }
  }
  return textInputs;
}
