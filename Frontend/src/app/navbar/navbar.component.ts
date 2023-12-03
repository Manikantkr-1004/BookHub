import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuOpen:boolean = false;
  name: string = '';
  username: string = '';
  id: string = '';
  role:string = '';
  userImg:string = ''

  constructor(private store: Store){}

  ngOnInit(): void {
    this.store.select((state:any)=> state.Reducer.users).subscribe((users)=>{
      this.name = users.name;
      this.username = users.username;
      this.id = users.id;
      this.role = users.role;
      this.userImg = users.image;
    })
  }

  checkAuth():boolean{
    if(this.name && this.username && this.id){
      return true;
    }else{
      return false;
    }
  }

  checkRole():boolean{
    if(this.role==='user'){
      return true;
    }else{
      return false;
    }
  }

  shortName():string{
    return this.name.split(' ').map((ele)=> ele[0][0]).join('').toUpperCase()
  }

  onToggle(){
    this.menuOpen = !this.menuOpen;
  }

  doLogout(){
    localStorage.removeItem('users');
    localStorage.removeItem('userImg')
    window.location.reload();
  }
}
