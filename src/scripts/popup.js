document.addEventListener('DOMContentLoaded', function () {
  let fillInBtn = document.getElementById('fill-in-btn');
  fillInBtn.addEventListener('click', fillIn);

  let saveBtn = document.getElementById('save-btn');
  saveBtn.addEventListener('click', save);
});

function fillIn(e) {
  e.preventDefault();
  chrome.tabs.executeScript(null, { file: './src/scripts/fillIn.js' });
  window.close();
}

function save(e) {
  e.preventDefault();
  chrome.tabs.executeScript(null, { file: './src/scripts/save.js' });
  window.close();
}
