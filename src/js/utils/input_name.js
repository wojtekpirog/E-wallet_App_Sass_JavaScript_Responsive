function formatInputName(inputValue) {
  return inputValue.trim().charAt(0).toUpperCase() + inputValue.trim().slice(1).toLowerCase();
}

export default formatInputName;