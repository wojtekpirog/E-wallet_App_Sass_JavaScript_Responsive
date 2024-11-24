import {transactionPanel, editionPanel, nameInput, nameToEditInput, amountInput, amountToEditInput, categorySelect, categoryToEditSelect} from "../main.js";
import {editTransaction} from "../data/transactions.js";
import handleFormSubmit from "./form_validation.js";

export const openTransactionPanel = () => {
  // Show the transaction panel
  transactionPanel.classList.add("transaction-panel--open");
  // Put focus on the name input
  transactionPanel.querySelector(".transaction-panel__input--name").focus();
  // Add event listeners on the `Save` and `Cancel` buttons
  transactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", (event) => handleFormSubmit(event, {panel: transactionPanel, nameInput: nameInput, amountInput: amountInput, categorySelect: categorySelect}));
  transactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closePanel(transactionPanel, [nameInput, amountInput, categorySelect]));
}

export const openEditionPanel = (event) => {
  console.log(event.target.closest(".transactions__item"));
  // Get the transaction and its details
  const transaction = event.target.closest(".transactions__item");
  const transactionName = transaction.querySelector(".transactions__item-name").textContent.trim();
  const transactionAmount = transaction.querySelector(".transactions__item-amount-text").textContent.trim();

  // Show the edition panel
  editionPanel.classList.add("transaction-panel--open");
  // Put focus on the name input
  editionPanel.querySelector(".transaction-panel__input--name").focus();
  // Fill the inputs with values from `transactionName` and `transactionAmount`
  editionPanel.querySelector(".transaction-panel__input--name").value = transactionName;
  editionPanel.querySelector(".transaction-panel__input--amount").value = transactionAmount;
  // Add event listeners on the `Apply` and `Cancel` buttons
  editionPanel.querySelector(".transaction-panel__button--edit").addEventListener("click", (event) => handleFormSubmit(event, {panel: editionPanel, nameInput: nameToEditInput, amountInput: amountToEditInput, categorySelect: categoryToEditSelect}, transaction, transactionAmount));
  editionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closePanel(editionPanel, [nameToEditInput, amountToEditInput, categoryToEditSelect]));
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