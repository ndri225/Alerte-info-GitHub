import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListPermissionsComponent } from './admin-list-permissions.component';

describe('AdminListPermissionsComponent', () => {
  let component: AdminListPermissionsComponent;
  let fixture: ComponentFixture<AdminListPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
