import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGiftComponent } from './single-gift.component';

describe('SingleGiftComponent', () => {
  let component: SingleGiftComponent;
  let fixture: ComponentFixture<SingleGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGiftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
