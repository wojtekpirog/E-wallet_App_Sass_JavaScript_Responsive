import {transactionPanel, nameInput, amountInput, categorySelect} from "../main.js";
import handleFormSubmit from "./form_validation.js";

export const openTransactionPanel = () => {
  // Show the transaction panel
  transactionPanel.classList.add("transaction-panel--open");
  // Put focus on the name input
  transactionPanel.querySelector(".transaction-panel__input--name").focus();
  // Add event listeners on the `Save` and `Cancel` buttons
  transactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", (event) => handleFormSubmit(event, {panel: transactionPanel, nameInput: nameInput, amountInput: amountInput, categorySelect: categorySelect}));
  transactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeTransactionPanel(transactionPanel));
}

export const closeTransactionPanel = (transactionPanel) => {
  transactionPanel.classList.remove("transaction-panel--open");
}