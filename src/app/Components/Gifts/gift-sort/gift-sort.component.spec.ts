import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSortComponent } from './gift-sort.component';

describe('GiftSortComponent', () => {
  let component: GiftSortComponent;
  let fixture: ComponentFixture<GiftSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
