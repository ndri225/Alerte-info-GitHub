import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListEmployeesComponent } from './admin-list-employees.component';

describe('AdminListEmployeesComponent', () => {
  let component: AdminListEmployeesComponent;
  let fixture: ComponentFixture<AdminListEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
