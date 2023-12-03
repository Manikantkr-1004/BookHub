import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private store: Store) {}

  canActivate(): boolean {
    let userAuth = '';
    let username = ''
    this.store.select((state: any) => state.Reducer.users).subscribe((users)=>{
      userAuth = users.token;
      username = users.username;
    })

    if(userAuth && username){
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }
}
