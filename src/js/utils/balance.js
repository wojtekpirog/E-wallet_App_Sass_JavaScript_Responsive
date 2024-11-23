import {availableMoney} from "../main.js";

function calculateBalance(moneyArray) {
  const balance = moneyArray.reduce((accumulator, currentValue) => accumulator + currentValue);

  if (balance > 0) {
    availableMoney.classList.add("options__balance--positive");
    availableMoney.classList.remove("options__balance--negative");
  } else if (balance === 0) {
    availableMoney.classList.remove("options__balance--positive", "options__balance--negative");
  } else {
    availableMoney.classList.add("options__balance--negative");
    availableMoney.classList.remove("options__balance--positive");
  }

  availableMoney.textContent = balance;
}

export default calculateBalance;