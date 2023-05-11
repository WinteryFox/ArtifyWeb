import Axios from "axios";

export namespace Api {
    export const baseUrl: string = "http://localhost:8080/api"

    export const client = Axios.create({
        baseURL: Api.baseUrl,
        withCredentials: true
    })

    client.interceptors.request.use(
        async (config) => {
            if (config.url === "/refresh")
                return config

            let subject = localStorage.getItem("current_subject")
            if (subject == null)
                return config

            console.debug(`Current subject is ${subject}`)

            let expiry = localStorage.getItem(`${subject}_expiry`)
            if (expiry == null)
                expiry = "0"

            let now = Date.now() / 1000
            let delta = parseInt(expiry) - now
            console.debug(`Delta is ${Math.floor(delta)}s (${Math.floor(delta / 60)}m ${Math.floor(delta % 60)}s)`)

            let expired = delta <= 0
            if (expired) {
                console.info("Access token is expired, refreshing")

                let response = await client.post<Jwt>(
                    "/refresh",
                    {
                        id: subject,
                        device_key: localStorage.getItem(`${subject}_device_key`)!!,
                        refresh_token: localStorage.getItem(`${subject}_refresh_token`)!!
                    }
                )

                if (response.status !== 200) {
                    console.error("Failed to refresh access token, attempting request unauthorized")
                    return config
                }

                localStorage.setItem(`${subject}_access_token`, response.data.access_token)
                localStorage.setItem(`${subject}_id_token`, response.data.id_token)
                localStorage.setItem(`${subject}_expiry`, String(Date.now() / 1000 + response.data.expires_in))

                console.info("Successfully refreshed access token")
            }

            let accessToken = localStorage.getItem(`${subject}_access_token`)!!
            config.headers.setAuthorization(`Bearer ${accessToken}`, true)

            console.debug(`Set Authorization for ${config.method?.toUpperCase()} ${config.url}`)

            return config
        },
        (error) => Promise.reject(error)
    )

    export interface RefreshTokenRequest {
        id: string
        refresh_token: string
        device_key: string
    }

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

    export interface LoginRequest {
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
