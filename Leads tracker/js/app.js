//extensions/

chrome: "use strict";

let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const noticeEl = document.getElementById("notice-el");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;

  render(myLeads);
}

function isNullOrWhitespace(input) {
  return !input || !input.trim();
}

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">
          ${leads[i]}
        </a>
      </li>`;
  }

  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  if (isNullOrWhitespace(inputEl.value)) {
    noticeEl.innerText = "Empty string!";
    noticeEl.style.visibility = "visible";
  } else if (myLeads.includes(inputEl.value)) {
    noticeEl.innerText = "The link is alredy added!";
    noticeEl.style.visibility = "visible";
  } else {
    myLeads.push(inputEl.value);

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    inputEl.value = "";
    noticeEl.style.visibility = "hidden";

    render(myLeads);
  }
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (myLeads.includes(tabs[0].url)) {
      noticeEl.innerText = "The link is alredy added!";
      noticeEl.style.visibility = "visible";
    } else {
      myLeads.push(tabs[0].url);

      localStorage.setItem("myLeads", JSON.stringify(myLeads));

      noticeEl.style.visibility = "hidden";

      render(myLeads);
    }
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();

  myLeads = [];
  ulEl.innerHTML = "";
  noticeEl.style.visibility = "hidden";

  render(myLeads);
});
