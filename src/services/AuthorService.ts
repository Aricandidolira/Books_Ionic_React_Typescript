import Axios, { AxiosResponse } from 'axios'
import { Author } from "../models/Author"
import { ServiceConfig } from "./ServiceConfig"

class Service {
    getAuthors = async (): Promise<Author[]> => {
        const response: AxiosResponse = await Axios({
            url: ServiceConfig.dataUrl('author'),
            method: 'get',
        })
        return response.data as Author[]
    }
}

export const AuthorService = new Service()