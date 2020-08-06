export interface IPost {
    ID?: string
    description: string,
    createdAt: string,
    comments?: number,
    likes?: number,
    userID: string
}

export interface IComments {
    ID?: string
    content: string,
    createdAt: string,
    userID?: string,
    postID?: string,
    likes?: string
}