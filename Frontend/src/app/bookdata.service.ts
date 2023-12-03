import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookdataService {

  constructor(private http: HttpClient) { }

  getBook(page:number,title:string,genre:string,author_name:string){
    let params = {
      page: page,
      limit: 20,
      title: title,
      genre: genre,
      author_name: author_name
    };
    return this.http.get('https://bookhub-3of2.onrender.com/api/book', {params});
  }

  addBook(item:{title:string,genre:string,description:string,price:number,pages:number,imageLink:string},token:string){
    return this.http.post('https://bookhub-3of2.onrender.com/api/book/add',item,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }

  getSingleBook(){
    return this.http.get('https://bookhub-3of2.onrender.com/api/book');
  }

  bookContent(booktitle:string){
    return this.http.post('https://bookhub-3of2.onrender.com/api/book/bookcontent',{booktitle});
  }

  getReview(id:string){
    return this.http.get(`https://bookhub-3of2.onrender.com/api/review/get/${id}`)
  }

  updateLike(id:string,token:string){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/book/likes/${id}`,token,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  addComment(id:string,token:string,item:{comment:string,user_id:string,published:string,username:string}){
    return this.http.post(`https://bookhub-3of2.onrender.com/api/review/add/${id}`,item,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }

  replyComment(id:string,token:string,item:{comment:string,user_id:string,published:string,username:string}){
    return this.http.patch(`https://bookhub-3of2.onrender.com/api/review/reply/${id}`,item,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
  }


}
