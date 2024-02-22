import { renderTasks } from "./helpers/render-tasks.helper.js";
import { renderCategories } from "./helpers/render-categories.helper.js";
let tasksContainerElement; // Lista `<ul>` z zadaniami
let taskNameInputElement; // Pole `<input>` z nazwą zadania
let addTaskButtonElement; // Przycisk `Add`
let categoriesContainerElement; // Lista `<ul>` z kategoriami
// Zmienna globalna typu `Category`
let selectedCategory;
// Tablica z obiektami representującymi zadania
const tasks = [];
// Tablica z nazwami kategorii
const categories = ["general", "work", "gym", "hobby"];
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    renderCategories(categories, categoriesContainerElement, selectedCategory);
};
const prepareDOMElements = () => {
    tasksContainerElement = document.querySelector(".tasks");
    taskNameInputElement = document.querySelector("#name");
    addTaskButtonElement = document.querySelector("button");
    categoriesContainerElement = document.querySelector(".categories");
};
const prepareDOMEvents = () => {
    addTaskButtonElement.addEventListener("click", (event) => {
        event.preventDefault();
        addTask({ title: taskNameInputElement.value, isDone: false, category: selectedCategory });
        renderTasks(tasks, tasksContainerElement);
    });
};
const addTask = (task) => {
    tasks.push(task);
};
document.addEventListener("DOMContentLoaded", main);
