import { createAction } from "@ngrx/store";
import { BookData } from "../../alldata";

export const storeBookAction = createAction('[Books] Store books data', (product: BookData[])=> ({product}));
export const addCartAction = createAction('[Cart] Add proudct to cart', (product: BookData[])=> ({product}));
export const loginAction = createAction('[Auth] Login',(item:any)=> ({item}));
export const logoutAction = createAction('[Auth] Logout');