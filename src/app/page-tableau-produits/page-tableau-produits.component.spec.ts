import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTableauProduitsComponent } from './page-tableau-produits.component';

describe('PageTableauProduitsComponent', () => {
  let component: PageTableauProduitsComponent;
  let fixture: ComponentFixture<PageTableauProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTableauProduitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTableauProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
