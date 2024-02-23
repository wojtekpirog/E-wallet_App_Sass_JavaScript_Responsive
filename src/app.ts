import { Task, Category } from "./types/types";
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

// Tablica z nazwami kategorii
const categories: Category[] = ["general", "work", "gym", "hobby"];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
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
    addTask({ title: taskNameInputElement.value, isDone: false, category: selectedCategory });
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
renderCategories(categories, categoriesContainerElement, updateSelectedCategory);