import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  getAuthorProfile(id:string,token:string){
    return this.http.get(`https://bookhub-3of2.onrender.com/api/author/author/${id}`,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  getAuthorBook(token:string){
    return this.http.get('https://bookhub-3of2.onrender.com/api/book/get',{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    });
  }

  deleteOwnbook(id:string,token:string){
    return this.http.delete(`https://bookhub-3of2.onrender.com/api/book/delete/${id}`,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
