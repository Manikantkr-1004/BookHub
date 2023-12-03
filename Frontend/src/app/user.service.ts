import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookData } from './alldata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { };

  getUserProfile(id:string,token:string){
    return this.http.get(`https://bookhub-3of2.onrender.com/api/user/user/${id}`,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  updateCart(id:string,token:string,cart:BookData[]){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/user/update/${id}`,{cart},{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  updatePurchased(id:string,token:string,purchased:BookData[]){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/user/update/${id}`,{purchased},{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  updateProfile(id:string,token:string,item:{name:string,image:string}){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/user/update/${id}`,item,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
