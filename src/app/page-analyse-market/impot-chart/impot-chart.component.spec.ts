import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpotChartComponent } from './impot-chart.component';

describe('ImpotChartComponent', () => {
  let component: ImpotChartComponent;
  let fixture: ComponentFixture<ImpotChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpotChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
