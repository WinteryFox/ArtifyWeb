import Axios from "axios";

export const client = Axios.create({
    baseURL: "http://localhost:8080/api"
})

export namespace Api {
    export interface User {
        id: string,
        handle: string,
        username: string,
        avatar: string
    }

    export interface Illustration {
        id: string,
        author: string & User,
        title: string,
        body: string,
        comments_enabled: boolean,
        is_private: boolean,
        is_ai: boolean,
        hashes: Array<String>
    }
}
