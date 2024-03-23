import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterCategorieComponent } from './better-categorie.component';

describe('BetterCategorieComponent', () => {
  let component: BetterCategorieComponent;
  let fixture: ComponentFixture<BetterCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetterCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetterCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
