import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  userLogin(data:{identifier:string,password:string}){
    return this.http.post('https://bookhub-3of2.onrender.com/api/user/login',data)
  }

  authorLogin(data:{identifier:string,password:string}){
    return this.http.post('https://bookhub-3of2.onrender.com/api/author/login',data)
  }
}
