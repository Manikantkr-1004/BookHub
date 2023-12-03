import { Component, OnInit } from '@angular/core';
import { BookdataService } from '../bookdata.service';
import {Store} from '@ngrx/store'
import { ActivatedRoute } from '@angular/router';
import { BookData } from '../alldata';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrl: './bookdetails.component.css'
})
export class BookdetailsComponent implements OnInit {

  constructor(private store:Store, private bookdataService:BookdataService, private router:ActivatedRoute,private titleService: Title){
    this.titleService.setTitle('BookInfo - BookHub Platform');
  };

  userId:string = '';
  username:string = '';
  token:string = '';
  loading:boolean = false;
  contentLoading:boolean = false;
  reviewLoading:boolean = false;
  role:string = '';
  bookId:string = '';
  bookData: BookData | any = {};
  reviewData: {comments:Array<any>,book_id:string,_id:string}[] = []
  bookContent:string = '';
  addComment:string = '';
  replyComment:string = '';

  ngOnInit(): void {
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.userId = users.id;
      this.token = users.token;
      this.role = users.role;
      this.username = users.username;
    })
    window.scrollTo({top:0})

    this.router.params.subscribe(params=>{
      const id = params['id']
      this.bookId = id;
      this.loading = true;

      this.getSingleData();
      this.getReview();
    })
  }

  getSingleData = ()=>{
    this.bookdataService.getSingleBook().subscribe((data:any)=>{
      this.loading = false;
      let single = data.books.find((ele:any)=> ele._id=== this.bookId);
      this.bookData = single;

      this.getBookContent(single.title)
      

    },(error)=>{
      this.loading = false;
      console.log(error);
      
    })
  }

  getBookContent = (title:string)=>{
    this.contentLoading = true;

    this.bookdataService.bookContent(title).subscribe((data:any)=>{
      this.contentLoading = false;
      console.log(data.msg);
      
      this.bookContent = data.msg;

    },(error)=>{
      this.contentLoading = false;
      console.log(error);
      
    })
  }

  getReview = ()=>{
    this.reviewLoading = true;

    this.bookdataService.getReview(this.bookId).subscribe((data:any)=>{
      this.loading = false;
      this.reviewLoading = false;
      this.reviewData = data.reviews;
      

    },error=>{
      console.log(error);
      this.loading = false;
      this.reviewLoading = false;

    })
  }

  clickLike(){
    if(!this.token || !this.username || !this.userId){
      alert("Please Login for Like/Unlike");
      return;
    }

    this.loading = true;

    this.bookdataService.updateLike(this.bookId,this.token).subscribe((data)=>{
      this.getSingleData();

    },(error)=>{
      console.log(error);
      this.loading = false;
      
    })
  }

  onPrint(){
    window.print();
  }

  onComment(){
    window.location.hash ='comments'
  }

  onWhatsapp(){
    window.open(`https://wa.me/?text=Hey, See This is an amazing book platform where i found a good book for you to read, Must visit%0A%0A*Title:-* ${this.bookData.title}%0A%0A${this.bookData.description}%0A%0A*👉Click To Visit Book:- ${window.location.href}*`,'_blank')
  }

  onFacebook(){
    window.open(`https://www.facebook.com/sharer/sharer.php?u=Check out this link to read this amazing book and the platform is best for book lovers. This is the Book Title:- ${this.bookData.title} and this is his link... ${window.location.href}&quote=Check out this link to read this amazing book and the platform is best for book lovers. This is the Book Title:- ${this.bookData.title}`,'_blank')
  }

  newComment(e:Event){
    this.addComment = (e.target as HTMLInputElement).value;
  }

  replyComm(e:Event){
    this.replyComment = (e.target as HTMLInputElement).value;
  }

  addReview(){
    if(this.addComment.trim()===''){
      alert("Please write commment to publish");
      return;
    }

    if(!this.token || !this.username || !this.userId){
      alert("Please Login for comment");
      return;
    }

    this.reviewLoading = true;

    let published = new Date().toLocaleDateString('en-US',{weekday: 'short',year:'numeric',month:'short',day:'numeric'})+' '+ new Date().toLocaleTimeString('en-US');
    let item = {
      published,
      comment: this.addComment,
      user_id: this.userId,
      username: this.username
    }

    this.bookdataService.addComment(this.bookId,this.token,item).subscribe((data)=>{
      this.getReview();

    },(error)=>{
      console.log(error);
      this.reviewLoading = false;
      
    })
  }

  replyReview(id:string){
    if(this.replyComment.trim()===''){
      alert("Please write commment to reply");
      return;
    }

    if(!this.token || !this.username || !this.userId){
      alert("Please Login for reply");
      return;
    }

    this.reviewLoading = true;

    let published = new Date().toLocaleDateString('en-US',{weekday: 'short',year:'numeric',month:'short',day:'numeric'})+' '+ new Date().toLocaleTimeString('en-US');
    let item = {
      published,
      comment: this.replyComment,
      user_id: this.userId,
      username: this.username
    }

    this.bookdataService.replyComment(id,this.token,item).subscribe((data)=>{
      this.getReview();

    },(error)=>{
      console.log(error);
      this.reviewLoading = false;
      
    })
  }

}
