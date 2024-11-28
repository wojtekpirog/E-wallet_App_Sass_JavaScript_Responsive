import formatInputName from "../utils/input_name.js";

const handleFormSubmit = (event, inputs) => {
  // Prevent page reload
  event.preventDefault();
  // Destructure the `inputs` array
  const [nameInput, amountInput, categorySelect] = inputs;
  // Get the current option from categorySelect
  const selectedCategory = categorySelect.options[categorySelect.selectedIndex];
  // Validate the inputs
  checkName(nameInput);
  checkAmount(amountInput, selectedCategory);
  checkCategory(categorySelect);
  // Check whether there are any errors and return `true` if there are any errors, otherwise return `false`
  return checkForErrors(inputs);
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

const checkAmount = (amountInput, selectedCategory) => {
  // Get the amount of the transaction
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    displayError(amountInput, `${formatInputName(amountInput.id)} must be provided.`);
  } else if (amount === 0) {
    displayError(amountInput, `${formatInputName(amountInput.id)} cannot be equal to zero.`);
  } else if (amount > 0 && selectedCategory.textContent.startsWith("[ - ]")) {
    displayError(amountInput, `${formatInputName(amountInput.id)} must be a negative value for an expense.`);
  } else if (amount < 0 && selectedCategory.textContent.startsWith("[ + ]")) {
    displayError(amountInput, `${formatInputName(amountInput.id)} must be a positive value for an income.`);
  } else {
    removeError(amountInput);
  }
}

const checkCategory = (categorySelect) => {
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

const checkForErrors = (inputs) => {
  // Use `some` to return `true` if at least one input in the `inputs` array contains an error, otherwise return `false`
  return inputs.some((input) => input.classList.contains("transaction-panel__input--error"));
}

export default handleFormSubmit;