import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesPermissionsComponent } from './ch-employees-permissions.component';

describe('ChEmployeesPermissionsComponent', () => {
  let component: ChEmployeesPermissionsComponent;
  let fixture: ComponentFixture<ChEmployeesPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
