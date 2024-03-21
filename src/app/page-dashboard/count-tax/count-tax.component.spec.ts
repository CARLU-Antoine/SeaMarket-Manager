import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTaxComponent } from './count-tax.component';

describe('CountTaxComponent', () => {
  let component: CountTaxComponent;
  let fixture: ComponentFixture<CountTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
