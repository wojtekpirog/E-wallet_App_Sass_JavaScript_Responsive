import {categorySelect, categoryIcon} from "../main.js";

const checkCategory = (categorySelect) => {
  switch (categorySelect.value) {
    case "salary":
      categoryIcon = `<i class="fa-solid fa-wallet"></i>`;
      break;
    case "investment":
      categoryIcon = `<i class="fa-solid fa-chart-line"></i>`;
      break;
    case "freelance":
      categoryIcon = `<i class="fa-solid fa-briefcase"></i>`;
      break;
    case "rent":
      categoryIcon = `<i class="fa-solid fa-house"></i>`;
      break;
    case "shopping":
      categoryIcon = `<i class="fa-solid fa-cart-shopping"></i>`;
      break;
    case "food":
      categoryIcon = `<i class="fa-solid fa-utensils"></i>`;
      break;
    case "bills":
      categoryIcon = `<i class="fa-solid fa-credit-card"></i>`;
      break;
    case "cinema":
      categoryIcon = `<i class="fa-solid fa-film"></i>`;
      break;
    case "leisure":
      categoryIcon = `<i class="fa-solid fa-glass-cheers"></i>`;
      break;
    case "other":
      categoryIcon = `<i class="fa-solid fa-pen"></i>`;
      break;
  }
};

export default checkCategory;