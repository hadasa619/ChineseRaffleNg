import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsLayoutComponent } from './gifts-layout.component';

describe('GiftsLayoutComponent', () => {
  let component: GiftsLayoutComponent;
  let fixture: ComponentFixture<GiftsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
