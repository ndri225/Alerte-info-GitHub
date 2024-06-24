import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesDetailsComponent } from './ch-employees-details.component';

describe('ChEmployeesDetailsComponent', () => {
  let component: ChEmployeesDetailsComponent;
  let fixture: ComponentFixture<ChEmployeesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
