import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsLayoutComponent } from './donors-layout.component';

describe('DonorsLayoutComponent', () => {
  let component: DonorsLayoutComponent;
  let fixture: ComponentFixture<DonorsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
