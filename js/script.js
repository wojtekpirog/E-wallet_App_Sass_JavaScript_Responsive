let footerYear;
let availableMoney;
let incomesBox;
let expensesBox;
let addTransactionBtn;
let deleteTransactionBtn;
let deleteAllBtn;
let lightCircle;
let darkCircle;

let transactionPanel;
let nameInput;
let amountInput;
let categorySelect;
let categorySelectArrow;
let saveBtn;
let cancelBtn;
let closePanelBtn;

let editTransactionPanel;
let nameToEditInput;
let amountToEditInput;
let categoryToEditSelect;
let categoryToEditSelectArrow;
let saveEditionBtn;
let cancelEditionBtn;
let closeEditionPanelBtn;

let confirmationModal;
let editionModal;
let confirmDeletionButton;
let doNotConfirmDeletionButton;

let rootElement = document.documentElement;
let ID = 0;
let categoryIcon;
let moneyArray = [0]; 

const main = () => {
  getElements();
  addEventListeners();
  setFooterYear();
}

const getElements = () => {
  footerYear = document.querySelector(".footer__year");
  availableMoney = document.querySelector(".options__balance > span");

  incomesBox = document.querySelector(".incomes-box");
  expensesBox = document.querySelector(".expenses-box");

  addTransactionBtn = document.querySelector(".options__controls-btn--add");

  deleteTransactionBtn = document.querySelector(".incomes-box__item-amount-btn");
  deleteAllBtn = document.querySelector(".options__controls-btn--deleteAll");

  lightCircle = document.querySelector(".options__style-button--light");
  darkCircle = document.querySelector(".options__style-button--dark");
  // Create transaction
  transactionPanel = document.querySelector(".transaction-panel--create");
  nameInput = transactionPanel.querySelector("#name");
  amountInput = transactionPanel.querySelector("#amount");
  categorySelect = transactionPanel.querySelector("#category");
  categorySelectArrow = transactionPanel.querySelector(".transaction-panel__arrow");
  //saveBtn = transactionPanel.querySelector(".transaction-panel__button--save");
  //cancelBtn = transactionPanel.querySelector(".transaction-panel__button--cancel");
  closePanelBtn = transactionPanel.querySelector(".transaction-panel__xmark");
  // Create transaction
  // Edit transaction
  editTransactionPanel = document.querySelector(".transaction-panel--edit");
  nameToEditInput = editTransactionPanel.querySelector("#name-to-edit");
  amountToEditInput = editTransactionPanel.querySelector("#amount-to-edit");
  categoryToEditSelect = editTransactionPanel.querySelector("#category-to-edit");
  categoryToEditSelectArrow = editTransactionPanel.querySelector(".transaction-panel__arrow");
  //saveEditionBtn = editTransactionPanel.querySelector(".transaction-panel__button--save");
  //cancelEditionBtn = editTransactionPanel.querySelector(".transaction-panel__button--cancel");
  closeEditionPanelBtn = editTransactionPanel.querySelector(".transaction-panel__xmark");

  confirmationModal = document.querySelector(".confirmation-modal");
  editionModal = document.querySelector(".edition-modal");
  confirmDeletionButton = document.querySelector(".confirmation-modal__button--confirm");
  doNotConfirmDeletionButton = document.querySelector(".confirmation-modal__button--cancel");
}

const addEventListeners = () => {
  addTransactionBtn.addEventListener("click", openTransactionPanel);
  deleteAllBtn.addEventListener("click", showConfirmationModal);
  closePanelBtn.addEventListener("click", () => closeTransactionPanel(transactionPanel));
  closeEditionPanelBtn.addEventListener("click", () => closeTransactionPanel(editTransactionPanel));
  //saveBtn.addEventListener("click", handleFormSubmit);
  //cancelBtn.addEventListener("click", closeTransactionPanel);
  lightCircle.addEventListener("click", switchToLightMode);
  darkCircle.addEventListener("click", switchToDarkMode);
  confirmDeletionButton.addEventListener("click", deleteAllTransactions);
  doNotConfirmDeletionButton.addEventListener("click", hideConfirmationModal);
}

const openTransactionPanel = () => {
  transactionPanel.classList.add("active");
  transactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", handleFormSubmit);
  transactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeTransactionPanel(transactionPanel));
}


