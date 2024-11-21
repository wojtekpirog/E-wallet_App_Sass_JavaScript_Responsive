import {transactionPanel, nameInput, amountInput, categorySelect} from "../main.js";
import handleFormSubmit from "./form_validation.js";

export const openTransactionPanel = () => {
  transactionPanel.classList.add("transaction-panel--open");
  transactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", (event) => handleFormSubmit(event, {panel: transactionPanel, nameInput: nameInput, amountInput: amountInput, categorySelect: categorySelect}));
  transactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeTransactionPanel(transactionPanel));
}

export const closeTransactionPanel = (transactionPanel) => {
  transactionPanel.classList.remove("transaction-panel--open");
}