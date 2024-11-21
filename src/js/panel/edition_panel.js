import {editionPanel, nameToEditInput, amountToEditInput, categoryToEditSelect} from "../main.js";
import {editTransaction} from "../data/transactions.js";
//import handleFormSubmit from "./form_validation";

export const openEditionPanel = (event) => {
  const transaction = event.target.closest(".transactions__item");
  const transactionName = transaction.querySelector(".transactions__item-name").textContent.trim();
  const transactionAmount = transaction.querySelector(".transactions__item-amount-text").textContent.trim();

  editionPanel.classList.add("transaction-panel--open");
  editionPanel.querySelector(".transaction-panel__input--name").value = transactionName;
  editionPanel.querySelector(".transaction-panel__input--amount").value = transactionAmount;
  editionPanel.querySelector(".transaction-panel__button--edit").addEventListener("click", (event) => editTransaction(event, transaction, {panel: editionPanel, nameInput: nameToEditInput, amountInput: amountToEditInput, categorySelect: categoryToEditSelect}));
  editionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeEditionPanel(editionPanel));
}

const closeEditionPanel = (editionPanel) => {
  editionPanel.classList.remove("transaction-panel--open");
}