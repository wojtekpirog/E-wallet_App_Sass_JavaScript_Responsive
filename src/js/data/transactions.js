import {transactionId, moneyArray, availableMoney, categoryIcon, incomesBox, expensesBox, nameInput, amountInput, categorySelect, confirmationModal} from "../main.js";
//import closeConfirmationModal from "../modal/modal.js";
import checkCategory from "../utils/category.js";
import formatInputName from "../utils/input_name.js";
import formatCurrency from "../utils/money.js";
import calculateBalance from "../utils/balance.js";

export const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.id = transactionId;
  checkCategory(categorySelect);

  const amountCents = Math.round(parseFloat(amountInput.value) * 100);
  const amountFormatted = formatCurrency(amountCents);

  const transactionItem = document.querySelector(".transaction__template").content.cloneNode(true);
  transactionItem.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  transactionItem.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountFormatted}`;
  //transactionItem.querySelector(".transactions__item-amount-button--edit").addEventListener("click", () => openEditionPanel(transactionId));
  transactionItem.querySelector(".transactions__item-amount-button--delete").addEventListener("click", (event) => deleteTransaction(event, amountFormatted));
  newTransaction.appendChild(transactionItem);

  if (amountInput.value > 0) {
    newTransaction.classList.add("transactions__item", "transactions__item--income");
    incomesBox.appendChild(newTransaction);
  } else {
    newTransaction.classList.add("transactions__item", "transactions__item--expense");
    expensesBox.appendChild(newTransaction);
  }

  transactionId++;
  moneyArray.push(parseFloat(formatCurrency(amountCents)));
  calculateBalance(moneyArray);
}

const deleteTransaction = (event, amountFormatted) => {
  const transactionToDelete = event.target.closest(".transactions__item");
  const amountToDelete = parseFloat(amountFormatted);
  const transactionIndex = moneyArray.indexOf(amountToDelete)

  transactionToDelete.classList.contains("transactions__item--income")
    ? incomesBox.removeChild(transactionToDelete)
    : expensesBox.removeChild(transactionToDelete);

  moneyArray.splice(transactionIndex, 1);
  calculateBalance(moneyArray);  
}

export const deleteAllTransactions = () => {
  incomesBox.innerHTML = "<h3 class='incomes-box__title'>Incomes</h3>";
  expensesBox.innerHTML = "<h3 class='expenses-box__title'>Expenses</h3>";
  moneyArray = [0];
  availableMoney.textContent = "0";
  availableMoney.style.color = "#f0ebd8";
  confirmationModal.classList.remove("confirmation-modal--open");
}