export interface Task {
  title: string;
  isDone: boolean;
  category?: Category;
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