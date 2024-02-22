export interface Task {
  title: string;
  isDone: boolean;
  category?: Category;
}

export type Category = "general" | "work" | "gym" | "hobby";
