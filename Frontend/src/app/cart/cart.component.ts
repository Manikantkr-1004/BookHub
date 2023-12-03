import { Component , OnInit} from '@angular/core';
import { UserService } from '../user.service';
import {Store} from "@ngrx/store"
import { BookData } from '../alldata';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private userService:UserService, private store:Store, private router: Router,private titleService: Title){
    this.titleService.setTitle('Cart - BookHub Platform');
  }

  userId: string = '';
  token : string = '';
  name: string = '';
  role:string = ''
  userCartData: BookData[] = [];
  purchasedData: BookData[] = [];
  loading: boolean = false;
  paymentData ={name:'',mobile:'',address:'',payment:''};
  paymentLoading:boolean = false;

  ngOnInit(): void {
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.userId = users.id;
      this.token = users.token;
      this.name  = users.name;
      this.role = users.role;
    })

    if(this.role!=='user'){
      this.router.navigate(['']);
      return;
    }
    
    this.loading = true;
    window.scrollTo({top:0})
    this.getUserCartData();
  }

  getUserCartData = ()=>{
    if(this.token && this.userId){
      this.userService.getUserProfile(this.userId,this.token).subscribe((data:any)=>{
        this.userCartData = data.user.cart;
        this.purchasedData = data.user.purchased;
        this.loading = false;
        console.log(data);
        
      },(error)=>{
        console.log(error)
        this.loading = false;
      })
    }
  }

  removeCart(id:string){
    let item = this.userCartData.filter((ele)=> ele._id !== id);
    this.loading = true;
    
    this.userService.updateCart(this.userId,this.token,item).subscribe((data)=>{
      console.log(data);
      this.getUserCartData();
      
    },(error)=>{
      alert("Something went wrong");
      console.log(error);
      
    })
  }

  totalPrice():number{
    let total =0;
    this.userCartData.forEach((ele)=> total+= ele.price);

    return total;
  }

  formSubmit(form:NgForm){
    if(form.valid){
      
      this.paymentLoading = true;

      this.userService.updatePurchased(this.userId,this.token,[...this.purchasedData,...this.userCartData]).subscribe((data)=>{

        this.userService.updateCart(this.userId,this.token,[]).subscribe((data)=>{
          this.paymentLoading = false;
          alert('Order is Placed');
          this.router.navigate(['profile']);

        },(error)=>{
          console.log(error);
          this.paymentLoading = false;
        })

      },(error)=>{
        console.log(error);
        this.paymentLoading = false;
        
      })
    }
  }
}
