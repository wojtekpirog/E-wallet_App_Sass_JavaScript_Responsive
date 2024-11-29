export const getCategoryIcon = (selectedCategory) => {
  switch (selectedCategory) {
    case "salary":
      return `<i class="fa-solid fa-wallet"></i>`;
    case "investment":
      return `<i class="fa-solid fa-chart-line"></i>`;
    case "freelance":
      return `<i class="fa-solid fa-briefcase"></i>`;
    case "rent":
      return `<i class="fa-solid fa-house"></i>`;
    case "shopping":
      return `<i class="fa-solid fa-cart-shopping"></i>`;
    case "food":
      return `<i class="fa-solid fa-utensils"></i>`;
    case "bills":
      return `<i class="fa-solid fa-credit-card"></i>`;
    case "cinema":
      return `<i class="fa-solid fa-film"></i>`;
    case "leisure":
      return `<i class="fa-solid fa-glass-cheers"></i>`;
    case "other":
      return `<i class="fa-solid fa-pen"></i>`;
    default: // Handle an unknown category
      console.warn(`Unknown category: ${selectedCategory}`);
      return `<i class="fa-solid fa-question"></i>`;
  }
};

export const getCategoryByIcon = (transactionIcon) => {
  switch (transactionIcon) {
    case "fa-wallet":
      return "salary";
    case "fa-chart-line":
      return "investment";
    case "fa-briefcase":
      return "freelance";
    case "fa-house":
      return "rent";
    case "fa-cart-shopping":
      return "shopping";
    case "fa-utensils":
      return "food";
    case "fa-credit-card":
      return "bills";
    case "fa-film":
      return "cinema";
    case "fa-glass-cheers":
      return "leisure";
    case "fa-pen":
      return "other";
    default: // Handle an unknown icon
      console.warn(`Unknown icon: ${transactionIcon}`);
  }
}