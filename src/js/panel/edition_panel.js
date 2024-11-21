import {editionPanel, nameToEditInput, amountToEditInput, categoryToEditSelect} from "../main.js";
import {editTransaction} from "../data/transactions.js";

export const openEditionPanel = (event) => {
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
  editionPanel.querySelector(".transaction-panel__button--edit").addEventListener("click", (event) => editTransaction(event, transaction, {panel: editionPanel, nameInput: nameToEditInput, amountInput: amountToEditInput, categorySelect: categoryToEditSelect}));
  editionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeEditionPanel(editionPanel));
}

const closeEditionPanel = (editionPanel) => {
  editionPanel.classList.remove("transaction-panel--open");
}