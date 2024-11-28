import {availableMoney} from "../main.js";

const calculateBalance = (moneyArray) => {
  // Calculate the sum of all the transaction amounts
  let balance = moneyArray.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.amount);
  }, 0);
  // Round the balance to two decimal places and then convert it to a number
  balance = parseFloat(balance.toFixed(2));
  // Format the balance to a string
  const formattedBalance = balance.toString();
  // Set the balance in the DOM
  availableMoney.textContent = formattedBalance;
  // Remove the classes that identify the balance as positive or negative in case balance is 0
  availableMoney.classList.remove("options__balance--positive", "options__balance--negative");
  // Otherwise add the class that identifies the balance as positive or negative
  if (balance > 0) {
    availableMoney.classList.add("options__balance--positive");
  } else if (balance < 0) {
    availableMoney.classList.add("options__balance--negative");
  }
}

export default calculateBalance;