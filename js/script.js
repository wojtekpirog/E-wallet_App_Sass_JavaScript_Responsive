let footerYear;
let availableMoney;
let incomesBox;
let expensesBox;
let addTransactionBtn;
let deleteTransactionBtn;
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

let rootElement = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArray = [0];

const main = () => {
  getElements();
  addEventListeners();
  setFooterYear();
}

const getElements = function() {
  footerYear = document.querySelector(".footer__year");
  availableMoney = document.querySelector(".options__balance");
  incomesBox = document.querySelector(".incomes-box");
  expensesBox = document.querySelector(".expenses-box");
  addTransactionBtn = document.querySelector(".options__controls-btn--add");
  deleteTransactionBtn = document.querySelector(".incomes-box__item-amount-btn");
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
  saveBtn.addEventListener("click", handleFormSubmit);
  cancelBtn.addEventListener("click", closeTransactionPanel);
}

const openTransactionPanel = () => {
  transactionPanel.classList.add("active");
}

const closeTransactionPanel = () => {
  transactionPanel.classList.remove("active");
  clearElements();
  clearErrors();
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  validateInputs([nameInput, amountInput]);
  validateSelect(categorySelect);
  checkLength(nameInput);
  checkForErrors();
}

const validateInputs = (inputs) => {
  inputs.forEach((input) => {
    if (input.value === "") {
      displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} cannot be empty!`);
    } else {
      removeError(input);
    }
  });
}

const validateSelect = (categorySelect) => {
  if (categorySelect.value === "none") {
    displayError(categorySelect, `${categorySelect.id.charAt(0).toUpperCase() + categorySelect.id.slice(1)} must be selected!`);
  } else {
    removeError(categorySelect);
  }
}

const checkLength = (nameInput) => {
  if (nameInput.value.length < nameInput.minLength || nameInput.value.length > nameInput.maxLength) {
    displayError(nameInput, `${nameInput.id.charAt(0).toUpperCase() + nameInput.id.slice(1)} must be between ${nameInput.minLength} and ${nameInput.maxLength} characters!`);
  } else {
    removeError(nameInput);
  }
}

const checkForErrors = () => {
  const allErrors = document.querySelectorAll(".transaction-panel__error");
  let errorCount = 0;

  allErrors.forEach((error) => {
    error.style.display === "block" && errorCount++;
  });

  if (errorCount === 0) {
    createNewTransaction();
    closeTransactionPanel();
  } else {
    alert("Please fill out all fields correctly!");
  }
}

const displayError = (formControl, errorMessage) => {
  const error = formControl.parentElement.querySelector(".transaction-panel__error");
  error.textContent = errorMessage;
  error.style.display = "block";
}

const removeError = (formControl) => {
  const error = formControl.parentElement.querySelector(".transaction-panel__error");
  error.style.display = "none";
}

const clearElements = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
}

const clearErrors = () => {
  document.querySelectorAll(".transaction-panel__error").forEach(error => error.style.display = "none");
}

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.className = "transactions__item";
  newTransaction.setAttribute("id", ID);

  newTransaction.innerHTML = `
    <p class="transactions__item-name">${categoryIcon} ${nameInput.value}</p>
    <div class="transactions__item-amount">
      <div class="transactions__item-amount-text">$${amountInput.value}</div>
      <button type="button" class="transactions__item-amount-btn" onclick="deleteTransaction(${ID})"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  ID += 1;
}

// const createNewTransaction = () => {
//   const newTransaction = document.createElement("div");
//   newTransaction.className = "transactions__item";
//   newTransaction.setAttribute("id", ID);

//   const transactionItemTemplate = document.querySelector(".transactions__template").content.cloneNode(true);
//   console.log(transactionItemTemplate);

//   ID += 1;
// }

const setFooterYear = () => {
  const now = new Date();
  footerYear.textContent = now.getFullYear();
}

window.addEventListener("DOMContentLoaded", main);