export class Task {
  public title: string;
  public isDone: boolean;
  public category?: Category;
  public createdAt?: string;

  constructor(title: string, isDone: boolean, category?: Category, createdAt?: string) {
    this.title = title;
    this.isDone = isDone;
    this.category = category;
    this.createdAt = createdAt;
  }
}

export type TaskAsTuple = [string, Category, boolean];

export enum Category {
  GENERAL = "general",
  GYM = "gym",
  WORK = "work",
  HOBBY = "hobby",
  SOCIAL = "social",
  OTHER = "other"
}