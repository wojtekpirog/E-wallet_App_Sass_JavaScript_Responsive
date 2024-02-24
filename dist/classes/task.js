import { Category } from "../types/types";
export class TaskClass {
    constructor(name, isDone, category) {
        // Zdefiniuj właściwości dla każdej instancji klasy `TaskClass` oraz ich typy, a następnie nadaj im wartości domyślne:
        this.name = "Domyślne zadanie";
        this.isDone = false;
        this.category = Category.GENERAL;
        this.name = name;
        this.isDone = isDone;
        this.category = category;
    }
}
// `this` odwołuje się do instancji obiektu, który dana (jej konstruktor) tworzy
const taskClassInstance = new TaskClass("Porozmawiaj z konstruktorem", true, Category.WORK);
console.log(taskClassInstance);
