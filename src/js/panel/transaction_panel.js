import {transactionPanel, editionPanel, nameToEditInput, amountToEditInput, categoryToEditSelect} from "../main.js";
import {editTransaction} from "../data/transactions.js";
import {getCategoryByIcon} from "../utils/category.js";

// Store a reference to the last transaction edition function added as an event listener, in a variable
let currentEditTransaction;

export const openTransactionPanel = () => {
  // Open the transaction panel
  transactionPanel.classList.add("transaction-panel--open");
  // Put focus on the name input
  transactionPanel.querySelector(".transaction-panel__input--name").focus();
}

export const openEditionPanel = (transactionId) => {
  console.log(`Otwieram panel edycji transakcji z ID: ${transactionId}`);
  // Open the edition panel
  editionPanel.classList.add("transaction-panel--open");
  // Put focus on the name input
  editionPanel.querySelector(".transaction-panel__input--name").focus();
  // Get the inputs
  const editionPanelInputs = [nameToEditInput, amountToEditInput, categoryToEditSelect];
  // Get the transaction and its details
  const transaction = document.querySelector(`[data-id="${transactionId}"]`);
  const transactionName = transaction.querySelector(".transactions__item-name").textContent.trim();
  const transactionAmount = transaction.querySelector(".transactions__item-amount-text").textContent.trim();
  const transactionIcon = transaction.querySelector(".transactions__item-name > i").classList[1];
  // Get the transaction category's name by category icon
  const transactionCategory = getCategoryByIcon(transactionIcon);
  // Fill the inputs with values from `transactionName`, `transactionAmount` and `transactionCategory`
  editionPanel.querySelector(".transaction-panel__input--name").value = transactionName;
  editionPanel.querySelector(".transaction-panel__input--amount").value = transactionAmount;
  editionPanel.querySelector(".transaction-panel__select").value = transactionCategory;
  // Remove the old event listener if it exists (the function plugged into the new listener must have the same reference as the function plugged into the old listener)
  if (currentEditTransaction) {
    editionPanel.querySelector(".transaction-panel__button--edit").removeEventListener("click", currentEditTransaction);
  }
  // Create a new event listener and save a reference to it in `currentEditTransaction`
  currentEditTransaction = (event) => editTransaction(event, transactionId, editionPanel, editionPanelInputs);
  // Add a new event listener
  editionPanel.querySelector(".transaction-panel__button--edit").addEventListener("click", currentEditTransaction);
}

export const clearInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("transaction-panel__input--error");
  });

  inputs[2].selectedIndex = 0;
}

export const clearErrors = (inputs) => {
  // document.querySelectorAll(".transaction-panel__error").forEach(error => error.style.display = "none");
  inputs.forEach((input) => {
    input.classList.remove("transaction-panel__input--error");
    input.closest(".transaction-panel__control-box").querySelector(".transaction-panel__error").classList.remove("transaction-panel__error--active");
  });
}

export const closePanel = (panel, inputs) => {
  clearInputs(inputs);
  clearErrors(inputs);
  panel.classList.remove("transaction-panel--open");
}