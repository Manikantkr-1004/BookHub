import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { BookData, userData } from '../alldata';
import { AuthorService } from '../author.service';
import { loginAction } from '../store/actions/app.action';
import { BookdataService } from '../bookdata.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private titleService: Title,private store: Store,private bookService:BookdataService, private userService:UserService, private authorSerice:AuthorService){
    this.titleService.setTitle('Profile - BookHub Platform');
  }

  userData: userData = {_id:'',name:'',username:'',image:'',email:'',password:'',created:'',cart:[],purchased:[]};
  userId:string = '';
  token:string = '';
  loading:boolean = false;
  update: boolean = false;
  role:string = ''
  updateData: {name:string,image:string} = {name:'',image:''};
  authorData: BookData[] = [];
  addBookData: {title:string,genre:string,description:string,price:number,pages:number,imageLink:string}={
    title:'',
    genre:'',
    description:'',
    price:0,
    pages:0,
    imageLink:''
  }

  ngOnInit(): void {
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.userId = users.id;
      this.token = users.token;
      this.role = users.role;
    })

    window.scrollTo({top:0})

    this.loading = true;
    this.getUserData();
    this.getAuthorBookData();
  }

  getUserData = ()=>{
    if(this.role==='user'){
      this.userService.getUserProfile(this.userId,this.token).subscribe((data:any)=>{
        this.userData = data.user;
        let item = {id:data.user._id,image:data.user.image,token:this.token,name:data.user.name,username:data.user.username,role:'user'};
        this.store.dispatch(loginAction(item));
        this.update = false;
        this.loading = false;
        
      },(error)=>{
        console.log(error)
        this.loading = false;
      })
    }else{
      this.authorSerice.getAuthorProfile(this.userId,this.token).subscribe((data:any)=>{
        this.userData = data.author;
        this.loading = false;
        
      },(error)=>{
        console.log(error)
        this.loading = false;
      })
    }
  }

  getAuthorBookData = ()=>{
    this.loading = true;
    if(this.role==='author'){

      this.authorSerice.getAuthorBook(this.token).subscribe((data:any)=>{
        this.authorData = data.books;
        this.loading = false;

      },(error)=>{
        this.loading = false;
        console.log(error);
        
      })

    }else{
      this.loading = false;
    }
  }

  deleteBook(id:string){
    this.loading = true;

    this.authorSerice.deleteOwnbook(id,this.token).subscribe((data)=>{
      this.getAuthorBookData();
      
    },(error)=>{
      console.log(error);
      this.loading = false;
      
    })

  }

  shortName():string{    
    return this.userData.name.split(' ').map((ele)=> ele[0][0]).join('').toUpperCase();
  }

  onToggle(){
    this.update = !this.update;
  }

  updateName(e:Event){
    this.updateData.name = (e.target as HTMLInputElement).value;
  }

  updateImage(e:Event){
    this.updateData.image = (e.target as HTMLInputElement).value;
  }

  formSubmit(e:Event){
    e.preventDefault();
    if(this.updateData.name===''){
      alert('Please Fill Name');
      return;
    }
    if(this.updateData.image===''){
      alert("Please Fill Profile Image URL");
      return;
    }

    this.loading = true;
    this.userService.updateProfile(this.userId,this.token,this.updateData).subscribe((data)=>{
      this.getUserData();

    },(error)=>{
      console.log(error);
      this.loading = false;
      
    })
  }

  bookTitle(e:Event){
    this.addBookData.title = (e.target as HTMLInputElement).value;
  }

  bookGenre(e:Event){
    this.addBookData.genre = (e.target as HTMLInputElement).value;
  }

  bookDes(e:Event){
    this.addBookData.description = (e.target as HTMLInputElement).value;
  }

  bookPrice(e:Event){
    this.addBookData.price = +(e.target as HTMLInputElement).value;
  }

  bookPage(e:Event){
    this.addBookData.pages = +(e.target as HTMLInputElement).value;
  }

  bookImage(e:Event){
    this.addBookData.imageLink = (e.target as HTMLInputElement).value;
  }

  addBook(){
    if(this.addBookData.title.trim()==='' || this.addBookData.genre==='' || this.addBookData.description.trim()==='' || this.addBookData.price===0 || this.addBookData.pages===0 || this.addBookData.imageLink.trim()===''){
      alert("Please fill all fields correctly");
      return;
    }

    this.loading = true;

    this.bookService.addBook(this.addBookData,this.token).subscribe((data)=>{
      this.getAuthorBookData();
      this.update = false;

    },(error)=>{
      console.log(error);
      this.loading = false;
      
    })

  }


}
