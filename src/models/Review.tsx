import { Book } from "./Book";

export interface Review {
  objectId: number;
  rating: number;
  book: Book;
}
