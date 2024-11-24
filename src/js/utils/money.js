const formatCurrency = (amount) => {
  // Turn the value of `amountInput` into an amount in cents
  amount = Math.round(parseFloat(amount) * 100);
  // Format the amount in cents into the monetary value (toFixed() returns a string)
  amount = (Math.round(amount) / 100).toFixed(2);
  // Return `amount` as a number
  return parseFloat(amount);
} 

export default formatCurrency;