import setFooterYear from "./footer.js";
import {loadFromStorage, renderTransactions, createNewTransaction} from "./data/transactions.js";
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
let saveTransactionBtn;
let cancelCreationBtn;
let closePanelXmark;
// Transaction edition panel
export let editionPanel;
export let nameToEditInput;
export let amountToEditInput;
export let categoryToEditSelect;
let cancelEditionBtn;
let closeEditionPanelXmark; 
// Confirmation modal
export let confirmationModal;
let cancelDeletionButton;
// All inputs inside the transaction creation panel
let transactionPanelInputs;
let editionPanelInputs;

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
  saveTransactionBtn = transactionPanel.querySelector(".transaction-panel__button--save");
  cancelCreationBtn = transactionPanel.querySelector(".transaction-panel__button--cancel");
  closePanelXmark = transactionPanel.querySelector(".transaction-panel__xmark");
  // Transaction edition panel
  editionPanel = document.querySelector(".transaction-panel--edit");
  nameToEditInput = editionPanel.querySelector("#name-to-edit");
  amountToEditInput = editionPanel.querySelector("#amount-to-edit");
  categoryToEditSelect = editionPanel.querySelector("#category-to-edit");
  cancelEditionBtn = editionPanel.querySelector(".transaction-panel__button--cancel");
  closeEditionPanelXmark = editionPanel.querySelector(".transaction-panel__xmark"); 
  // Confirmation modal
  confirmationModal = document.querySelector(".confirmation-modal");
  cancelDeletionButton = document.querySelector(".confirmation-modal__button--cancel");

  transactionPanelInputs = [nameInput, amountInput, categorySelect];
  editionPanelInputs = [nameToEditInput, amountToEditInput, categoryToEditSelect];
}

const addEventListeners = () => {
  addTransactionBtn.addEventListener("click", openTransactionPanel);
  deleteAllBtn.addEventListener("click", openConfirmationModal);
  cancelDeletionButton.addEventListener("click", closeConfirmationModal);
  saveTransactionBtn.addEventListener("click", (event) => createNewTransaction(event, transactionPanel, transactionPanelInputs));
  cancelCreationBtn.addEventListener("click", () => closePanel(transactionPanel, transactionPanelInputs));
  cancelEditionBtn.addEventListener("click", () => closePanel(editionPanel, editionPanelInputs));
  closePanelXmark.addEventListener("click", () => closePanel(transactionPanel, transactionPanelInputs));
  closeEditionPanelXmark.addEventListener("click", () => closePanel(editionPanel, editionPanelInputs));
  lightCircle.addEventListener("click", switchToLightMode); 
  darkCircle.addEventListener("click", switchToDarkMode);
}

document.addEventListener("DOMContentLoaded", main);