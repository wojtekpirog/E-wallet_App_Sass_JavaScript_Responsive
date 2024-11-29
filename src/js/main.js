import setFooterYear from "./footer.js";
import {loadFromStorage, renderTransactions} from "./data/transactions.js";
import {openTransactionPanel, closePanel} from "./panel/transaction_panel.js";
import {openConfirmationModal, closeConfirmationModal} from "./modal/modal.js";
import {switchToDarkMode, switchToLightMode} from "./utils/color_mode.js";
 
// Root element
export let rootElement; 
// Footer year
export let footerYear;
// Wallet icon
export let walletIcon;
// Balance info (how much money is available)
export let availableMoney;
// Lists of transactions
export let incomesList;
export let expensesList;
// Buttons for transactions
let addTransactionBtn; 
let deleteAllBtn;
// Light and dark mode buttons
let lightCircle;
let darkCircle;
// Transaction creation panel
export let transactionPanel;
export let nameInput;
export let amountInput;
export let categorySelect;
let closePanelXmark;
// Transaction edition panel
export let editionPanel;
export let nameToEditInput;
export let amountToEditInput;
export let categoryToEditSelect;
let closeEditionPanelXmark; 
// Confirmation modal
export let confirmationModal;
let cancelDeletionButton;

const main = () => {
  getElements();
  addEventListeners();
  setFooterYear();
  loadFromStorage();
  renderTransactions();
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
  // Lists of transactions
  incomesList = document.querySelector(".incomes-box__list");
  expensesList = document.querySelector(".expenses-box__list");
  // Buttons for transactions
  addTransactionBtn = document.querySelector(".options__controls-btn--add");
  deleteAllBtn = document.querySelector(".options__controls-btn--deleteAll");
  // Light and dark mode buttons
  lightCircle = document.querySelector(".options__style-button--light");
  darkCircle = document.querySelector(".options__style-button--dark");
  // Transaction creation panel
  transactionPanel = document.querySelector(".transaction-panel--create");
  nameInput = transactionPanel.querySelector("#name");
  amountInput = transactionPanel.querySelector("#amount");
  categorySelect = transactionPanel.querySelector("#category");
  closePanelXmark = transactionPanel.querySelector(".transaction-panel__xmark");
  // Transaction edition panel
  editionPanel = document.querySelector(".transaction-panel--edit");
  nameToEditInput = editionPanel.querySelector("#name-to-edit");
  amountToEditInput = editionPanel.querySelector("#amount-to-edit");
  categoryToEditSelect = editionPanel.querySelector("#category-to-edit");
  closeEditionPanelXmark = editionPanel.querySelector(".transaction-panel__xmark"); 
  // Confirmation modal
  confirmationModal = document.querySelector(".confirmation-modal");
  cancelDeletionButton = document.querySelector(".confirmation-modal__button--cancel");
}

const addEventListeners = () => {
  addTransactionBtn.addEventListener("click", openTransactionPanel);
  deleteAllBtn.addEventListener("click", openConfirmationModal);
  cancelDeletionButton.addEventListener("click", closeConfirmationModal);
  closePanelXmark.addEventListener("click", () => closePanel(transactionPanel, [nameInput, amountInput, categorySelect]));
  closeEditionPanelXmark.addEventListener("click", () => closePanel(editionPanel, [nameToEditInput, amountToEditInput, categoryToEditSelect]));
  lightCircle.addEventListener("click", switchToLightMode); 
  darkCircle.addEventListener("click", switchToDarkMode);
}

document.addEventListener("DOMContentLoaded", main);

// const editTransaction = (transactionId) => {
//   const currentIncomes = incomesBox.children;
//   const currentExpenses = expensesBox.children;

//   const transactionToEdit = document.getElementById(transactionId);
//   const amountOfTransactionToEdit = parseFloat(transactionToEdit.childNodes[9].childNodes[1].innerText.slice(1));
//   const indexOfTransactionToEdit = moneyArray.indexOf(amountOfTransactionToEdit);

//   const currentNameOfTransaction = transactionToEdit.querySelector(".transactions__item-name");
//   const currentAmountOfTransaction = transactionToEdit.querySelector(".transactions__item-amount-text");

//   const newNameOfTransaction = nameToEditInput.value;
//   const newAmountOfTransaction = parseFloat(amountToEditInput.value);

//   checkCategory(categoryToEditSelect);

//   currentNameOfTransaction.innerHTML = `${categoryIcon} ${newNameOfTransaction.charAt(0).toUpperCase() + newNameOfTransaction.slice(1)}`;
//   currentAmountOfTransaction.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${newAmountOfTransaction}`;

//   if (newAmountOfTransaction > 0) {
//     const isExpense = Array.from(currentExpenses).includes(transactionToEdit);

//     if (isExpense) {
//       transactionToEdit.classList.remove("transactions__item--expense");
//       transactionToEdit.classList.add("transactions__item--income");
//       expensesBox.removeChild(transactionToEdit);
//       incomesBox.appendChild(transactionToEdit);
//     }
//   } else {
//     const isIncome = Array.from(currentIncomes).includes(transactionToEdit);

//     if (isIncome) {
//       transactionToEdit.classList.remove("transactions__item--income");
//       transactionToEdit.classList.add("transactions__item--expense");
//       incomesBox.removeChild(transactionToEdit);
//       expensesBox.appendChild(transactionToEdit);
//     }
//   }

//   moneyArray[indexOfTransactionToEdit] = newAmountOfTransaction;
//   calculateBalance(moneyArray);
// } 