import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http:HttpClient) { }

  getDiscussion(token:string){
    return this.http.get('https://bookhub-3of2.onrender.com/api/discussion/get',{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  addDiscussion(book_id:string,book_title:string,book_author:string,book_image:string,item:{comment:string,user_id:string,username:string,published:string},token:string){

    let params = {
      book_id,
      book_title,
      book_author,
      book_image
    }

    return this.http.post('https://bookhub-3of2.onrender.com/api/discussion/add',item,{
      params,
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }

  replyDiscussion(id:string,item:{comment:string,user_id:string,username:string,published:string},token:string){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/discussion/reply/${id}`,item,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }


}
