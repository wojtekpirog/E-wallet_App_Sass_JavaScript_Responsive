import { Category } from "../types/types.js";

const handleCategoryChange = (category: Category) => {
  if (category === Category.GENERAL) {
    console.log("Zadanie general");
  } else if (category === Category.GYM) {
    console.log("Zadanie gym - pora iść na siłkę 💪");
  } else if (category === Category.WORK) {
    console.log("Zadanie work - praca popłaca 💼");
  } else if (category === Category.HOBBY) {
    console.log("Zadanie hobby - hobby 🎨");
  } else if (category === Category.SOCIAL) {
    console.log("Zadanie social - social 💬");
  } else if (category === Category.OTHER) {
    console.log("Zadanie other - inne");
  } else {
    const typeNever: never = category;
    console.log(`Type never: ${typeNever}`);
  }
}

const renderCategories = (
  categories: Category[],
  categoriesContainerElement: HTMLUListElement,
  updateSelectedCategory: (category: Category) => void
) => {
  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    const radioInputElement = document.createElement("input");
    radioInputElement.type = "radio";
    radioInputElement.id = `category-${category}`;
    radioInputElement.name = "category";
    radioInputElement.value = category;
    radioInputElement.addEventListener("change", () => {
      updateSelectedCategory(category);
      handleCategoryChange(category);
    });
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", `category-${category}`);
    labelElement.innerText = category;
    categoryElement.appendChild(radioInputElement);
    categoryElement.appendChild(labelElement);
    categoriesContainerElement.appendChild(categoryElement);
  });
};

export default renderCategories;
 