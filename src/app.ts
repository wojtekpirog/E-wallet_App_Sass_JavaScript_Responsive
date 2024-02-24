import { Task } from "./types/types.js";
import { Category } from "./types/types.js";
import renderTasks from "./helpers/render-tasks.helper.js";
import renderCategories from "./helpers/render-categories.helper.js";

let tasksContainerElement: HTMLUListElement; // Lista `<ul>` z zadaniami
let taskNameInputElement: HTMLInputElement; // Pole `<input>` z nazwą zadania
let addTaskButtonElement: HTMLButtonElement; // Przycisk `Add`
let categoriesContainerElement: HTMLUListElement; // Lista `<ul>` z kategoriami

// Zmienna globalna typu `Category`
let selectedCategory: Category;

// Tablica z obiektami representującymi zadania
const tasks: Task[] = [];

const categories: Category[] = [Category.GENERAL, Category.WORK, Category.GYM, Category.HOBBY, Category.SOCIAL, Category.OTHER];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  renderCategories(
    categories,
    categoriesContainerElement,
    updateSelectedCategory
  );
}

const prepareDOMElements = () => {
  tasksContainerElement = document.querySelector(".tasks");
  taskNameInputElement = document.querySelector("#name");
  addTaskButtonElement = document.querySelector("button");
  categoriesContainerElement = document.querySelector(".categories");
}

const prepareDOMEvents = () => {
  addTaskButtonElement.addEventListener("click", (event: Event) => {
    event.preventDefault();
    const newTask: Task = new Task(
      taskNameInputElement.value,
      false,
      selectedCategory
    );
    addTask(newTask);
    renderTasks(tasks, tasksContainerElement);
  });
}

const addTask = (task: Task) => {
  tasks.push(task);
};

const updateSelectedCategory = (newCategory: Category) => {
  selectedCategory = newCategory;
}

document.addEventListener("DOMContentLoaded", main);