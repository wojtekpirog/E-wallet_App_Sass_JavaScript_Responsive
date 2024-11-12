function formatInputName(inputId) {
  return inputId.charAt(0).toUpperCase() + inputId.slice(1).toLowerCase();
}

export default formatInputName;