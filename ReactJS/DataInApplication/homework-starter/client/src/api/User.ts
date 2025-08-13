import { z } from "zod";
import { validateResponse } from "./validateResponse";

const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then(data => UserSchema.parse(data))
}

export function registerUser(
    username: string,
    password: string,
    email: string,
): Promise<void> {
    return fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email })
    }).then(() => undefined)
}


export function login(
    email: string,
    password: string
): Promise<void> {
    return fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
        .then(validateResponse)
        .then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch("/api/users/me")
        .then(validateResponse)
        .then(response => response.json())
        .then(data => UserSchema.parse(data));
}

export const logout = async (): Promise<void> => {
    await fetch("/api/logout", { method: "POST" });
};