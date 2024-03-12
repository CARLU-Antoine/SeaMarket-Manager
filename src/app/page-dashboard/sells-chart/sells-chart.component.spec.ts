import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsChartComponent } from './sells-chart.component';

describe('SellsChartComponent', () => {
  let component: SellsChartComponent;
  let fixture: ComponentFixture<SellsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
