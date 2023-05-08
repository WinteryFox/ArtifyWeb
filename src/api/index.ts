import Axios from "axios";

export namespace Api {
    export const baseUrl: string = "http://localhost:8080/api"

    export const client = Axios.create({
        baseURL: Api.baseUrl
    })

    export interface Jwt {
        access_token: string
        id_token: string
        refresh_token: string
        expires_in: number
        type: string,
        device: Device | null
    }

    export interface Device {
        key: string
        group_key: string
        password: string
    }

    export interface Login {
        email: string
        password: string
        device: Device | null
    }

    export interface User {
        id: string
        handle: string
        username: string
        avatar: string
    }

    export interface Illustration {
        id: string
        author: string & User
        title: string
        body: string
        comments_enabled: boolean
        is_private: boolean
        is_ai: boolean
        hashes: Array<String>
    }
}
