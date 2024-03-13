import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabiliteChartComponent } from './comptabilite-chart.component';

describe('ComptabiliteChartComponent', () => {
  let component: ComptabiliteChartComponent;
  let fixture: ComponentFixture<ComptabiliteChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptabiliteChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptabiliteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
