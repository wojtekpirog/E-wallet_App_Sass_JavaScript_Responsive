import {availableMoney, incomesList, expensesList, confirmationModal} from "../main.js";
import {openEditionPanel, closePanel} from "../panel/transaction_panel.js";
import handleFormSubmit from "../panel/form_validation.js";
import getCategoryIcon from "../utils/category.js";
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
export const loadFromStorage = () => {
  // Get data from Local Storage
  const storedAmounts = localStorage.getItem("moneyArray");
  // Update `moneyArray` with the data from Local Storage
  if (storedAmounts) {
    moneyArray = JSON.parse(storedAmounts);
  }
}

// Function to render transactions from `moneyArray`
export const renderTransactions = () => {
  // Reset both incomesList and expensesList and balance info in availableMoney
  clearStuff();
  // Load transactions from Local Storage (get updated `moneyArray`)
  loadFromStorage();
  // Render transactions from `moneyArray`, if there are any
  if (moneyArray.length > 0) {
    // Render HTML for each transaction in `moneyArray`
    moneyArray.forEach((transaction, index) => {
      // Create a list item
      const listItem = document.createElement("li");
      // Create a container for a new transaction
      const transactionContainer = document.createElement("div");
      // Give the new transaction a unique id as a data attribute
      const transactionId = index + 1;
      transactionContainer.dataset.id = transactionId;
      // Get a copy of the document fragment from template
      const transactionElement = document.querySelector(".transaction__template").content.cloneNode(true);
      // Fill in the transaction's data
      transactionElement.querySelector(".transactions__item-name").innerHTML = `${transaction.categoryIcon} ${transaction.name}`;
      transactionElement.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${transaction.amount}`;
      transactionElement.querySelector(".transactions__item-amount-button--edit").addEventListener("click", () => openEditionPanel(transactionId));
      transactionElement.querySelector(".transactions__item-amount-button--delete").addEventListener("click", () => deleteTransaction(transactionId));
      // Put the new transaction inside its container
      transactionContainer.appendChild(transactionElement);
      // Put the new transaction's container inside the list item (li) tag
      listItem.appendChild(transactionContainer);
      // If amount is positive, add a new income, otherwise add a new expense
      if (parseFloat(transaction.amount) > 0) {
        transactionContainer.classList.add("transactions__item", "transactions__item--income");
        incomesList.appendChild(listItem);
      } else {
        transactionContainer.classList.add("transactions__item", "transactions__item--expense");
        expensesList.appendChild(listItem);
      }
    });
    // Recalculate the balance
    calculateBalance(moneyArray);
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
    // Return the formatted transaction's name
    const nameFormatted = formatInputName(nameInput.value);
    // Return category icon based on selected category
    const categoryIcon = getCategoryIcon(categorySelect.value);
    // Return the monetary amount of the transaction
    const amountFormatted = formatCurrency(amountInput.value);
    // Create a new transaction as an object
    moneyArray.push({
      name: nameFormatted,
      categoryIcon: categoryIcon,
      amount: amountFormatted
    });
    // Save the newly updated `moneyArray` to LocalStorage
    saveToStorage();
    // Re-render the transactions
    renderTransactions();
    // Close the panel
    closePanel(transactionPanel, inputs);
  };
}

export const editTransaction = (event, transactionId, editionPanel, inputs) => {
  console.log("Edit transaction...");
  // Return whether the form validation resulted in erros or not
  const errorsOccured = handleFormSubmit(event, inputs);
  // If there are no errors, edit the transaction
  if (!errorsOccured) {
    // Destructure the `inputs` array
    const [nameToEditInput, amountToEditInput, categoryToEditSelect] = inputs;
    // Get the transaction to be edited
    const transactionToEdit = document.querySelector(`[data-id="${transactionId}"]`);

    console.log(transactionToEdit);

    // Close the edition panel
    closePanel(editionPanel, inputs);
  }
}

const deleteTransaction = (transactionId) => {
  // Get the transaction to be deleted
  const transactionToDelete = document.querySelector(`[data-id="${transactionId}"]`);
  // Remove the transaction from the DOM
  transactionToDelete.classList.contains("transactions__item--income")
    ? incomesList.removeChild(transactionToDelete.parentElement) // `transactionToDelete` is a direct child of `incomesList` or `expensesList`, hence the `.parentElement` part
    : expensesList.removeChild(transactionToDelete.parentElement);
  // Get the transaction to be removed from `moneyArray` based on its transaction id
  let matchingTransaction;

  moneyArray.forEach((transaction, index) => {
    if (index + 1 === transactionId) matchingTransaction = transaction;
  });
  // Get the index of the matching transaction
  const matchingTransactionIndex = moneyArray.indexOf(matchingTransaction);
  // Remove `matchingTransaction` from `moneyArray`
  moneyArray.splice(matchingTransactionIndex, 1);
  // Save the updated `moneyArray` to Local Storage
  saveToStorage();
  // Re-render the transactions
  renderTransactions();
}

// export const editTransaction = (event, editionPanel, inputs, transaction, transactionAmount) => {
//   // Return whether the form validation resulted in erros or not
//   const errorsOccured = handleFormSubmit(event, inputs);
//   // If there are no errors, edit the transaction
//   if (!errorsOccured) {
//     // Destructure the `inputs` array
//     const [nameInput, amountInput, categorySelect] = inputs;
//     // Return category icon based on selected category
//     checkCategory(categorySelect);
//     // // Get the old amount and turn it into a floating-point number
//     const oldAmount = parseFloat(transactionAmount);
//     // // Get the index of the old amount from `moneyArray`
//     const oldAmountIndex = moneyArray.indexOf(oldAmount);
//     // // Return the monetary value of the transaction
//     const newAmountFormatted = formatCurrency(amountInput.value);
//     // // Set the new transactions name and category icon
//     transaction.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${formatInputName(nameInput.value)}`;
//     // Set the new transaction amount
//     transaction.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${newAmountFormatted}`;
//     // Remove the classes that identify the transaction as an income or expense
//     transaction.classList.remove("transactions__item--income", "transactions__item--expense");
//     // If the new amount is positive, turn the transaction into an income, otherwise turn it into an expense
//     if (parseFloat(newAmountFormatted) > 0) {
//       transaction.classList.remove("transactions__item--expense");
//       transaction.classList.add("transactions__item--income");
//     } else {
//       transaction.classList.remove("transactions__item--income");
//       transaction.classList.add("transactions__item--expense");
//     }
//     // Replace the old amount with the new amount
//     moneyArray.splice(oldAmountIndex, 1, parseFloat(newAmountFormatted));
//     // Recalculate the balance
//     calculateBalance(moneyArray);
//     // Close the panel
//     closePanel(editionPanel, inputs);
//   }
// }

export const deleteAllTransactions = () => {
  // Remove all transactions from `moneyArray`
  moneyArray = [];
  // Save the updated `moneyArray` to Local Storage
  saveToStorage();
  // Clear both incomesList and expensesList and balance info in `availableMoney`
  clearStuff();
  // Close the confirmation modal
  confirmationModal.classList.remove("confirmation-modal--open");
}

const clearStuff = () => {
  // Reset both incomesList and expensesList
  incomesList.innerHTML = "";
  expensesList.innerHTML = "";
  // Reset textContent and classList of `availableMoney`
  availableMoney.textContent = "0";
  availableMoney.classList.remove("options__balance--positive", "options__balance--negative");
}