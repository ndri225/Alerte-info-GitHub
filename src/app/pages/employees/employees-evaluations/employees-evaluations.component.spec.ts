import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEvaluationsComponent } from './employees-evaluations.component';

describe('EmployeesEvaluationsComponent', () => {
  let component: EmployeesEvaluationsComponent;
  let fixture: ComponentFixture<EmployeesEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesEvaluationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
