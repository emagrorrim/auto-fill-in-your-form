document.addEventListener('DOMContentLoaded', function () {
  let fillInBtn = document.getElementById('fill-in-btn');
  fillInBtn.addEventListener('click', fillIn);
});

function fillIn(e) {
  chrome.tabs.executeScript(null, {file: "./src/scripts/fillIn.js"});
  window.close();
}