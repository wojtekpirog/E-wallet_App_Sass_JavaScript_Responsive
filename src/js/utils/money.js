const formatCurrency = (amountCents) => {
  return (Math.round(amountCents) / 100).toFixed(2);
}

export default formatCurrency;