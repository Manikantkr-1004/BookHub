import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import {Store} from '@ngrx/store'
import { loginAction } from '../store/actions/app.action';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private store:Store, private router:Router,private titleService: Title){
    this.titleService.setTitle('Login - BookHub Platform');
  }

  data: {identifier:string,password:string} = {identifier:'',password:''}
  current:string = 'User';
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
      this.makeLogin();
    }
  }

  makeLogin = ()=>{
    if(this.current==='User'){
      this.loginService.userLogin(this.data).subscribe((data:any)=>{
        let item = {id:data._id,token:data.token,name:data.name,username:data.username,role:'user'};
        this.store.dispatch(loginAction(item));
        this.loading = false;
        alert(data.msg);
        this.router.navigate(['']);
        window.location.reload();

      },(error)=>{
        alert(error.error.msg);
        this.loading = false;
      })

    }else{
      this.loginService.authorLogin(this.data).subscribe((data:any)=>{
        let item = {id:data._id,token:data.token,name:data.name,username:data.username,role:'author'};
        this.store.dispatch(loginAction(item));
        this.loading = false;
        alert(data.msg);
        this.router.navigate(['']);
        window.location.reload();

      },(error)=>{
        alert(error.error.msg);
        this.loading = false;
      })

    }


  }

  onToggle(e:Event){
    if((e.target as HTMLInputElement).checked){
      this.current = 'User' 
    }else{
      this.current = 'Author'
    }
  }
}
