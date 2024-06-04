let footerYear;
let addTransactionBtn;
let deleteAllBtn;
let lightCircle;
let darkCircle;
let transactionPanel;
let nameInput;
let amountInput;
let categorySelect;
let saveBtn;
let cancelBtn;
let closePanelBtn;

const main = () => {
  getElements();
  addEventListeners();
  setFooterYear();
}

const getElements = function() {
  footerYear = document.querySelector(".footer__year");
  addTransactionBtn = document.querySelector(".options__controls-btn--add");
  deleteAllBtn = document.querySelector(".options__controls-btn--deleteAll");
  lightCircle = document.querySelector(".option__style-button--light");
  darkCircle = document.querySelector(".option__style-button--dark");
  transactionPanel = document.querySelector(".transaction-panel");
  nameInput = document.querySelector("#name");
  amountInput = document.querySelector("#amount");
  categorySelect = document.querySelector("#category");
  saveBtn = document.querySelector(".transaction-panel__button--save");
  cancelBtn = document.querySelector(".transaction-panel__button--cancel");
  closePanelBtn = document.querySelector(".transaction-panel__xmark");
}

const addEventListeners = () => {
  addTransactionBtn.addEventListener("click", openTransactionPanel);
  closePanelBtn.addEventListener("click", closeTransactionPanel);
  cancelBtn.addEventListener("click", closeTransactionPanel);
}

const openTransactionPanel = () => {
  transactionPanel.classList.add("active");
}

const closeTransactionPanel = () => {
  transactionPanel.classList.remove("active");
}

const setFooterYear = () => {
  const now = new Date();
  footerYear.textContent = now.getFullYear();
}

window.addEventListener("DOMContentLoaded", main);