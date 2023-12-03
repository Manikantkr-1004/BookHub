import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Reducer } from './store/reducer/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './books/books.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { ScrolltotopComponent } from './scrolltotop/scrolltotop.component';
import { FormsModule } from '@angular/forms';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorpageComponent } from './authorpage/authorpage.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ChatbotComponent,
    BooksComponent,
    DiscussionsComponent,
    ScrolltotopComponent,
    BookdetailsComponent,
    ProfileComponent,
    AuthorpageComponent,
    CartComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({Reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
