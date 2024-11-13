import {transactionId, categoryIcon, incomesBox, expensesBox, moneyArray, nameInput, amountInput, categorySelect} from "../main.js";
import checkCategory from "../utils/category.js";
import formatInputName from "../utils/input_name.js";
import formatCurrency from "../utils/money.js";
import calculateBalance from "../utils/balance.js";

export const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.id = transactionId;
  checkCategory(categorySelect);

  const amountCents = Math.round(parseFloat(amountInput.value) * 100);

  const transactionItem = document.querySelector(".transaction__template").content.cloneNode(true);
  transactionItem.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
  transactionItem.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${formatCurrency(amountCents)}`;
  transactionItem.querySelector(".transactions__item-amount-button--edit").setAttribute("onclick", `openEditionPanel(${transactionId})`);
  transactionItem.querySelector(".transactions__item-amount-button--delete").setAttribute("onclick", `deleteTransaction(${transactionId})`);
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