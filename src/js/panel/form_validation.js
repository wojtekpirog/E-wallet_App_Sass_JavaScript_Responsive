import {closePanel} from "./transaction_panel.js";
import {createNewTransaction} from "../data/transactions.js";
import formatInputName from "../utils/input_name.js";

const handleFormSubmit = (event, {panel, nameInput, amountInput, categorySelect}) => {
  event.preventDefault();
  
  checkName(nameInput);
  checkAmount(amountInput);
  checkSelect(categorySelect);
  checkForErrors(panel, [nameInput, amountInput, categorySelect]);
}

const checkName = (nameInput) => {
  const minLength = nameInput.minLength;
  const maxLength = nameInput.maxLength;

  if (!nameInput.value) {
    displayError(nameInput, `${formatInputName(nameInput.id)} must be provided.`);
  } else if (nameInput.value.length < minLength || nameInput.value.length > maxLength) {
    displayError(nameInput, `${formatInputName(nameInput.id)} must be between ${minLength} and ${maxLength} characters long.`);
  } else {
    removeError(nameInput);
  }
}

const checkAmount = (amountInput) => {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    displayError(amountInput, `${formatInputName(amountInput.id)} must be provided.`);
  } else if (amount === 0) {
    displayError(amountInput, `${formatInputName(amountInput.id)} cannot be equal to zero.`);
  } else {
    removeError(amountInput);
  }
}

const checkSelect = (categorySelect) => {
  categorySelect.value === "none"
    ? displayError(categorySelect, `${formatInputName(categorySelect.id)} must be selected.`)
    : removeError(categorySelect);
}

const displayError = (formControl, errorMessage) => {
  const error = formControl.closest(".transaction-panel__control-box").querySelector(".transaction-panel__error");
  error.classList.add("transaction-panel__error--active");
  error.textContent = errorMessage;
  formControl.classList.add("transaction-panel__input--error");
}

const removeError = (formControl) => {
  const error = formControl.closest(".transaction-panel__control-box").querySelector(".transaction-panel__error");
  error.classList.remove("transaction-panel__error--active");
  error.textContent = "";
  formControl.classList.remove("transaction-panel__input--error");
}

const checkForErrors = (panel, inputs) => {
  let hasErrors = false;

  inputs.forEach((input) => {
    input.classList.contains("transaction-panel__input--error") 
      ? hasErrors = true
      : hasErrors = false;
  });

  if (!hasErrors) {
    if (panel.classList.contains("transaction-panel--create")) {
      createNewTransaction();
    }

    clearInputs(inputs);
    clearErrors(inputs);
    closePanel(panel);
  }
}

export const clearInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("transaction-panel__input--error");
  });

  inputs[2].selectedIndex = 0;
}

export const clearErrors = (inputs) => {
  // document.querySelectorAll(".transaction-panel__error").forEach(error => error.style.display = "none");
  inputs.forEach((input) => {
    input.classList.remove("transaction-panel__input--error");
    input.closest(".transaction-panel__control-box").querySelector(".transaction-panel__error").classList.remove("transaction-panel__error--active");
  });
}

export default handleFormSubmit;