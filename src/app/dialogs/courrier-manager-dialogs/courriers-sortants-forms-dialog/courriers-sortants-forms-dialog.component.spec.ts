import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersSortantsFormsDialogComponent } from './courriers-sortants-forms-dialog.component';

describe('CourriersSortantsFormsDialogComponent', () => {
  let component: CourriersSortantsFormsDialogComponent;
  let fixture: ComponentFixture<CourriersSortantsFormsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourriersSortantsFormsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourriersSortantsFormsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
