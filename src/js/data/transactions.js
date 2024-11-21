import {transactionId, moneyArray, availableMoney, categoryIcon, incomesList, expensesList, nameInput, amountInput, categorySelect, confirmationModal} from "../main.js";
import {openEditionPanel} from "../panel/edition_panel.js";
import checkCategory from "../utils/category.js";
import formatInputName from "../utils/input_name.js";
import formatCurrency from "../utils/money.js";
import calculateBalance from "../utils/balance.js";

export const createNewTransaction = () => {
  const newTransaction = document.createElement("li");
  newTransaction.id = transactionId;
  // Return category icon based on selected category
  checkCategory(categorySelect);
  // Return the monetary value of the transaction
  const amountFormatted = formatCurrency(amountInput.value);

  const transactionItem = document.querySelector(".transaction__template").content.cloneNode(true);
  transactionItem.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  transactionItem.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountFormatted}`;
  transactionItem.querySelector(".transactions__item-amount-button--edit").addEventListener("click", (event) => openEditionPanel(event));
  transactionItem.querySelector(".transactions__item-amount-button--delete").addEventListener("click", (event) => deleteTransaction(event, amountFormatted));
  newTransaction.appendChild(transactionItem);

  // If amount is positive, add a new income, otherwise add a new expense
  if (amountInput.value > 0) {
    newTransaction.classList.add("transactions__item", "transactions__item--income");
    incomesList.appendChild(newTransaction);
  } else {
    newTransaction.classList.add("transactions__item", "transactions__item--expense");
    expensesList.appendChild(newTransaction);
  }

  transactionId++;
  moneyArray.push(parseFloat(amountFormatted));
  calculateBalance(moneyArray);
}

export const editTransaction = (event, transaction, {panel, nameInput, amountInput, categorySelect}) => {
  event.preventDefault(); 
  // Return category icon based on selected category
  checkCategory(categorySelect);
  // Return the monetary value of the transaction
  const amountFormatted = formatCurrency(amountInput.value);
  // Set the new transaction name and transaction category icon
  transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  // Set the new transaction amount
  transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountFormatted}`;
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