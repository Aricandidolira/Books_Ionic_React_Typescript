import Axios, { AxiosResponse } from "axios";
import { Book } from "../models/Book";
import { Review } from "../models/Review";
import { ServiceConfig } from "./ServiceConfig";

class Service {
  getBooks = async (withTitleLike: string = ""): Promise<Book[]> => {
    const response: AxiosResponse = await Axios({
      url: ServiceConfig.dataUrl("book"),
      params: {
        loadRelations: "author",
        where: `title LIKE '%${withTitleLike}%'`
      },
      method: "get"
    });
    return response.data as Book[];
  };

  getBook = async (withId: string): Promise<Book> => {
    const response: AxiosResponse = await Axios({
      url: ServiceConfig.dataUrl("book") + `/${withId}`,
      params: {
        loadRelations: "author"
      },
      method: "get"
    });
    return response.data as Book;
  };

  getReviews = async (ofBook: Book): Promise<Review[]> => {
    const response: AxiosResponse = await Axios({
      url: ServiceConfig.dataUrl("review"),
      params: {
        pageSize: 100,
        where: `book.objectId='${ofBook.objectId}'`
      }
    });

    return response.data as Review[];
  };
  
  getListBooksOfAuthors = async (authorID: string): Promise<Book[]> => {
    const response: AxiosResponse = await Axios({
      url: ServiceConfig.dataUrl("book"),
      params: {
        loadRelations: "author",
        where: `author.objectId='${authorID}'`
      },
      responseType: "json",
      method: "get"
    });
    return response.data as Book[];
  };
}

export const BookService = new Service();
