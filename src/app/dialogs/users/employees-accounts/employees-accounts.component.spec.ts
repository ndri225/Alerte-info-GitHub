import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesAccountsComponent } from './employees-accounts.component';

describe('EmployeesAccountsComponent', () => {
  let component: EmployeesAccountsComponent;
  let fixture: ComponentFixture<EmployeesAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesAccountsComponent]
    });
    fixture = TestBed.createComponent(EmployeesAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
