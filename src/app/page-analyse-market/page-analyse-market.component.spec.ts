import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnalyseMarketComponent } from './page-analyse-market.component';

describe('PageAnalyseMarketComponent', () => {
  let component: PageAnalyseMarketComponent;
  let fixture: ComponentFixture<PageAnalyseMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAnalyseMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAnalyseMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
