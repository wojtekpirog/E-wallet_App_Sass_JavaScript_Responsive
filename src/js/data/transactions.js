import {availableMoney, categoryIcon, incomesList, expensesList, confirmationModal} from "../main.js";
import {openEditionPanel, closePanel} from "../panel/transaction_panel.js";
import handleFormSubmit from "../panel/form_validation.js";
import checkCategory from "../utils/category.js";
import formatInputName from "../utils/input_name.js";
import formatCurrency from "../utils/money.js";
import calculateBalance from "../utils/balance.js";
// Array to store information about transactions
export let moneyArray = [];
// Transaction ID
export let transactionId = 0;

// Function to save data in Local Storage
const saveToStorage = () => {
  localStorage.setItem("moneyArray", JSON.stringify(moneyArray));
}

// Function to load data from Local Storage
const loadFromStorage = () => {
  // Get data from Local Storage
  const storedAmounts = localStorage.getItem("moneyArray");
  // Update `moneyArray` with the data from Local Storage
  if (storedAmounts) {
    moneyArray = JSON.parse(storedAmounts);
  }
}

export const createNewTransaction = (event, transactionPanel, inputs) => {
  // Return whether the form validation resulted in erros or not
  const errorsOccurred = handleFormSubmit(event, inputs);
  // If there are no errors, create a new transaction
  if (!errorsOccurred) {
    // Destructure the `inputs` array
    const [nameInput, amountInput, categorySelect] = inputs;
    // Increment the transaction id
    transactionId += 1;
    // Return category icon based on selected category
    checkCategory(categorySelect);
    // Return the monetary amount of the transaction
    const amountFormatted = formatCurrency(amountInput.value);
    // Create a list item
    const listItem = document.createElement("li");
    // Create a container for a new transaction
    const transactionContainer = document.createElement("div");
    // Give the new transaction a unique id
    transactionContainer.dataset.id = transactionId;
    // Set the new transaction's name, amount category icon
    const transaction = document.querySelector(".transaction__template").content.cloneNode(true);
    transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
    transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountFormatted}`;
    transaction.querySelector(".transactions__item-amount-button--edit").addEventListener("click", (event) => openEditionPanel(event));
    transaction.querySelector(".transactions__item-amount-button--delete").addEventListener("click", (event) => deleteTransaction(event));
    // Put the new transaction inside its container
    transactionContainer.appendChild(transaction);
    // Put the new transaction's container inside the list item (li) tag
    listItem.appendChild(transactionContainer);
    // If amount is positive, add a new income, otherwise add a new expense
    if (parseFloat(amountFormatted) > 0) {
      transactionContainer.classList.add("transactions__item", "transactions__item--income");
      incomesList.appendChild(listItem);
    } else {
      transactionContainer.classList.add("transactions__item", "transactions__item--expense");
      expensesList.appendChild(listItem);
    }
    // Add the amount of the new transaction to `moneyArray`
    moneyArray.push(parseFloat(amountFormatted));
    // Save the data in Local Storage
    saveToStorage();
    // Recalculate the balance
    calculateBalance(moneyArray);
    // Close the panel
    closePanel(transactionPanel, inputs);

    console.log(moneyArray);
  };
}

export const editTransaction = (event, editionPanel, inputs, transaction, transactionAmount) => {
  // Return whether the form validation resulted in erros or not
  const errorsOccured = handleFormSubmit(event, inputs);
  // If there are no errors, edit the transaction
  if (!errorsOccured) {
    // Destructure the `inputs` array
    const [nameInput, amountInput, categorySelect] = inputs;
    // Return category icon based on selected category
    checkCategory(categorySelect);
    // // Get the old amount and turn it into a floating-point number
    const oldAmount = parseFloat(transactionAmount);
    // // Get the index of the old amount from `moneyArray`
    const oldAmountIndex = moneyArray.indexOf(oldAmount);
    // // Return the monetary value of the transaction
    const newAmountFormatted = formatCurrency(amountInput.value);
    // // Set the new transactions name and category icon
    transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
    // Set the new transaction amount
    transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${newAmountFormatted}`;
    // Remove the classes that identify the transaction as an income or expense
    transaction.classList.remove("transactions__item--income", "transactions__item--expense");
    // If the new amount is positive, turn the transaction into an income, otherwise turn it into an expense
    if (parseFloat(newAmountFormatted) > 0) {
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
    // Close the panel
    closePanel(editionPanel, inputs);
  }
}

const deleteTransaction = (event) => {
  const transactionToDelete = event.target.closest(".transactions__item");
  // Get the amount of the transaction and turn it into a monetary value
  const amountString = transactionToDelete.querySelector(".transactions__item-amount-text").textContent.trim();
  const amountNumber = parseFloat(amountString);
  // Get the index of the transaction amount in `moneyArray`
  const transactionIndex = moneyArray.indexOf(amountNumber);
  // Remove the transaction from the DOM
  transactionToDelete.classList.contains("transactions__item--income")
    ? incomesList.removeChild(transactionToDelete.parentElement)
    : expensesList.removeChild(transactionToDelete.parentElement);
  // Remove the transaction from `moneyArray` and recalculate the balance
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

export default loadFromStorage;