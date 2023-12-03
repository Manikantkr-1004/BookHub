import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolltotopComponent } from './scrolltotop.component';

describe('ScrolltotopComponent', () => {
  let component: ScrolltotopComponent;
  let fixture: ComponentFixture<ScrolltotopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrolltotopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrolltotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
