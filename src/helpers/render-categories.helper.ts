import { Category } from "../types/types";

export const renderCategories = (categories: Category[], categoriesContainerElement: HTMLUListElement, selectedCategory: Category) => {
  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    const radioInputElement = document.createElement("input");
    radioInputElement.type = "radio";
    radioInputElement.id = `category-${category}`;
    radioInputElement.name = "category";
    radioInputElement.value = category;
    radioInputElement.addEventListener("change", () => {
      selectedCategory = category;
    });
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", `category-${category}`);
    labelElement.innerText = category;
    categoryElement.appendChild(radioInputElement);
    categoryElement.appendChild(labelElement);
    categoriesContainerElement.appendChild(categoryElement);
  });
};