const openEditionPanel = (ID) => {
  console.log(`ID transakcji: ${ID}`);
  
  editTransactionPanel.classList.add("active");
  editTransactionPanel.querySelector(".transaction-panel__button--save").addEventListener("click", handleFormSubmit);
  editTransactionPanel.querySelector(".transaction-panel__button--cancel").addEventListener("click", () => closeTransactionPanel(editTransactionPanel));
  //editionModal.querySelector(".edition-modal__button--apply").addEventListener("click", () => editTransaction(ID));
  //editionModal.querySelector(".edition-modal__button--cancel").addEventListener("click", hideEditionModal);
}
  
const closeTransactionPanel = (panel) => {
  clearElements();
  clearErrors();
  panel.classList.remove("active");
}

const clearElements = () => {
  nameInput.value = "";
  nameInput.classList.remove("transaction-panel__input--error");
  amountInput.value = "";
  amountInput.classList.remove("transaction-panel__input--error");
  categorySelect.selectedIndex = 0;
  categorySelect.classList.remove("transaction-panel__input--error");
  categorySelectArrow.classList.remove("transaction-panel__arrow--error");
}

const clearErrors = () => {
  document.querySelectorAll(".transaction-panel__error").forEach(error => error.style.display = "none");
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  validateInputs([nameInput, amountInput]);
  validateSelect(categorySelect);
  checkLength(nameInput);
  checkForErrors();
}

const validateInputs = (inputs) => {
  inputs.forEach((input) => {
    if (input.value === "") {
      displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} cannot be empty!`);
    } else if (input.value === "0") {
      displayError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} cannot be equal to zero!`);
    } else {
      removeError(input);
    }
  });
}

const validateSelect = (categorySelect) => {
  if (categorySelect.value === "none") {
    displayError(categorySelect, `${categorySelect.id.charAt(0).toUpperCase() + categorySelect.id.slice(1)} must be selected!`);
  } else {
    removeError(categorySelect);
  }
}

const checkLength = (nameInput) => {
  if (nameInput.value.length < nameInput.minLength || nameInput.value.length > nameInput.maxLength) {
    displayError(nameInput, `${nameInput.id.charAt(0).toUpperCase() + nameInput.id.slice(1)} must be between ${nameInput.minLength} and ${nameInput.maxLength} characters!`);
  } else {
    removeError(nameInput);
  }
}

const checkForErrors = () => {
  const allErrors = document.querySelectorAll(".transaction-panel__error");
  let errorCount = 0;

  allErrors.forEach((error) => {
    error.style.display === "block" && errorCount ++;
  });

  if (errorCount === 0) {
    createNewTransaction();
    closeTransactionPanel(transactionPanel);
  }
}

const displayError = (formControl, errorMessage) => {
  let error = formControl.parentElement.querySelector(".transaction-panel__error");

  if (!error) {
    error = formControl.parentElement.nextElementSibling;
    formControl.nextElementSibling.classList.add("transaction-panel__arrow--error");
  }

  error.textContent = errorMessage;
  error.style.display = "block";
  formControl.classList.add("transaction-panel__input--error");
}

