export class Task {
    constructor(title, isDone, category, createdAt) {
        this.title = title;
        this.isDone = isDone;
        this.category = category;
        this.createdAt = createdAt;
    }
}
export var Category;
(function (Category) {
    Category["GENERAL"] = "general";
    Category["GYM"] = "gym";
    Category["WORK"] = "work";
    Category["HOBBY"] = "hobby";
    Category["SOCIAL"] = "social";
    Category["OTHER"] = "other";
})(Category || (Category = {}));
