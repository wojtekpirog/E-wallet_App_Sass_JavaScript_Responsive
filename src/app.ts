let tasksContainerElement: HTMLUListElement; // Lista `<ul>` z zadaniami
let taskNameInputElement: HTMLInputElement; // Pole `<input>` z nazwą zadania
let addTaskButtonElement: HTMLButtonElement; // Przycisk `Add`
let categoriesContainerElement: HTMLUListElement; // Lista `<ul>` z kategoriami

// Alias typów
type Category = "general" | "work" | "gym" | "hobby";

// Interfejs reprezentujący zadanie
interface Task {
  title: string;
  isDone: boolean;
  category?: Category;
}
// Dodanie pytajnika po nazwie property zmieni to property na "optional property"

// Tablica z obiektami representującymi zadania
const tasks: Task[] = [];

// Tablica z nazwami kategorii
const categories: Category[] = ["general", "work", "gym", "hobby"];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  renderCategories();
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
    const selectedRadioElement: HTMLInputElement = document.querySelector("input[type=\"radio\"]:checked");    
    const selectedCategory: Category = selectedRadioElement.value as Category;
    addTask({ title: taskNameInputElement.value, isDone: false, category: selectedCategory });
    renderTasks();
  });
}

const renderCategories = () => {
  categories.forEach((category) => {
    const categoryElement: HTMLLIElement = document.createElement("li");

    const radioInputElement: HTMLInputElement = document.createElement("input");
    radioInputElement.type = "radio";
    radioInputElement.id = `category-${category}`;
    radioInputElement.name = "category";
    radioInputElement.value = category;

    const labelElement: HTMLLabelElement = document.createElement("label");
    labelElement.setAttribute("for", `category-${category}`);
    labelElement.innerText = category;

    categoryElement.appendChild(radioInputElement);
    categoryElement.appendChild(labelElement);

    categoriesContainerElement.appendChild(categoryElement);
  });
}

const addTask = (task: Task) => {
  tasks.push(task);
};

const renderTasks = () => {
  tasksContainerElement.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement: HTMLLIElement = document.createElement("li");
    if (task.category) {
      taskElement.classList.add(task.category);
    }

    const labelElement: HTMLLabelElement = document.createElement("label");
    labelElement.setAttribute("for", `task${index}`);
    labelElement.innerText = `Title: ${task.title}, done: ${task.isDone ? "true" : "false"}, category: ${task.category ? task.category : "N/A"}`;

    const checkboxElement: HTMLInputElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = `task-${index + 1}`;
    checkboxElement.name = task.title;
    checkboxElement.checked = task.isDone;
    checkboxElement.addEventListener("change", () => {
      task.isDone = !task.isDone;
    });

    taskElement.appendChild(labelElement);
    taskElement.appendChild(checkboxElement);

    tasksContainerElement.appendChild(taskElement);
  });
}

document.addEventListener("DOMContentLoaded", main);