import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeesFormsDialogComponent } from './create-employees-forms-dialog.component';

describe('CreateEmployeesFormsDialogComponent', () => {
  let component: CreateEmployeesFormsDialogComponent;
  let fixture: ComponentFixture<CreateEmployeesFormsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeesFormsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEmployeesFormsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
