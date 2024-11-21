import setFooterYear from "./footer.js";
import calculateBalance from "./utils/balance.js";
import checkCategory from "./utils/category.js";
import handleFormSubmit from "./panel/form_validation.js";
import {openTransactionPanel, closeTransactionPanel} from "./panel/creation_panel.js";
import {openConfirmationModal, closeConfirmationModal} from "./modal/modal.js";
import {switchToDarkMode, switchToLightMode} from "./utils/color_mode.js";

// Root element
export let rootElement; 
// Footer year
export let footerYear;
// Wallet icon
export let walletIcon;
// Boxes for transactions
export let incomesBox; 
export let expensesBox;
// Category icon
export let categoryIcon;  
// Buttons for transactions
let addTransactionBtn; 
let deleteTransactionBtn;
let deleteAllBtn;
// Light and dark mode buttons
let lightCircle;
let darkCircle;
// Transaction creation panel
export let transactionPanel;
export let nameInput;
export let amountInput;
export let categorySelect;
let saveBtn;
let cancelBtn;
let closePanelBtn;
// Transaction edition panel
export let editionPanel;
export let nameToEditInput;
export let amountToEditInput;
export let categoryToEditSelect;
let saveEditionBtn;
let cancelEditionBtn;
let closeEditionPanelBtn;
// Confirmation modal
export let confirmationModal;
let cancelDeletionButton;
// Edition modal
let editionModal;

// Transaction ID
export let transactionId = 0;
// Amounts array
export let moneyArray = [0];
// Balance info (how much money is available)
export let availableMoney;

const main = () => {
  getElements();
  addEventListeners();
  setFooterYear(); 
}

const getElements = () => {
  // Root element
  rootElement = document.documentElement;
  // Footer year
  footerYear = document.querySelector(".footer__year");
  // Wallet icon
  walletIcon = document.querySelector(".header__title-icon");
  // Balance info
  availableMoney = document.querySelector(".options__balance > span");
  // Boxes for transactions
  incomesBox = document.querySelector(".incomes-box");
  expensesBox = document.querySelector(".expenses-box");
  // Buttons for transactions
  addTransactionBtn = document.querySelector(".options__controls-btn--add");
  deleteTransactionBtn = document.querySelector(".incomes-box__item-amount-btn");
  deleteAllBtn = document.querySelector(".options__controls-btn--deleteAll");
  // Light and dark mode buttons
  lightCircle = document.querySelector(".options__style-button--light");
  darkCircle = document.querySelector(".options__style-button--dark");
  // Transaction creation panel
  transactionPanel = document.querySelector(".transaction-panel--create");
  nameInput = transactionPanel.querySelector("#name");
  amountInput = transactionPanel.querySelector("#amount");
  categorySelect = transactionPanel.querySelector("#category");
  closePanelBtn = transactionPanel.querySelector(".transaction-panel__xmark");
  // Transaction edition panel
  editionPanel = document.querySelector(".transaction-panel--edit");
  nameToEditInput = editionPanel.querySelector("#name-to-edit");
  amountToEditInput = editionPanel.querySelector("#amount-to-edit");
  categoryToEditSelect = editionPanel.querySelector("#category-to-edit");
  closeEditionPanelBtn = editionPanel.querySelector(".transaction-panel__xmark"); 
  // Confirmation modal
  confirmationModal = document.querySelector(".confirmation-modal");
  cancelDeletionButton = document.querySelector(".confirmation-modal__button--cancel");
  // Edition modal
  editionModal = document.querySelector(".edition-modal");
} 

const addEventListeners = () => {
  addTransactionBtn.addEventListener("click", openTransactionPanel);
  deleteAllBtn.addEventListener("click", openConfirmationModal);
  cancelDeletionButton.addEventListener("click", closeConfirmationModal);
  closePanelBtn.addEventListener("click", () => closeTransactionPanel(transactionPanel));
  closeEditionPanelBtn.addEventListener("click", () => closeTransactionPanel(editionPanel));
  lightCircle.addEventListener("click", switchToLightMode); 
  darkCircle.addEventListener("click", switchToDarkMode);
}

