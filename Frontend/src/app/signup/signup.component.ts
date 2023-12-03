import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../signup.service';
import { SignupData } from '../alldata';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(private signupService: SignupService,private store:Store, private router:Router,private titleService: Title){
    this.titleService.setTitle('Signup - BookHub Platform');
  }

  data: SignupData = {username:'',name:'',email:'',password:''}
  current:string = 'User';
  usernameAvailabiliy:boolean = true;
  loading : boolean = false;

  ngOnInit(): void {
    let loginAuth = undefined
    this.store.select((state:any)=> state.Reducer.users.token).subscribe((token)=>{
      loginAuth = token;
  })

  window.scrollTo({top:0})

    if(loginAuth){
      this.router.navigate([''])
    }
  }

  onSubmit(form: NgForm): void{
    if(form.valid){
      this.loading = true;
      this.checkUsername()
    }
  }

  onToggle(e:Event){
    if((e.target as HTMLInputElement).checked){
      this.current = 'User'      
    }else{
      this.current = 'Author'
    }
  }

  checkUsername =()=>{
    let value = this.data.username;

    if(this.current==='User' && value!==''){

      this.signupService.checkUsername(value).subscribe((data:any)=>{
        if(data.available){
          this.usernameAvailabiliy = true;
          this.doSignup();
        }else{
          this.usernameAvailabiliy = false;
          this.loading = false;
          return;
        }
      },(error)=>{
        this.usernameAvailabiliy = false;
        this.loading = false;
        return;
      })

    }else if(this.current==='Author' && value!==''){

      this.signupService.checkAuthorusername(value).subscribe((data:any)=>{
        if(data.available){
          this.usernameAvailabiliy = true;
          this.doSignup();
        }else{
          this.usernameAvailabiliy = false;
          this.loading = false;
          return;
        }
      },(error)=>{
        this.usernameAvailabiliy = false;
        this.loading = false;
        return;
      })

    }

  }

  doSignup = ()=>{
    if(this.current ==='User'){
      this.signupService.userSignup(this.data).subscribe((data:any)=>{
        this.loading = false;
        alert(data.msg)
        this.router.navigate(['login'])

      },(error)=>{
        this.loading = false;
        alert(error.error.msg)
        
      })

    }else{
      this.signupService.authorSignup(this.data).subscribe((data:any)=>{
        this.loading = false;
        alert(data.msg)
        this.router.navigate(['login'])

      },(error)=>{
        this.loading = false;
        alert(error.error.msg)
        
      })

    }
  }

}
