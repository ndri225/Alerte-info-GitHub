import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesProfilComponent } from './admin-employees-profil.component';

describe('AdminEmployeesProfilComponent', () => {
  let component: AdminEmployeesProfilComponent;
  let fixture: ComponentFixture<AdminEmployeesProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployeesProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEmployeesProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
