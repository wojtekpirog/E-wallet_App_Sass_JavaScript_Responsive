import { Category } from "../types/types";

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
 