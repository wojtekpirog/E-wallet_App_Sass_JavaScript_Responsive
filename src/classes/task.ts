import { Category } from "../types/types";

export class TaskClass {
  // Zdefiniuj właściwości dla każdej instancji klasy `TaskClass` oraz ich typy, a następnie nadaj im wartości domyślne:
  name: string = "Domyślne zadanie";
  isDone: boolean = false;
  category?: Category = Category.GENERAL;

  constructor(name: string, isDone: boolean, category: Category) {
    this.name = name;
    this.isDone = isDone;
    this.category = category;
  }
}

// `this` odwołuje się do instancji obiektu, który dana (jej konstruktor) tworzy

const taskClassInstance = new TaskClass("Porozmawiaj z konstruktorem", true, Category.WORK);
console.log(taskClassInstance);