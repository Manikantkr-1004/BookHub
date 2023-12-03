import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorpageComponent } from './authorpage/authorpage.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'books',component:BooksComponent},
  {path:'discussions',component:DiscussionsComponent, canActivate: [AuthGuard]},
  {path:'profile',component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'book/:id',component:BookdetailsComponent},
  {path:'cart',component:CartComponent, canActivate: [AuthGuard]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
