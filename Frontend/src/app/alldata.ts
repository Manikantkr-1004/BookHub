export interface BookData {
    _id: string,
    author_id :string,
    author_name: string,
    title: string,
    genre: string,
    description: string,
    published: number,
    price: number,
    pages: number,
    imageLink: string,
    likes: Array<any>
}

export interface SignupData {
    username:string,
    name:string,
    email:string,
    password:string
}

export interface userData {
    _id:string,
    username:string,
    name:string,
    email:string,
    password:string,
    created:string,
    purchased: BookData[],
    cart: BookData[],
    image:string
}