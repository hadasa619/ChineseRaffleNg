import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsLayoutComponent } from './tickets-layout.component';

describe('TicketsLayoutComponent', () => {
  let component: TicketsLayoutComponent;
  let fixture: ComponentFixture<TicketsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
