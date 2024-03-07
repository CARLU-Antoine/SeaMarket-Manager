import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauGeneralComponent } from './tableau-general.component';

describe('TableauGeneralComponent', () => {
  let component: TableauGeneralComponent;
  let fixture: ComponentFixture<TableauGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableauGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
