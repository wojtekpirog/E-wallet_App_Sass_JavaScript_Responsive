import {transactionPanel, nameInput, amountInput, categorySelect} from "../main.js";
import handleFormSubmit from "./form_validation.js";

export const openTransactionPanel = () => {
  transactionPanel.classList.add("transaction-panel--open");
  transactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", (event) => handleFormSubmit(event, {panel: transactionPanel, nameInput, amountInput, categorySelect}));
  transactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeTransactionPanel(transactionPanel, [nameInput, amountInput, categorySelect]));
}

export const closeTransactionPanel = (transactionPanel) => {
  transactionPanel.classList.remove("transaction-panel--open");
}