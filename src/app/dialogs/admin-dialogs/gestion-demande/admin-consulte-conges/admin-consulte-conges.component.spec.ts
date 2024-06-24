import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsulteCongesComponent } from './admin-consulte-conges.component';

describe('AdminConsulteCongesComponent', () => {
  let component: AdminConsulteCongesComponent;
  let fixture: ComponentFixture<AdminConsulteCongesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConsulteCongesComponent]
    });
    fixture = TestBed.createComponent(AdminConsulteCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
