import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultePermissionComponent } from './admin-consulte-permission.component';

describe('AdminConsultePermissionComponent', () => {
  let component: AdminConsultePermissionComponent;
  let fixture: ComponentFixture<AdminConsultePermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConsultePermissionComponent]
    });
    fixture = TestBed.createComponent(AdminConsultePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
