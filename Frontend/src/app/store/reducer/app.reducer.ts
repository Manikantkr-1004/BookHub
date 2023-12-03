import { createReducer, on} from "@ngrx/store"
import { BookData } from "../../alldata"
import { addCartAction, loginAction, logoutAction, storeBookAction } from "../actions/app.action"

export interface State {
    books: BookData[],
    cart: BookData[],
    users: {id:string,name:string,username:string,token:string,role:string,image:string} | object,
}

let userData = localStorage.getItem('users');
let users;
if(userData){
    users = JSON.parse(userData)
}

const initialState: State = {
    books: [],
    cart: [], 
    users: users || {},
}

export const Reducer = createReducer(
    initialState,
    on(storeBookAction, (state, {product})=>{
        return {...state, books: product}
    }),
    on(addCartAction, (state, {product})=>{
        return {...state, cart: product};
    }),
    on(loginAction, (state, {item})=>{
        localStorage.setItem('users',JSON.stringify(item))
        return {...state, users: item}
    }),
    on(logoutAction, (state)=> (localStorage.setItem('user',JSON.stringify(undefined)),{...state, users : {}}))
)
