import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsulteMissionComponent } from './admin-consulte-mission.component';

describe('AdminConsulteMissionComponent', () => {
  let component: AdminConsulteMissionComponent;
  let fixture: ComponentFixture<AdminConsulteMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConsulteMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminConsulteMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
