import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesAttendanceListComponent } from './ch-employees-attendance-list.component';

describe('ChEmployeesAttendanceListComponent', () => {
  let component: ChEmployeesAttendanceListComponent;
  let fixture: ComponentFixture<ChEmployeesAttendanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesAttendanceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesAttendanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
