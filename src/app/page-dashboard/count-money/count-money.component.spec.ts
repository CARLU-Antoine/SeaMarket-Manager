import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountMoneyComponent } from './count-money.component';

describe('CountMoneyComponent', () => {
  let component: CountMoneyComponent;
  let fixture: ComponentFixture<CountMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountMoneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
