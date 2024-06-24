import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeesFormsDialogComponent } from './edit-employees-forms-dialog.component';

describe('EditEmployeesFormsDialogComponent', () => {
  let component: EditEmployeesFormsDialogComponent;
  let fixture: ComponentFixture<EditEmployeesFormsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeesFormsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeesFormsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