const editTransaction = (transactionId) => {
  const currentIncomes = incomesBox.children;
  const currentExpenses = expensesBox.children;

  const transactionToEdit = document.getElementById(transactionId);
  const amountOfTransactionToEdit = parseFloat(transactionToEdit.childNodes[9].childNodes[1].innerText.slice(1));
  const indexOfTransactionToEdit = moneyArray.indexOf(amountOfTransactionToEdit);

  const currentNameOfTransaction = transactionToEdit.querySelector(".transactions__item-name");
  const currentAmountOfTransaction = transactionToEdit.querySelector(".transactions__item-amount-text");

  const newNameOfTransaction = nameToEditInput.value;
  const newAmountOfTransaction = parseFloat(amountToEditInput.value);

  checkCategory(categoryToEditSelect);

  currentNameOfTransaction.innerHTML = `${categoryIcon} ${newNameOfTransaction.charAt(0).toUpperCase() + newNameOfTransaction.slice(1)}`;
  currentAmountOfTransaction.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${newAmountOfTransaction}`;

  if (newAmountOfTransaction > 0) {
    const isExpense = Array.from(currentExpenses).includes(transactionToEdit);

    if (isExpense) {
      transactionToEdit.classList.remove("transactions__item--expense");
      transactionToEdit.classList.add("transactions__item--income");
      expensesBox.removeChild(transactionToEdit);
      incomesBox.appendChild(transactionToEdit);
    }
  } else {
    const isIncome = Array.from(currentIncomes).includes(transactionToEdit);

    if (isIncome) {
      transactionToEdit.classList.remove("transactions__item--income");
      transactionToEdit.classList.add("transactions__item--expense");
      incomesBox.removeChild(transactionToEdit);
      expensesBox.appendChild(transactionToEdit);
    }
  }

  moneyArray[indexOfTransactionToEdit] = newAmountOfTransaction;
  calculateBalance(moneyArray);
}
  
// const closeTransactionPanel = (name, amount, category, categoryArrow, panel) => {
//   clearElements(name, amount, category, categoryArrow);
//   clearErrors(); 
//   panel.classList.remove("active");
// }

// const clearElements = (name, amount, category, categoryArrow) => {
  // name.value = "";
  // name.classList.remove("transaction-panel__input--error");
  // amount.value = "";
  // amount.classList.remove("transaction-panel__input--error");
  // category.selectedIndex = 0;
  // category.classList.remove("transaction-panel__input--error");
  // categoryArrow.classList.remove("transaction-panel__arrow--error");
// }

// const handleFormSubmit = (event, name, amount, category, panel, transactionId) => {
//   event.preventDefault(); 

//   validateInputs([name, amount]);
//   validateSelect(category);
//   checkLength(name);
//   checkForErrors(event, name, amount, category, panel, transactionId);
// }

// const validateInputs = (inputs) => {
//   inputs.forEach((input) => {
//     if (input.value === "") {
//       displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} cannot be empty!`);
//     } else if (input.value === "0") {
//       displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} cannot be equal to zero!`);
//     } else {
//       removeError(input);
//     }
//   });
// }

// const validateSelect = (categorySelect) => {
//   if (categorySelect.value === "none") {
//     displayError(categorySelect, `${categorySelect.id.charAt(0).toUpperCase() + categorySelect.id.slice(1)} must be selected!`);
//   } else {
//     removeError(categorySelect);
//   }
// }

// const checkLength = (nameInput) => {
//   if (nameInput.value.length < nameInput.minLength || nameInput.value.length > nameInput.maxLength) {
//     displayError(nameInput, `${nameInput.id.charAt(0).toUpperCase() + nameInput.id.slice(1)} must be between ${nameInput.minLength} and ${nameInput.maxLength} characters!`);
//   } else {
//     removeError(nameInput);
//   }
// }

// const checkForErrors = (event, name, amount, category, panel, transactionId) => {
//   const editTransactionBtn = editTransactionPanel.querySelector(".transaction-panel__button--edit");
//   const checkIcon = editTransactionPanel.querySelector("i.fa-solid.fa-check");

//   if (name.value !== "" && name.value.length >= name.minLength && name.value.length <= name.maxLength && name.value !== "0" && amount.value !== "" && amount.value !== "0" && category.value !== "none") {
//     if (event.target === editTransactionBtn || event.target === checkIcon) {
//       editTransaction(transactionId);
//       closeTransactionPanel(nameToEditInput, amountToEditInput, categoryToEditSelect, categoryToEditSelectArrow, panel);
//     } else {
//       createNewTransaction();
//       closeTransactionPanel(nameInput, amountInput, categorySelect, categorySelectArrow, panel);
//     }
//   }
// }

// const createNewTransaction = () => {
//   const newTransaction = document.createElement("div");
//   newTransaction.id = transactionId;
//   checkCategory(categorySelect);

//   transactionTemplate = transactionTemplate.content.cloneNode(true);
//   transactionTemplate.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
//   transactionTemplate.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountInput.value}`;
//   transactionTemplate.querySelector(".transactions__item-amount-button--edit").setAttribute("onclick", `openEditionPanel(${transactionId})`);
//   transactionTemplate.querySelector(".transactions__item-amount-button--delete").setAttribute("onclick", `deleteTransaction(${transactionId})`);
//   newTransaction.appendChild(transactionTemplate);

//   if (amountInput.value > 0) {
//     newTransaction.classList.add("transactions__item", "transactions__item--income");
//     incomesBox.appendChild(newTransaction);
//   } else {
//     newTransaction.classList.add("transactions__item", "transactions__item--expense");
//     expensesBox.appendChild(newTransaction);
//   }

//   transactionId++;
//   moneyArray.push(parseFloat(amountInput.value));
//   calculateBalance(moneyArray);
// } 

window.addEventListener("DOMContentLoaded", main);