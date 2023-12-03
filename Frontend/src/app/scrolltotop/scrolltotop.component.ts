import { Component,OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-scrolltotop',
  templateUrl: './scrolltotop.component.html',
  styleUrl: './scrolltotop.component.css'
})
export class ScrolltotopComponent implements OnInit, OnDestroy {
  scrollView: boolean = false;

  ngOnInit(): void {
      window.addEventListener('scroll',this.handleScroll);
  }

  handleScroll =()=>{
    if(window.scrollY >=100){
      this.scrollView = true;
    }else{
      this.scrollView = false;
    }
  }

  handleScrollTop(){
    window.scrollTo({top:0})
  }

  ngOnDestroy(): void {
      window.removeEventListener('scroll',this.handleScroll);
  }
}
