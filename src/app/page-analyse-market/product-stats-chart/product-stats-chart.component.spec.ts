import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatsChartComponent } from './product-stats-chart.component';

describe('ImpotChartComponent', () => {
  let component: ProductStatsChartComponent;
  let fixture: ComponentFixture<ProductStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStatsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
