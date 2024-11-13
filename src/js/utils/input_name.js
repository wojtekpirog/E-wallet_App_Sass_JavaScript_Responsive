function formatInputName(inputValue) {
  return inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
}

export default formatInputName;