import {moneyArray} from "../data/transactions.js";

export const getTransactionIndex = (transactionId) => {
  const index = moneyArray.findIndex((transaction) => transaction.id === transactionId);

  if (index !== -1) {
    return index;
  } else {
    console.error(`Transaction with ID ${transactionId} not found in the list of transactions.`);
  }
}

export default getTransactionIndex;