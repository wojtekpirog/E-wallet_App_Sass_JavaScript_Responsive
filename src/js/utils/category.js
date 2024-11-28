const getCategoryIcon = (selectedCategory) => {
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

export default getCategoryIcon;