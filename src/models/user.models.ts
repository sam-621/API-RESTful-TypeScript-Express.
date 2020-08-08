export interface IUser {
    ID?: string
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    followers?: number
}

export interface ILoginUser {
    email: string,
    password: string
}