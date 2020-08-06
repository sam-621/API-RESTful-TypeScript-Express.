export interface IPayload {
    id: string,
    rol: string,
}

export interface IDecoded extends IPayload {
    iat: string
}