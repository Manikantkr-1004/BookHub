import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../discussion.service';
import {Store} from '@ngrx/store'
import { BookData } from '../alldata';
import { BookdataService } from '../bookdata.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent implements OnInit {

  constructor(private titleService: Title,private discussionService:DiscussionService, private store:Store, private bookService:BookdataService ){
    this.titleService.setTitle('Discussions - BookHub Platform');
  };

  userId:string = '';
  username:string = '';
  token:string = '';
  loading:boolean = false;
  bookData: BookData[] = [];
  selectedBook:string = '';
  addComment:string = '';
  replyComment:string = '';
  discussionData: any = [];

  ngOnInit(): void {
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.userId = users.id;
      this.token = users.token;
      this.username = users.username;
    })
    window.scrollTo({top:0});
    this.loading = true;

    this.getBookData();
    this.getDiscussion();
  }

  getBookData =()=>{
    this.bookService.getSingleBook().subscribe((data:any)=>{
      this.bookData = data.books;
      this.loading = false;

    },(error)=>{
      console.log(error);
      this.loading = false;
      
    })
  }

  onSelect(e:Event){
    this.selectedBook = (e.target as HTMLSelectElement).value;
    
  }

  onComment(e:Event){
    this.addComment = (e.target as HTMLInputElement).value;
  }

  onReply(e:Event){
    this.replyComment = (e.target as HTMLInputElement).value;
  }

  getDiscussion = ()=>{
    this.discussionService.getDiscussion(this.token).subscribe((data:any)=>{
      this.loading  = false;
      this.discussionData = data.discussions;

    },error=>{
      console.log(error);
      this.loading = false;
      
    })
  }

  onAdd(){
    if(this.selectedBook===''){
      alert("Please Select Book");
      return;
    }

    if(this.addComment.trim()===''){
      alert("Please write discussion in Input");
      return;
    }

    this.loading = true;

    let bookArr = this.selectedBook.split("?");
    let published = new Date().toLocaleDateString('en-US',{weekday: 'short',year:'numeric',month:'short',day:'numeric'})+' '+ new Date().toLocaleTimeString('en-US');
    let item = {
      comment: this.addComment,
      user_id: this.userId,
      username: this.username,
      published
    }

    this.discussionService.addDiscussion(bookArr[0],bookArr[1],bookArr[2],bookArr[3],item,this.token).subscribe((data)=>{
      this.getDiscussion();

    },(error)=>{
      this.loading = false;
      console.log(error);
      
    })

  }

  addReply(id:string){

    if(this.replyComment.trim()===''){
      alert("Please write reply in Input");
      return;
    }

    this.loading = true;

    let published = new Date().toLocaleDateString('en-US',{weekday: 'short',year:'numeric',month:'short',day:'numeric'})+' '+ new Date().toLocaleTimeString('en-US');
    let item = {
      comment: this.replyComment,
      user_id: this.userId,
      username: this.username,
      published
    }

    this.discussionService.replyDiscussion(id,item,this.token).subscribe((data)=>{
      this.getDiscussion();

    },(error)=>{
      this.loading = false;
      console.log(error);
      
    })
  }


}
