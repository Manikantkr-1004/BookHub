import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupData } from './alldata';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  checkUsername(username:string){
    return this.http.post('https://bookhub-3of2.onrender.com/api/user/usernamecheck',{username})
  }

  checkAuthorusername(username:string){
    return this.http.post('https://bookhub-3of2.onrender.com/api/author/usernamecheck',{username})
  }

  userSignup(data:SignupData){
    return this.http.post('https://bookhub-3of2.onrender.com/api/user/signup',data)
  }

  authorSignup(data:SignupData){
    return this.http.post('https://bookhub-3of2.onrender.com/api/author/signup',data)
  }
}
