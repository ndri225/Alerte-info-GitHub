import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesWelcomeComponent } from './employees-welcome.component';

describe('EmployeesWelcomeComponent', () => {
  let component: EmployeesWelcomeComponent;
  let fixture: ComponentFixture<EmployeesWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
