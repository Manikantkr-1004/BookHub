import { Component } from '@angular/core';
import { BookData } from '../alldata';
import {Store} from '@ngrx/store'
import { BookdataService } from '../bookdata.service';
import { storeBookAction } from '../store/actions/app.action';
import { UserService } from '../user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

  constructor(private store: Store, private bookdataservice: BookdataService, private userService:UserService,private titleService: Title){
    this.titleService.setTitle('AllBooks - BookHub Platform');
  }

  bookData:BookData[] =[];
  loading:boolean = false;
  total: Array<number> | undefined = undefined;
  page:number = 1;
  title:string = ''
  genre:string = ''
  role:string =''
  author_name: string = '';
  userId: string = '';
  token : string = '';
  userCartData: BookData[] = [];
  
  ngOnInit(): void {

    this.getBookData();
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.userId = users.id;
      this.token = users.token;
      this.role = users.role;
    })
    this.getUserCartData();

  };

  getBookData = ()=>{
    this.loading = true;

    this.bookdataservice.getBook(this.page,this.title,this.genre,this.author_name).subscribe((books: any) => {
      this.loading = false;
      this.total = new Array(Math.ceil(books.total/20)).fill(0);
      this.store.dispatch(storeBookAction(books.books));
      this.store.select((state:any) => state.Reducer.books).subscribe((books) => {
        this.bookData = books;
        console.log(books);
      });
      window.scrollTo({top:0})

    },(error)=>{
      console.log(error);
      this.loading = false;
      window.scrollTo({top:0})
    }); 
  }

  getUserCartData = ()=>{
    if(this.token && this.userId){
      this.userService.getUserProfile(this.userId,this.token).subscribe((data:any)=>{
        this.userCartData = data.user.cart;
        console.log(data);
        this.loading = false;
        
      },(error)=>{
        console.log(error)
        this.loading = false;
      })
    }
  }

  addToCart(id:string){
    let singleBook:any = this.bookData.find((ele:any)=> ele._id===id);
    this.userCartData.push(singleBook);
    this.loading = true;
    
    this.userService.updateCart(this.userId,this.token,this.userCartData).subscribe((data)=>{
      console.log(data);
      this.getUserCartData();
      
    },(error)=>{
      alert("Something went wrong");
      console.log(error);
      
    })
    
  };

  checkCart(id:string):boolean{
    let singleBook:any = this.userCartData.find((ele:any)=> ele._id===id);
    if(singleBook){
      return true;
    }else{
      return false;
    }
  }

  onGenre(e:Event){
    this.genre = (e.target as HTMLSelectElement).value;
    this.getBookData();
  }

  onAuthor(e:Event){
    this.author_name = (e.target as HTMLInputElement).value;
    this.getBookData();
  }

  onTitle(e:Event){
    this.title = (e.target as HTMLInputElement).value;
    this.getBookData();
  }

  onPage(pageNumber:number){
    this.page = pageNumber;
    this.getBookData();
  }
}
