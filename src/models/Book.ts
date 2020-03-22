import { Author } from "./Author";

export interface Book {
  objectId: number;
  title?: string;
  quantity: number;
  cover?: string;
  author: Author;
}
