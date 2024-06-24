import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListAttendanceComponent } from './employees-list-attendance.component';

describe('EmployeesListAttendanceComponent', () => {
  let component: EmployeesListAttendanceComponent;
  let fixture: ComponentFixture<EmployeesListAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesListAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesListAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
