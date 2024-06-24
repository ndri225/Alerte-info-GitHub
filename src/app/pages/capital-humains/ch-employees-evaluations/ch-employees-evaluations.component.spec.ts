import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesEvaluationsComponent } from './ch-employees-evaluations.component';

describe('ChEmployeesEvaluationsComponent', () => {
  let component: ChEmployeesEvaluationsComponent;
  let fixture: ComponentFixture<ChEmployeesEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesEvaluationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
