const formatCurrency = (amount) => {
  // It a convention that the formatted monetary value is returned as a string
  return (Math.round(parseFloat(amount) * 100) / 100).toFixed(2);
} 

export default formatCurrency;