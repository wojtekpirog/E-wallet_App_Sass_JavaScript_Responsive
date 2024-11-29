import {moneyArray} from "../data/transactions.js";

export const getTransactionIndex = (transactionId) => {
  let matchingTransaction;

  moneyArray.forEach((transaction, index) => {
    if (index + 1 === transactionId) matchingTransaction = transaction;
  });
  // Return the index of the matching transaction
  return moneyArray.indexOf(matchingTransaction);
}

export default getTransactionIndex;