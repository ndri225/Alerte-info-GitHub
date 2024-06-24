import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEvaluationsComponent } from './customer-evaluations.component';

describe('CustomerEvaluationsComponent', () => {
  let component: CustomerEvaluationsComponent;
  let fixture: ComponentFixture<CustomerEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEvaluationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
