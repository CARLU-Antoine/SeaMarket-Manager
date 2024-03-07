import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageModifUserComponent } from './page-modif-user.component';

describe('PageModifUserComponent', () => {
  let component: PageModifUserComponent;
  let fixture: ComponentFixture<PageModifUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageModifUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageModifUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
