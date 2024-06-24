import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCourriersFormsDialogComponent } from './send-courriers-forms-dialog.component';

describe('SendCourriersFormsDialogComponent', () => {
  let component: SendCourriersFormsDialogComponent;
  let fixture: ComponentFixture<SendCourriersFormsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCourriersFormsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendCourriersFormsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
