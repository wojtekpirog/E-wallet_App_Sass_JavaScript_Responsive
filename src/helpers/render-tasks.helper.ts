import { Task } from "../types/types";

export const renderTasks = (tasks: Task[],tasksContainerElement: HTMLUListElement) => {
  tasksContainerElement.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement: HTMLLIElement = document.createElement("li");
    if (task.category) {
      taskElement.classList.add(task.category);
    }

    const labelElement: HTMLLabelElement = document.createElement("label");
    labelElement.setAttribute("for", `task${index}`);
    labelElement.innerText = `Title: ${task.title}, done: ${
      task.isDone ? "true" : "false"
    }, category: ${task.category ? task.category : "N/A"}`;

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
};