const removeError = (formControl) => {
  let error = formControl.parentElement.querySelector(".transaction-panel__error");

  if (!error) {
    error = formControl.parentElement.nextElementSibling;
    formControl.nextElementSibling.classList.remove("transaction-panel__arrow--error");
  }

  error.textContent = "";
  error.style.display = "none";
  formControl.classList.remove("transaction-panel__input--error");
}

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.setAttribute("id", ID);
  newTransaction.className = "transactions__item";
  checkCategory();

  const transactionsTemplate = document.querySelector(".transactions__template").content.cloneNode(true);
  transactionsTemplate.querySelector(".transactions__item-name").innerHTML = `${categoryIcon} ${nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1)}`;
  transactionsTemplate.querySelector(".transactions__item-amount-text").innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${amountInput.value}`;
  transactionsTemplate.querySelector(".transactions__item-amount-button--edit").setAttribute("onclick", `openEditionPanel(${ID})`);
  transactionsTemplate.querySelector(".transactions__item-amount-button--delete").setAttribute("onclick", `deleteTransaction(${ID})`);
  newTransaction.appendChild(transactionsTemplate);

  if (amountInput.value > 0) {
    newTransaction.classList.add("transactions__item--income");
    incomesBox.appendChild(newTransaction);
  } else {
    newTransaction.classList.add("transactions__item--expense");
    expensesBox.appendChild(newTransaction);
  }

  moneyArray.push(parseFloat(amountInput.value));
  calculateBalance(moneyArray);
  ID++;
}

const checkCategory = () => {
  switch (categorySelect.value) {
    case "salary":
      categoryIcon = `<i class="fa-solid fa-wallet"></i>`;
      break;
    case "investment":
      categoryIcon = `<i class="fa-solid fa-chart-line"></i>`;
      break;
    case "freelance":
      categoryIcon = `<i class="fa-solid fa-briefcase"></i>`;
      break;
    case "rent":
      categoryIcon = `<i class="fa-solid fa-house"></i>`;
      break;
    case "shopping":
      categoryIcon = `<i class="fa-solid fa-cart-shopping"></i>`;
      break;
    case "food":
      categoryIcon = `<i class="fa-solid fa-utensils"></i>`;
      break;
    case "bills":
      categoryIcon = `<i class="fa-solid fa-credit-card"></i>`;
      break;
    case "cinema":
      categoryIcon = `<i class="fa-solid fa-film"></i>`;
      break;
    case "leisure":
      categoryIcon = `<i class="fa-solid fa-glass-cheers"></i>`;
      break;
    case "other":
      categoryIcon = `<i class="fa-solid fa-pen"></i>`;
      break;
  }
}

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);
  const amountOfTransactionToDelete = parseFloat(transactionToDelete.childNodes[9].childNodes[1].innerText.slice(1));
  const indexOfTransactionToDelete = moneyArray.indexOf(amountOfTransactionToDelete);

  moneyArray.splice(indexOfTransactionToDelete, 1);
  calculateBalance(moneyArray);
  transactionToDelete.classList.contains("transactions__item--income") ? incomesBox.removeChild(transactionToDelete) : expensesBox.removeChild(transactionToDelete);
}

// const editTransaction = (id) => {
//   const transactionToEdit = document.getElementById(id);
//   const nameOfTransactionToEdit = transactionToEdit.childNodes[3].innerText.slice(1);
//   const amountOfTransactionToEdit = parseFloat(transactionToEdit.childNodes[9].childNodes[1].innerText.slice(1));
//   const indexOfTransactionToEdit = moneyArray.indexOf(amountOfTransactionToEdit);

//   hideEditionModal();
// }

const calculateBalance = (moneyArray) => {
  console.log(moneyArray);

  const balance = moneyArray.reduce((accumulator, currentValue) => accumulator + currentValue);

  if (balance < 0) {
    availableMoney.classList.remove("options__balance--positive");
    availableMoney.classList.add("options__balance--negative");
  } else if (balance > 0) {
    availableMoney.classList.remove("options__balance--negative");
    availableMoney.classList.add("options__balance--positive");
  } else {
    availableMoney.classList.remove("options__balance--positive", "options__balance--negative");
  }

  availableMoney.textContent = balance;
}

const showConfirmationModal = () => {
  confirmationModal.style.display = "flex";
}

const hideConfirmationModal = () => {
  confirmationModal.style.display = "none";
}

const deleteAllTransactions = () => {
  incomesBox.innerHTML = '<h3 class="incomes-box__title">Incomes</h3>';
  expensesBox.innerHTML = '<h3 class="expenses-box__title">Expenses</h3>';
  moneyArray = [0];
  availableMoney.textContent = `$ 0`;
  hideConfirmationModal();
}

const switchToLightMode = () => {
  rootElement.style.setProperty("--darkColor", "#f0ebd8");
  rootElement.style.setProperty("--lightColor", "#0d1321");
}

const switchToDarkMode = () => {
  rootElement.style.setProperty("--darkColor", "#0d1321");
  rootElement.style.setProperty("--lightColor", "#f0ebd8");
}

const setFooterYear = () => {
  const now = new Date();
  footerYear.textContent = now.getFullYear();
}

window.addEventListener("DOMContentLoaded", main);