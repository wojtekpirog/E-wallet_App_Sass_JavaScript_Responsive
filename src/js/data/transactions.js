import {transactionId, moneyArray, availableMoney, categoryIcon, incomesList, expensesList, nameInput, amountInput, categorySelect, confirmationModal} from "../main.js";
import {openEditionPanel} from "../panel/transaction_panel.js";
import checkCategory from "../utils/category.js";
import formatInputName from "../utils/input_name.js";
import formatCurrency from "../utils/money.js";
import calculateBalance from "../utils/balance.js";

export const createNewTransaction = () => {
  // Create a list item
  const listItem = document.createElement("li");
  // Create a container for a new transaction
  const transactionContainer = document.createElement("div");
  // Give the new transaction a unique id
  transactionContainer.dataset.id = transactionId;
  // Return category icon based on selected category
  checkCategory(categorySelect);
  // Return the monetary value of the transaction
  const amountFormatted = formatCurrency(amountInput.value);
  // Set the new transaction name and amount and add transaction category icon
  const transaction = document.querySelector(".transaction__template").content.cloneNode(true);
  transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountFormatted}`;
  transaction.querySelector(".transactions__item-amount-button--edit").addEventListener("click", (event) => openEditionPanel(event, transactionId));
  transaction.querySelector(".transactions__item-amount-button--delete").addEventListener("click", (event) => deleteTransaction(event, amountFormatted));
  // Put the new transaction inside its container
  transactionContainer.appendChild(transaction);
  // Put the new transaction's container inside the list item (li) tag
  listItem.appendChild(transactionContainer);
  // If amount is positive, add a new income, otherwise add a new expense
  if (amountInput.value > 0) {
    transactionContainer.classList.add("transactions__item", "transactions__item--income");
    incomesList.appendChild(listItem);
  } else {
    transactionContainer.classList.add("transactions__item", "transactions__item--expense");
    expensesList.appendChild(listItem);
  }
  // Add the amount of the new transaction to `moneyArray` and recalculate the balance
  moneyArray.push(parseFloat(amountFormatted));
  calculateBalance(moneyArray);
  // Increment the transaction id
  transactionId += 1;
}

export const editTransaction = (panel, [nameInput, amountInput, categorySelect], transaction, transactionAmount) => { 
  // Return category icon based on selected category
  checkCategory(categorySelect);
  // Get the old amount and turn it into a number
  const oldAmount = parseFloat(transactionAmount);
  // Get the index of the old amount from `moneyArray`
  const oldAmountIndex = moneyArray.indexOf(oldAmount);
  // Return the monetary value of the transaction
  const newAmountFormatted = formatCurrency(amountInput.value);
  // Set the new transaction name and transaction category icon
  transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  // Set the new transaction amount
  transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${newAmountFormatted}`;
  // Remove the classes that identify the transaction as an income or expense
  transaction.classList.remove("transactions__item--income", "transactions__item--expense");
  // If the new amount is positive, turn the transaction into an income, otherwise turn it into an expense
  if (newAmountFormatted > 0) {
    transaction.classList.remove("transactions__item--expense");
    transaction.classList.add("transactions__item--income");
  } else {
    transaction.classList.remove("transactions__item--income");
    transaction.classList.add("transactions__item--expense");
  }
  // Replace the old amount with the new amount
  moneyArray.splice(oldAmountIndex, 1, parseFloat(newAmountFormatted));

  // Recalculate the balance
  calculateBalance(moneyArray);
}

const deleteTransaction = (event, amountFormatted) => {
  const transactionToDelete = event.target.closest(".transactions__item");
  const amountToDelete = parseFloat(amountFormatted);
  const transactionIndex = moneyArray.indexOf(amountToDelete)

  transactionToDelete.classList.contains("transactions__item--income")
    ? incomesList.removeChild(transactionToDelete)
    : expensesList.removeChild(transactionToDelete);

  moneyArray.splice(transactionIndex, 1);
  calculateBalance(moneyArray);  
}

export const deleteAllTransactions = () => {
  incomesList.innerHTML = "";
  expensesList.innerHTML = "";
  moneyArray = [0];
  availableMoney.textContent = "0";
  availableMoney.style.color = "#f0ebd8";
  confirmationModal.classList.remove("confirmation-modal--open");
}